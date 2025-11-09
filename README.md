# Job Tracker Dashboard

A clean, practical web application to manage and track job applications.  
Built with a focus on simplicity, usability, and real development practices.

---

## 📊 Project Progress (as of October 2025)

| Phase | Description | Status | Progress |
|-------|--------------|---------|-----------|
| 1 | Project setup & environment | ✅ Completed | 100% |
| 2 | Core UI structure (React + Tailwind) | ✅ Completed | 100% |
| 3 | State management & CRUD (add/edit/delete) | ✅ Completed | 100% |
| 4 | Error handling & validation | ✅ Completed | 100% |
| 5 | Filtering, pagination & search | ✅ Completed | 100% |
| 6 | Backend setup (Express + JSON persistence) | ✅ Completed | 100% |
| 7 | Frontend–backend connection & sync | 🔄 In progress | 85% |
| 8 | Authentication (optional) | ⏸ Planned | 0% |
| 9 | Deployment (Render / Vercel / Railway) | ⏸ Planned | 0% |

**✅ Total Completion:** ~90%

---

## 🧠 Overview

The Job Tracker Dashboard helps you:

- Add, edit, delete, and search job applications  
- Filter by application status (pending, interview, hired, rejected)  
- Store job data persistently (backend JSON API)  
- Prepare for real-world deployment and scalability  

---

## 🛠 Tech Stack

**Frontend:**  
- React (Hooks, Context API)  
- TailwindCSS  
- Axios (for API communication)

**Backend:**  
- Node.js  
- Express  
- fs-extra (JSON file storage)  

**Tools:**  
- GitHub CLI  
- Postman  
- ESLint + Prettier  

---

## 🚀 Next Steps (Planned Updates)

| Step | Focus | Expected Outcome |
|------|--------|------------------|
| **12** | Connect all frontend CRUD to backend API | Persistent job data |
| **13** | Add authentication (JWT or mock login) | Multi-user ready |
| **14** | UI polish & subtle animations | Better UX |
| **15** | Deployment (Render / Vercel) | Public demo |
| **16** | Write documentation | Portfolio-ready finish |

---

## 💬 Current Focus
> Integrating frontend CRUD operations with backend persistence.  
> Current milestone commit: `feat: connect frontend CRUD with backend API`

---

## 🧾 How to Run Locally

```bash
# Clone repository
git clone https://github.com/KamilCaliskan/job-tracker-dashboard.git
cd job-tracker-dashboard

# Install dependencies
cd client && npm install
cd ../server && npm install

# Run backend (Express API)
npm start

# Run frontend (React app)
cd ../client
npm start
