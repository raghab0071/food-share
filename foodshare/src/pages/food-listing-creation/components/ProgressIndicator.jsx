import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressIndicator = ({ currentStep, totalSteps, steps }) => {
  return (
    <div className="w-full mb-8">
      <div className="flex items-center justify-between mb-4">
        {steps?.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={step?.id} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                isCompleted 
                  ? 'bg-success border-success text-white' 
                  : isCurrent 
                    ? 'bg-primary border-primary text-white' :'bg-muted border-border text-muted-foreground'
              }`}>
                {isCompleted ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <span className="text-sm font-semibold">{stepNumber}</span>
                )}
              </div>
              {index < steps?.length - 1 && (
                <div className={`w-16 h-0.5 mx-2 transition-all duration-200 ${
                  isCompleted ? 'bg-success' : 'bg-border'
                }`} />
              )}
            </div>
          );
        })}
      </div>
      <div className="text-center">
        <h3 className="text-lg font-semibold text-foreground mb-1">
          {steps?.[currentStep - 1]?.title}
        </h3>
        <p className="text-sm text-muted-foreground">
          Step {currentStep} of {totalSteps}
        </p>
      </div>
    </div>
  );
};

export default ProgressIndicator;