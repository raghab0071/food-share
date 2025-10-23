import React from 'react';
import { useRole } from '../../../components/ui/RoleBasedMenu';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ userName = "User" }) => {
  const { userRole, isDonor, isRecipient, isAdmin } = useRole();
  
  const getWelcomeMessage = () => {
    const currentHour = new Date()?.getHours();
    const timeGreeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';
    
    if (isDonor) {
      return `${timeGreeting}, ${userName}! Ready to share some food today?`;
    } else if (isRecipient) {
      return `${timeGreeting}, ${userName}! Let's find some fresh food nearby.`;
    } else if (isAdmin) {
      return `${timeGreeting}, ${userName}! Monitor platform activity and support the community.`;
    }
    return `${timeGreeting}, ${userName}! Welcome to FoodShare.`;
  };

  const getRoleIcon = () => {
    if (isDonor) return 'Heart';
    if (isRecipient) return 'Search';
    if (isAdmin) return 'Shield';
    return 'User';
  };

  return (
    <div className="bg-gradient-to-r from-primary to-secondary p-6 rounded-lg text-white mb-6">
      <div className="flex items-center space-x-3 mb-2">
        <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full">
          <Icon name={getRoleIcon()} size={24} color="white" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">{getWelcomeMessage()}</h1>
          <p className="text-white/80 capitalize">
            {userRole} Dashboard
          </p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;