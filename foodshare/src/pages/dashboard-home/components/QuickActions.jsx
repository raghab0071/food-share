import React from 'react';
import { Link } from 'react-router-dom';
import { useRole } from '../../../components/ui/RoleBasedMenu';

import Icon from '../../../components/AppIcon';

const QuickActions = () => {
  const { isDonor, isRecipient, isAdmin } = useRole();

  const getDonorActions = () => [
    {
      title: 'Post Food Donation',
      description: 'Share surplus food with the community',
      icon: 'Plus',
      path: '/food-listing-creation',
      variant: 'default',
      urgent: false
    },
    {
      title: 'View My Listings',
      description: 'Manage your active food donations',
      icon: 'List',
      path: '/food-listing-creation',
      variant: 'outline',
      urgent: false
    },
    {
      title: 'Messages',
      description: 'Communicate with recipients',
      icon: 'MessageCircle',
      path: '/messages-communication',
      variant: 'ghost',
      urgent: false
    }
  ];

  const getRecipientActions = () => [
    {
      title: 'Browse Available Food',
      description: 'Find fresh food donations nearby',
      icon: 'Search',
      path: '/food-detail-request',
      variant: 'default',
      urgent: false
    },
    {
      title: 'Emergency Request',
      description: 'Request urgent food assistance',
      icon: 'AlertTriangle',
      path: '/food-detail-request',
      variant: 'destructive',
      urgent: true
    },
    {
      title: 'My Requests',
      description: 'Track your food requests',
      icon: 'Clock',
      path: '/food-detail-request',
      variant: 'outline',
      urgent: false
    }
  ];

  const getAdminActions = () => [
    {
      title: 'Admin Dashboard',
      description: 'Monitor platform activity',
      icon: 'BarChart3',
      path: '/admin-dashboard',
      variant: 'default',
      urgent: false
    },
    {
      title: 'User Management',
      description: 'Manage users and verification',
      icon: 'Users',
      path: '/admin-dashboard',
      variant: 'outline',
      urgent: false
    },
    {
      title: 'Reports',
      description: 'View impact and analytics',
      icon: 'FileText',
      path: '/admin-dashboard',
      variant: 'ghost',
      urgent: false
    }
  ];

  const getActions = () => {
    if (isDonor) return getDonorActions();
    if (isRecipient) return getRecipientActions();
    if (isAdmin) return getAdminActions();
    return [];
  };

  const actions = getActions();

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-1 mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {actions?.map((action, index) => (
          <Link key={index} to={action?.path} className="block">
            <div className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-elevation-2 ${
              action?.urgent 
                ? 'border-error bg-error/5 hover:border-error/70' :'border-border hover:border-primary/30'
            }`}>
              <div className="flex items-start space-x-3">
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                  action?.urgent 
                    ? 'bg-error text-white' :'bg-primary/10 text-primary'
                }`}>
                  <Icon name={action?.icon} size={20} />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-foreground mb-1">{action?.title}</h3>
                  <p className="text-sm text-muted-foreground">{action?.description}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;