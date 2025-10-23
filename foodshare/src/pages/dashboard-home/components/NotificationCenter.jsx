import React, { useState } from 'react';
import { useRole } from '../../../components/ui/RoleBasedMenu';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationCenter = () => {
  const { isDonor, isRecipient, isAdmin } = useRole();
  const [filter, setFilter] = useState('all');

  const getDonorNotifications = () => [
    {
      id: 1,
      type: 'urgent',
      title: 'Pickup Request',
      message: 'Community Kitchen wants to pickup your prepared meals within 2 hours',
      time: '15 minutes ago',
      icon: 'Clock',
      color: 'text-error',
      bgColor: 'bg-error/10',
      actionRequired: true
    },
    {
      id: 2,
      type: 'info',
      title: 'Food Expiring Soon',
      message: 'Your fresh vegetables listing expires in 4 hours',
      time: '1 hour ago',
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      actionRequired: true
    },
    {
      id: 3,
      type: 'success',
      title: 'Pickup Confirmed',
      message: 'Sarah M. confirmed pickup for tomorrow at 2:00 PM',
      time: '3 hours ago',
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      actionRequired: false
    },
    {
      id: 4,
      type: 'info',
      title: 'New Message',
      message: 'Local Food Bank sent you a message about bulk donations',
      time: '5 hours ago',
      icon: 'MessageSquare',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      actionRequired: false
    }
  ];

  const getRecipientNotifications = () => [
    {
      id: 1,
      type: 'urgent',
      title: 'Emergency Food Available',
      message: 'Fresh meals available for immediate pickup at Downtown Restaurant',
      time: '5 minutes ago',
      icon: 'Heart',
      color: 'text-error',
      bgColor: 'bg-error/10',
      actionRequired: true
    },
    {
      id: 2,
      type: 'info',
      title: 'Pickup Reminder',
      message: 'Don\'t forget to pickup bread from Sunrise Bakery today at 4:00 PM',
      time: '2 hours ago',
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      actionRequired: true
    },
    {
      id: 3,
      type: 'success',
      title: 'Request Approved',
      message: 'Your request for fresh produce has been approved by Green Market',
      time: '4 hours ago',
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      actionRequired: false
    },
    {
      id: 4,
      type: 'info',
      title: 'New Donor Nearby',
      message: 'Healthy Eats Restaurant joined and is 0.5 miles from you',
      time: '1 day ago',
      icon: 'MapPin',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      actionRequired: false
    }
  ];

  const getAdminNotifications = () => [
    {
      id: 1,
      type: 'urgent',
      title: 'Safety Report',
      message: 'Food safety concern reported for listing #1247 - requires immediate review',
      time: '10 minutes ago',
      icon: 'AlertTriangle',
      color: 'text-error',
      bgColor: 'bg-error/10',
      actionRequired: true
    },
    {
      id: 2,
      type: 'info',
      title: 'Verification Pending',
      message: '3 new restaurants awaiting verification approval',
      time: '1 hour ago',
      icon: 'Shield',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      actionRequired: true
    },
    {
      id: 3,
      type: 'success',
      title: 'System Update',
      message: 'Platform maintenance completed successfully - all systems operational',
      time: '6 hours ago',
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      actionRequired: false
    },
    {
      id: 4,
      type: 'info',
      title: 'Usage Spike',
      message: 'Unusual high activity detected - 200% increase in donations today',
      time: '8 hours ago',
      icon: 'TrendingUp',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      actionRequired: false
    }
  ];

  const getNotifications = () => {
    if (isDonor) return getDonorNotifications();
    if (isRecipient) return getRecipientNotifications();
    if (isAdmin) return getAdminNotifications();
    return [];
  };

  const notifications = getNotifications();
  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications?.filter(n => n?.type === filter);

  const urgentCount = notifications?.filter(n => n?.type === 'urgent')?.length;

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-1 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
          {urgentCount > 0 && (
            <span className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-error rounded-full">
              {urgentCount}
            </span>
          )}
        </div>
        <Button variant="ghost" size="sm">
          <Icon name="Settings" size={16} />
        </Button>
      </div>
      {/* Filter Tabs */}
      <div className="flex space-x-1 mb-4 p-1 bg-muted rounded-lg">
        {['all', 'urgent', 'info', 'success']?.map((filterType) => (
          <button
            key={filterType}
            onClick={() => setFilter(filterType)}
            className={`flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 capitalize ${
              filter === filterType
                ? 'bg-background text-foreground shadow-sm'
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {filterType}
          </button>
        ))}
      </div>
      {/* Notifications List */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredNotifications?.length === 0 ? (
          <div className="text-center py-8">
            <Icon name="Bell" size={48} className="text-muted-foreground mx-auto mb-2" />
            <p className="text-muted-foreground">No notifications found</p>
          </div>
        ) : (
          filteredNotifications?.map((notification) => (
            <div
              key={notification?.id}
              className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-elevation-1 ${
                notification?.actionRequired
                  ? 'border-l-4 border-l-warning bg-warning/5' :'border-border'
              }`}
            >
              <div className="flex items-start space-x-3">
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 ${notification?.bgColor}`}>
                  <Icon name={notification?.icon} size={16} className={notification?.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-foreground">{notification?.title}</h3>
                    <span className="text-xs text-muted-foreground">{notification?.time}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{notification?.message}</p>
                  {notification?.actionRequired && (
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="ghost">
                        Dismiss
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {filteredNotifications?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border text-center">
          <Button variant="ghost" size="sm">
            Mark All as Read
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter;