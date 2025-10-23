import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ListingPreview = ({ formData, onEdit }) => {
  const {
    category,
    quantity,
    unit,
    photos,
    expirationDate,
    location,
    pickupTimes,
    specialInstructions,
    safetyChecklist,
    title,
    description
  } = formData;

  const getCategoryInfo = (categoryId) => {
    const categories = {
      produce: { name: 'Fresh Produce', icon: 'Apple', color: 'text-green-600' },
      prepared: { name: 'Prepared Meals', icon: 'ChefHat', color: 'text-orange-600' },
      packaged: { name: 'Packaged Goods', icon: 'Package', color: 'text-blue-600' },
      bakery: { name: 'Bakery Items', icon: 'Cookie', color: 'text-yellow-600' },
      dairy: { name: 'Dairy Products', icon: 'Milk', color: 'text-purple-600' },
      frozen: { name: 'Frozen Foods', icon: 'Snowflake', color: 'text-cyan-600' }
    };
    return categories?.[categoryId] || { name: 'Unknown', icon: 'Package', color: 'text-gray-600' };
  };

  const getUnitLabel = (unitValue) => {
    const units = {
      servings: 'Servings',
      pounds: 'Pounds (lbs)',
      kilograms: 'Kilograms (kg)',
      pieces: 'Individual Pieces',
      containers: 'Containers/Boxes',
      bags: 'Bags'
    };
    return units?.[unitValue] || unitValue;
  };

  const formatPickupTimes = (times) => {
    const timeLabels = {
      '08:00-12:00': 'Morning (8AM - 12PM)',
      '12:00-17:00': 'Afternoon (12PM - 5PM)',
      '17:00-20:00': 'Evening (5PM - 8PM)',
      'flexible': 'Flexible/By Appointment'
    };
    return times?.map(time => timeLabels?.[time] || time)?.join(', ');
  };

  const calculateDaysUntilExpiration = () => {
    if (!expirationDate) return null;
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const categoryInfo = getCategoryInfo(category);
  const daysUntilExpiration = calculateDaysUntilExpiration();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Preview Your Listing
        </h3>
        <button
          onClick={() => onEdit('basic')}
          className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200"
        >
          <Icon name="Edit" size={16} />
          <span className="text-sm font-medium">Edit Details</span>
        </button>
      </div>
      {/* Listing Card Preview */}
      <div className="bg-card border border-border rounded-lg shadow-elevation-1 overflow-hidden">
        {/* Photos Section */}
        {photos?.length > 0 && (
          <div className="relative h-48 bg-muted">
            <div className="flex h-full overflow-x-auto">
              {photos?.map((photo, index) => (
                <div key={photo?.id} className="flex-shrink-0 w-full h-full relative">
                  <Image
                    src={photo?.url}
                    alt={`Food photo ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            
            {photos?.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded text-xs">
                1 / {photos?.length}
              </div>
            )}
          </div>
        )}

        <div className="p-6">
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg bg-muted ${categoryInfo?.color}`}>
                <Icon name={categoryInfo?.icon} size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-foreground text-lg">
                  {title || `${categoryInfo?.name} Donation`}
                </h4>
                <p className="text-sm text-muted-foreground">{categoryInfo?.name}</p>
              </div>
            </div>
            
            <div className="text-right">
              <p className="font-semibold text-foreground">
                {quantity} {getUnitLabel(unit)}
              </p>
              {daysUntilExpiration !== null && (
                <p className={`text-sm ${
                  daysUntilExpiration <= 1 ? 'text-error' :
                  daysUntilExpiration <= 3 ? 'text-warning': 'text-success'
                }`}>
                  {daysUntilExpiration === 0 ? 'Expires today' :
                   daysUntilExpiration === 1 ? 'Expires tomorrow' :
                   `${daysUntilExpiration} days left`}
                </p>
              )}
            </div>
          </div>

          {/* Description */}
          {description && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground">{description}</p>
            </div>
          )}

          {/* Location */}
          <div className="flex items-start space-x-3 mb-4">
            <Icon name="MapPin" size={16} className="text-muted-foreground mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                {location?.address}
              </p>
              <p className="text-sm text-muted-foreground">
                {location?.city}, {location?.state} {location?.zipCode}
              </p>
            </div>
          </div>

          {/* Pickup Times */}
          {pickupTimes?.length > 0 && (
            <div className="flex items-start space-x-3 mb-4">
              <Icon name="Clock" size={16} className="text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Available Pickup Times</p>
                <p className="text-sm text-muted-foreground">
                  {formatPickupTimes(pickupTimes)}
                </p>
              </div>
            </div>
          )}

          {/* Special Instructions */}
          {specialInstructions && (
            <div className="flex items-start space-x-3 mb-4">
              <Icon name="Info" size={16} className="text-muted-foreground mt-0.5" />
              <div>
                <p className="text-sm font-medium text-foreground">Pickup Instructions</p>
                <p className="text-sm text-muted-foreground">{specialInstructions}</p>
              </div>
            </div>
          )}

          {/* Safety Compliance Badge */}
          <div className="flex items-center space-x-2 p-3 bg-success/10 border border-success/20 rounded-lg">
            <Icon name="Shield" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">
              Safety Verified ({safetyChecklist?.length} checks completed)
            </span>
          </div>

          {/* Action Buttons (Preview) */}
          <div className="flex space-x-3 mt-6">
            <button className="flex-1 py-2 px-4 bg-primary text-primary-foreground rounded-lg font-medium">
              Request This Food
            </button>
            <button className="p-2 border border-border rounded-lg hover:bg-muted transition-colors duration-200">
              <Icon name="Heart" size={20} />
            </button>
            <button className="p-2 border border-border rounded-lg hover:bg-muted transition-colors duration-200">
              <Icon name="Share" size={20} />
            </button>
          </div>
        </div>
      </div>
      {/* Listing Stats Preview */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <Icon name="Eye" size={24} className="mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Views</p>
          <p className="text-xs text-muted-foreground">Will show after publishing</p>
        </div>
        
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <Icon name="MessageCircle" size={24} className="mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Requests</p>
          <p className="text-xs text-muted-foreground">Will show after publishing</p>
        </div>
        
        <div className="text-center p-4 bg-muted/50 rounded-lg">
          <Icon name="Clock" size={24} className="mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm font-medium text-foreground">Time Left</p>
          <p className="text-xs text-muted-foreground">
            {daysUntilExpiration ? `${daysUntilExpiration} days` : 'Set expiration date'}
          </p>
        </div>
      </div>
      {/* Publishing Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={20} className="text-blue-600 mt-0.5" />
          <div>
            <h5 className="font-medium text-blue-900 mb-2">Tips for Better Visibility</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Clear, well-lit photos increase request rates by 60%</li>
              <li>• Detailed descriptions help recipients understand what they're getting</li>
              <li>• Flexible pickup times make your listing more accessible</li>
              <li>• Respond quickly to requests to build a good reputation</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPreview;