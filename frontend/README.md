---

# 🖼️ Blog App Frontend

The frontend of the Blog App is built using **React** and **Vite**. It provides a user interface for interacting with the backend API, including features like authentication, post management, and profile viewing.

---

## 🌳 Project Structure

```bash
frontend/
|- public/                # Static assets
|   |- vite.svg           # Vite logo
|- src/                   # Source code
|   |- api/               # Axios instance for API calls
|       |- axios.js
|   |- auth/              # Authentication-related components
|       |- AuthContext.jsx
|       |- Login.jsx
|       |- Register.jsx
|   |- components/        # Reusable UI components
|       |- ui/
|           |- index.jsx
|           |- navbar.jsx
|   |- pages/             # Page-level components
|       |- Home.jsx
|   |- posts/             # Post-related components
|       |- PostDetail.jsx
|       |- PostForm.jsx
|       |- PostList.jsx
|   |- App.jsx            # Main application component
|   |- main.jsx           # Entry point for React
|   |- index.css          # Global styles
|- .env                   # Environment variables
|- .gitignore             # Git ignore rules
|- index.html             # HTML entry point
|- package.json           # Project dependencies and scripts
|- README.md              # Documentation
|- vite.config.js         # Vite configuration
```

---

## 🚀 Technologies Used

| Name                   | Purpose                          |
| ---------------------- | -------------------------------- |
| **React**              | UI library                      |
| **Vite**               | Build tool                      |
| **React Router**       | Routing                         |
| **Axios**              | HTTP client for API calls       |
| **Tailwind CSS**       | Utility-first CSS framework     |

---

## 📚 Key Components

### 1. **Authentication**
- **Files**: 
  - `AuthContext.jsx`: Provides authentication context for managing user state.
  - `Login.jsx`: Login form for user authentication.
  - `Register.jsx`: Registration form for creating new users.
- **Features**:
  - Login and registration forms.
  - Fetches and stores user profile data using cookies.

### 2. **Posts**
- **Files**:
  - `PostList.jsx`: Displays a list of all posts.
  - `PostDetail.jsx`: Shows details of a single post, with options to edit or delete (if authorized).
  - `PostForm.jsx`: Form for creating or editing posts.
- **Features**:
  - Fetches posts from the backend.
  - Allows users to create, edit, and delete posts.
  - Supports image uploads for posts.

### 3. **UI Components**
- **Files**:
  - `navbar.jsx`: Navigation bar for the application.
  - `index.jsx`: Exports reusable UI components.
- **Features**:
  - Provides navigation links for posts and profile.

### 4. **Pages**
- **Files**:
  - `Home.jsx`: Displays the user profile or prompts for login.
- **Features**:
  - Dynamic content based on user authentication state.

### 5. **API Integration**
- **Files**:
  - `axios.js`: Configures Axios for making API requests.
- **Features**:
  - Centralized API configuration with base URL and credentials support.

---

## ⚙️ Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Set Up Environment Variables**
   Create a `.env` file in the root directory with the following content:
   ```env
   VITE_BASE_URL=http://localhost:8000
   ```

3. **Run the Development Server**
   ```bash
   npm run dev
   ```

4. **Build for Production**
   ```bash
   npm run build
   ```

---

## 🌟 Features

### 🔐 Authentication
- Login and registration forms.
- User authentication using JWT stored in cookies.

### 📝 Post Management
- View all posts.
- Create, edit, and delete posts.
- Upload images for posts.

### 🎨 Responsive Design
- Styled using **Tailwind CSS** for a modern and responsive UI.

---

## 📂 API Endpoints Used

| Method | Endpoint         | Description                  |
| ------ | ---------------- | ---------------------------- |
| POST   | `/auth/login`    | Login user                   |
| POST   | `/auth/register` | Register new user            |
| GET    | `/auth/profile`  | Fetch logged-in user profile |
| GET    | `/posts`         | Fetch all posts              |
| GET    | `/posts/:id`     | Fetch a single post by ID    |
| POST   | `/posts`         | Create a new post            |
| PUT    | `/posts/:id`     | Update an existing post      |
| DELETE | `/posts/:id`     | Delete a post                |

---

## 🛠️ Development Notes

- **Routing**: Handled using [`react-router-dom`](https://reactrouter.com/). Routes are defined in `App.jsx`.
- **State Management**: Authentication state is managed using React Context in `AuthContext.jsx`.
- **Styling**: Tailwind CSS is used for styling. Global styles are defined in `index.css`.
- **API Calls**: Axios is configured in `axios.js` to interact with the backend.

---