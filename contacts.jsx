// contacts.jsx — info + form

function Contacts() {
  const MAX_FILES_TOTAL_SIZE = 30 * 1024 * 1024;
  const ALLOWED_FILE_TYPES = new Set(["image/png", "application/pdf"]);
  const [state, setState] = React.useState({ name: "", phone: "", svc: "Объёмные буквы", note: "", agree: true, files: [] });
  const [sent, setSent] = React.useState(false);
  const [isSending, setIsSending] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleFilesChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) {
      setState({ ...state, files: [] });
      return;
    }

    const hasInvalidType = files.some((file) => {
      const lowerName = file.name.toLowerCase();
      return !ALLOWED_FILE_TYPES.has(file.type) && !lowerName.endsWith(".png") && !lowerName.endsWith(".pdf");
    });

    if (hasInvalidType) {
      setError("Можно прикреплять только PNG и PDF.");
      setState({ ...state, files: [] });
      e.target.value = "";
      return;
    }

    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > MAX_FILES_TOTAL_SIZE) {
      setError("Суммарный размер файлов не должен превышать 30 МБ.");
      setState({ ...state, files: [] });
      e.target.value = "";
      return;
    }

    setError("");
    setState({ ...state, files });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!state.name || !state.phone || !state.agree) return;
    const totalSize = state.files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > MAX_FILES_TOTAL_SIZE) {
      setError("Суммарный размер файлов не должен превышать 30 МБ.");
      return;
    }
    setError("");
    setIsSending(true);
    try {
      const formData = new FormData();
      formData.append("name", state.name);
      formData.append("phone", state.phone);
      formData.append("service", state.svc);
      formData.append("note", state.note);
      formData.append("agree", String(state.agree));
      state.files.forEach((file) => {
        formData.append("files", file);
      });

      await window.apiRequest("/api/contact-requests/", {
        method: "POST",
        body: formData,
      });
      setSent(true);
    } catch (err) {
      setError("Не удалось отправить заявку. Попробуйте еще раз.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <section id="contacts" className="section">
      <div className="shell">
        <div className="svc-head">
          <div>
            <span className="eyebrow reveal">/05 — Контакты</span>
            <h2 className="h-section reveal" data-delay="1">Начнём с&nbsp;разговора.<br/>Бесплатно. Без обязательств.</h2>
          </div>
          <p className="lede reveal" data-delay="2">
            Оставьте заявку — менеджер свяжется в&nbsp;течение 15&nbsp;минут
            в&nbsp;рабочее время. Или просто наберите нас.
          </p>
        </div>

        <div className="contacts-grid">
          <div className="contact-info reveal">
            <div className="contact-list">
              <div className="contact-row">
                <span className="l">Телефон / WhatsApp</span>
                <a href="tel:+73833597999" className="v">+7 (383) 359-79-99</a>
              </div>
              <div className="contact-row">
                <span className="l">E-mail</span>
                <a href="mailto:Probro_00@mail.ru" className="v">Probro_00@mail.ru</a>
              </div>
              <div className="contact-row">
                <span className="l">Часы работы</span>
                <span className="v">Пн—Пт · 09:00&nbsp;—&nbsp;19:00</span>
              </div>
              <div className="contact-row">
                <span className="l">max</span>
                <a href="#" className="v">@max</a>
              </div>
            </div>
          </div>

          <div className="reveal" data-delay="1">
            {sent ? (
              <div className="form-ok">
                <h4>Заявка получена</h4>
                <p>Менеджер свяжется с&nbsp;вами в&nbsp;ближайшее время. Спасибо!</p>
              </div>
            ) : (
              <form className="form" onSubmit={submit}>
                <h3>Заявка на расчёт</h3>
                <p className="desc">Заполните 3 поля — пришлём примерную смету в течение дня.</p>

                <div className="row2">
                  <div className="field">
                    <label>Имя</label>
                    <input value={state.name} onChange={e=>setState({...state, name:e.target.value})} placeholder="Как к вам обращаться" />
                  </div>
                  <div className="field">
                    <label>Телефон</label>
                    <input value={state.phone} onChange={e=>setState({...state, phone:e.target.value})} placeholder="+7 (___) ___-__-__" />
                  </div>
                </div>

                <div className="field">
                  <label>Услуга</label>
                  <select value={state.svc} onChange={e=>setState({...state, svc:e.target.value})}>
                    <option>Объёмные буквы</option>
                    <option>Световые вывески</option>
                    <option>Лайтбоксы</option>
                    <option>Несветовые вывески</option>
                    <option>Баннеры</option>
                    <option>Стелы и пилоны</option>
                    <option>Брендирование транспорта</option>
                    <option>Указатели · таблички</option>
                    <option>Крышные установки</option>
                    <option>Интерьерная реклама</option>
                    <option>Монтаж и обслуживание</option>
                    <option>Дизайн-проект</option>
                  </select>
                </div>

                <div className="field">
                  <label>Коротко о задаче</label>
                  <textarea value={state.note} onChange={e=>setState({...state, note:e.target.value})} placeholder="Что нужно сделать, какие сроки, ссылки на референсы" />
                </div>

                <div className="field">
                  <label>Файлы (макеты, фото, ТЗ)</label>
                  <input
                    type="file"
                    multiple
                    accept=".png,application/pdf"
                    onChange={handleFilesChange}
                  />
                  {state.files.length ? (
                    <p className="file-list">{state.files.map(file => file.name).join(", ")}</p>
                  ) : (
                    <p className="file-list empty">Можно прикрепить PNG/PDF, суммарно до 30 МБ</p>
                  )}
                </div>

                <label className="agree">
                  <input type="checkbox" checked={state.agree} onChange={e=>setState({...state, agree:e.target.checked})}/>
                  Согласен на обработку персональных данных в&nbsp;соответствии с&nbsp;политикой конфиденциальности.
                </label>

                {error ? <p className="desc">{error}</p> : null}

                <div className="submit-row">
                  <button type="submit" className="btn btn-primary" disabled={isSending}>
                    {isSending ? "Отправка..." : "Отправить заявку"} <span className="arr">→</span>
                  </button>
                  <span className="note">⌁ Ответим за 15 минут</span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

window.Contacts = Contacts;
