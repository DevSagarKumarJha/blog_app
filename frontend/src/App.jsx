import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Profile";
import Login from "./auth/Login";
import Register from "./auth/Register";
import { Navbar } from "./components/ui";

function App() {
  return (
    <>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
