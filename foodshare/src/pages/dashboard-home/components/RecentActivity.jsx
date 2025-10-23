import React from 'react';
import { useRole } from '../../../components/ui/RoleBasedMenu';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const RecentActivity = () => {
  const { isDonor, isRecipient, isAdmin } = useRole();

  const getDonorActivities = () => [
    {
      id: 1,
      type: 'pickup_scheduled',
      title: 'Pickup Scheduled',
      description: 'Sarah M. scheduled pickup for fresh vegetables',
      time: '2 hours ago',
      icon: 'Calendar',
      color: 'text-success',
      bgColor: 'bg-success/10',
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 2,
      type: 'new_request',
      title: 'New Request',
      description: 'Community Kitchen requested prepared meals',
      time: '4 hours ago',
      icon: 'MessageSquare',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 3,
      type: 'pickup_completed',
      title: 'Pickup Completed',
      description: 'Food Bank collected 25 lbs of bread',
      time: '1 day ago',
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 4,
      type: 'review_received',
      title: 'Review Received',
      description: 'Local Shelter left a 5-star review',
      time: '2 days ago',
      icon: 'Star',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      image: null
    }
  ];

  const getRecipientActivities = () => [
    {
      id: 1,
      type: 'food_reserved',
      title: 'Food Reserved',
      description: 'Reserved fresh produce from Green Market',
      time: '1 hour ago',
      icon: 'ShoppingBag',
      color: 'text-success',
      bgColor: 'bg-success/10',
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 2,
      type: 'pickup_reminder',
      title: 'Pickup Reminder',
      description: 'Don\'t forget to pickup bread from Sunrise Bakery',
      time: '3 hours ago',
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 3,
      type: 'new_donation',
      title: 'New Donation Available',
      description: 'Fresh meals available at Downtown Restaurant',
      time: '5 hours ago',
      icon: 'Heart',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      id: 4,
      type: 'request_fulfilled',
      title: 'Request Fulfilled',
      description: 'Your emergency food request was matched',
      time: '1 day ago',
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10',
      image: null
    }
  ];

  const getAdminActivities = () => [
    {
      id: 1,
      type: 'user_verification',
      title: 'User Verified',
      description: 'New restaurant "Tasty Bites" verified successfully',
      time: '30 minutes ago',
      icon: 'Shield',
      color: 'text-success',
      bgColor: 'bg-success/10',
      image: null
    },
    {
      id: 2,
      type: 'report_resolved',
      title: 'Report Resolved',
      description: 'Food safety concern addressed and closed',
      time: '2 hours ago',
      icon: 'AlertTriangle',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      image: null
    },
    {
      id: 3,
      type: 'system_alert',
      title: 'System Alert',
      description: 'High donation activity detected in downtown area',
      time: '4 hours ago',
      icon: 'Activity',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      image: null
    },
    {
      id: 4,
      type: 'milestone_reached',
      title: 'Milestone Reached',
      description: 'Platform reached 10,000 successful food matches',
      time: '1 day ago',
      icon: 'Trophy',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      image: null
    }
  ];

  const getActivities = () => {
    if (isDonor) return getDonorActivities();
    if (isRecipient) return getRecipientActivities();
    if (isAdmin) return getAdminActivities();
    return [];
  };

  const activities = getActivities();

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-1 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">Recent Activity</h2>
        <button className="text-sm text-primary hover:text-primary/80 transition-colors duration-200">
          View All
        </button>
      </div>
      <div className="space-y-4">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200">
            <div className={`flex items-center justify-center w-10 h-10 rounded-lg flex-shrink-0 ${activity?.bgColor}`}>
              <Icon name={activity?.icon} size={18} className={activity?.color} />
            </div>
            {activity?.image && (
              <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                <Image 
                  src={activity?.image} 
                  alt={activity?.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-foreground mb-1">{activity?.title}</h3>
              <p className="text-sm text-muted-foreground mb-1">{activity?.description}</p>
              <p className="text-xs text-muted-foreground">{activity?.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;