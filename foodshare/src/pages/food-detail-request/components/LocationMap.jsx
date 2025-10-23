import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LocationMap = ({ location }) => {
  const [showDirections, setShowDirections] = useState(false);

  const handleGetDirections = () => {
    const query = encodeURIComponent(`${location?.address}, ${location?.city}, ${location?.state} ${location?.zipCode}`);
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${query}`, '_blank');
  };

  const handleCallLocation = () => {
    window.open(`tel:${location?.phone}`, '_self');
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 overflow-hidden">
      {/* Map Container */}
      <div className="relative h-64 bg-muted">
        <iframe
          width="100%"
          height="100%"
          loading="lazy"
          title={location?.name}
          referrerPolicy="no-referrer-when-downgrade"
          src={`https://www.google.com/maps?q=${location?.latitude},${location?.longitude}&z=15&output=embed`}
          className="border-0"
        />
        
        {/* Map Overlay Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="bg-white/90 hover:bg-white shadow-elevation-1 w-10 h-10"
            onClick={handleGetDirections}
          >
            <Icon name="Navigation" size={18} className="text-primary" />
          </Button>
        </div>
      </div>
      {/* Location Details */}
      <div className="p-6">
        <div className="space-y-4">
          {/* Address */}
          <div>
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg flex-shrink-0">
                <Icon name="MapPin" size={20} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">{location?.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {location?.address}<br />
                  {location?.city}, {location?.state} {location?.zipCode}
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
              <Icon name="Phone" size={20} className="text-success" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">Contact</p>
              <p className="font-medium text-foreground">{location?.phone}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handleCallLocation}
            >
              <Icon name="Phone" size={16} className="mr-2" />
              Call
            </Button>
          </div>

          {/* Operating Hours */}
          <div className="flex items-start gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground mb-2">Pickup Hours</p>
              <div className="space-y-1">
                {location?.operatingHours?.map((hours, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{hours?.day}</span>
                    <span className="font-medium text-foreground">{hours?.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Parking Instructions */}
          {location?.parkingInstructions && (
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
                <Icon name="Car" size={20} className="text-accent" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Parking</p>
                <p className="text-sm text-foreground">{location?.parkingInstructions}</p>
              </div>
            </div>
          )}

          {/* Special Instructions */}
          {location?.specialInstructions && (
            <div className="flex items-start gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
                <Icon name="Info" size={20} className="text-secondary" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">Special Instructions</p>
                <p className="text-sm text-foreground">{location?.specialInstructions}</p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t border-border">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleGetDirections}
            >
              <Icon name="Navigation" size={16} className="mr-2" />
              Get Directions
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowDirections(!showDirections)}
            >
              <Icon name="Share2" size={16} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;