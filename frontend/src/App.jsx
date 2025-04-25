import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Profile";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Navbar } from "./components/ui";
import PostDetail from "./posts/PostDetail";
import PostList from "./posts/PostList";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/posts" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
