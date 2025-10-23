import React from 'react';
import { useRole } from '../../../components/ui/RoleBasedMenu';
import Icon from '../../../components/AppIcon';

const ImpactMetrics = () => {
  const { isDonor, isRecipient, isAdmin } = useRole();

  // Mock data based on user role
  const getDonorMetrics = () => [
    {
      label: 'Meals Donated',
      value: '247',
      change: '+12 this week',
      icon: 'Utensils',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Food Saved',
      value: '89 lbs',
      change: '+5.2 lbs today',
      icon: 'Leaf',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'People Helped',
      value: '156',
      change: '+8 this month',
      icon: 'Users',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Impact Score',
      value: '4.8/5',
      change: '92% positive',
      icon: 'Star',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  const getRecipientMetrics = () => [
    {
      label: 'Meals Received',
      value: '34',
      change: '+3 this week',
      icon: 'ShoppingBag',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Money Saved',
      value: '$127',
      change: '+$18 this month',
      icon: 'DollarSign',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Nearby Donors',
      value: '23',
      change: '5 new this week',
      icon: 'MapPin',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Requests Fulfilled',
      value: '89%',
      change: 'Above average',
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  const getAdminMetrics = () => [
    {
      label: 'Total Users',
      value: '2,847',
      change: '+127 this month',
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      label: 'Active Listings',
      value: '156',
      change: '+23 today',
      icon: 'List',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      label: 'Successful Matches',
      value: '1,234',
      change: '+45 this week',
      icon: 'Heart',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      label: 'Platform Health',
      value: '98.2%',
      change: 'Excellent',
      icon: 'Activity',
      color: 'text-success',
      bgColor: 'bg-success/10'
    }
  ];

  const getMetrics = () => {
    if (isDonor) return getDonorMetrics();
    if (isRecipient) return getRecipientMetrics();
    if (isAdmin) return getAdminMetrics();
    return [];
  };

  const metrics = getMetrics();

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-1 mb-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Your Impact</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics?.map((metric, index) => (
          <div key={index} className="p-4 rounded-lg border border-border hover:shadow-elevation-2 transition-shadow duration-200">
            <div className="flex items-center justify-between mb-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${metric?.bgColor}`}>
                <Icon name={metric?.icon} size={20} className={metric?.color} />
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold text-foreground mb-1">{metric?.value}</p>
              <p className="text-sm text-muted-foreground mb-1">{metric?.label}</p>
              <p className="text-xs text-success">{metric?.change}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImpactMetrics;