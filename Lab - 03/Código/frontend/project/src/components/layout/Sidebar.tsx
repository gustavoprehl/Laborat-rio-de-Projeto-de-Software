import React from 'react';
import { NavLink } from 'react-router-dom';
import { X, Home, ShoppingCart, History, Award, Gift, Building } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

type SidebarProps = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
  const { user } = useAuth();

  if (!user) return null;

  const getNavLinks = () => {
    switch (user.role) {
      case 'student':
        return [
          { to: '/student', name: 'Dashboard', icon: <Home size={20} /> },
          { to: '/student/marketplace', name: 'Marketplace', icon: <ShoppingCart size={20} /> },
          { to: '/student/transactions', name: 'Transactions', icon: <History size={20} /> },
        ];
      case 'professor':
        return [
          { to: '/professor', name: 'Dashboard', icon: <Home size={20} /> },
          { to: '/professor/transactions', name: 'Transactions', icon: <History size={20} /> },
        ];
      case 'company':
        return [
          { to: '/company', name: 'Dashboard', icon: <Home size={20} /> },
          { to: '/company/benefits', name: 'Manage Benefits', icon: <Gift size={20} /> },
        ];
      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  const activeClassName = "flex items-center gap-3 px-4 py-3 bg-[#4B3F72] text-white rounded-lg";
  const inactiveClassName = "flex items-center gap-3 px-4 py-3 text-[#2E2E2E] hover:bg-[#E1EBF7] rounded-lg transition-colors duration-200";

  return (
    <aside className={`
      fixed md:sticky top-0 md:top-16 left-0 z-20 h-screen md:h-[calc(100vh-4rem)] w-64 bg-[#E1EBF7] shadow-lg
      transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      md:${isOpen ? 'w-64' : 'w-0 md:w-64 overflow-hidden'}
    `}>
      <div className="flex flex-col h-full py-5 overflow-y-auto">
        <div className="flex items-center justify-between px-4 mb-6 md:hidden">
          <h2 className="text-xl font-semibold text-[#2E2E2E]" style={{ fontFamily: 'Poppins, sans-serif' }}>Menu</h2>
          <button
            onClick={toggleSidebar}
            className="text-[#2E2E2E] hover:text-[#4B3F72]"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-4 mb-6">
          <div className="p-4 bg-[#4B3F72] rounded-lg">
            <div className="flex items-center gap-4">
              {user.role === 'student' && (
                <div className="flex-shrink-0 bg-[#F9A825] rounded-full p-3">
                  <Award className="text-white" size={24} />
                </div>
              )}
              {user.role === 'professor' && (
                <div className="flex-shrink-0 bg-[#F9A825] rounded-full p-3">
                  <Award className="text-white" size={24} />
                </div>
              )}
              {user.role === 'company' && (
                <div className="flex-shrink-0 bg-[#A3D9B1] rounded-full p-3">
                  <Building className="text-white" size={24} />
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-white" style={{ fontFamily: 'Poppins, sans-serif' }}>{user.name}</p>
                <p className="text-xs text-white capitalize">{user.role}</p>
                {(user.role === 'student' || user.role === 'professor') && (
                  <p className="text-xs text-white mt-1">{user.institution}</p>
                )}
              </div>
            </div>

            {(user.role === 'student' || user.role === 'professor') && (
              <div className="mt-4 pt-4 border-t border-white">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-white">Balance</span>
                  <span className="text-base font-semibold text-white">{user.coins} coins</span>
                </div>
              </div>
            )}
          </div>
        </div>

        <nav className="px-3 flex-1">
          <ul className="space-y-1">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) => isActive ? activeClassName : inactiveClassName}
                  onClick={() => {
                    if (window.innerWidth < 768) {
                      toggleSidebar();
                    }
                  }}
                >
                  {link.icon}
                  <span style={{ fontFamily: 'Open Sans, sans-serif' }}>{link.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;