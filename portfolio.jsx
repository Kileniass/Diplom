// portfolio.jsx — filterable case grid

const PF_CATS = [
  { id: "all",      label: "Все работы" },
  { id: "letters",  label: "Объёмные буквы" },
  { id: "box",      label: "Световые короба" },
  { id: "light",    label: "Лайтбоксы" },
  { id: "banner",   label: "Баннеры" },
  { id: "pylon",    label: "Стелы" },
  { id: "transport",label: "Транспорт" },
  { id: "roof",     label: "Крышные" },
];

// span: [colSpan, rowSpan] — hue: оттенок подсветки карточки (oklch), как в оригинале
const PF_FALLBACK = [
  { id: "01", name: "VOLT&AMP",      cat: "letters", spot: "Новосибирск, Красный пр.", tag: "2024", span: [6,3], hue: 38 },
  { id: "02", name: "ZARYA Coffee",  cat: "box",     spot: "Академгородок",            tag: "2024", span: [3,3], hue: 60 },
  { id: "03", name: "Hot Iron Gym",  cat: "letters", spot: "ТРЦ «Континент»",          tag: "2023", span: [3,3], hue: 22 },
  { id: "04", name: "АЗС Север",     cat: "pylon",   spot: "Бердское ш.",              tag: "2024", span: [4,4], hue: 32 },
  { id: "05", name: "Aurora Lab",    cat: "light",   spot: "Бизнес-центр",             tag: "2023", span: [4,2], hue: 200 },
  { id: "06", name: "MOTOSHOP",      cat: "transport",spot:"Группа автомобилей",        tag: "2024", span: [4,2], hue: 12 },
  { id: "07", name: "NSK Tower",     cat: "roof",    spot: "крыша, БЦ Кобра",           tag: "2022", span: [8,3], hue: 48 },
  { id: "08", name: "RAMEN",         cat: "letters", spot: "Ул. Ленина 12",             tag: "2024", span: [4,3], hue: 8 },
  { id: "09", name: "Festival",      cat: "banner",  spot: "Фасадный баннер 40м²",      tag: "2023", span: [6,2], hue: 340 },
  { id: "10", name: "СтройДвор",     cat: "pylon",   spot: "Вход в ТЦ",                 tag: "2024", span: [3,2], hue: 50 },
  { id: "11", name: "ELECTRA",       cat: "box",     spot: "Двусторонний короб",        tag: "2024", span: [3,2], hue: 280 },
  { id: "12", name: "MIRAGE Hotel",  cat: "letters", spot: "Фасад · 8м",                tag: "2023", span: [6,3], hue: 30 },
  { id: "13", name: "Sprinter Wrap", cat: "transport",spot:"Mercedes Sprinter",          tag: "2024", span: [6,2], hue: 200 },
  { id: "14", name: "City Lights",   cat: "light",   spot: "Сити-формат",               tag: "2023", span: [4,2], hue: 50 },
  { id: "15", name: "Big Energy",    cat: "banner",  spot: "Брандмауэр 120м²",          tag: "2024", span: [4,2], hue: 24 },
  { id: "16", name: "Polar Wings",   cat: "roof",    spot: "крыша, 12 этаж",            tag: "2024", span: [4,2], hue: 190 },
];

function pfBgStyle(p, cardHue) {
  const glow = `radial-gradient(circle at 30% 40%, oklch(0.55 0.18 ${cardHue} / .35), transparent 60%)`;
  const stripes =
    "repeating-linear-gradient(135deg, rgba(255,255,255,.05) 0 14px, rgba(255,255,255,.02) 14px 28px)";
  if (p.photo) {
    const fade =
      "linear-gradient(180deg, rgba(10,10,11,.4) 0%, rgba(10,10,11,.84) 100%)";
    return {
      backgroundImage: `${fade}, ${glow}, ${stripes}`,
    };
  }
  return {
    backgroundImage: `${glow}, ${stripes}`,
  };
}

function Portfolio() {
  const [filter, setFilter] = React.useState("all");
  const [items, setItems] = React.useState(PF_FALLBACK);

  React.useEffect(() => {
    let isMounted = true;
    window.apiRequest("/api/portfolio/")
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length) {
          setItems(data);
        }
      })
      .catch(() => {
        // Keep fallback data for offline/demo mode.
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const counts = React.useMemo(() => {
    const m = { all: items.length };
    items.forEach(p => { m[p.cat] = (m[p.cat] || 0) + 1; });
    return m;
  }, [items]);

  return (
    <section id="portfolio" className="section">
      <div className="shell">
        <div className="pf-head">
          <div>
            <span className="eyebrow reveal">/04 — Портфолио</span>
            <h2 className="h-section reveal" data-delay="1">Сделанное<br/>стоит лучше<br/>сказанного.</h2>
          </div>
          <p className="lede reveal" data-delay="2">
            Кейсы за&nbsp;последние два&nbsp;года. От&nbsp;камерной кофейни
            до&nbsp;крышной установки на&nbsp;12-м этаже — каждая работа
            проходит через цех, монтаж и&nbsp;сдачу с&nbsp;документами.
          </p>
        </div>

        <div className="pf-filters reveal">
          {PF_CATS.map(c => (
            <button
              key={c.id}
              className={"pf-filter" + (filter === c.id ? " active" : "")}
              onClick={() => setFilter(c.id)}
            >
              {c.label}
              <span className="ct">{counts[c.id] || 0}</span>
            </button>
          ))}
        </div>

        <div className="pf-grid">
          {items.map((p, i) => {
            const hidden = filter !== "all" && p.cat !== filter;
            const cardHue = typeof p.hue === "number" && !Number.isNaN(p.hue) ? p.hue : 38;
            return (
              <a
                key={p.id}
                className={"pf-card" + (hidden ? " is-hidden" : "")}
                style={{
                  gridColumn: `span ${p.span[0]}`,
                  gridRow: `span ${p.span[1]}`,
                }}
                data-delay={(i%5)+1}
                href="#"
                onClick={(e)=>e.preventDefault()}
              >
                {p.photo ? (
                  <div
                    className="pf-photo"
                    style={{ backgroundImage: `url(${p.photo})` }}
                    aria-hidden
                  />
                ) : null}
                <div className="pf-bg" style={pfBgStyle(p, cardHue)} />
                <div className="pf-glow" style={{ background: `radial-gradient(closest-side, oklch(0.7 0.2 ${cardHue} / .35), transparent 70%)` }}/>
                <div className="pf-corner">/ {p.id}</div>
                <div className="pf-info">
                  <div>
                    <div className="pf-name">{p.name}</div>
                    <div className="pf-cat">{p.spot}</div>
                  </div>
                  <div className="pf-tag">
                    {p.tag || (p.year != null ? String(p.year) : "")}
                  </div>
                </div>
              </a>
            );
          })}
        </div>

        <div className="pf-more">
          <a href="#contacts" className="btn btn-ghost" onClick={(e)=>{e.preventDefault();document.getElementById("contacts").scrollIntoView({behavior:"smooth"})}}>
            Заказать похожий проект <span className="arr">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}

window.Portfolio = Portfolio;
