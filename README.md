<p align="center">
  <img src="transparent_logo.png" alt="Loom Logo" width="120" />
</p>

<h1 align="center">Loom — Job Application Tracker</h1>

<p align="center">
  A full-stack job application tracking platform built with <strong>Spring Boot</strong> and <strong>React</strong>.
  <br />
  Manage your entire job search in one place — from first application to final offer.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Backend-Spring%20Boot%204-6DB33F?style=flat-square&logo=springboot&logoColor=white" />
  <img src="https://img.shields.io/badge/Frontend-React%2018-61DAFB?style=flat-square&logo=react&logoColor=black" />
  <img src="https://img.shields.io/badge/Database-PostgreSQL-4169E1?style=flat-square&logo=postgresql&logoColor=white" />
  <img src="https://img.shields.io/badge/Auth-JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/Deploy-Render%20%2B%20Vercel-black?style=flat-square" />
</p>

---

## 🌐 Live Demo

> Frontend: `https://your-vercel-url.vercel.app`
> Backend API: `https://your-render-url.onrender.com`

---

## ✨ Features

- 🔐 JWT authentication with refresh token rotation
- 📋 Add, edit, delete and filter job applications
- 📊 Dashboard with live status stats and bar chart
- 🔑 Forgot/reset password via email (Resend)
- 📱 Fully responsive — mobile cards + desktop table
- 🛡️ Protected routes with automatic token refresh

---

## 🗂️ Project Structure

```
/
├── jobtracker/                   # Spring Boot backend
│   ├── src/main/java/com/jobtracker/
│   │   ├── auth/                 # JWT, security config, login, register
│   │   ├── users/                # User entity, service, controller
│   │   ├── job/                  # Job entity, service, controller
│   │   ├── refreshtoken/         # Refresh token logic
│   │   └── config/               # Password reset, CORS
│   ├── Dockerfile
│   └── pom.xml
│
├── jobtracker-frontend/          # React frontend
│   ├── src/
│   │   ├── api/                  # Axios API calls
│   │   ├── components/           # UI components
│   │   ├── context/              # AuthContext
│   │   ├── pages/                # Login, Register, Dashboard, Jobs, Profile
│   │   └── utils/                # Axios instance with interceptors
│   ├── Dockerfile
│   └── nginx.conf
│
└── docker-compose.yml            # Local PostgreSQL for development
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Spring Boot 4 | REST API framework |
| Spring Security | Authentication & authorization |
| JWT (jjwt 0.11.5) | Access & refresh tokens |
| PostgreSQL | Database |
| JPA / Hibernate | ORM |
| MapStruct | DTO mapping |
| Resend | Password reset emails |
| Lombok | Boilerplate reduction |

### Frontend
| Technology | Purpose |
|---|---|
| React 18 | UI framework |
| React Router v6 | Client-side routing |
| Axios | HTTP client with interceptors |
| Recharts | Status bar chart |
| Tailwind CSS | Styling |
| Lucide React | Icons |
| React Hot Toast | Notifications |

---

## 🚀 Local Development

### Prerequisites
- Java 21+
- Node.js 18+
- Docker Desktop

### 1. Clone the repo

```bash
git clone https://github.com/aryanshar200507-pixel/Loom-app.git
cd loom-app
```

### 2. Start PostgreSQL via Docker

```bash
docker compose up -d
```

### 3. Configure backend environment

Create `.vscode/launch.json` inside the `jobtracker` folder and fill in your own values:

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "java",
      "name": "JobTracker",
      "request": "launch",
      "mainClass": "com.jobtracker.JobtrackerApplication",
      "projectName": "jobtracker",
      "env": {
        "DB_URL": "your_postgres_url",
        "DB_USERNAME": "your_db_username",
        "DB_PASSWORD": "your_db_password",
        "JWT_SECRET": "your_jwt_secret_min_32_chars",
        "FRONTEND_URL": "http://localhost:5173",
        "RESEND_API_KEY": "your_resend_api_key",
        "MAIL_FROM": "noreply@yourdomain.com"
      }
    }
  ]
}
```

> ⚠️ Never commit `launch.json` — it is already in `.gitignore`

Run the backend from VS Code or:

```bash
cd jobtracker
mvn spring-boot:run
```

Backend starts on `http://localhost:8080`

### 4. Configure and run the frontend

```bash
cd jobtracker-frontend
npm install
```

Create `.env` in `jobtracker-frontend/`:

```env
VITE_API_URL=http://localhost:8080
```

```bash
npm run dev
```

Frontend starts on `http://localhost:5173`

---

## 🔌 API Endpoints

### Auth — `/auth/**` (public)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/auth/register` | Register new user |
| POST | `/auth/login` | Login — returns access + refresh token |
| POST | `/auth/refresh` | Rotate access token |
| POST | `/auth/logout` | Invalidate refresh token |
| POST | `/auth/forgot-password?email=` | Send password reset email |
| POST | `/auth/reset-password?token=&password=` | Reset password |

### Users — `/users/**` (protected)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/users/{id}` | Get user profile |
| PUT | `/users/edit/{id}` | Update name / email / password |
| DELETE | `/users/delete/{id}` | Delete account and all data |

### Jobs — `/job/**` (protected)
| Method | Endpoint | Description |
|---|---|---|
| GET | `/job/jobData` | Paginated jobs with status filter and sort |
| POST | `/job/add` | Create new job application |
| PUT | `/job/edit/{id}` | Update job application |
| DELETE | `/job/delete/{id}` | Delete job application |
| GET | `/job/stats` | Job counts grouped by status |

---

## 🔐 Auth Flow

```
Register / Login
      ↓
Access Token (24h) + Refresh Token (7d)
      ↓
Axios attaches Bearer token on every request
      ↓
Token expires → auto-refresh via /auth/refresh
      ↓
Refresh expired → clear storage → redirect to /login
```

---

## 🌍 Deployment

### Backend → Render (Docker)
1. Push code to GitHub
2. New Web Service on Render → connect repo → select **Docker** runtime
3. Create a PostgreSQL database on Render and copy its connection string
4. Add all environment variables in Render's dashboard

### Frontend → Vercel
1. Import your GitHub repo on Vercel
2. Set root directory to `jobtracker-frontend`
3. Add environment variable:
```
VITE_API_URL=https://your-render-backend.onrender.com
```

---

## 📧 Email Setup (Resend)

1. Sign up at [resend.com](https://resend.com)
2. Add and verify your domain
3. Add the DNS records (DKIM, SPF, DMARC) to your domain provider
4. Set `MAIL_FROM=noreply@yourdomain.com` in environment variables

---

## 📦 Job Status Types

| Status | Meaning |
|---|---|
| `APPLIED` | Application submitted |
| `SHORTLISTED` | Shortlisted by recruiter |
| `INTERVIEW` | Interview scheduled |
| `OFFER` | Offer received 🎉 |
| `REJECTED` | Application rejected |
| `PENDING` | Awaiting response |

---

## 📄 License

MIT — free to use and modify.

---

<p align="center">Built with Spring Boot & React · © 2025 Loom</p>
