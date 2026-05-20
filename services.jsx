// services.jsx — 12 service tiles + modal

const SERVICES_FALLBACK = [
  {
    t: "Объёмные буквы",
    d: "Световые и несветовые объёмные буквы из композита, акрила, металла.",
    long: "Самый узнаваемый формат фасадной рекламы. Изготавливаем буквы любых размеров — от настольных до 3-метровых, с разными способами подсветки: фронтальной, контражурной, открытыми диодами и сочетаниями.",
    features: ["Композит, акрил, нержавейка", "Светодиодные модули Samsung / Refond", "Контражур и фронтальная подсветка", "Срок изготовления от 7 дней"],
    meta: [["От", "9 500 ₽/п.м"], ["Срок", "7—14 дн."], ["Гарантия", "5 лет"]],
  },
  {
    t: "Световые вывески",
    d: "Лицевая и контражурная подсветка. Современные LED-модули.",
    long: "Подсвеченные вывески, заметные днём и ночью. Используем энергоэффективные LED-модули с расчётным сроком службы 50 000 часов и блоки питания премиум-класса.",
    features: ["Энергопотребление от 40 Вт/м²", "Защита IP65 — для улицы", "Равномерная засветка без точек", "Дистанционное управление"],
    meta: [["От", "12 000 ₽/м²"], ["Срок", "10—18 дн."], ["Гарантия", "5 лет"]],
  },
  {
    t: "Лайтбоксы",
    d: "Короба любой формы — от классики до фигурных, с 3D-эффектом.",
    long: "Световые короба разных конструкций: одно- и двухсторонние, плоские и объёмные, с фрезеровкой, аппликацией или печатью. Подходят для входных групп, торцов и навесов.",
    features: ["ПВХ, композит, алюминиевый профиль", "Транслюцентная плёнка Oracal", "Печать UV / экосольвент", "Светотехнический расчёт"],
    meta: [["От", "8 500 ₽/м²"], ["Срок", "5—12 дн."], ["Гарантия", "3 года"]],
  },
  {
    t: "Несветовые вывески",
    d: "Композитные панели, плоские буквы, фрезеровка, оракал.",
    long: "Бюджетный, но эффектный вариант для интерьеров и фасадов с подсветкой архитектурными светильниками. Фрезерованные буквы из ПВХ и композита, аппликация плёнкой.",
    features: ["ПВХ от 3 до 10 мм", "Композит 3 мм", "Плёнка Oracal 641 / 8500", "ЧПУ-фрезеровка"],
    meta: [["От", "3 500 ₽/п.м"], ["Срок", "3—7 дн."], ["Гарантия", "3 года"]],
  },
  {
    t: "Баннеры",
    d: "Печать на баннерной ткани, монтаж на фасадах и каркасах.",
    long: "Широкоформатная печать на баннерной ПВХ-ткани плотностью 440—900 г/м². Изготавливаем брандмауэры, фасадные сетки, перетяжки и каркасы под ключ.",
    features: ["Латексная и UV-печать", "Разрешение до 1440 dpi", "Люверсы, карманы, проварка", "Монтаж на любой высоте"],
    meta: [["От", "450 ₽/м²"], ["Срок", "1—3 дн."], ["Гарантия", "1 год"]],
  },
  {
    t: "Стелы и пилоны",
    d: "Отдельностоящие конструкции, ценовые табло для АЗС, торговых центров.",
    long: "Несущие стелы высотой до 12 м, ценовые модули для АЗС с электронной индикацией, входные группы и пилоны для ТРЦ. Проектируем с учётом ветровой и снеговой нагрузки.",
    features: ["Стальной каркас", "Согласование с КГА", "Электронные ценовые модули", "Фундамент и обвязка"],
    meta: [["От", "180 000 ₽"], ["Срок", "21—45 дн."], ["Гарантия", "5 лет"]],
  },
  {
    t: "Брендирование транспорта",
    d: "Полная или частичная оклейка, плёнки 3M, Oracal. С разработкой макета.",
    long: "Оклейка коммерческого транспорта, такси, корпоративных авто и автобусов. Работаем с премиальными плёнками 3M IJ180 и Oracal 3651/3951 — гарантия цвета до 7 лет.",
    features: ["3M, Oracal, Hexis", "Дизайн макета в стоимости", "Тёплый бокс для оклейки", "Ламинация для защиты"],
    meta: [["От", "25 000 ₽"], ["Срок", "2—5 дн."], ["Гарантия", "5 лет"]],
  },
  {
    t: "Указатели · таблички",
    d: "Навигация, режимные таблички, ИП-вывески — всё «под ключ».",
    long: "Системы внутренней и наружной навигации, режимные таблички для входных групп, информация для ИП и юрлиц. Соответствие 209-ФЗ, ГОСТ и местным нормативам.",
    features: ["Акрил, металл, ПВХ", "УФ- и шелкография", "Тактильные пиктограммы", "Брайль для соц. объектов"],
    meta: [["От", "1 800 ₽"], ["Срок", "2—5 дн."], ["Гарантия", "3 года"]],
  },
  {
    t: "Крышные установки",
    d: "Высотные конструкции с согласованием и сложным монтажом.",
    long: "Самый сложный формат — крышные установки до 30 м высотой. Полный цикл: инженерный расчёт, согласование с ДАИГ, изготовление, монтаж с автокраном и промышленными альпинистами.",
    features: ["Расчёт ветровой нагрузки", "Согласование документов", "Промышленные альпинисты", "Регламентное обслуживание"],
    meta: [["От", "350 000 ₽"], ["Срок", "30—60 дн."], ["Гарантия", "5 лет"]],
  },
  {
    t: "Интерьерная реклама",
    d: "Логотипы в офис, ресепшен-стойки, навигация, P.O.S.-материалы.",
    long: "Превращаем офис, шоурум или ресторан в продолжение бренда. Объёмные логотипы на стенах, ресепшен-стойки, интерьерные лайтбоксы, навигация по этажам.",
    features: ["Акрил, латунь, дерево", "Скрытый монтаж", "Декоративная подсветка", "3D-визуализация"],
    meta: [["От", "12 000 ₽"], ["Срок", "5—14 дн."], ["Гарантия", "3 года"]],
  },
  {
    t: "Монтаж и обслуживание",
    d: "Промышленный альпинизм, вышки, регламентное обслуживание.",
    long: "Самостоятельная услуга — если вывеска уже есть, а её нужно установить, демонтировать или починить. Бригада с допусками, автовышки до 28 м, промальп.",
    features: ["Автовышки 12 / 18 / 28 м", "Промышленные альпинисты", "Демонтаж и утилизация", "Срочный выезд от 2 ч"],
    meta: [["От", "6 000 ₽/ч"], ["Срок", "В день обращения"], ["Допуски", "Все"]],
  },
  {
    t: "Дизайн-проект",
    d: "3D-визуализация, согласование с КГА, рабочая документация.",
    long: "Отдельная услуга для архитекторов, заказчиков и арендодателей. Делаем дизайн-проект в формате, который принимают в КГА Новосибирска и других городов.",
    features: ["3D-визуализация фасада", "Чертежи и узлы", "Пояснительная записка", "Сопровождение согласования"],
    meta: [["От", "15 000 ₽"], ["Срок", "5—10 дн."], ["Версий", "До 3"]],
  },
];

const ICONS = {
  letters: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 20V4h7l2 6 2-6h7v16"/><path d="M3 14h7M14 14h7"/></svg>,
  bulb:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10c1 1 1.5 2 1.5 3h5c0-1 .5-2 1.5-3a6 6 0 0 0-4-10z"/></svg>,
  box:     <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="6" width="18" height="12" rx="0"/><path d="M3 12h18"/></svg>,
  plate:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="5" width="18" height="14"/><path d="M7 10h10M7 14h6"/></svg>,
  banner:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 5v14M20 5v14M4 5h16M4 19h16M8 9l8 6M8 15l8-6"/></svg>,
  pylon:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3h4v18h-4z"/><path d="M6 8h12M6 14h12"/></svg>,
  truck:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="7" width="11" height="9"/><path d="M13 10h5l3 3v3h-8z"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>,
  arrow:   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12h12M14 8l6 4-6 4M4 4v16"/></svg>,
  roof:    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M2 12 L12 4 L22 12"/><path d="M5 11v9h14v-9"/><path d="M9 20v-6h6v6"/></svg>,
  interior:<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18"/><path d="M3 9h18M9 21V9"/></svg>,
  install: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M14 4l6 6-9 9H5v-6z"/><path d="M12 6l6 6"/></svg>,
  design:  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M5 19l2-2M17 7l2-2"/></svg>,
};

const ICON_KEYS = ["letters","bulb","box","plate","banner","pylon","truck","arrow","roof","interior","install","design"];

function ServiceModal({ index, onClose, services }) {
  const s = services[index];
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const goToContacts = () => {
    onClose();
    setTimeout(() => {
      const el = document.getElementById("contacts");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <div className="num">/ {String(index + 1).padStart(2, "0")} — Услуга</div>
            <h3>{s.t}</h3>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Закрыть">×</button>
        </div>

        <div className="modal-body">
          <p>{s.long}</p>

          <div className="modal-section">
            <h4>Что входит</h4>
            <div className="modal-features">
              {s.features.map((f, i) => (
                <div className="ft" key={i}>
                  <span className="dot" />
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="modal-section">
            <h4>Параметры</h4>
            <div className="modal-meta">
              {s.meta.map(([l, v], i) => (
                <div className="m" key={i}>
                  <div className="l">{l}</div>
                  <div className="v">{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <span className="note">⌁ Расчёт сметы — бесплатно</span>
          <button className="btn btn-primary" onClick={goToContacts}>
            Заказать <span className="arr">→</span>
          </button>
        </div>
      </div>
    </div>
  );
}

function Services() {
  const [openIdx, setOpenIdx] = React.useState(null);
  const [services, setServices] = React.useState(SERVICES_FALLBACK);

  React.useEffect(() => {
    let isMounted = true;
    window.apiRequest("/api/services/")
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length) {
          setServices(data);
        }
      })
      .catch(() => {
        // Keep fallback data for offline/demo mode.
      });
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section id="services" className="section">
      <div className="shell">
        <div className="svc-head">
          <div>
            <span className="eyebrow reveal">/03 — Услуги</span>
            <h2 className="h-section reveal" data-delay="1">Двенадцать&nbsp;направлений<br/>под одной крышей.</h2>
          </div>
          <p className="lede reveal" data-delay="2">
            От&nbsp;скетча на&nbsp;салфетке до&nbsp;промышленного альпинизма
            на&nbsp;30-метровой высоте. Считаем смету за&nbsp;1&nbsp;день,
            готовим проект за&nbsp;3.
          </p>
        </div>

        <div className="svc-grid">
          {services.map((s, i) => (
            <div className="svc" data-delay={(i%4)+1} key={i} onClick={() => setOpenIdx(i)}>
              <div>
                <div className="svc-icon">{ICONS[ICON_KEYS[i]]}</div>
                <div className="svc-num">/ {String(i+1).padStart(2,"0")}</div>
                <div className="svc-title">{s.t}</div>
                <div className="svc-desc">{s.d}</div>
              </div>
              <div className="svc-cta">
                <span>Подробнее</span>
                <span className="arr">→</span>
              </div>
              <div className="svc-corner" />
            </div>
          ))}
        </div>
      </div>

      {openIdx !== null && (
        <ServiceModal
          index={openIdx}
          onClose={() => setOpenIdx(null)}
          services={services}
        />
      )}
    </section>
  );
}

window.Services = Services;
