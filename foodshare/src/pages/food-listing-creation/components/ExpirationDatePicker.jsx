import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';

const ExpirationDatePicker = ({ 
  expirationDate, 
  onExpirationDateChange, 
  selectedCategory,
  bestByDate,
  onBestByDateChange 
}) => {
  const [freshnessLevel, setFreshnessLevel] = useState('good');
  const [dateType, setDateType] = useState('expiration');

  const categoryDefaults = {
    produce: { days: 3, type: 'Best consumed within' },
    prepared: { days: 1, type: 'Must consume by' },
    packaged: { days: 30, type: 'Expires on' },
    bakery: { days: 2, type: 'Best by' },
    dairy: { days: 7, type: 'Expires on' },
    frozen: { days: 90, type: 'Best by' }
  };

  const freshnessIndicators = [
    {
      level: 'excellent',
      label: 'Excellent',
      description: 'Just prepared/very fresh',
      color: 'text-green-600 bg-green-50 border-green-200',
      icon: 'Sparkles'
    },
    {
      level: 'good',
      label: 'Good',
      description: 'Fresh and safe to consume',
      color: 'text-green-500 bg-green-50 border-green-200',
      icon: 'CheckCircle'
    },
    {
      level: 'fair',
      label: 'Fair',
      description: 'Should be consumed soon',
      color: 'text-yellow-600 bg-yellow-50 border-yellow-200',
      icon: 'Clock'
    },
    {
      level: 'consume-soon',
      label: 'Consume Soon',
      description: 'Best consumed within 24 hours',
      color: 'text-orange-600 bg-orange-50 border-orange-200',
      icon: 'AlertTriangle'
    }
  ];

  useEffect(() => {
    if (selectedCategory && !expirationDate) {
      const defaults = categoryDefaults?.[selectedCategory];
      if (defaults) {
        const defaultDate = new Date();
        defaultDate?.setDate(defaultDate?.getDate() + defaults?.days);
        onExpirationDateChange(defaultDate?.toISOString()?.split('T')?.[0]);
      }
    }
  }, [selectedCategory, expirationDate, onExpirationDateChange]);

  const getMinDate = () => {
    const today = new Date();
    return today?.toISOString()?.split('T')?.[0];
  };

  const getMaxDate = () => {
    const maxDate = new Date();
    maxDate?.setDate(maxDate?.getDate() + 365); // 1 year from now
    return maxDate?.toISOString()?.split('T')?.[0];
  };

  const calculateDaysUntilExpiration = () => {
    if (!expirationDate) return null;
    
    const today = new Date();
    const expDate = new Date(expirationDate);
    const diffTime = expDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const getDaysUntilExpirationColor = (days) => {
    if (days <= 1) return 'text-error';
    if (days <= 3) return 'text-warning';
    if (days <= 7) return 'text-yellow-600';
    return 'text-success';
  };

  const daysUntilExpiration = calculateDaysUntilExpiration();

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Food Freshness & Expiration
        </h3>
        <p className="text-sm text-muted-foreground">
          Help recipients understand the freshness and safe consumption timeframe
        </p>
      </div>
      {/* Date Type Selection */}
      <div className="space-y-4">
        <div className="flex space-x-2 p-1 bg-muted rounded-lg">
          <button
            onClick={() => setDateType('expiration')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              dateType === 'expiration' ?'bg-white text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Expiration Date
          </button>
          <button
            onClick={() => setDateType('best-by')}
            className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 ${
              dateType === 'best-by' ?'bg-white text-foreground shadow-sm' :'text-muted-foreground hover:text-foreground'
            }`}
          >
            Best By Date
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label={dateType === 'expiration' ? 'Expiration Date' : 'Best By Date'}
            type="date"
            value={dateType === 'expiration' ? expirationDate : bestByDate}
            onChange={(e) => {
              if (dateType === 'expiration') {
                onExpirationDateChange(e?.target?.value);
              } else {
                onBestByDateChange(e?.target?.value);
              }
            }}
            min={getMinDate()}
            max={getMaxDate()}
            required
          />

          {daysUntilExpiration !== null && (
            <div className="flex items-center space-x-2 p-4 bg-muted/50 rounded-lg">
              <Icon 
                name="Calendar" 
                size={20} 
                className={getDaysUntilExpirationColor(daysUntilExpiration)} 
              />
              <div>
                <p className={`font-medium ${getDaysUntilExpirationColor(daysUntilExpiration)}`}>
                  {daysUntilExpiration === 0 ? 'Expires today' :
                   daysUntilExpiration === 1 ? 'Expires tomorrow' :
                   daysUntilExpiration < 0 ? `Expired ${Math.abs(daysUntilExpiration)} days ago` :
                   `${daysUntilExpiration} days remaining`}
                </p>
                <p className="text-xs text-muted-foreground">
                  {dateType === 'expiration' ? 'Until expiration' : 'Until best by date'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* Freshness Indicator */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Current Freshness Level</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {freshnessIndicators?.map((indicator) => (
            <button
              key={indicator?.level}
              onClick={() => setFreshnessLevel(indicator?.level)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                freshnessLevel === indicator?.level
                  ? `${indicator?.color} border-current`
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <Icon name={indicator?.icon} size={20} />
                <span className="font-medium">{indicator?.label}</span>
                {freshnessLevel === indicator?.level && (
                  <Icon name="Check" size={16} className="ml-auto" />
                )}
              </div>
              <p className="text-sm opacity-80">{indicator?.description}</p>
            </button>
          ))}
        </div>
      </div>
      {/* Smart Recommendations */}
      {selectedCategory && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
            <div>
              <h5 className="font-medium text-blue-900 mb-1">
                {categoryDefaults?.[selectedCategory]?.type} Recommendation
              </h5>
              <p className="text-sm text-blue-700">
                Based on your food category, we recommend setting the date within{' '}
                {categoryDefaults?.[selectedCategory]?.days} days for optimal safety and quality.
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Warning for Past Dates */}
      {daysUntilExpiration < 0 && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
            <div>
              <h5 className="font-medium text-error mb-1">Expired Food Warning</h5>
              <p className="text-sm text-error/80">
                This food appears to be past its expiration date. Please verify the date or consider if it's still safe for donation.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpirationDatePicker;