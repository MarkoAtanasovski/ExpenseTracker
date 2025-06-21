# My Project

## Overview

This is an Expense Tracker app built with React for the frontend and Node.js/Express for the backend, using MongoDB for data storage. It allows users to register and log in, track their income and expenses, add or delete transactions, and view summaries and charts of their financial data. The app also supports authentication with secure login and logout functionality.---

## Getting Started

### Prerequisites

- Node.js (v16 or newer recommended)
- npm
- MongoDB (Atlas or local)

---

## Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the `backend` folder with the following variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

4. Start the backend server:

```bash
node server.js
```

The backend server will run on the port specified in your `.env` file (default 5000).

---

## Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the React app:

```bash
npm start
```

The frontend will be available on `http://localhost:5173` by default.

---

## Notes

- Make sure your `.env` file is **never** committed to version control. It is included in `.gitignore`.
- For development, you may want to use `nodemon` in the backend to auto-restart the server on changes.
- Consider using Docker for deployment for easier environment setup and scaling.

---

## Deployment

You can deploy the backend and frontend separately or together using Docker containers or any cloud provider.

---

If you need any help, feel free to ask!
