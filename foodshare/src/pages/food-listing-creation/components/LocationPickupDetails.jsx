import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const LocationPickupDetails = ({ 
  location, 
  onLocationChange, 
  pickupTimes, 
  onPickupTimesChange,
  specialInstructions,
  onSpecialInstructionsChange 
}) => {
  const [locationType, setLocationType] = useState('address');
  const [showMap, setShowMap] = useState(false);

  const timeSlots = [
    { id: 'morning', label: 'Morning (8AM - 12PM)', value: '08:00-12:00' },
    { id: 'afternoon', label: 'Afternoon (12PM - 5PM)', value: '12:00-17:00' },
    { id: 'evening', label: 'Evening (5PM - 8PM)', value: '17:00-20:00' },
    { id: 'flexible', label: 'Flexible/By Appointment', value: 'flexible' }
  ];

  const handleTimeSlotToggle = (timeSlot) => {
    const updatedTimes = pickupTimes?.includes(timeSlot)
      ? pickupTimes?.filter(time => time !== timeSlot)
      : [...pickupTimes, timeSlot];
    onPickupTimesChange(updatedTimes);
  };

  const handleLocationInputChange = (field, value) => {
    onLocationChange({
      ...location,
      [field]: value
    });
  };

  // Mock coordinates for demonstration
  const mockLat = 40.7128;
  const mockLng = -74.0060;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Pickup Location & Schedule
        </h3>
        <p className="text-sm text-muted-foreground">
          Provide clear pickup details to help recipients find and collect the food
        </p>
      </div>
      {/* Location Type Selection */}
      <div className="space-y-4">
        <div className="flex space-x-2 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setLocationType('address')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              locationType === 'address' ?'bg-white text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Street Address
          </button>
          <button
            onClick={() => setLocationType('business')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              locationType === 'business' ?'bg-white text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Business Location
          </button>
        </div>

        {/* Address Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={locationType === 'business' ? 'Business Name' : 'Street Address'}
            type="text"
            placeholder={locationType === 'business' ? 'Enter business name' : 'Enter street address'}
            value={location?.address || ''}
            onChange={(e) => handleLocationInputChange('address', e?.target?.value)}
            required
          />
          
          <Input
            label="City"
            type="text"
            placeholder="Enter city"
            value={location?.city || ''}
            onChange={(e) => handleLocationInputChange('city', e?.target?.value)}
            required
          />
          
          <Input
            label="State"
            type="text"
            placeholder="Enter state"
            value={location?.state || ''}
            onChange={(e) => handleLocationInputChange('state', e?.target?.value)}
            required
          />
          
          <Input
            label="ZIP Code"
            type="text"
            placeholder="Enter ZIP code"
            value={location?.zipCode || ''}
            onChange={(e) => handleLocationInputChange('zipCode', e?.target?.value)}
            required
          />
        </div>

        {/* Map Preview */}
        <div className="space-y-3">
          <button
            onClick={() => setShowMap(!showMap)}
            className="flex items-center space-x-2 text-primary hover:text-primary/80 transition-colors duration-200"
          >
            <Icon name={showMap ? 'EyeOff' : 'Eye'} size={16} />
            <span className="text-sm font-medium">
              {showMap ? 'Hide' : 'Show'} Location Preview
            </span>
          </button>

          {showMap && (
            <div className="h-64 rounded-lg overflow-hidden border border-border">
              <iframe
                width="100%"
                height="100%"
                loading="lazy"
                title="Pickup Location"
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${mockLat},${mockLng}&z=14&output=embed`}
                className="border-0"
              />
            </div>
          )}
        </div>
      </div>
      {/* Pickup Time Slots */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Available Pickup Times</h4>
        <p className="text-sm text-muted-foreground">
          Select all time slots when pickup is available
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {timeSlots?.map((slot) => (
            <button
              key={slot?.id}
              onClick={() => handleTimeSlotToggle(slot?.value)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                pickupTimes?.includes(slot?.value)
                  ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Icon 
                    name="Clock" 
                    size={18} 
                    className={pickupTimes?.includes(slot?.value) ? 'text-primary' : 'text-muted-foreground'} 
                  />
                  <span className="font-medium">{slot?.label}</span>
                </div>
                {pickupTimes?.includes(slot?.value) && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Special Instructions */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Special Pickup Instructions</h4>
        <div className="space-y-3">
          <textarea
            placeholder="Add any special instructions for pickup (e.g., parking details, entrance to use, contact person, etc.)"
            value={specialInstructions}
            onChange={(e) => onSpecialInstructionsChange(e?.target?.value)}
            rows={4}
            className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
          />
          
          <div className="flex items-start space-x-2 text-muted-foreground">
            <Icon name="Info" size={16} className="mt-0.5" />
            <p className="text-xs">
              Clear instructions help ensure smooth pickup and reduce confusion for recipients
            </p>
          </div>
        </div>
      </div>
      {/* Contact Information */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h5 className="font-medium text-foreground mb-3 flex items-center">
          <Icon name="Phone" size={16} className="mr-2" />
          Contact for Pickup Coordination
        </h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Contact Name"
            type="text"
            placeholder="Name for pickup coordination"
            value={location?.contactName || ''}
            onChange={(e) => handleLocationInputChange('contactName', e?.target?.value)}
          />
          
          <Input
            label="Phone Number"
            type="tel"
            placeholder="Phone number for pickup"
            value={location?.contactPhone || ''}
            onChange={(e) => handleLocationInputChange('contactPhone', e?.target?.value)}
          />
        </div>
      </div>
      {/* Pickup Summary */}
      {(location?.address && pickupTimes?.length > 0) && (
        <div className="bg-success/10 border border-success/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="MapPin" size={20} className="text-success mt-0.5" />
            <div>
              <h5 className="font-medium text-success mb-2">Pickup Details Set</h5>
              <div className="text-sm text-success/80 space-y-1">
                <p><strong>Location:</strong> {location?.address}, {location?.city}, {location?.state}</p>
                <p><strong>Available Times:</strong> {pickupTimes?.length} time slot(s) selected</p>
                {location?.contactName && (
                  <p><strong>Contact:</strong> {location?.contactName}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationPickupDetails;