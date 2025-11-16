# Job Tracker Dashboard  
A modern, full-stack job management dashboard for tracking applications, statuses, and progress.  
Built with **React + Context API** on the frontend and **Node.js + Express + JWT Authentication** on the backend.

---

## 📌 Status & Completion

**Project Progress:** ~65% Complete  

---

## 🚀 Features

### ✅ Completed
- Add / Edit / Delete jobs  
- Filter jobs by status or text search  
- Pagination (backend + frontend ready)  
- Global state management (Context + Reducer)  
- UI alerts (success / error)  
- Persistent storage (JSON)  
- Backend REST API  
- **JWT Authentication**  
- Protected routes for job mutations  

### 🔜 Upcoming
- UI polish (UX improvements)  
- Multi-user job lists  
- Deployment (Render + Netlify)  
- DB migration (MongoDB or PostgreSQL)  
- Testing (Jest + React Testing Library)  

---

## 📚 API Documentation

### 🔐 Auth Route
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | Authenticate user & return JWT |

### 📌 Job Routes
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/jobs` | Get all jobs |
| POST | `/jobs` | Add new job *(protected)* |
| PUT | `/jobs/:id` | Update job *(protected)* |
| DELETE | `/jobs/:id` | Delete job *(protected)* |

---

## 🛠 Installation & Setup

### 1️⃣ Backend
```bash
cd server
npm install
npm start



cd client
npm install
npm start
