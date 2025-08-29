import React, { useState } from "react";
import { NavLink } from "react-router"; // keep as react-router
import { Home, FileText, Settings, Menu, X } from "lucide-react";
import { useAuthUser } from "../hooks/useAuthUser";
import logo from "../assets/logo.png";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const { authUser } = useAuthUser();

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Friends", path: "/friends", icon: <FileText size={20} /> },
    { name: "Notifications", path: "/notification", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex">
      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-base-200 shadow-md flex items-center justify-between p-4 z-50">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-12 rounded-full" />
        </div>
        <button onClick={() => setOpen(!open)}>
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 w-64 bg-base-200 shadow-lg transform transition-transform duration-300 z-40 flex flex-col
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        style={{ height: "100vh" }}
      >
        {/* Logo Section (desktop only) */}
        <div className="hidden lg:flex items-center gap-2 p-[0.7rem] border-b border-base-300">
          <img
            src={logo}
            width={400}
            height={100}
            alt="Logo"
            className="rounded-full"
          />
        </div>

        {/* Navigation Links */}
        <ul
          className={`menu p-4 flex-1 overflow-y-auto ${
            open ? "mt-16" : ""
          }`}
        >
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 hover:bg-base-300 rounded-md ${
                    isActive ? "bg-primary text-primary-content" : ""
                  }`
                }
              >
                {item.icon} {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Bottom User Profile */}
        <div className="p-4 border-t border-base-300 mt-auto flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <div className="relative">
              <img
                src={
                  authUser?.profilePic ||
                  "https://dummyimage.com/40x40/000/fff.png&text=U"
                }
                alt="User"
                className="w-10 h-10 rounded-full"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-base-200 rounded-full"></span>
            </div>
            <div>
              <p className="text-md font-semibold">
                {authUser?.fullName || "User Name"}
              </p>
              <p className="text-xs text-green-500">Online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;