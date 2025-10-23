import React from 'react';

const NotificationBadge = ({ count, className = '' }) => {
  if (!count || count <= 0) return null;

  return (
    <span 
      className={`absolute -top-1 -right-1 flex items-center justify-center min-w-5 h-5 px-1 text-xs font-bold text-white bg-accent rounded-full ${className}`}
      aria-label={`${count} notifications`}
    >
      {count > 99 ? '99+' : count}
    </span>
  );
};

export default NotificationBadge;