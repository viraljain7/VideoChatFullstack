import React from "react";
import { Bell, Sun, Moon, LogOut } from "lucide-react";
import { useAuthUser } from "../hooks/useAuthUser";
import { useLogout } from "../hooks/useLogout";
import ThemeSelection from "./ThemeSelection";

function Navbar() {
const { authUser } = useAuthUser();
const {logoutMutation} = useLogout()

  const handleLogout = () => {
    logoutMutation();
  };

  return (
    <div className="w-full bg-base-200 shadow-md flex items-center justify-between px-4 h-16">
      {/* Left Section: Logo / Title */}
      <div className="flex items-center gap-2">
      
      </div>

      {/* Right Section: Icons */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Theme toggle */}
      
        <ThemeSelection/>

        
        {/* User */}
        <div className="flex items-center gap-2">
          <img
            src={authUser?.profilePic }
            alt="User"
            className="w-8 h-8 rounded-full"
          />
        </div>


        {/* Logout */}
        <button onClick={handleLogout}>
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
}

export default Navbar;
