// about.jsx — company intro

function About() {
  const shopPhoto = `${window.STATIC_URL || "/static/"}CEH.png`;
  return (
    <section id="about" className="section">
      <div className="shell">
        <div className="about-grid">
          <div className="reveal">
            <div className="about-visual">
              <div className="photo-pl" style={{ backgroundImage: `url("${shopPhoto}")` }} />
              <div className="badge">
                <div className="core">15<br/><span style={{fontSize:11,letterSpacing:'.18em'}}>ЛЕТ В&nbsp;ДЕЛЕ</span></div>
              </div>
              <div className="label">
                <span>// производство · цех №2</span>
                <span>NSK-RU</span>
              </div>
            </div>
          </div>

          <div className="about-text">
            <span className="eyebrow reveal">/02 — Пара слов о нас</span>
            <h2 className="h-section reveal" data-delay="1">Делаем&nbsp;так, чтобы<br/>каждая буква&nbsp;<span style={{color:'var(--accent)'}}>работала</span>.</h2>
            <p className="lede reveal" data-delay="2">
              Мы — команда профессионалов с более чем 15-летним опытом
              в&nbsp;производстве наружной рекламы. Наша философия проста:
              вывеска должна не просто быть, а&nbsp;работать — привлекать,
              запоминаться и&nbsp;приводить клиентов.
            </p>
            <p className="body reveal" data-delay="3">
              Находимся в&nbsp;Новосибирске, отправляем заказы транспортной
              компанией по&nbsp;всей России. От&nbsp;первой консультации
              до&nbsp;финального монтажа — гарантируем качество материалов,
              соблюдение сроков и&nbsp;индивидуальный подход.
            </p>
            <p className="body reveal" data-delay="4">
              Мы не&nbsp;«делаем вывески». Мы становимся вашим партнёром
              в&nbsp;развитии бизнеса.
            </p>

            <div className="about-facts reveal" data-delay="5">
              <div className="f"><div className="n">15<span className="u">лет</span></div><div className="l">непрерывной практики</div></div>
              <div className="f"><div className="n">800<span className="u">+</span></div><div className="l">реализованных объектов</div></div>
              <div className="f"><div className="n">35<span className="u">чел.</span></div><div className="l">в производственном цехе</div></div>
              <div className="f"><div className="n">5<span className="u">лет</span></div><div className="l">гарантии на конструкции</div></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.About = About;
