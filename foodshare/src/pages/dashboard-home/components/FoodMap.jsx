import React, { useState } from 'react';
import { useRole } from '../../../components/ui/RoleBasedMenu';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FoodMap = () => {
  const { isDonor, isRecipient } = useRole();
  const [mapView, setMapView] = useState('satellite');

  // Mock coordinates for demonstration
  const mockLocations = [
    { lat: 40.7128, lng: -74.0060, name: 'Downtown Restaurant', type: 'prepared_meals' },
    { lat: 40.7589, lng: -73.9851, name: 'Green Market', type: 'produce' },
    { lat: 40.7505, lng: -73.9934, name: 'Sunrise Bakery', type: 'baked_goods' },
    { lat: 40.7282, lng: -73.7949, name: 'Community Kitchen', type: 'pantry_items' }
  ];

  const centerLat = 40.7128;
  const centerLng = -74.0060;

  const getMapTitle = () => {
    if (isDonor) return 'Your Donation Locations';
    if (isRecipient) return 'Nearby Food Available';
    return 'Food Distribution Map';
  };

  const getMapDescription = () => {
    if (isDonor) return 'Track where your donations are making an impact';
    if (isRecipient) return 'Find fresh food donations in your area';
    return 'Monitor food distribution across the community';
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-1 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold text-foreground mb-1">{getMapTitle()}</h2>
          <p className="text-sm text-muted-foreground">{getMapDescription()}</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant={mapView === 'roadmap' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMapView('roadmap')}
          >
            <Icon name="Map" size={16} className="mr-1" />
            Map
          </Button>
          <Button
            variant={mapView === 'satellite' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setMapView('satellite')}
          >
            <Icon name="Satellite" size={16} className="mr-1" />
            Satellite
          </Button>
        </div>
      </div>
      <div className="relative">
        <div className="w-full h-80 rounded-lg overflow-hidden border border-border">
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            title="Food Distribution Map"
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps?q=${centerLat},${centerLng}&z=12&output=embed&maptype=${mapView}`}
            className="w-full h-full"
          />
        </div>

        {/* Map Legend */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-elevation-2">
          <h3 className="text-sm font-medium text-foreground mb-2">Food Types</h3>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full"></div>
              <span className="text-xs text-muted-foreground">Prepared Meals</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full"></div>
              <span className="text-xs text-muted-foreground">Fresh Produce</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-warning rounded-full"></div>
              <span className="text-xs text-muted-foreground">Baked Goods</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-accent rounded-full"></div>
              <span className="text-xs text-muted-foreground">Pantry Items</span>
            </div>
          </div>
        </div>

        {/* Weather Alert */}
        <div className="mt-4 p-3 bg-warning/10 border border-warning/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="CloudRain" size={16} className="text-warning" />
            <span className="text-sm text-warning font-medium">Weather Alert</span>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            Light rain expected this afternoon. Consider indoor pickup locations for better accessibility.
          </p>
        </div>
      </div>
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-border">
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{mockLocations?.length}</p>
          <p className="text-xs text-muted-foreground">Active Locations</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-success">2.3</p>
          <p className="text-xs text-muted-foreground">Avg Distance (mi)</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-accent">15</p>
          <p className="text-xs text-muted-foreground">Available Today</p>
        </div>
      </div>
    </div>
  );
};

export default FoodMap;