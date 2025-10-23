import React, { useState } from 'react';
import { useRole } from '../../../components/ui/RoleBasedMenu';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const CommunityLeaderboard = () => {
  const { userRole } = useRole();
  const [timeframe, setTimeframe] = useState('week');

  const getDonorLeaderboard = () => [
    {
      rank: 1,
      name: 'Green Valley Restaurant',
      avatar: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      metric: '156 meals',
      badge: 'gold',
      change: '+12',
      verified: true
    },
    {
      rank: 2,
      name: 'Sunrise Bakery',
      avatar: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      metric: '89 items',
      badge: 'silver',
      change: '+8',
      verified: true
    },
    {
      rank: 3,
      name: 'Downtown Market',
      avatar: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      metric: '67 lbs',
      badge: 'bronze',
      change: '+5',
      verified: false
    },
    {
      rank: 4,
      name: 'Healthy Bites Cafe',
      avatar: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      metric: '45 meals',
      badge: null,
      change: '+3',
      verified: true
    },
    {
      rank: 5,
      name: 'Fresh Corner Deli',
      avatar: 'https://images.pexels.com/photos/1600727/pexels-photo-1600727.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop',
      metric: '32 items',
      badge: null,
      change: '+2',
      verified: false
    }
  ];

  const getVolunteerLeaderboard = () => [
    {
      rank: 1,
      name: 'Sarah Martinez',
      avatar: 'https://randomuser.me/api/portraits/women/32.jpg',
      metric: '23 deliveries',
      badge: 'gold',
      change: '+5',
      verified: true
    },
    {
      rank: 2,
      name: 'Michael Chen',
      avatar: 'https://randomuser.me/api/portraits/men/45.jpg',
      metric: '18 pickups',
      badge: 'silver',
      change: '+3',
      verified: true
    },
    {
      rank: 3,
      name: 'Emma Johnson',
      avatar: 'https://randomuser.me/api/portraits/women/28.jpg',
      metric: '15 assists',
      badge: 'bronze',
      change: '+4',
      verified: false
    },
    {
      rank: 4,
      name: 'David Wilson',
      avatar: 'https://randomuser.me/api/portraits/men/35.jpg',
      metric: '12 deliveries',
      badge: null,
      change: '+2',
      verified: true
    },
    {
      rank: 5,
      name: 'Lisa Thompson',
      avatar: 'https://randomuser.me/api/portraits/women/42.jpg',
      metric: '9 pickups',
      badge: null,
      change: '+1',
      verified: false
    }
  ];

  const getLeaderboardData = () => {
    return userRole === 'admin' ? getVolunteerLeaderboard() : getDonorLeaderboard();
  };

  const getLeaderboardTitle = () => {
    if (userRole === 'admin') return 'Top Volunteers';
    return 'Top Donors';
  };

  const getBadgeColor = (badge) => {
    switch (badge) {
      case 'gold': return 'text-yellow-600 bg-yellow-100';
      case 'silver': return 'text-gray-600 bg-gray-100';
      case 'bronze': return 'text-orange-600 bg-orange-100';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'gold': return 'Crown';
      case 'silver': return 'Medal';
      case 'bronze': return 'Award';
      default: return 'User';
    }
  };

  const leaderboardData = getLeaderboardData();

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-1 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold text-foreground">{getLeaderboardTitle()}</h2>
        <div className="flex items-center space-x-2">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e?.target?.value)}
            className="text-sm border border-border rounded-md px-2 py-1 bg-background"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
        </div>
      </div>
      <div className="space-y-3">
        {leaderboardData?.map((entry, index) => (
          <div
            key={entry?.rank}
            className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 hover:shadow-elevation-1 ${
              index < 3 ? 'bg-gradient-to-r from-primary/5 to-transparent border border-primary/10' : 'hover:bg-muted/50'
            }`}
          >
            {/* Rank */}
            <div className="flex items-center justify-center w-8 h-8 flex-shrink-0">
              {entry?.badge ? (
                <div className={`flex items-center justify-center w-8 h-8 rounded-full ${getBadgeColor(entry?.badge)}`}>
                  <Icon name={getBadgeIcon(entry?.badge)} size={16} />
                </div>
              ) : (
                <span className="text-lg font-bold text-muted-foreground">#{entry?.rank}</span>
              )}
            </div>

            {/* Avatar */}
            <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
              <Image 
                src={entry?.avatar} 
                alt={entry?.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-medium text-foreground truncate">{entry?.name}</h3>
                {entry?.verified && (
                  <Icon name="CheckCircle" size={14} className="text-success flex-shrink-0" />
                )}
              </div>
              <p className="text-sm text-muted-foreground">{entry?.metric}</p>
            </div>

            {/* Change */}
            <div className="flex items-center space-x-1 text-sm text-success">
              <Icon name="TrendingUp" size={14} />
              <span>{entry?.change}</span>
            </div>
          </div>
        ))}
      </div>
      {/* Your Position */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
          <div className="flex items-center space-x-3">
            <span className="text-sm font-medium text-muted-foreground">#12</span>
            <span className="text-sm text-foreground">Your Position</span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-primary">
              {userRole === 'admin' ? '7 assists' : '28 meals'}
            </span>
            <Icon name="TrendingUp" size={14} className="text-success" />
          </div>
        </div>
      </div>
      {/* Achievement Progress */}
      <div className="mt-4 p-3 bg-muted/30 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Next Achievement</span>
          <span className="text-xs text-muted-foreground">72% complete</span>
        </div>
        <div className="w-full bg-muted rounded-full h-2 mb-2">
          <div className="bg-primary h-2 rounded-full" style={{ width: '72%' }}></div>
        </div>
        <p className="text-xs text-muted-foreground">
          {userRole === 'admin' ? '3 more assists to reach "Community Helper" badge' : '7 more meals to reach "Food Hero" badge'}
        </p>
      </div>
    </div>
  );
};

export default CommunityLeaderboard;