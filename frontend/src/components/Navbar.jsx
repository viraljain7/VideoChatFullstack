import React from "react";
import { Bell, LogOut } from "lucide-react";
import { useAuthUser } from "../hooks/useAuthUser";
import { useLogout } from "../hooks/useLogout";
import ThemeSelection from "./ThemeSelection";

function Navbar() {
  const { authUser } = useAuthUser();
  const { logoutMutation } = useLogout();

  const handleLogout = () => {
    logoutMutation();
  };

  return (
    <div className="hidden lg:flex bg-base-100 text-base-content shadow-md  items-center justify-end px-4 h-16 sticky top-0 z-[500] ">
      {/* Right Section: Icons */}
      <div className="flex items-center gap-4">
        {/* Notification */}
        <button className="relative text-base-content hover:text-primary transition-colors">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-error rounded-full"></span>
        </button>

        {/* Theme toggle */}
        <ThemeSelection />

        {/* User */}
        <div className="flex items-center gap-2">
          <img
            src={authUser?.profilePic}
            alt="User"
            className="w-8 h-8 rounded-full border border-base-300"
          />
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="text-base-content hover:text-error transition-colors"
        >
          <LogOut size={20} />
        </button>
      </div>
    </div>
  );
}

export default Navbar;