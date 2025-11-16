# Job Tracker Dashboard

A modern, full-stack job application management system for tracking job applications, statuses, and progress.

## Project Status

**Current Progress:** ~65% Complete

## Features

### Implemented & Working
- **Job Management** - Add, edit, delete job applications
- **Search & Filtering** - Filter by status and text search
- **User Experience** - Responsive design with modern UI
- **Authentication** - JWT protected routes
- **Backend API** - RESTful API with persistent storage

### In Progress
- UI/UX polish and design enhancements
- Multi-user support implementation

### Planned Features
- Database migration (MongoDB/PostgreSQL)
- Comprehensive test suite
- Deployment configuration

## Tech Stack

### Frontend
- **React** - UI framework
- **Context API** - State management
- **CSS3** - Styling and responsive design

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JWT** - Authentication
- **JSON File Storage** - Data persistence

## API Documentation

### Authentication Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/auth/login` | User login and JWT token generation |

### Job Management Endpoints
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/jobs` | Retrieve all jobs |
| POST | `/jobs` | Create new job |
| PUT | `/jobs/:id` | Update job by ID |
| DELETE | `/jobs/:id` | Delete job by ID |

## Installation & Setup

### Backend Setup
```bash
cd server
npm install
npm start
```

### Frontend Setup
```bash
cd client
npm install
npm start
```

### Environment Configuration
Create `.env` file in server directory:
```env
JWT_SECRET=your_jwt_secret_key_here
PORT=5001
```

## Project Structure
```
job-tracker-dashboard/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   └── App.js
├── server/
│   ├── routes/
│   ├── middleware/
│   └── data/
```

## Usage Guide
1. Login to your account
2. Add Jobs using the job form
3. Filter & Search through applications
4. Update Status as you progress
5. Track Progress with visual indicators

## Roadmap
- v1.1: Database migration
- v1.2: Multi-user support
- v1.3: Advanced analytics
- v2.0: Mobile application
