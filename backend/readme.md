# 📝 Blog App Backend

A simple blog management API with authentication, file uploads, and post CRUD operations using Node.js, Express, Prisma, and JWT.

---

## 🌳 Project Structure

```bash
blog-app
|- backend/
    |- prisma/
    |- uploads/
    |- src
        |- generated
        |- controllers/
            |- auth.controllers.js
            |- post.controllers.js
        |- routes/
            |- auth.routes.js
            |- post.routes.js
        |- middleware/
            |- auth.middleware.js
            |- upload.middleware.js
        |- libs/
            |- db.js

        |- app.js
        |- index.js
    |-.env
```

## 🚀 Technologies Used

| Name                   | Purpose                         |
| ---------------------- | ------------------------------- |
| **Node.js**            | JavaScript runtime              |
| **Express.js**         | Web framework                   |
| **Prisma**             | ORM for PostgreSQL (or any SQL) |
| **JWT**                | Authentication                  |
| **Multer**             | File upload                     |
| **bcryptjs**           | Password hashing                |
| **dotenv**             | Environment variables           |
| **cookie-parser**      | For handling JWT in cookies     |

---

## ⚙️ Setup Instructions

1.  **Clone the repo**

    ```bash
    git clone https://github.com/your-username/blog-app.git
    cd blog-app/backend
    ```

2.  **Install dependecies using**

    ```bash
    npm i # or use npm install
    ```

3.  Create .env file in root of your project
    ```.env
    PORT=5000
    DATABASE_URL="postgresql://user:password@localhost:5432/blogdb"
    JWT_SECRET="your-super-secret-jwt-key"
    NODE_ENV=development
    ```
4.  Set up your databases
    Update `DATABASE_URL` in `.env`, then run:

    ```bash
    npx prisma migrate dev --name init
    ```

5.  Start the server
    ```bash
    npm run dev
    ```

## Features

### 🔐 Authentication

- Uses JWT stored in cookies:

- POST /auth/register – Register (with login set cookies)

- POST /auth/login – Login (sets cookie)

- GET /auth/profile - Get Profile info from database using JWT

Protected routes require Authorization header or cookie

### 📁 File Uploads

- Supported on post creation/update via multipart/form-data

- File field key must be: image

- Uploads are stored in /uploads folder

## 📚 API Routes Summary

| Method | Route          | Description             |
| ------ | -------------- | ----------------------- |
| POST   | /auth/register | Register a new user     |
| POST   | /auth/login    | Login with email + pass |
| GET    | /posts         | List all posts          |
| GET    | /posts/:id     | Get post by ID          |
| POST   | /posts         | Create new post (auth)  |
| PUT    | /posts/:id     | Update post (auth)      |
| DELETE | /posts/:id     | Delete post (auth)      |

