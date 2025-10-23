import React, { useEffect } from 'react';
import { useRole } from '../../components/ui/RoleBasedMenu';
import Header from '../../components/ui/Header';
import WelcomeHeader from './components/WelcomeHeader';
import QuickActions from './components/QuickActions';
import ImpactMetrics from './components/ImpactMetrics';
import RecentActivity from './components/RecentActivity';
import FoodMap from './components/FoodMap';
import NotificationCenter from './components/NotificationCenter';
import QuickFilters from './components/QuickFilters';
import EmergencyBanner from './components/EmergencyBanner';
import CommunityLeaderboard from './components/CommunityLeaderboard';

const DashboardHome = () => {
  const { userRole, isAuthenticated, login } = useRole();

  useEffect(() => {
    // Mock authentication check - in real app, this would check actual auth state
    if (!isAuthenticated) {
      // Auto-login for demo purposes - remove in production
      login('recipient');
    }
  }, [isAuthenticated, login]);

  // Mock user data - in real app, this would come from API/context
  const userData = {
    name: userRole === 'donor' ? 'Green Valley Restaurant' : userRole === 'admin' ? 'Admin User' : 'Sarah Martinez',
    joinDate: '2024-01-15',
    location: 'New York, NY'
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Welcome Section */}
        <WelcomeHeader userName={userData?.name} />

        {/* Emergency Banner - Only for recipients */}
        <EmergencyBanner />

        {/* Main Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <QuickActions />

            {/* Impact Metrics */}
            <ImpactMetrics />

            {/* Quick Filters - Only for recipients */}
            <QuickFilters />

            {/* Food Map */}
            <FoodMap />

            {/* Recent Activity */}
            <RecentActivity />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Notification Center */}
            <NotificationCenter />

            {/* Community Leaderboard */}
            <CommunityLeaderboard />

            {/* Quick Stats Card */}
            <div className="bg-card rounded-lg p-6 shadow-elevation-1">
              <h3 className="text-lg font-semibold text-foreground mb-4">Platform Stats</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Total Meals Shared</span>
                  <span className="font-bold text-primary">12,847</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active Donors</span>
                  <span className="font-bold text-success">1,234</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Food Saved (lbs)</span>
                  <span className="font-bold text-accent">45,678</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">CO₂ Prevented</span>
                  <span className="font-bold text-warning">2.3 tons</span>
                </div>
              </div>
            </div>

            {/* Weather Widget */}
            <div className="bg-card rounded-lg p-6 shadow-elevation-1">
              <h3 className="text-lg font-semibold text-foreground mb-4">Weather Impact</h3>
              <div className="text-center">
                <div className="text-3xl mb-2">🌤️</div>
                <p className="text-lg font-medium text-foreground">72°F</p>
                <p className="text-sm text-muted-foreground mb-3">Partly Cloudy</p>
                <div className="p-3 bg-success/10 rounded-lg">
                  <p className="text-sm text-success font-medium">Perfect for pickups!</p>
                  <p className="text-xs text-muted-foreground">Great weather for food collection and delivery</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-border text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date()?.getFullYear()} FoodShare. Together, we're reducing food waste and fighting hunger.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default DashboardHome;