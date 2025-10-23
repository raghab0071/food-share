import React from 'react';
import { Checkbox, CheckboxGroup } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

import Icon from '../../../components/AppIcon';

const NeedsAssessment = ({ formData, onChange, errors }) => {
  const householdSizeOptions = [
    { value: '1', label: '1 person' },
    { value: '2', label: '2 people' },
    { value: '3', label: '3 people' },
    { value: '4', label: '4 people' },
    { value: '5', label: '5 people' },
    { value: '6+', label: '6+ people' }
  ];

  const dietaryRestrictions = [
    { id: 'vegetarian', label: 'Vegetarian' },
    { id: 'vegan', label: 'Vegan' },
    { id: 'gluten-free', label: 'Gluten-Free' },
    { id: 'dairy-free', label: 'Dairy-Free' },
    { id: 'nut-free', label: 'Nut-Free' },
    { id: 'halal', label: 'Halal' },
    { id: 'kosher', label: 'Kosher' },
    { id: 'diabetic', label: 'Diabetic-Friendly' }
  ];

  const pickupTimes = [
    { id: 'morning', label: 'Morning (6AM - 12PM)' },
    { id: 'afternoon', label: 'Afternoon (12PM - 6PM)' },
    { id: 'evening', label: 'Evening (6PM - 10PM)' },
    { id: 'weekend', label: 'Weekends' },
    { id: 'flexible', label: 'Flexible Schedule' }
  ];

  const handleDietaryChange = (restrictionId, checked) => {
    const currentRestrictions = formData?.dietaryRestrictions || [];
    let updatedRestrictions;
    
    if (checked) {
      updatedRestrictions = [...currentRestrictions, restrictionId];
    } else {
      updatedRestrictions = currentRestrictions?.filter(id => id !== restrictionId);
    }
    
    onChange(prev => ({
      ...prev,
      dietaryRestrictions: updatedRestrictions
    }));
  };

  const handlePickupTimeChange = (timeId, checked) => {
    const currentTimes = formData?.preferredPickupTimes || [];
    let updatedTimes;
    
    if (checked) {
      updatedTimes = [...currentTimes, timeId];
    } else {
      updatedTimes = currentTimes?.filter(id => id !== timeId);
    }
    
    onChange(prev => ({
      ...prev,
      preferredPickupTimes: updatedTimes
    }));
  };

  return (
    <div className="space-y-6 p-4 bg-muted/50 rounded-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Heart" size={20} className="text-primary" />
        <h4 className="font-semibold text-foreground">Needs Assessment</h4>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Help us better match you with appropriate food donations by sharing some basic information.
      </p>
      <Select
        label="Household Size"
        placeholder="Select household size"
        options={householdSizeOptions}
        value={formData?.householdSize}
        onChange={(value) => onChange(prev => ({ ...prev, householdSize: value }))}
        error={errors?.householdSize}
        description="Number of people you're providing food for"
      />
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">
          Dietary Restrictions & Preferences
        </label>
        <p className="text-xs text-muted-foreground">
          Select any dietary restrictions or preferences (optional)
        </p>
        
        <CheckboxGroup>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {dietaryRestrictions?.map((restriction) => (
              <Checkbox
                key={restriction?.id}
                label={restriction?.label}
                checked={(formData?.dietaryRestrictions || [])?.includes(restriction?.id)}
                onChange={(e) => handleDietaryChange(restriction?.id, e?.target?.checked)}
              />
            ))}
          </div>
        </CheckboxGroup>
      </div>
      <div className="space-y-3">
        <label className="block text-sm font-medium text-foreground">
          Preferred Pickup Times
        </label>
        <p className="text-xs text-muted-foreground">
          When are you typically available to pick up food? (Select all that apply)
        </p>
        
        <CheckboxGroup>
          <div className="space-y-2">
            {pickupTimes?.map((time) => (
              <Checkbox
                key={time?.id}
                label={time?.label}
                checked={(formData?.preferredPickupTimes || [])?.includes(time?.id)}
                onChange={(e) => handlePickupTimeChange(time?.id, e?.target?.checked)}
              />
            ))}
          </div>
        </CheckboxGroup>
      </div>
      <div className="bg-card p-3 rounded-lg border border-border">
        <div className="flex items-start space-x-2">
          <Icon name="Shield" size={16} className="text-primary mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Privacy & Safety:</p>
            <ul className="space-y-1">
              <li>• Your information is kept confidential and secure</li>
              <li>• We only share necessary details with food donors</li>
              <li>• You can update your preferences anytime</li>
              <li>• All food donations follow safety guidelines</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NeedsAssessment;