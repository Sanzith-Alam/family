import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
//import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  //const { isAuthenticated, user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize to toggle between mobile and desktop views
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      // Close menu when switching to desktop view
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu when clicking outside (for mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobile && isOpen) {
        const target = event.target as HTMLElement;
        if (!target.closest('.navbar-container')) {
          setIsOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobile, isOpen]);

  return (
    <nav className="bg-blue-600 p-4 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center navbar-container">
<<<<<<< HEAD
        <Link to="/" className="text-3xl font-bold hover:text-blue-200 transition-colors">
=======
        <Link to="/" className="text-2xl font-bold hover:text-blue-200 transition-colors">
>>>>>>> ebde6a3fd391ca83fcde943cb06ecd953b78a058
          Mogol Bhuiyan Bari
        </Link>

        {/* Desktop Navigation - visible on md screens and up */}
<<<<<<< HEAD
        <div className="hidden md:flex md:items-center text-2xl md:space-x-6">
=======
        <div className="hidden md:flex md:items-center md:space-x-6">
>>>>>>> ebde6a3fd391ca83fcde943cb06ecd953b78a058
          <ul className="flex space-x-6 items-center">
            <NavItem to="/events" text="Events" />
            <NavItem to="/gallery" text="Gallery" />
            <NavItem to="/members" text="Members" />
            <NavItem to="/announcements" text="Announcements" />
            <NavItem to="/hub" text="Family Hub" />
            {/* {isAuthenticated ? (
              <>
                {user?.role === 'admin' && <NavItem to="/admin" text="Admin" />}
                <li className="text-sm px-4 py-2">Welcome, {user?.name}!</li>
                <li>
                  <button
                    onClick={logout}
                    className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded transition-colors"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <NavItem to="/login" text="Login" isButton />
            )} */}
          </ul>
        </div>

        {/* Mobile menu button - visible only on small screens */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white focus:outline-none hover:text-blue-200 transition-colors"
            aria-label="Toggle menu"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation Menu - slides in from top */}
        {isOpen && isMobile && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-blue-600 shadow-lg z-50 animate-slideDown">
            <ul className="flex flex-col items-center py-4 space-y-3">
              <MobileNavItem to="/events" text="Events" onClick={() => setIsOpen(false)} />
              <MobileNavItem to="/gallery" text="Gallery" onClick={() => setIsOpen(false)} />
              <MobileNavItem to="/members" text="Members" onClick={() => setIsOpen(false)} />
              <MobileNavItem to="/announcements" text="Announcements" onClick={() => setIsOpen(false)} />
              <MobileNavItem to="/hub" text="Family Hub" onClick={() => setIsOpen(false)} />
              {/* {isAuthenticated ? (
                <>
                  {user?.role === 'admin' && (
                    <MobileNavItem to="/admin" text="Admin" onClick={() => setIsOpen(false)} />
                  )}
                  <li className="text-sm py-2 px-4">Welcome, {user?.name}!</li>
                  <li className="w-full px-4">
                    <button
                      onClick={() => {
                        logout();
                        setIsOpen(false);
                      }}
                      className="bg-red-500 hover:bg-red-600 w-full py-2 rounded transition-colors"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <MobileNavItem
                  to="/login"
                  text="Login"
                  onClick={() => setIsOpen(false)}
                  isButton
                />
              )} */}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

// Component for desktop navigation items
const NavItem: React.FC<{ to: string; text: string; isButton?: boolean }> = ({
  to,
  text,
  isButton = false,
}) => {
  return (
    <li>
      {isButton ? (
        <Link
          to={to}
          className="bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded transition-colors"
        >
          {text}
        </Link>
      ) : (
        <Link
          to={to}
          className="hover:text-blue-200 px-3 py-2 rounded transition-colors"
        >
          {text}
        </Link>
      )}
    </li>
  );
};

// Component for mobile navigation items
const MobileNavItem: React.FC<{
  to: string;
  text: string;
  onClick: () => void;
  isButton?: boolean;
}> = ({ to, text, onClick, isButton = false }) => {
  return (
    <li className="w-full px-4">
      {isButton ? (
        <Link
          to={to}
          onClick={onClick}
          className="bg-blue-500 hover:bg-blue-700 block text-center py-3 rounded transition-colors"
        >
          {text}
        </Link>
      ) : (
        <Link
          to={to}
          onClick={onClick}
          className="hover:text-blue-200 block text-center py-3 rounded transition-colors"
        >
          {text}
        </Link>
      )}
    </li>
  );
};

export default Navbar;