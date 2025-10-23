import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationCounts, setNotificationCounts] = useState({
    messages: 3,
  });
  const [userRole, setUserRole] = useState('recipient'); // donor, recipient, admin
  const location = useLocation();

  // Mock user authentication - replace with actual auth logic
  useEffect(() => {
    // Simulate role detection based on route or auth context
    const role = localStorage.getItem('userRole') || 'recipient';
    setUserRole(role);
  }, []);

  const getNavigationItems = () => {
    const baseItems = [
      {
        label: 'Home',
        path: '/dashboard-home',
        icon: 'Home',
        roles: ['donor', 'recipient', 'admin']
      },
      {
        label: userRole === 'donor' ? 'Post Food' : 'Browse Food',
        path: userRole === 'donor' ? '/food-listing-creation' : '/food-detail-request',
        icon: userRole === 'donor' ? 'Plus' : 'Search',
        roles: ['donor', 'recipient']
      },
      {
        label: 'Messages',
        path: '/messages-communication',
        icon: 'MessageCircle',
        roles: ['donor', 'recipient', 'admin'],
        badge: notificationCounts?.messages
      }
    ];

    // Add admin item for admin users
    if (userRole === 'admin') {
      baseItems?.push({
        label: 'Admin',
        path: '/admin-dashboard',
        icon: 'Settings',
        roles: ['admin']
      });
    }

    return baseItems?.filter(item => item?.roles?.includes(userRole));
  };

  const navigationItems = getNavigationItems();

  const isActiveRoute = (path) => {
    return location?.pathname === path;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-elevation-1">
      <div className="flex h-16 items-center px-4 lg:px-6">
        {/* Logo */}
        <Link to="/dashboard-home" className="flex items-center space-x-2 mr-8">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Utensils" size={20} color="white" />
          </div>
          <span className="font-heading font-bold text-xl text-foreground">
            FoodShare
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 flex-1">
          {navigationItems?.map((item) => (
            <Link
              key={item?.path}
              to={item?.path}
              className={`relative flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                isActiveRoute(item?.path)
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted'
              }`}
            >
              <Icon name={item?.icon} size={18} />
              <span>{item?.label}</span>
              {item?.badge && item?.badge > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-accent rounded-full">
                  {item?.badge > 99 ? '99+' : item?.badge}
                </span>
              )}
            </Link>
          ))}
        </nav>

        {/* User Actions */}
        <div className="hidden md:flex items-center space-x-3 ml-auto">
          <Button variant="ghost" size="sm">
            <Icon name="Bell" size={18} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="User" size={18} />
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="sm"
          className="md:hidden ml-auto"
          onClick={toggleMenu}
        >
          <Icon name={isMenuOpen ? 'X' : 'Menu'} size={20} />
        </Button>
      </div>
      {/* Mobile Navigation Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-card border-t border-border animate-slide-down">
          <nav className="flex flex-col p-4 space-y-2">
            {navigationItems?.map((item) => (
              <Link
                key={item?.path}
                to={item?.path}
                onClick={closeMenu}
                className={`relative flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  isActiveRoute(item?.path)
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                }`}
              >
                <Icon name={item?.icon} size={20} />
                <span>{item?.label}</span>
                {item?.badge && item?.badge > 0 && (
                  <span className="ml-auto flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-accent rounded-full">
                    {item?.badge > 99 ? '99+' : item?.badge}
                  </span>
                )}
              </Link>
            ))}
            
            {/* Mobile User Actions */}
            <div className="flex items-center space-x-2 pt-4 border-t border-border mt-4">
              <Button variant="ghost" size="sm" className="flex-1">
                <Icon name="Bell" size={18} className="mr-2" />
                Notifications
              </Button>
              <Button variant="ghost" size="sm" className="flex-1">
                <Icon name="User" size={18} className="mr-2" />
                Profile
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;