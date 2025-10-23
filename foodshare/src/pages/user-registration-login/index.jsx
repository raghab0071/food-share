import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Icon from '../../components/AppIcon';
import AuthTabs from './components/AuthTabs';
import SocialLogin from './components/SocialLogin';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import ForgotPasswordModal from './components/ForgotPasswordModal';

const UserRegistrationLogin = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  useEffect(() => {
    // Check for saved language preference
    const savedLanguage = localStorage.getItem('selectedLanguage') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Implement social login logic here
  };

  const handleLoginSuccess = (userRole) => {
    console.log(`Login successful for ${userRole}`);
    // Additional login success logic can be added here
  };

  const handleRegisterSuccess = (userRole) => {
    console.log(`Registration successful for ${userRole}`);
    // Additional registration success logic can be added here
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleForgotPassword = () => {
    setShowForgotPassword(true);
  };

  const closeForgotPasswordModal = () => {
    setShowForgotPassword(false);
  };

  return (
    <>
      <Helmet>
        <title>{activeTab === 'login' ? 'Sign In' : 'Create Account'} - FoodShare</title>
        <meta name="description" content="Join FoodShare to connect food donors with recipients and help reduce food waste in your community." />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <header className="sticky top-0 z-40 w-full bg-card border-b border-border shadow-elevation-1">
          <div className="flex h-16 items-center justify-between px-4 lg:px-6">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-8 h-8 bg-primary rounded-lg">
                <Icon name="Utensils" size={20} color="white" />
              </div>
              <span className="font-heading font-bold text-xl text-foreground">
                FoodShare
              </span>
            </Link>

            {/* Language Selector */}
            <div className="flex items-center space-x-3">
              <select
                value={currentLanguage}
                onChange={(e) => {
                  setCurrentLanguage(e?.target?.value);
                  localStorage.setItem('selectedLanguage', e?.target?.value);
                }}
                className="text-sm bg-transparent border border-border rounded-md px-2 py-1 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                <option value="en">English</option>
                <option value="es">Español</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 flex items-center justify-center p-4 py-8">
          <div className="w-full max-w-md lg:max-w-lg">
            {/* Welcome Section */}
            <div className="text-center mb-8">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mx-auto mb-4">
                <Icon name="Users" size={32} className="text-primary" />
              </div>
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                {activeTab === 'login' ? 'Welcome Back' : 'Join FoodShare'}
              </h1>
              <p className="text-muted-foreground">
                {activeTab === 'login' ?'Sign in to continue making a difference in your community' :'Connect donors with recipients to reduce food waste'
                }
              </p>
            </div>

            {/* Auth Card */}
            <div className="bg-card rounded-lg shadow-elevation-2 border border-border p-6 lg:p-8">
              <AuthTabs activeTab={activeTab} onTabChange={handleTabChange} />
              
              <SocialLogin onSocialLogin={handleSocialLogin} />
              
              {activeTab === 'login' ? (
                <LoginForm 
                  onForgotPassword={handleForgotPassword}
                  onLoginSuccess={handleLoginSuccess}
                />
              ) : (
                <RegisterForm onRegisterSuccess={handleRegisterSuccess} />
              )}
            </div>

            {/* Footer Links */}
            <div className="text-center mt-6 space-y-2">
              <p className="text-sm text-muted-foreground">
                {activeTab === 'login' ? "Don't have an account? " : "Already have an account? "}
                <button
                  onClick={() => setActiveTab(activeTab === 'login' ? 'register' : 'login')}
                  className="text-primary hover:text-primary/80 font-medium"
                >
                  {activeTab === 'login' ? 'Create one here' : 'Sign in here'}
                </button>
              </p>
              
              <div className="flex items-center justify-center space-x-4 text-xs text-muted-foreground">
                <Link to="/terms" className="hover:text-foreground">Terms of Service</Link>
                <span>•</span>
                <Link to="/privacy" className="hover:text-foreground">Privacy Policy</Link>
                <span>•</span>
                <Link to="/help" className="hover:text-foreground">Help Center</Link>
              </div>
            </div>

            {/* Community Impact Stats */}
            <div className="mt-8 p-4 bg-muted/50 rounded-lg">
              <h3 className="text-sm font-semibold text-foreground mb-3 text-center">
                Join Our Growing Community
              </h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-primary">12,500+</div>
                  <div className="text-xs text-muted-foreground">Meals Shared</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary">850+</div>
                  <div className="text-xs text-muted-foreground">Active Users</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-primary">95%</div>
                  <div className="text-xs text-muted-foreground">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Forgot Password Modal */}
        <ForgotPasswordModal 
          isOpen={showForgotPassword}
          onClose={closeForgotPasswordModal}
        />

        {/* Footer */}
        <footer className="bg-card border-t border-border py-6">
          <div className="max-w-7xl mx-auto px-4 lg:px-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2">
                <div className="flex items-center justify-center w-6 h-6 bg-primary rounded">
                  <Icon name="Utensils" size={14} color="white" />
                </div>
                <span className="text-sm text-muted-foreground">
                  © {new Date()?.getFullYear()} FoodShare. All rights reserved.
                </span>
              </div>
              
              <div className="flex items-center space-x-6">
                <Link to="/about" className="text-sm text-muted-foreground hover:text-foreground">
                  About Us
                </Link>
                <Link to="/contact" className="text-sm text-muted-foreground hover:text-foreground">
                  Contact
                </Link>
                <Link to="/blog" className="text-sm text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default UserRegistrationLogin;