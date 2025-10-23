import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FoodSafetyCompliance = ({ 
  safetyChecklist, 
  onSafetyChecklistChange,
  certifications,
  onCertificationsChange 
}) => {
  const [expandedSection, setExpandedSection] = useState(null);

  const safetyItems = [
    {
      id: 'proper_storage',
      title: 'Proper Storage Temperature',
      description: 'Food has been stored at appropriate temperatures (refrigerated items below 40°F, frozen items below 0°F)',
      category: 'storage',
      required: true
    },
    {
      id: 'no_contamination',
      title: 'No Cross-Contamination',
      description: 'Food has been kept separate from raw meats and other potential contaminants',
      category: 'handling',
      required: true
    },
    {
      id: 'clean_preparation',
      title: 'Clean Preparation Area',
      description: 'Food was prepared in a clean, sanitized environment with proper hygiene practices',
      category: 'handling',
      required: true
    },
    {
      id: 'safe_packaging',
      title: 'Safe Packaging',
      description: 'Food is in clean, food-grade containers or original packaging',
      category: 'packaging',
      required: true
    },
    {
      id: 'allergen_awareness',
      title: 'Allergen Information Available',
      description: 'Known allergens are identified and can be communicated to recipients',
      category: 'allergens',
      required: false
    },
    {
      id: 'no_recalls',
      title: 'No Recalled Items',
      description: 'Food items are not subject to any current food safety recalls',
      category: 'safety',
      required: true
    }
  ];

  const certificationTypes = [
    {
      id: 'food_handler',
      title: 'Food Handler Certification',
      description: 'Valid food handler or food safety certification',
      icon: 'Award'
    },
    {
      id: 'business_license',
      title: 'Business Food License',
      description: 'Current business food service license',
      icon: 'FileText'
    },
    {
      id: 'haccp',
      title: 'HACCP Training',
      description: 'Hazard Analysis Critical Control Points training',
      icon: 'Shield'
    },
    {
      id: 'servsafe',
      title: 'ServSafe Certification',
      description: 'Current ServSafe food safety certification',
      icon: 'CheckCircle'
    }
  ];

  const handleChecklistToggle = (itemId) => {
    const updatedChecklist = safetyChecklist?.includes(itemId)
      ? safetyChecklist?.filter(id => id !== itemId)
      : [...safetyChecklist, itemId];
    onSafetyChecklistChange(updatedChecklist);
  };

  const handleCertificationToggle = (certId) => {
    const updatedCertifications = certifications?.includes(certId)
      ? certifications?.filter(id => id !== certId)
      : [...certifications, certId];
    onCertificationsChange(updatedCertifications);
  };

  const getComplianceScore = () => {
    const requiredItems = safetyItems?.filter(item => item?.required);
    const completedRequired = requiredItems?.filter(item => 
      safetyChecklist?.includes(item?.id)
    )?.length;
    
    return Math.round((completedRequired / requiredItems?.length) * 100);
  };

  const toggleSection = (section) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const complianceScore = getComplianceScore();
  const isCompliant = complianceScore === 100;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Food Safety Compliance
        </h3>
        <p className="text-sm text-muted-foreground">
          Ensure your food donation meets safety standards to protect recipients
        </p>
      </div>
      {/* Compliance Score */}
      <div className={`p-4 rounded-lg border-2 ${
        isCompliant 
          ? 'bg-success/10 border-success/20' :'bg-warning/10 border-warning/20'
      }`}>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <Icon 
              name={isCompliant ? 'CheckCircle' : 'AlertTriangle'} 
              size={24} 
              className={isCompliant ? 'text-success' : 'text-warning'} 
            />
            <div>
              <h4 className={`font-semibold ${isCompliant ? 'text-success' : 'text-warning'}`}>
                Safety Compliance: {complianceScore}%
              </h4>
              <p className={`text-sm ${isCompliant ? 'text-success/80' : 'text-warning/80'}`}>
                {isCompliant 
                  ? 'All required safety checks completed' 
                  : 'Complete all required items to proceed'
                }
              </p>
            </div>
          </div>
          <div className={`text-2xl font-bold ${isCompliant ? 'text-success' : 'text-warning'}`}>
            {complianceScore}%
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              isCompliant ? 'bg-success' : 'bg-warning'
            }`}
            style={{ width: `${complianceScore}%` }}
          />
        </div>
      </div>
      {/* Safety Checklist */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Safety Requirements Checklist</h4>
        
        <div className="space-y-3">
          {safetyItems?.map((item) => {
            const isChecked = safetyChecklist?.includes(item?.id);
            
            return (
              <div
                key={item?.id}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  isChecked
                    ? 'bg-success/5 border-success/20'
                    : item?.required
                      ? 'bg-error/5 border-error/20' :'border-border'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <button
                    onClick={() => handleChecklistToggle(item?.id)}
                    className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                      isChecked
                        ? 'bg-success border-success text-white' :'border-border hover:border-primary'
                    }`}
                  >
                    {isChecked && <Icon name="Check" size={12} />}
                  </button>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h5 className="font-medium text-foreground">{item?.title}</h5>
                      {item?.required && (
                        <span className="px-2 py-0.5 text-xs font-medium bg-error/10 text-error rounded">
                          Required
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{item?.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* Certifications Section */}
      <div className="space-y-4">
        <button
          onClick={() => toggleSection('certifications')}
          className="flex items-center justify-between w-full p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors duration-200"
        >
          <div className="flex items-center space-x-3">
            <Icon name="Award" size={20} />
            <div className="text-left">
              <h4 className="font-medium text-foreground">Food Safety Certifications</h4>
              <p className="text-sm text-muted-foreground">Optional but recommended</p>
            </div>
          </div>
          <Icon 
            name={expandedSection === 'certifications' ? 'ChevronUp' : 'ChevronDown'} 
            size={20} 
          />
        </button>

        {expandedSection === 'certifications' && (
          <div className="space-y-3 animate-slide-down">
            {certificationTypes?.map((cert) => {
              const isSelected = certifications?.includes(cert?.id);
              
              return (
                <button
                  key={cert?.id}
                  onClick={() => handleCertificationToggle(cert?.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-200 text-left ${
                    isSelected
                      ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Icon name={cert?.icon} size={20} className={isSelected ? 'text-primary' : 'text-muted-foreground'} />
                    <div className="flex-1">
                      <h5 className="font-medium text-foreground">{cert?.title}</h5>
                      <p className="text-sm text-muted-foreground">{cert?.description}</p>
                    </div>
                    {isSelected && (
                      <Icon name="Check" size={16} className="text-primary" />
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>
      {/* Safety Guidelines */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
          <div>
            <h5 className="font-medium text-blue-900 mb-2">Food Safety Guidelines</h5>
            <ul className="text-sm text-blue-700 space-y-1">
              <li>• Keep hot foods hot (above 140°F) and cold foods cold (below 40°F)</li>
              <li>• Use clean utensils and containers for food handling</li>
              <li>• Label foods with preparation date and known allergens</li>
              <li>• Avoid donating foods past their expiration date</li>
              <li>• When in doubt about food safety, don't donate</li>
            </ul>
          </div>
        </div>
      </div>
      {/* Non-Compliance Warning */}
      {!isCompliant && (
        <div className="bg-error/10 border border-error/20 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
            <div>
              <h5 className="font-medium text-error mb-1">Complete Required Safety Checks</h5>
              <p className="text-sm text-error/80">
                All required safety items must be completed before you can publish your food listing. 
                This helps ensure recipient safety and maintains platform trust.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FoodSafetyCompliance;