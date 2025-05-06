import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E1EBF7] to-[#A3D9B1] text-[#2E2E2E]">
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />

        <main
          className={`flex-1 p-4 md:p-6 transition-all duration-300 ease-in-out ${sidebarOpen ? 'md:ml-64' : 'md:ml-0'
            }`}
        >
          <div className="container mx-auto bg-white rounded-2xl shadow-lg p-6 pb-20">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          aria-hidden="true"
          onClick={toggleSidebar}
        />
      )}
    </div>
  );
};

export default Layout;