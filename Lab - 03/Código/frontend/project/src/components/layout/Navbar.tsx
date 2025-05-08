import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, LogOut, User, Bell } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

type NavbarProps = {
  toggleSidebar: () => void;
};

const Navbar: React.FC<NavbarProps> = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-r from-[#4B3F72] to-[#A3D9B1] text-white shadow-md sticky top-0 z-30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="text-white hover:text-[#F9A825] mr-4 focus:outline-none"
              aria-label="Open sidebar"
            >
              <Menu size={24} />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <span className="font-bold text-xl tracking-tight" style={{ fontFamily: 'Poppins, sans-serif' }}>
                Meritus
              </span>
            </Link>
          </div>

          {user && (
            <div className="flex items-center gap-4">
              <button className="text-[#F9A825] hover:text-[#F9A825] relative" aria-label="Notifications">
                <Bell size={20} />
                <span className="absolute -top-1 -right-1 bg-[#4B3F72] text-xs text-white rounded-full h-4 w-4 flex items-center justify-center">
                  3
                </span>
              </button>
              
              <div className="relative group">
                <button className="flex items-center gap-2 text-sm focus:outline-none">
                  <div className="bg-[#A3D9B1] rounded-full p-1">
                    <User size={18} className="text-white" />
                  </div>
                  <span className="hidden md:block" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    {user.name}
                  </span>
                </button>
                
                <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg hidden group-hover:block">
                  <div className="py-1">
                    <div className="px-4 py-2 text-sm text-[#2E2E2E] border-b">
                      <p className="font-medium" style={{ fontFamily: 'Poppins, sans-serif' }}>{user.name}</p>
                      <p className="text-[#2E2E2E] text-xs capitalize">{user.role}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 w-full text-left px-4 py-2 text-sm text-[#2E2E2E] hover:bg-[#E1EBF7]"
                    >
                      <LogOut size={16} />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;