// footer.jsx

function Footer() {
  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer-grid">
          <div className="footer-col footer-brand">
            <div className="footer-brand-head">
              <span className="brand-mark"><Logo/></span>
              <div className="footer-brand-text">
                <span className="brand-name">PROBRO<b style={{color:'var(--accent)'}}>.</b></span>
                <div className="brand-sub">Наружная реклама · Новосибирск</div>
              </div>
            </div>
            <p className="desc">Проектируем, производим и&nbsp;устанавливаем наружную рекламу с&nbsp;2010&nbsp;года.</p>
          </div>

          <div className="footer-col">
            <h5>Навигация</h5>
            <a href="#about">О нас</a>
            <a href="#services">Услуги</a>
            <a href="#portfolio">Портфолио</a>
            <a href="#contacts">Контакты</a>
          </div>

          <div className="footer-col">
            <h5>Контакты</h5>
            <a href="tel:+73833597999">+7 (383) 359-79-99</a>
            <a href="mailto:Probro_00@mail.ru">Probro_00@mail.ru</a>
          </div>

          <div className="footer-col">
            <h5>Соцсети</h5>
            <a href="#">max</a>
            <a href="#">WhatsApp</a>
            <a href="#">VK</a>
            <a href="#">Дзен</a>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© 2010—2026 · PROBRO</span>
          <span>Сделано с искрой ✶</span>
          <span>Политика конфиденциальности</span>
        </div>
      </div>
    </footer>
  );
}

window.Footer = Footer;
