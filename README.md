# TaskFlow — Task Manager Web App 🚀

A full-stack task management application built with the **MERN Stack** (MongoDB, Express.js, React.js, Node.js). Users can create accounts, manage daily tasks, and stay organized with a modern, premium interface.

---

## ✨ Features

### Core Features
- **User Authentication** — Secure registration and login with JWT tokens
- **Task CRUD** — Create, read, update, and delete tasks
- **Task Status** — Mark tasks as Pending, In Progress, or Completed
- **Database Integration** — All data stored securely in MongoDB
- **User-specific Data** — Each user sees only their own tasks

### Advanced Features
- 🔍 **Search & Filter** — Search tasks by title/description, filter by status/priority/category
- 📊 **Statistics Dashboard** — Visual overview with total, completed, pending, and overdue counts
- 🎨 **Dark/Light Mode** — Toggle between themes with persistent preference
- 🔄 **Drag & Drop** — Reorder tasks by dragging
- 📅 **Due Dates** — Set deadlines with smart date display (Today, Tomorrow, Overdue)
- 🏷️ **Categories & Priority** — Organize tasks with custom categories and priority levels
- 📱 **Responsive Design** — Works seamlessly on desktop, tablet, and mobile
- ✨ **Premium UI** — Glassmorphism, smooth animations, and modern design

---

## 🛠️ Tech Stack

| Layer      | Technology           |
|------------|---------------------|
| Frontend   | React.js (Vite)     |
| Backend    | Node.js + Express.js|
| Database   | MongoDB + Mongoose  |
| Auth       | JWT + bcryptjs      |
| Styling    | Vanilla CSS         |
| Drag & Drop| @hello-pangea/dnd   |

---

## 📁 Project Structure

```
1-task-manager-web-app/
├── backend/
│   ├── config/db.js              # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js     # Auth logic (register/login)
│   │   └── taskController.js     # Task CRUD logic
│   ├── middleware/
│   │   └── authMiddleware.js     # JWT verification
│   ├── models/
│   │   ├── User.js               # User schema
│   │   └── Task.js               # Task schema
│   ├── routes/
│   │   ├── authRoutes.js         # Auth endpoints
│   │   └── taskRoutes.js         # Task endpoints
│   ├── server.js                 # Express entry point
│   └── .env                      # Environment variables
│
├── frontend/
│   ├── src/
│   │   ├── components/           # Reusable UI components
│   │   ├── context/              # React Context (Auth, Task, Theme)
│   │   ├── pages/                # Page components
│   │   ├── utils/api.js          # Axios configuration
│   │   ├── index.css             # Design system
│   │   └── App.jsx               # Root component
│   └── index.html
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js** (v16 or above)
- **MongoDB** (Local installation or MongoDB Atlas account)
- **npm** (comes with Node.js)

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd 1-task-manager-web-app
```

### 2. Setup Backend
```bash
cd backend
npm install
```

Edit the `.env` file with your MongoDB connection string:
```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/taskmanager
JWT_SECRET=your_secure_secret_key
```

> **Using MongoDB Atlas?** Replace `MONGO_URI` with your Atlas connection string:
> `mongodb+srv://<username>:<password>@cluster.mongodb.net/taskmanager`

Start the backend:
```bash
npm run dev
```

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

The app will open at `http://localhost:5173`

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint            | Description         | Access  |
|--------|-------------------- |---------------------|---------|
| POST   | `/api/auth/register`| Register new user   | Public  |
| POST   | `/api/auth/login`   | Login user          | Public  |
| GET    | `/api/auth/me`      | Get user profile    | Private |

### Tasks
| Method | Endpoint             | Description         | Access  |
|--------|----------------------|---------------------|---------|
| GET    | `/api/tasks`         | Get all user tasks  | Private |
| POST   | `/api/tasks`         | Create a task       | Private |
| PUT    | `/api/tasks/:id`     | Update a task       | Private |
| DELETE | `/api/tasks/:id`     | Delete a task       | Private |
| PUT    | `/api/tasks/reorder` | Reorder tasks       | Private |

### Query Parameters for GET /api/tasks
- `status` — Filter by status (pending, in-progress, completed)
- `priority` — Filter by priority (low, medium, high)
- `category` — Filter by category name
- `search` — Search in title and description
- `sortBy` — Sort by (createdAt, dueDate, priority, title)

---

## 🎨 Design Highlights

- **Color Palette**: Deep indigo/violet primary with harmonious accent colors
- **Typography**: Inter font for clean, modern readability
- **Glassmorphism**: Frosted glass effects on cards and overlays
- **Animations**: Smooth transitions, hover effects, and micro-interactions
- **Responsive**: Mobile-first design with collapsible sidebar

---

## 📦 Deployment

### Backend (Render)
1. Push code to GitHub
2. Create a new Web Service on [Render](https://render.com)
3. Set environment variables (MONGO_URI, JWT_SECRET)
4. Deploy

### Frontend (Vercel/Netlify)
1. Update `api.js` baseURL to your deployed backend URL
2. Deploy frontend folder to [Vercel](https://vercel.com) or [Netlify](https://netlify.com)

---

## 👨‍💻 Author

**Navyan** — Full Stack Development Internship

---

## 📝 License

This project is created as part of a learning internship program.
