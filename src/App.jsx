// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserDetails from "./pages/UserDetails";
import ProfessionPage from "./pages/ProffesionPage";
import AiPage from "./pages/AiChat";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Root from "./pages/Root";

function App() {
  return (
    <div className="bg-white min-h-screen text-[#141414]">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/profession" element={<ProfessionPage />} />
          <Route path="/soul-ai" element={<AiPage />} />
          <Route path="/" element={<Root />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}


export default App;
