import React, { useState, useEffect } from "react";
import { Home, Stethoscope, Globe, ListChecks, User } from "lucide-react";

// Import all your page components
import HomePage from "./Home";
import Doctors from "./Doctors";
import Global from "./Global";
import Todo from "./ToDo";
import Profile from "./Profile";

const Root = () => {
  // initialize from localStorage immediately
  const [activePage, setActivePage] = useState(() => {
    return localStorage.getItem("activePage") || "home";
  });

  // save whenever activePage changes
  useEffect(() => {
    localStorage.setItem("activePage", activePage);
  }, [activePage]);

  // map page keys to components
  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <HomePage />;
      case "doctor":
        return <Doctors />;
      case "world":
        return <Global />;
      case "tasks":
        return <Todo />;
      case "profile":
        return <Profile />;
      default:
        return <HomePage />;
    }
  };

  const navItems = [
    { id: "home", icon: <Home size={24} /> },
    { id: "doctor", icon: <Stethoscope size={24} /> },
    { id: "world", icon: <Globe size={24} /> },
    { id: "tasks", icon: <ListChecks size={24} /> },
    { id: "profile", icon: <User size={24} /> },
  ];

  return (
    <div className="min-h-screen bg-white text-[#141414] flex flex-col">
      {/* Page content */}
      <div className="flex-1">{renderPage()}</div>

      {/* Bottom NavBar */}
      <div
        className="fixed bottom-2 left-1/2 -translate-x-1/2 
                   bg-black/50 backdrop-blur-md 
                   rounded-2xl px-6 py-4 
                   flex items-center justify-between 
                   w-[90%] max-w-md 
                   shadow-lg border border-white/10"
      >
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={`flex-1 flex justify-center transition-colors ${
              activePage === item.id ? "text-white" : "text-gray-400"
            }`}
          >
            {item.icon}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Root;
