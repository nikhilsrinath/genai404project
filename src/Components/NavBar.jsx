import React, { useState } from "react";
import {
  Home,
  Stethoscope,
  Globe,
  ListChecks,
  User,
} from "lucide-react"; // npm install lucide-react

const NavBar = () => {
  const [active, setActive] = useState("home");

  const items = [
    { id: "home", icon: <Home size={24} /> },
    { id: "doctor", icon: <Stethoscope size={24} /> },
    { id: "world", icon: <Globe size={24} /> },
    { id: "tasks", icon: <ListChecks size={24} /> },
    { id: "profile", icon: <User size={24} /> },
  ];

  return (
    <div className="fixed bottom-2 left-1/2 -translate-x-1/2 
                    bg-black/50 backdrop-blur-md 
                    rounded-2xl px-6 py-4 
                    flex items-center justify-between 
                    w-[90%] max-w-md 
                    shadow-lg border border-white/10">
      {items.map((item) => (
        <button
          key={item.id}
          onClick={() => setActive(item.id)}
          className={`flex-1 flex justify-center transition-colors ${
            active === item.id ? "text-white" : "text-gray-400"
          }`}
        >
          {item.icon}
        </button>
      ))}
    </div>
  );
};

export default NavBar;
