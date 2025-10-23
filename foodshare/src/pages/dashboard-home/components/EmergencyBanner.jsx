import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRole } from '../../../components/ui/RoleBasedMenu';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const EmergencyBanner = () => {
  const { isRecipient } = useRole();
  const [isVisible, setIsVisible] = useState(true);
  const [emergencyActive, setEmergencyActive] = useState(false);

  // Only show for recipients
  if (!isRecipient || !isVisible) return null;

  const handleEmergencyRequest = () => {
    setEmergencyActive(true);
    // In a real app, this would trigger emergency food request logic
  };

  const handleDismiss = () => {
    setIsVisible(false);
  };

  return (
    <div className="bg-gradient-to-r from-error to-error/80 text-white p-6 rounded-lg mb-6 shadow-elevation-2">
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-4">
          <div className="flex items-center justify-center w-12 h-12 bg-white/20 rounded-full flex-shrink-0">
            <Icon name="AlertTriangle" size={24} color="white" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-2">Need Food Urgently?</h2>
            <p className="text-white/90 mb-4">
              If you're experiencing a food emergency, we can help connect you with immediate assistance. 
              Our emergency network includes food banks, shelters, and volunteers ready to help.
            </p>
            
            {!emergencyActive ? (
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3">
                <Button 
                  variant="secondary"
                  onClick={handleEmergencyRequest}
                  className="bg-white text-error hover:bg-white/90"
                >
                  <Icon name="Heart" size={16} className="mr-2" />
                  Request Emergency Food
                </Button>
                <Link to="/food-detail-request">
                  <Button variant="ghost" className="text-white border-white/30 hover:bg-white/10">
                    <Icon name="Search" size={16} className="mr-2" />
                    Browse Available Food
                  </Button>
                </Link>
              </div>
            ) : (
              <div className="bg-white/10 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="CheckCircle" size={20} color="white" />
                  <span className="font-medium">Emergency Request Activated</span>
                </div>
                <p className="text-white/90 text-sm mb-3">
                  We're notifying nearby donors and volunteers. You should receive responses within 30 minutes.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={14} />
                    <span>Avg response: 15 min</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="Users" size={14} />
                    <span>12 volunteers nearby</span>
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={handleDismiss}
          className="text-white/70 hover:text-white transition-colors duration-200 p-1"
        >
          <Icon name="X" size={20} />
        </button>
      </div>

      {/* Emergency Hotline */}
      <div className="mt-4 pt-4 border-t border-white/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Icon name="Phone" size={16} color="white" />
            <span className="text-sm">24/7 Emergency Hotline:</span>
            <a href="tel:1-800-FOOD-HELP" className="font-bold hover:underline">
              1-800-FOOD-HELP
            </a>
          </div>
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="MapPin" size={14} />
            <span>Find nearest food bank</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmergencyBanner;