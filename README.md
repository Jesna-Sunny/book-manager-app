# Book Manager App

A full-stack CRUD web application for managing books, built as part of an internship technical assessment. Users can register, log in, and manage a personal collection of books and favorite quotes.

**Live demo:** https://sparkly-daifuku-5a09c3.netlify.app
**Backend API:** https://book-manager-app-n7ns.onrender.com/swagger

> Note: the backend runs on Render's free tier, which spins down after inactivity. The first request after idle time may take up to 50 seconds to respond while the server wakes up.

## Features

- User registration and login with JWT authentication
- Full CRUD for books (add, view, edit, delete) — scoped per logged-in user
- My Quotes page — add, edit, and remove favorite quotes, scoped per logged-in user
- Search/filter on the book list
- Toast notifications on add/edit/delete actions
- Loading indicator while data is fetched
- Show/hide password toggle on login and register
- Responsive design (desktop, tablet, mobile)
- Dark / light mode toggle
- Protected routes — book management requires login

## Tech stack

**Frontend**
- Angular 20 (standalone components)
- Bootstrap 5
- Font Awesome

**Backend**
- .NET 9 Web API
- Entity Framework Core with SQLite
- JWT authentication with BCrypt password hashing
- Swagger / OpenAPI

**Deployment**
- Frontend: Netlify
- Backend: Render (Docker)

## Running locally

### Prerequisites
- .NET 9 SDK
- Node.js 20+ and npm
- Angular CLI (`npm install -g @angular/cli`)

### Backend
```bash
cd backend/BookApi
dotnet restore
dotnet run
```
Migrations are applied automatically on startup. API runs at `http://localhost:5272`. Swagger UI available at `http://localhost:5272/swagger`.

### Frontend
```bash
cd frontend/book-frontend
npm install
ng serve
```
App runs at `http://localhost:4200`.

> By default, the frontend points to the deployed backend URL. To use your local backend instead, update `apiUrl` in `src/app/services/book.ts` and `src/app/services/auth.ts` to `http://localhost:5272`.

## Project structure

```
book-manager-app/
├── backend/
│   └── BookApi/          # .NET 9 Web API
├── frontend/
│   └── book-frontend/    # Angular 20 app
└── README.md
```
