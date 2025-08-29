import React from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

function Layout({ children, showSidebar = false }) {
  return (
    <div className="min-h-screen " 
    >
      <div className="flex bg-base-100">
        {showSidebar && <Sidebar />}
        <div className="flex flex-1 flex-col">
          <Navbar />
          <main className="flex-1 overflow-y-auto mt-[75px] lg:mt-0">
  {children}
</main>
        </div>
      </div>
    </div>
  );
}

export default Layout;
