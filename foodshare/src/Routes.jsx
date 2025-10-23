import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import { RoleProvider } from "./components/ui/RoleBasedMenu";
import NotFound from "pages/NotFound";
import FoodDetailRequest from './pages/food-detail-request';
import AdminDashboard from './pages/admin-dashboard';
import MessagesAndCommunication from './pages/messages-communication';
import UserRegistrationLogin from './pages/user-registration-login';
import DashboardHome from './pages/dashboard-home';
import FoodListingCreation from './pages/food-listing-creation';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <RoleProvider>
          <ScrollToTop />
          <RouterRoutes>
            {/* Define your route here */}
            <Route path="/" element={<AdminDashboard />} />
            <Route path="/food-detail-request" element={<FoodDetailRequest />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/messages-communication" element={<MessagesAndCommunication />} />
            <Route path="/user-registration-login" element={<UserRegistrationLogin />} />
            <Route path="/dashboard-home" element={<DashboardHome />} />
            <Route path="/food-listing-creation" element={<FoodListingCreation />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </RoleProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;