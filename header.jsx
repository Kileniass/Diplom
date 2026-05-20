// header.jsx — fixed top bar, scrolled state, phone CTA

function Logo() {
  return (
    <img
      src="/static/logo-probro.png"
      alt="PROBRO"
      decoding="async"
      draggable={false}
    />
  );
}

function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onNav = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <header className={"hdr" + (scrolled ? " scrolled" : "")}>
      <div className="hdr-inner">
        <a href="#top" className="brand" onClick={(e) => onNav(e, "top")}>
          <span className="brand-mark"><Logo/></span>
        </a>
        <nav className="nav">
          <a href="#about"     onClick={(e)=>onNav(e,"about")}>О нас</a>
          <a href="#services"  onClick={(e)=>onNav(e,"services")}>Услуги</a>
          <a href="#portfolio" onClick={(e)=>onNav(e,"portfolio")}>Портфолио</a>
          <a href="#contacts"  onClick={(e)=>onNav(e,"contacts")}>Контакты</a>
        </nav>
        <a href="tel:+73833597999" className="tel" aria-label="Позвонить +7 383 359 79 99">
          <span className="pulse" />
          <span className="tel-num">+7 (383) 359-79-99</span>
          <svg className="tel-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" width="16" height="16"><path d="M5 4h4l2 5-3 2a12 12 0 0 0 5 5l2-3 5 2v4a2 2 0 0 1-2 2 16 16 0 0 1-15-15 2 2 0 0 1 2-2z"/></svg>
        </a>
      </div>
    </header>
  );
}

window.Header = Header;
window.Logo = Logo;
