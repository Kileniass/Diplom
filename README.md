# Frontend + Django REST API

## 1) Запуск backend (Django + DRF)

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

Backend стартует на `http://127.0.0.1:8000`.

## 2) Запуск frontend вместе с backend

Frontend отдается Django автоматически. После `python manage.py runserver`
откройте `http://127.0.0.1:8000`.

## 3) Доступные API

- `GET /api/services/`
- `GET /api/portfolio/`
- `POST /api/contact-requests/`

При первой миграции backend автоматически заполняет БД:
- 12 услуг
- 16 кейсов портфолио

Пример payload для отправки заявки:

```json
{
  "name": "Иван",
  "phone": "+7 999 123-45-67",
  "service": "Объёмные буквы",
  "note": "Нужна вывеска на фасад",
  "agree": true
}
```

## 4) Mini-CRM в Django Admin

Создать администратора:

```bash
cd backend
.venv\Scripts\python manage.py createsuperuser
```

Откройте `http://127.0.0.1:8000/admin`.

В разделе `Contact requests` доступно:
- цветные статусы заявок (`Новая`, `В работе`, `Закрыта`)
- фильтры по статусу/услуге/дате
- поиск по имени, телефону, услуге, комментариям
- быстрые массовые действия для смены статуса

## 5) Деплой: домен REG.RU + VPS Beget

Ниже рабочая схема для Ubuntu 22.04+ на VPS.

### DNS на REG.RU

1. В панели домена создайте `A`-запись:
   - `@` -> `IP_ВАШЕГО_VPS`
2. Для `www`:
   - либо `CNAME` `www -> @`
   - либо отдельная `A`-запись на тот же IP

### Установка на VPS

```bash
sudo apt update
sudo apt install -y python3 python3-venv python3-pip nginx certbot python3-certbot-nginx
```

### Разворачивание проекта

```bash
sudo mkdir -p /var/www/diplomchik
sudo chown -R $USER:$USER /var/www/diplomchik
cd /var/www/diplomchik
# загрузите сюда файлы проекта (git clone/scp/rsync)
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
python manage.py migrate
python manage.py collectstatic --noinput
```

### Gunicorn (systemd)

1. Скопируйте `deploy/gunicorn.service` в `/etc/systemd/system/diplomchik.service`
2. Проверьте пути в файле (`WorkingDirectory`, `EnvironmentFile`, `ExecStart`)
3. Запустите сервис:

```bash
sudo systemctl daemon-reload
sudo systemctl enable diplomchik
sudo systemctl restart diplomchik
sudo systemctl status diplomchik
```

### Nginx

1. Скопируйте `deploy/nginx.conf` в `/etc/nginx/sites-available/diplomchik`
2. Подставьте ваш домен вместо `example.ru`
3. Включите сайт:

```bash
sudo ln -s /etc/nginx/sites-available/diplomchik /etc/nginx/sites-enabled/diplomchik
sudo nginx -t
sudo systemctl restart nginx
```

### HTTPS (Let's Encrypt)

```bash
sudo certbot --nginx -d example.ru -d www.example.ru
```

### Важно для загрузки файлов в заявке

- Форма принимает только `PNG` и `PDF`
- Лимит на суммарный размер файлов: `30 МБ`
- В `nginx.conf` уже выставлен `client_max_body_size 35M`, чтобы запросы с файлами не резались веб-сервером
