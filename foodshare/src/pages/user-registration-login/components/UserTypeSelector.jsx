import React from 'react';
import Icon from '../../../components/AppIcon';

const UserTypeSelector = ({ selectedType, onTypeChange }) => {
  const userTypes = [
    {
      id: 'donor',
      title: 'Food Donor',
      description: 'Restaurant, grocery store, or event organizer',
      icon: 'Store',
      features: ['Post surplus food', 'Manage donations', 'Track impact']
    },
    {
      id: 'recipient',
      title: 'Food Recipient',
      description: 'Food bank, shelter, or individual in need',
      icon: 'Heart',
      features: ['Browse available food', 'Request donations', 'Schedule pickups']
    }
  ];

  return (
    <div className="space-y-4 mb-6">
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">I am a...</h3>
        <p className="text-sm text-muted-foreground">Choose your account type to get started</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {userTypes?.map((type) => (
          <div
            key={type?.id}
            onClick={() => onTypeChange(type?.id)}
            className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
              selectedType === type?.id
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50'
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${
                selectedType === type?.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
              }`}>
                <Icon name={type?.icon} size={20} />
              </div>
              
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">{type?.title}</h4>
                <p className="text-sm text-muted-foreground mb-3">{type?.description}</p>
                
                <ul className="space-y-1">
                  {type?.features?.map((feature, index) => (
                    <li key={index} className="flex items-center text-xs text-muted-foreground">
                      <Icon name="Check" size={12} className="mr-2 text-success" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            {selectedType === type?.id && (
              <div className="absolute top-2 right-2">
                <div className="flex items-center justify-center w-6 h-6 bg-primary rounded-full">
                  <Icon name="Check" size={14} color="white" />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserTypeSelector;