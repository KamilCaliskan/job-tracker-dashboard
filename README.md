🚀 Job Tracker Dashboard

A modern, full-stack web application for tracking job applications, interviews, and outcomes. Built with React, Node.js, and Express.
📊 Project Status

Current Progress: 92% Complete
Core Features: ✅ Fully Functional
✨ Features

    🔐 Secure Authentication: JWT-based login/logout system.

    📋 Full Job CRUD: Create, read, update, and delete job applications.

    🔍 Smart Filtering: Search by job title/company and filter by application status.

    📱 Modern & Responsive UI: Clean interface built with Tailwind CSS.

    🔄 Real-Time Updates: Instant feedback and state management.

    🛡️ Protected API: All job routes require a valid authentication token.

🛠️ Tech Stack
Frontend	Backend
React	Node.js
Tailwind CSS	Express.js
Axios (HTTP Client)	JWT (Authentication)
React Context (State)	CORS
	JSON File Storage
📁 Project Structure
text

job-tracker-dashboard/
├── client/                 # React frontend application
│   ├── src/
│   │   ├── components/     # JobForm, JobList, JobFilter, etc.
│   │   ├── api/           # Axios API configuration
│   │   └── App.jsx        # Root component
│   └── package.json
├── server/                 # Node.js/Express backend API
│   ├── routes/            # API endpoints (auth, jobs)
│   ├── data/              # JSON database (jobs.json, users.json)
│   └── server.js          # Server entry point
└── README.md

🚀 Quick Start Guide
1. Clone and Setup
bash

# Clone the repository
git clone <your-repo-url>
cd job-tracker-dashboard

2. Start the Backend Server
bash

cd server
npm install
npm start
# Server runs on http://localhost:5000

3. Start the Frontend Application
bash

cd client
npm install
npm start
# App runs on http://localhost:3000

4. Login & Use

    Open your browser to http://localhost:3000

    Log in with the default credentials:

        Email: admin@example.com

        Password: admin123

    Start adding and managing your job applications!

📚 API Reference
Authentication

POST /api/auth/login

    Description: Authenticates a user and returns a JWT token.

    Request Body: { "email": "string", "password": "string" }

    Success Response: { "token": "string", "user": { ... } }

Jobs

All job endpoints require an Authorization: Bearer <token> header.
Method	Endpoint	Description
GET	/api/jobs	Get all jobs for the user
POST	/api/jobs	Create a new job
PUT	/api/jobs/:id	Update a specific job
DELETE	/api/jobs/:id	Delete a specific job
🔧 Configuration
Environment Variables (Optional)

Create a .env file in the server/ directory for production:
env

JWT_SECRET=your_super_secret_key_here
PORT=5000

Default User

The system comes with a default admin user:

    File: server/data/users.json

    Email: admin@example.com

    Password: admin123

🐛 Troubleshooting
Issue	Solution
"Invalid credentials" on login	Ensure server/data/users.json contains the plain-text password "admin123".
CORS errors	Verify the backend server (localhost:5000) is running and app.use(cors()) is in server.js.
React DevTools not showing	Install the browser extension and refresh the page with DevTools open.
Port already in use	Change the PORT in server/server.js or kill the process using the port.
📈 Next Steps & Roadmap

    Database Migration: Replace JSON files with MongoDB/PostgreSQL.

    Enhanced Testing: Add unit and integration tests with Jest.

    Deployment: Docker configuration and cloud deployment guides.

    Advanced Features: Job application analytics, email reminders, document upload.

👨‍💻 Development
bash

# Run backend in development mode (with auto-restart)
cd server
npm run dev

# Run frontend development server
cd client
npm start

🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
📄 License

This project is licensed under the MIT License.
