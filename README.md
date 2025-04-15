# TodoList Application

A full-stack TodoList application with user authentication, task management, and real-time updates.

## Technologies Used

### Frontend

- React.js (with Vite)
- React Router DOM for routing
- Axios for API requests
- Bootstrap for styling
- React Icons
- JWT for authentication

### Backend

- Node.js
- Express.js
- MySQL (with Sequelize ORM)
- JWT for authentication
- Bcrypt.js for password hashing
- CORS for cross-origin resource sharing

## Features

- User Authentication (Register/Login)
- Protected Routes
- Create, Read, Update, and Delete Tasks
- Task Status Toggle
- Task Description Support
- Real-time Updates
- Responsive Design

## Prerequisites

- Node.js (v14 or higher)
- MySQL Server
- npm or yarn package manager

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd TODOList
```

### 2. Frontend Setup (TodoList folder)

```bash
cd TodoList
npm install
```

### 3. Backend Setup (Server folder)

```bash
cd Server
npm install
```

### 4. Database Setup

- Create a MySQL database named 'todolist'
- The tables will be automatically created when you start the server

### 5. Environment Variables

Create a .env file in the Server folder with the following variables:

```env
DB_NAME=todolist
DB_USER=your_mysql_username
DB_PASSWORD=your_mysql_password
DB_HOST=localhost
DB_DIALECT=mysql
DB_LOGGING=false
DB_PORT=5000
JWT_SECRET=your_jwt_secret
```

## Running the Application

### 1. Start the Backend Server

```bash
cd Server
npm start
```

The server will run on http://localhost:5000

### 2. Start the Frontend Application

```bash
cd TodoList
npm run dev
```

The application will run on http://localhost:5173

## Project Structure

```
TODOList/
├── Server/                 # Backend
│   ├── controllers/       # Request handlers
│   ├── middleware/        # Authentication middleware
│   ├── model/            # Database models
│   ├── routes/           # API routes
│   ├── db.js             # Database configuration
│   └── server.js         # Server entry point
└── TodoList/             # Frontend
    ├── public/           # Static files
    └── src/
        ├── components/   # React components
        ├── App.jsx       # Root component
        └── main.jsx      # Entry point
```
