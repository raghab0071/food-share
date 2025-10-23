import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import MetricsCard from './components/MetricsCard';
import ActivityFeed from './components/ActivityFeed';
import TrendChart from './components/TrendChart';
import UserManagement from './components/UserManagement';
import ContentModeration from './components/ContentModeration';
import GeographicHeatMap from './components/GeographicHeatMap';
import SystemHealth from './components/SystemHealth';

const AdminDashboard = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTimeRange, setSelectedTimeRange] = useState('7d');

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const metricsData = [
    {
      title: 'Total Food Rescued',
      value: '12,847 lbs',
      change: '+15.3%',
      changeType: 'positive',
      icon: 'Package',
      color: 'success'
    },
    {
      title: 'Active Users',
      value: '1,247',
      change: '+8.7%',
      changeType: 'positive',
      icon: 'Users',
      color: 'primary'
    },
    {
      title: 'Successful Matches',
      value: '892',
      change: '+12.1%',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'accent'
    },
    {
      title: 'Pending Reports',
      value: '23',
      change: '-5.2%',
      changeType: 'negative',
      icon: 'AlertTriangle',
      color: 'warning'
    }
  ];

  const trendData = [
    { name: 'Jan', donations: 45, matches: 38, users: 120 },
    { name: 'Feb', donations: 68, matches: 52, users: 180 },
    { name: 'Mar', donations: 89, matches: 71, users: 240 },
    { name: 'Apr', donations: 112, matches: 95, users: 320 },
    { name: 'May', donations: 98, matches: 82, users: 280 },
    { name: 'Jun', donations: 134, matches: 118, users: 380 },
    { name: 'Jul', donations: 156, matches: 142, users: 420 },
    { name: 'Aug', donations: 178, matches: 165, users: 480 }
  ];

  const quickActions = [
    {
      title: 'Review Reports',
      description: 'Check pending user reports and flagged content',
      icon: 'Flag',
      count: 23,
      color: 'warning'
    },
    {
      title: 'Verify Users',
      description: 'Approve pending business verifications',
      icon: 'Shield',
      count: 8,
      color: 'primary'
    },
    {
      title: 'System Alerts',
      description: 'Monitor system health and performance',
      icon: 'AlertCircle',
      count: 3,
      color: 'accent'
    },
    {
      title: 'Export Data',
      description: 'Generate reports for stakeholders',
      icon: 'Download',
      count: null,
      color: 'success'
    }
  ];

  const formatTime = (date) => {
    return date?.toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Header */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Platform overview and management tools • {formatTime(currentTime)}
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <select
                value={selectedTimeRange}
                onChange={(e) => setSelectedTimeRange(e?.target?.value)}
                className="px-3 py-2 border border-border rounded-lg bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="24h">Last 24 Hours</option>
                <option value="7d">Last 7 Days</option>
                <option value="30d">Last 30 Days</option>
                <option value="90d">Last 90 Days</option>
              </select>
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Icon name="RefreshCw" size={16} />
                <span>Refresh</span>
              </button>
            </div>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metricsData?.map((metric, index) => (
            <MetricsCard
              key={index}
              title={metric?.title}
              value={metric?.value}
              change={metric?.change}
              changeType={metric?.changeType}
              icon={metric?.icon}
              color={metric?.color}
            />
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions?.map((action, index) => (
              <button
                key={index}
                className="p-4 bg-card border border-border rounded-lg hover:shadow-elevation-2 transition-all text-left group"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${
                    action?.color === 'warning' ? 'bg-warning text-warning-foreground' :
                    action?.color === 'primary' ? 'bg-primary text-primary-foreground' :
                    action?.color === 'accent' ? 'bg-accent text-accent-foreground' :
                    'bg-success text-success-foreground'
                  }`}>
                    <Icon name={action?.icon} size={20} />
                  </div>
                  {action?.count && (
                    <span className="text-sm font-bold text-foreground">{action?.count}</span>
                  )}
                </div>
                <h3 className="font-medium text-foreground mb-1 group-hover:text-primary transition-colors">
                  {action?.title}
                </h3>
                <p className="text-sm text-muted-foreground">{action?.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Charts and Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            <TrendChart
              title="Platform Activity Trends"
              data={trendData}
              type="bar"
              color="#2D5A27"
            />
          </div>
          <div>
            <ActivityFeed />
          </div>
        </div>

        {/* User Management */}
        <div className="mb-8">
          <UserManagement />
        </div>

        {/* Content Moderation and Geographic Analysis */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
          <ContentModeration />
          <GeographicHeatMap />
        </div>

        {/* System Health */}
        <div className="mb-8">
          <SystemHealth />
        </div>

        {/* Additional Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-card rounded-lg shadow-elevation-1 border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Impact Summary</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Leaf" size={20} className="text-success" />
                  <span className="text-foreground">CO₂ Emissions Saved</span>
                </div>
                <span className="font-bold text-foreground">2,847 lbs</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="Users" size={20} className="text-primary" />
                  <span className="text-foreground">People Fed</span>
                </div>
                <span className="font-bold text-foreground">15,234</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                <div className="flex items-center space-x-3">
                  <Icon name="DollarSign" size={20} className="text-accent" />
                  <span className="text-foreground">Economic Value</span>
                </div>
                <span className="font-bold text-foreground">$89,456</span>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-lg shadow-elevation-1 border border-border p-6">
            <h3 className="text-lg font-semibold text-foreground mb-4">Platform Statistics</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Registered Donors</span>
                <span className="font-medium text-foreground">342</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Registered Recipients</span>
                <span className="font-medium text-foreground">905</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Average Response Time</span>
                <span className="font-medium text-foreground">2.3 hours</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Success Rate</span>
                <span className="font-medium text-success">94.7%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Monthly Growth</span>
                <span className="font-medium text-success">+12.3%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;