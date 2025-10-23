import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';
import { useRole } from './RoleBasedMenu';

const AuthenticationGate = () => {
  const { isAuthenticated } = useRole();

  if (isAuthenticated) {
    return null; // Don't render if user is authenticated
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-card border-b border-border shadow-elevation-1">
      <div className="flex h-16 items-center justify-between px-4 lg:px-6">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
            <Icon name="Utensils" size={20} color="white" />
          </div>
          <span className="font-heading font-bold text-xl text-foreground">
            FoodShare
          </span>
        </Link>

        {/* Authentication Actions */}
        <div className="flex items-center space-x-3">
          <Link
            to="/user-registration-login"
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
          >
            Sign In
          </Link>
          <Link
            to="/user-registration-login"
            className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
};

export default AuthenticationGate;