import React from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DonorProfile = ({ donor }) => {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < Math.floor(rating) ? 'text-warning fill-current' : 'text-muted-foreground'}
      />
    ));
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-1">
      <h3 className="text-lg font-semibold text-foreground mb-4">Donor Information</h3>
      <div className="space-y-4">
        {/* Donor Header */}
        <div className="flex items-start gap-4">
          <div className="relative">
            <Image
              src={donor?.avatar}
              alt={donor?.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            {donor?.isVerified && (
              <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={14} className="text-white" />
              </div>
            )}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold text-foreground">{donor?.name}</h4>
              {donor?.isVerified && (
                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                  <Icon name="Shield" size={12} className="mr-1" />
                  Verified
                </span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{donor?.type}</p>
            
            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                {renderStars(donor?.rating)}
              </div>
              <span className="text-sm font-medium text-foreground">{donor?.rating}</span>
              <span className="text-sm text-muted-foreground">({donor?.reviewCount} reviews)</span>
            </div>
          </div>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-3 gap-4 py-4 border-t border-b border-border">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">{donor?.totalDonations}</p>
            <p className="text-sm text-muted-foreground">Donations</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-success">{donor?.mealsProvided}</p>
            <p className="text-sm text-muted-foreground">Meals</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-accent">{donor?.monthsActive}</p>
            <p className="text-sm text-muted-foreground">Months</p>
          </div>
        </div>

        {/* Recent Activity */}
        <div>
          <h5 className="font-medium text-foreground mb-3">Recent Donations</h5>
          <div className="space-y-2">
            {donor?.recentDonations?.map((donation, index) => (
              <div key={index} className="flex items-center justify-between py-2">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Icon name="Package" size={14} className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">{donation?.item}</p>
                    <p className="text-xs text-muted-foreground">{donation?.date}</p>
                  </div>
                </div>
                <span className="text-xs text-success font-medium">{donation?.status}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Actions */}
        <div className="flex gap-2 pt-4">
          <Button variant="outline" size="sm" className="flex-1">
            <Icon name="MessageCircle" size={16} className="mr-2" />
            Message
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Share2" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;