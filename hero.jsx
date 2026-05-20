// hero.jsx — animated slogan + sign visual + marquee strip

function Hero() {
  return (
    <section id="top" className="hero">
      <div className="shell hero-inner">
        <div className="hero-grid">
          <div>
            <span className="eyebrow">/01 — Студия наружной рекламы · с 2010</span>
            <h1>
              <span className="word"><span>Воплощаем</span></span>{" "}
              <span className="word"><span>ваши</span></span>{" "}
              <span className="word"><span>идеи</span></span>{" "}<br/>
              <span className="word"><span>в&nbsp;</span></span>
              <span className="word"><span className="accent">яркую&nbsp;реальность</span></span>
            </h1>
            <p className="sub">
              Проектируем, производим и устанавливаем наружную рекламу,
              которая увеличивает поток клиентов. Стальная аккуратность исполнения,
              сроки и&nbsp;индивидуальный подход — с&nbsp;первого эскиза до&nbsp;монтажа.
            </p>
            <div className="hero-ctas">
              <a href="#contacts" className="btn btn-primary" onClick={(e)=>{e.preventDefault();document.getElementById("contacts").scrollIntoView({behavior:"smooth"})}}>
                Оставить заявку <span className="arr">→</span>
              </a>
              <a href="#portfolio" className="btn btn-ghost" onClick={(e)=>{e.preventDefault();document.getElementById("portfolio").scrollIntoView({behavior:"smooth"})}}>
                Смотреть работы
              </a>
            </div>

            <div className="hero-meta">
              <div className="cell">
                <div className="n">15+</div>
                <div className="l">лет на рынке</div>
              </div>
              <div className="cell">
                <div className="n">800+</div>
                <div className="l">сданных объектов</div>
              </div>
              <div className="cell">
                <div className="n">14&nbsp;дн.</div>
                <div className="l">средний срок</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-strip">
        <div className="marquee">
          {Array.from({length:2}).map((_,k)=>(
            <span key={k}>
              <b>Объёмные буквы</b> <i>✶</i>
              <b>Световые короба</b> <i>✶</i>
              <b>Лайтбоксы</b> <i>✶</i>
              <b>Стелы&nbsp;и&nbsp;пилоны</b> <i>✶</i>
              <b>Брендирование&nbsp;транспорта</b> <i>✶</i>
              <b>Крышные установки</b> <i>✶</i>
              <b>Монтаж&nbsp;«под&nbsp;ключ»</b> <i>✶</i>
              <b>Дизайн-проект</b> <i>✶</i>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

window.Hero = Hero;
