// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import UserDetails from "./pages/UserDetails";
import ProfessionPage from "./pages/ProffesionPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Default route is Login */}
        <Route path="/login" element={<Login />} />
        <Route path="/userdetails" element={<UserDetails />} />
        <Route path="/profession" element={<ProfessionPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
