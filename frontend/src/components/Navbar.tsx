import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home' },
  { to: '/jobs', label: 'Jobs' },
  { to: '/contacts', label: 'Contacts' },
  { to: '/profile', label: 'Profile' },
  { to: '/login', label: 'Login' },
];

const Navbar = () => {
  const location = useLocation();
  return (
    <nav className="bg-white shadow mb-6">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <div className="font-bold text-xl text-blue-600">Job Portal</div>
        <div className="space-x-4">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className={`text-gray-700 hover:text-blue-600 font-medium ${location.pathname === item.to ? 'underline' : ''}`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
