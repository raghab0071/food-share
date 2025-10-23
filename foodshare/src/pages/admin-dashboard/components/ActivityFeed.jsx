import React from 'react';
import Icon from '../../../components/AppIcon';

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'donation',
      user: 'Green Valley Restaurant',
      action: 'posted new food donation',
      item: '50 meals - Vegetable Curry & Rice',
      timestamp: '2 minutes ago',
      status: 'active',
      icon: 'Plus'
    },
    {
      id: 2,
      type: 'match',
      user: 'City Food Bank',
      action: 'claimed donation from',
      item: 'Downtown Bakery - 30 bread loaves',
      timestamp: '15 minutes ago',
      status: 'completed',
      icon: 'CheckCircle'
    },
    {
      id: 3,
      type: 'report',
      user: 'Anonymous User',
      action: 'reported inappropriate content',
      item: 'Food listing #FB-2024-0892',
      timestamp: '1 hour ago',
      status: 'pending',
      icon: 'AlertTriangle'
    },
    {
      id: 4,
      type: 'verification',
      user: 'Metro Grocery Chain',
      action: 'completed business verification',
      item: 'Donor account approved',
      timestamp: '2 hours ago',
      status: 'approved',
      icon: 'Shield'
    },
    {
      id: 5,
      type: 'user',
      user: 'Sarah Johnson',
      action: 'registered as new recipient',
      item: 'Community Shelter Association',
      timestamp: '3 hours ago',
      status: 'new',
      icon: 'UserPlus'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return 'text-success';
      case 'pending':
        return 'text-warning';
      case 'active':
        return 'text-primary';
      case 'new':
        return 'text-accent';
      default:
        return 'text-muted-foreground';
    }
  };

  const getIconColor = (type) => {
    switch (type) {
      case 'donation':
        return 'text-primary';
      case 'match':
        return 'text-success';
      case 'report':
        return 'text-warning';
      case 'verification':
        return 'text-accent';
      case 'user':
        return 'text-secondary';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <button className="text-sm text-primary hover:text-primary/80 transition-colors">
            View All
          </button>
        </div>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {activities?.map((activity) => (
            <div key={activity?.id} className="flex items-start space-x-3">
              <div className={`p-2 rounded-full bg-muted ${getIconColor(activity?.type)}`}>
                <Icon name={activity?.icon} size={16} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-medium text-foreground">{activity?.user}</span>
                  <span className="text-sm text-muted-foreground">{activity?.action}</span>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{activity?.item}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{activity?.timestamp}</span>
                  <span className={`text-xs font-medium capitalize ${getStatusColor(activity?.status)}`}>
                    {activity?.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityFeed;