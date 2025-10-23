import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemHealth = () => {
  const systemMetrics = [
    {
      name: 'API Response Time',
      value: '245ms',
      status: 'good',
      trend: 'stable',
      target: '< 300ms'
    },
    {
      name: 'Database Performance',
      value: '98.7%',
      status: 'excellent',
      trend: 'improving',
      target: '> 95%'
    },
    {
      name: 'Server Uptime',
      value: '99.9%',
      status: 'excellent',
      trend: 'stable',
      target: '> 99.5%'
    },
    {
      name: 'Error Rate',
      value: '0.02%',
      status: 'good',
      trend: 'decreasing',
      target: '< 0.1%'
    },
    {
      name: 'Active Users',
      value: '1,247',
      status: 'good',
      trend: 'increasing',
      target: 'N/A'
    },
    {
      name: 'Storage Usage',
      value: '67%',
      status: 'warning',
      trend: 'increasing',
      target: '< 80%'
    }
  ];

  const recentAlerts = [
    {
      id: 1,
      type: 'warning',
      message: 'Storage usage approaching 70% threshold',
      timestamp: '2024-08-20 17:45:00',
      resolved: false
    },
    {
      id: 2,
      type: 'info',
      message: 'Scheduled maintenance completed successfully',
      timestamp: '2024-08-20 15:30:00',
      resolved: true
    },
    {
      id: 3,
      type: 'error',
      message: 'Temporary API slowdown detected and resolved',
      timestamp: '2024-08-20 14:15:00',
      resolved: true
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'excellent':
        return 'text-success';
      case 'good':
        return 'text-primary';
      case 'warning':
        return 'text-warning';
      case 'critical':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'excellent':
        return 'CheckCircle2';
      case 'good':
        return 'CheckCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'critical':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'increasing':
        return 'TrendingUp';
      case 'decreasing':
        return 'TrendingDown';
      case 'stable':
        return 'Minus';
      case 'improving':
        return 'ArrowUp';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'increasing': case'improving':
        return 'text-success';
      case 'decreasing':
        return 'text-error';
      case 'stable':
        return 'text-muted-foreground';
      default:
        return 'text-muted-foreground';
    }
  };

  const getAlertIcon = (type) => {
    switch (type) {
      case 'error':
        return 'XCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'info':
        return 'Info';
      default:
        return 'Circle';
    }
  };

  const getAlertColor = (type) => {
    switch (type) {
      case 'error':
        return 'text-error';
      case 'warning':
        return 'text-warning';
      case 'info':
        return 'text-primary';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 border border-border">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">System Health</h3>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
              <span className="text-sm text-success font-medium">All Systems Operational</span>
            </div>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {systemMetrics?.map((metric, index) => (
            <div key={index} className="p-4 border border-border rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Icon 
                    name={getStatusIcon(metric?.status)} 
                    size={16} 
                    className={getStatusColor(metric?.status)} 
                  />
                  <span className="text-sm font-medium text-foreground">{metric?.name}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon 
                    name={getTrendIcon(metric?.trend)} 
                    size={14} 
                    className={getTrendColor(metric?.trend)} 
                  />
                </div>
              </div>
              <div className="mb-1">
                <span className="text-xl font-bold text-foreground">{metric?.value}</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Target: {metric?.target}
              </div>
            </div>
          ))}
        </div>
        
        {/* Recent Alerts */}
        <div>
          <h4 className="text-sm font-medium text-foreground mb-3">Recent Alerts</h4>
          <div className="space-y-2">
            {recentAlerts?.map((alert) => (
              <div 
                key={alert?.id} 
                className={`flex items-start space-x-3 p-3 rounded-lg border ${
                  alert?.resolved ? 'bg-muted/30 border-border' : 'bg-card border-border'
                }`}
              >
                <Icon 
                  name={getAlertIcon(alert?.type)} 
                  size={16} 
                  className={`mt-0.5 ${getAlertColor(alert?.type)} ${alert?.resolved ? 'opacity-60' : ''}`} 
                />
                <div className="flex-1 min-w-0">
                  <p className={`text-sm ${alert?.resolved ? 'text-muted-foreground' : 'text-foreground'}`}>
                    {alert?.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">{alert?.timestamp}</p>
                </div>
                {alert?.resolved && (
                  <Icon name="Check" size={14} className="text-success mt-0.5" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SystemHealth;