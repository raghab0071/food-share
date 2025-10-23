import React, { createContext, useContext, useEffect, useState } from 'react';

const RoleContext = createContext();

export const useRole = () => {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider');
  }
  return context;
};

export const RoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState('recipient');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Mock authentication check - replace with actual auth logic
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole') || 'recipient';
    
    setIsAuthenticated(!!token);
    setUserRole(role);
  }, []);

  const updateRole = (newRole) => {
    setUserRole(newRole);
    localStorage.setItem('userRole', newRole);
  };

  const login = (role = 'recipient') => {
    setIsAuthenticated(true);
    setUserRole(role);
    localStorage.setItem('authToken', 'mock-token');
    localStorage.setItem('userRole', role);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole('recipient');
    localStorage.removeItem('authToken');
    localStorage.removeItem('userRole');
  };

  const value = {
    userRole,
    isAuthenticated,
    updateRole,
    login,
    logout,
    isAdmin: userRole === 'admin',
    isDonor: userRole === 'donor',
    isRecipient: userRole === 'recipient'
  };

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  );
};

export const RoleBasedComponent = ({ allowedRoles, children, fallback = null }) => {
  const { userRole } = useRole();
  
  if (!allowedRoles?.includes(userRole)) {
    return fallback;
  }
  
  return children;
};