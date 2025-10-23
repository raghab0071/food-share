import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const PickupScheduler = ({ availableSlots, onSlotSelect }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  const today = new Date();
  const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  const generateDates = () => {
    const dates = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      dates?.push(date);
    }
    return dates;
  };

  const dates = generateDates();

  const getAvailableTimesForDate = (date) => {
    const dateStr = date?.toISOString()?.split('T')?.[0];
    return availableSlots?.[dateStr] || [];
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    if (onSlotSelect) {
      onSlotSelect({
        date: selectedDate,
        time: time
      });
    }
  };

  const formatDate = (date) => {
    const isToday = date?.toDateString() === today?.toDateString();
    const isTomorrow = date?.toDateString() === new Date(today.getTime() + 24 * 60 * 60 * 1000)?.toDateString();
    
    if (isToday) return 'Today';
    if (isTomorrow) return 'Tomorrow';
    
    return date?.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="Calendar" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Schedule Pickup</h3>
      </div>
      {/* Date Selection */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Select Date</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-2">
          {dates?.map((date, index) => {
            const availableTimes = getAvailableTimesForDate(date);
            const hasSlots = availableTimes?.length > 0;
            const isSelected = selectedDate && selectedDate?.toDateString() === date?.toDateString();

            return (
              <button
                key={index}
                onClick={() => hasSlots && handleDateSelect(date)}
                disabled={!hasSlots}
                className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                  isSelected
                    ? 'border-primary bg-primary text-primary-foreground'
                    : hasSlots
                    ? 'border-border hover:border-primary hover:bg-primary/5 text-foreground'
                    : 'border-border bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                <div className="text-sm font-medium">{formatDate(date)}</div>
                <div className="text-xs mt-1">
                  {hasSlots ? `${availableTimes?.length} slots` : 'No slots'}
                </div>
              </button>
            );
          })}
        </div>
      </div>
      {/* Time Selection */}
      {selectedDate && (
        <div className="mb-6">
          <h4 className="text-sm font-medium text-foreground mb-3">
            Available Times for {formatDate(selectedDate)}
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            {getAvailableTimesForDate(selectedDate)?.map((time, index) => (
              <button
                key={index}
                onClick={() => handleTimeSelect(time)}
                className={`p-3 rounded-lg border text-center transition-all duration-200 ${
                  selectedTime === time
                    ? 'border-primary bg-primary text-primary-foreground'
                    : 'border-border hover:border-primary hover:bg-primary/5 text-foreground'
                }`}
              >
                <div className="text-sm font-medium">{time?.slot}</div>
                <div className="text-xs text-muted-foreground mt-1">{time?.duration}</div>
              </button>
            ))}
          </div>
        </div>
      )}
      {/* Selected Slot Summary */}
      {selectedDate && selectedTime && (
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <Icon name="CheckCircle" size={16} className="text-success" />
            <span className="text-sm font-medium text-foreground">Pickup Scheduled</span>
          </div>
          <p className="text-sm text-muted-foreground">
            {formatDate(selectedDate)} at {selectedTime?.slot}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Duration: {selectedTime?.duration}
          </p>
        </div>
      )}
      {/* Pickup Instructions */}
      <div className="mt-6 p-4 bg-muted/50 rounded-lg">
        <h5 className="text-sm font-medium text-foreground mb-2">Pickup Instructions</h5>
        <ul className="space-y-1 text-sm text-muted-foreground">
          <li className="flex items-start gap-2">
            <Icon name="MapPin" size={14} className="mt-0.5 flex-shrink-0" />
            <span>Use main entrance and ask for donation pickup</span>
          </li>
          <li className="flex items-start gap-2">
            <Icon name="Clock" size={14} className="mt-0.5 flex-shrink-0" />
            <span>Please arrive within the selected time window</span>
          </li>
          <li className="flex items-start gap-2">
            <Icon name="Phone" size={14} className="mt-0.5 flex-shrink-0" />
            <span>Call ahead if running late</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PickupScheduler;