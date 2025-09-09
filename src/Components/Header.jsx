import React from "react";
import { Bell } from "lucide-react"; // npm install lucide-react

const Header = () => {
  return (
    <div className="py-[20px] px-[30px] flex items-center justify-between">
      {/* Logo */}
      <img src="soul..png" alt="Soul Logo" className="w-[80px]" />

      {/* Notification Bell */}
      <button className="relative">
        <Bell size={24} className="text-white" />
        {/* Optional red dot for unread notifications */}
        {/* <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span> */}
      </button>
    </div>
  );
};

export default Header;
