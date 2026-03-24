# TodoApp — Full Stack Task Management

A full-stack todo task management application built with .NET 10 Web API and React. Designed as a production-focused MVP with real-world features beyond basic CRUD.

## Live Demo
- Frontend: https://todoapp-ui.onrender.com/
- API Docs: https://todoapp-7mk5.onrender.com/swagger/index.html

## Tech Stack

**Backend**
- .NET 10 Web API
- C# 14
- Entity Framework Core 10 (In-Memory)
- Swagger / OpenAPI

**Frontend**
- React 19
- Vite
- Tailwind CSS

## Features
- ✅ Full CRUD task management
- 📅 Due Today — see what needs to be done today
- 🤝 Delegation — assign tasks to others by email
- 🔍 Filter by All Tasks, Due Today, Delegated
- ➕ Add New Task — quick add tasks for today

## Project Structure
```
TodoApp/
├── TodoApi/          # .NET 10 Web API backend
└── todoapp-ui/       # React frontend
```

## Getting Started

### Prerequisites
- .NET 10 SDK
- Node.js 18+
- Git

### Run Backend
```bash
cd TodoApi
dotnet restore
dotnet run
```
API runs at: `http://localhost:5270`
Swagger UI: `http://localhost:5270/swagger`

### Run Frontend
```bash
cd todoapp-ui
npm install
npm run dev
```
Frontend runs at: `http://localhost:5173`

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/todo?email=x | Get my tasks |
| GET | /api/todo/{id} | Get task by ID |
| GET | /api/todo/due-today | Get tasks due today |
| GET | /api/todo/delegated?email=x | Get delegated tasks |
| POST | /api/todo | Create task |
| PUT | /api/todo/{id} | Update task |
| DELETE | /api/todo/{id} | Delete task |
| PATCH | /api/todo/{id}/complete | Toggle complete |

## Architecture

### Backend
- **Repository Pattern** — separates data access from business logic
- **Interface-based DI** — `ITodoRepository` injected into controller, easy to swap implementations
- **Data Annotations** — model validation at the API boundary
- **Centralised error messages** — single `ErrorMessages` constants file
- **EF Core InMemory** — zero setup for MVP, swap to SQL Server/PostgreSQL with one line change

### Frontend
- **Service Layer** — all API calls in `taskService.js`, mirrors repository pattern
- **Component-based** — Header, TaskForm, FilterBar, TaskList, TaskCard
- **Email-based identity** — simple user identification without auth overhead

## Assumptions & Design Decisions

- Used EF Core InMemory for MVP — no infrastructure setup required. Production would use PostgreSQL or SQL Server
- Email used as user identifier instead of authentication — keeps MVP simple while demonstrating multi-user concepts

