import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Hotel, Menu, X, Sun, Moon, User as UserIcon } from 'lucide-react';
import '../../styles/Navbar.css';

const Navbar = ({ user, onLogout }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // Track dropdown open state
  const location = useLocation();

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.setAttribute('data-theme', !darkMode ? 'dark' : 'light');
  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleDropdownToggle = () => {
    setDropdownOpen(!dropdownOpen); // Toggle dropdown visibility
  };

  const getUserInitials = (name) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const adminLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/rooms', label: 'Rooms' },
    { path: '/bookings', label: 'Bookings' },
    { path: '/users', label: 'Users' },
    { path: '/analytics', label: 'Analytics' }
  ];

  const userLinks = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/book-room', label: 'Book Room' },
    { path: '/my-bookings', label: 'My Bookings' }
  ];

  const links = user.role === 'admin' ? adminLinks : userLinks;

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/dashboard" className="navbar-brand">
          <Hotel size={32} />
          <h1>HMS</h1>
        </Link>

        <button className="mobile-menu-btn" onClick={toggleMobileMenu}>
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        <ul className={`navbar-nav ${mobileMenuOpen ? 'mobile' : ''}`}>
          {links.map((link) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className={isActive(link.path)}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/profile"
              className={isActive('/profile')}
              onClick={() => setMobileMenuOpen(false)}
            >
              Profile
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={isActive('/settings')}
              onClick={() => setMobileMenuOpen(false)}
            >
              Settings
            </Link>
          </li>
        </ul>

        <div className="navbar-user">
          {/* Dark mode toggle */}
          <button onClick={toggleDarkMode} className="theme-toggle">
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* User Avatar with a cute icon */}
          <div className="user-avatar" onClick={handleDropdownToggle} title={user.name}>
            <UserIcon size={24} /> {/* Cute user icon */}
          </div>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="dropdown-menu">
              <span className="username">{user.name}</span>
              <Link to="/profile" className="dropdown-link" onClick={() => setDropdownOpen(false)}>Profile</Link>
              <Link to="/settings" className="dropdown-link" onClick={() => setDropdownOpen(false)}>Settings</Link>
              <button
                onClick={() => { onLogout(); setDropdownOpen(false); }}
                className="btn btn-primary logout-btn"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
