import React from 'react';
import Icon from '../../../components/AppIcon';

const FoodInfoCard = ({ foodData }) => {
  const getExpirationStatus = (expirationDate) => {
    const now = new Date();
    const expiry = new Date(expirationDate);
    const hoursUntilExpiry = (expiry - now) / (1000 * 60 * 60);

    if (hoursUntilExpiry < 0) {
      return { status: 'expired', color: 'text-error', bgColor: 'bg-error/10' };
    } else if (hoursUntilExpiry < 24) {
      return { status: 'urgent', color: 'text-warning', bgColor: 'bg-warning/10' };
    } else {
      return { status: 'fresh', color: 'text-success', bgColor: 'bg-success/10' };
    }
  };

  const expirationInfo = getExpirationStatus(foodData?.expirationDate);

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-1">
      <div className="space-y-6">
        {/* Title and Category */}
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">{foodData?.title}</h1>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
              <Icon name="Tag" size={14} className="mr-1" />
              {foodData?.category}
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${expirationInfo?.bgColor} ${expirationInfo?.color}`}>
              <Icon name="Clock" size={14} className="mr-1" />
              {expirationInfo?.status === 'expired' ? 'Expired' : 
               expirationInfo?.status === 'urgent' ? 'Expires Soon' : 'Fresh'}
            </span>
          </div>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{foodData?.description}</p>
        </div>

        {/* Key Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="Package" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Quantity</p>
              <p className="font-semibold text-foreground">{foodData?.quantity}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
              <Icon name="Calendar" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Expires</p>
              <p className="font-semibold text-foreground">
                {new Date(foodData.expirationDate)?.toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
              <Icon name="Users" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Serves</p>
              <p className="font-semibold text-foreground">{foodData?.servingSize}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
              <Icon name="Thermometer" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Storage</p>
              <p className="font-semibold text-foreground">{foodData?.storageType}</p>
            </div>
          </div>
        </div>

        {/* Dietary Information */}
        {foodData?.dietaryInfo && foodData?.dietaryInfo?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-3">Dietary Information</h3>
            <div className="flex flex-wrap gap-2">
              {foodData?.dietaryInfo?.map((info, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary/10 text-secondary"
                >
                  <Icon name="Check" size={14} className="mr-1" />
                  {info}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Food Safety Guidelines */}
        <div className="border-t border-border pt-4">
          <h3 className="text-lg font-semibold text-foreground mb-3">Food Safety Guidelines</h3>
          <div className="space-y-2">
            {foodData?.safetyGuidelines?.map((guideline, index) => (
              <div key={index} className="flex items-start gap-2">
                <Icon name="Shield" size={16} className="text-success mt-0.5 flex-shrink-0" />
                <p className="text-sm text-muted-foreground">{guideline}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodInfoCard;