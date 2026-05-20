// app.jsx — root, scroll reveal, spark cursor, tweaks

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#631caa",
  "grain": 0.35,
  "spark": true,
  "scanlines": true,
  "fontDisplay": "Unbounded"
}/*EDITMODE-END*/;

function useReveal() {
  React.useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  });
}

function SparkCursor({ active }) {
  const dot = React.useRef(null);
  const ring = React.useRef(null);
  React.useEffect(() => {
    if (!active) return;
    let rx = 0, ry = 0, x = 0, y = 0;
    const onMove = (e) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) { dot.current.style.left = x + "px"; dot.current.style.top = y + "px"; }
    };
    let raf;
    const loop = () => {
      rx += (x - rx) * .15;
      ry += (y - ry) * .15;
      if (ring.current) { ring.current.style.left = rx + "px"; ring.current.style.top = ry + "px"; }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener("mousemove", onMove);
    loop();
    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, [active]);
  if (!active) return null;
  return (
    <>
      <div className="spark on" ref={dot} />
      <div className="spark-ring on" ref={ring} />
    </>
  );
}

function normalizeAccentHex(hex) {
  const s = String(hex || "").trim();
  if (/^#[0-9a-fA-F]{6}$/.test(s)) return s.toLowerCase();
  return "#631caa";
}

/** rgba glow для --accent-glow; склейка hex+«59» давала неверный цвет в некоторых браузерах */
function accentGlowRgba(hex6) {
  const h = normalizeAccentHex(hex6).slice(1);
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, 0.35)`;
}

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  useReveal();

  // Акцент — до отрисовки в браузере (useLayoutEffect), плюс корректный rgba для свечения
  React.useLayoutEffect(() => {
    const root = document.documentElement;
    const a = normalizeAccentHex(t.accent);
    root.style.setProperty("--accent", a);
    root.style.setProperty("--accent-glow", accentGlowRgba(a));
  }, [t.accent]);

  React.useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--grain-opacity", String(t.grain));
    root.style.setProperty("--font-display", `"${t.fontDisplay}", "Inter Tight", sans-serif`);
  }, [t.grain, t.fontDisplay]);

  return (
    <>
      <div className="dotgrid" />
      <div className="grain" />
      <SparkCursor active={t.spark} />
      <Header />
      <main>
        <Hero />
        <About />
        <Services />
        <Portfolio />
        <Contacts />
      </main>
      <Footer />

      <TweaksPanel>
        <TweakSection label="Палитра" />
        <TweakColor
          label="Акцент"
          value={t.accent}
          options={["#631caa", "#c576ff", "#9d4edd", "#7b2cbf", "#39d98a", "#3aa8ff"]}
          onChange={(v) => setTweak("accent", v)}
        />
        <TweakSection label="Шрифты" />
        <TweakSelect
          label="Заголовки"
          value={t.fontDisplay}
          options={["Unbounded", "Bebas Neue", "Archivo Black", "Space Grotesk", "Inter Tight"]}
          onChange={(v) => setTweak("fontDisplay", v)}
        />
        <TweakSection label="Эффекты" />
        <TweakSlider
          label="Зерно"
          value={t.grain} min={0} max={1} step={0.05}
          onChange={(v) => setTweak("grain", v)}
        />
        <TweakToggle
          label="Курсор-искра"
          value={t.spark}
          onChange={(v) => setTweak("spark", v)}
        />
      </TweaksPanel>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
