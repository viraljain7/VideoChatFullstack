import React, { useState } from "react";
import { NavLink } from "react-router";
import { Home, FileText, Settings, Menu, X, MessagesSquare } from "lucide-react";
import { useAuthUser } from "../hooks/useAuthUser";

function Sidebar() {
  const [open, setOpen] = useState(false);
  const { authUser } = useAuthUser();

  const navItems = [
    { name: "Home", path: "/", icon: <Home size={20} /> },
    { name: "Friends", path: "/friends", icon: <FileText size={20} /> },
    { name: "Notifications", path: "/notifications", icon: <Settings size={20} /> },
  ];

  return (
    <div className="flex">
      {/* Mobile Navbar */}
      <div className="lg:hidden fixed top-0 left-0 w-full bg-base-100 text-base-content shadow-md flex items-center justify-between p-4 z-50">
        <div className="flex items-center gap-2">
          <MessagesSquare size={40} /> BlinkChat

        </div>
        <button
          onClick={() => setOpen(!open)}
          className="text-base-content hover:text-primary transition-colors"
        >
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:sticky top-0 left-0 w-64 bg-base-100 text-base-content shadow-lg transform transition-transform duration-300 z-40 flex flex-col
        ${open ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
        style={{ height: "100vh" }}
      >
        {/* Logo Section (desktop only) */}
        <div className="hidden lg:flex items-center gap-2 p-[0.7rem] border-b border-base-300 ">
          {/* <img
            src={logo}
            width={400}
            height={100}
            alt="Logo"
            className="rounded-full"
          /> */}
          <MessagesSquare size={40} /> 
          <span className="font-bold font-logo">

          BlinkChat
          </span>
        </div>

        {/* Navigation Links */}
        <ul className={`menu p-4 flex-1 overflow-y-auto ${open ? "mt-16" : ""}`}>
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-2 py-2 rounded-md transition-colors ${
                    isActive
                      ? "bg-primary text-primary-content"
                      : "hover:bg-base-300 hover:text-primary"
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
                className="w-10 h-10 rounded-full border border-base-300 "
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 bg-success border-2 border-base-200 rounded-full"></span>
            </div>
            <div>
              <p className="text-md font-semibold">
                {authUser?.fullName || "User Name"}
              </p>
              <p className="text-xs text-success">Online</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;