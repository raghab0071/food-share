import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const QuantityEstimation = ({ quantity, onQuantityChange, unit, onUnitChange }) => {
  const [estimationMethod, setEstimationMethod] = useState('manual');

  const units = [
    { value: 'servings', label: 'Servings', icon: 'Users' },
    { value: 'pounds', label: 'Pounds (lbs)', icon: 'Weight' },
    { value: 'kilograms', label: 'Kilograms (kg)', icon: 'Weight' },
    { value: 'pieces', label: 'Individual Pieces', icon: 'Hash' },
    { value: 'containers', label: 'Containers/Boxes', icon: 'Package' },
    { value: 'bags', label: 'Bags', icon: 'ShoppingBag' }
  ];

  const portionGuides = [
    { size: 'small', label: 'Small (1-5 servings)', servings: 3, icon: 'Circle' },
    { size: 'medium', label: 'Medium (6-15 servings)', servings: 10, icon: 'Circle' },
    { size: 'large', label: 'Large (16-30 servings)', servings: 23, icon: 'Circle' },
    { size: 'xlarge', label: 'Extra Large (30+ servings)', servings: 40, icon: 'Circle' }
  ];

  const handlePortionSelect = (servings) => {
    onQuantityChange(servings?.toString());
    onUnitChange('servings');
    setEstimationMethod('visual');
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          How much food do you have?
        </h3>
        <p className="text-sm text-muted-foreground">
          Provide an estimate of the quantity available for donation
        </p>
      </div>
      {/* Estimation Method Toggle */}
      <div className="flex space-x-2 p-1 bg-muted rounded-lg">
        <button
          onClick={() => setEstimationMethod('manual')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            estimationMethod === 'manual' ?'bg-white text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Manual Entry
        </button>
        <button
          onClick={() => setEstimationMethod('visual')}
          className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
            estimationMethod === 'visual' ?'bg-white text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
          }`}
        >
          Visual Guide
        </button>
      </div>
      {estimationMethod === 'manual' ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Quantity"
              type="number"
              placeholder="Enter amount"
              value={quantity}
              onChange={(e) => onQuantityChange(e?.target?.value)}
              min="1"
              required
            />
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Unit of Measurement
              </label>
              <div className="grid grid-cols-1 gap-2">
                {units?.map((unitOption) => (
                  <button
                    key={unitOption?.value}
                    onClick={() => onUnitChange(unitOption?.value)}
                    className={`flex items-center space-x-3 p-3 rounded-lg border transition-all duration-200 ${
                      unit === unitOption?.value
                        ? 'border-primary bg-primary/5 text-primary' :'border-border hover:border-primary/50 text-foreground'
                    }`}
                  >
                    <Icon name={unitOption?.icon} size={18} />
                    <span className="text-sm font-medium">{unitOption?.label}</span>
                    {unit === unitOption?.value && (
                      <Icon name="Check" size={16} className="ml-auto" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h4 className="font-medium text-foreground">Visual Portion Guide</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {portionGuides?.map((guide) => (
              <button
                key={guide?.size}
                onClick={() => handlePortionSelect(guide?.servings)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                  quantity === guide?.servings?.toString() && unit === 'servings' ?'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                }`}
              >
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center ${
                    guide?.size === 'small' ? 'border-green-400 bg-green-50' :
                    guide?.size === 'medium' ? 'border-yellow-400 bg-yellow-50' :
                    guide?.size === 'large'? 'border-orange-400 bg-orange-50' : 'border-red-400 bg-red-50'
                  }`}>
                    <div className={`rounded-full ${
                      guide?.size === 'small' ? 'w-2 h-2 bg-green-400' :
                      guide?.size === 'medium' ? 'w-3 h-3 bg-yellow-400' :
                      guide?.size === 'large'? 'w-4 h-4 bg-orange-400' : 'w-5 h-5 bg-red-400'
                    }`} />
                  </div>
                  <span className="font-medium text-foreground">{guide?.label}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Approximately {guide?.servings} servings
                </p>
              </button>
            ))}
          </div>
        </div>
      )}
      {quantity && unit && (
        <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
          <div className="flex items-center space-x-2">
            <Icon name="Check" size={16} className="text-success" />
            <span className="text-sm font-medium text-success">
              Quantity Set: {quantity} {units?.find(u => u?.value === unit)?.label || unit}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuantityEstimation;