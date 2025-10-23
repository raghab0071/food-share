import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Header from '../../components/ui/Header';

// Import all components
import ProgressIndicator from './components/ProgressIndicator';
import FoodCategorySelection from './components/FoodCategorySelection';
import QuantityEstimation from './components/QuantityEstimation';
import PhotoUpload from './components/PhotoUpload';
import ExpirationDatePicker from './components/ExpirationDatePicker';
import LocationPickupDetails from './components/LocationPickupDetails';
import FoodSafetyCompliance from './components/FoodSafetyCompliance';
import ListingPreview from './components/ListingPreview';

const FoodListingCreation = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isDraft, setIsDraft] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form data state
  const [formData, setFormData] = useState({
    // Basic Information
    title: '',
    description: '',
    category: '',
    
    // Quantity
    quantity: '',
    unit: 'servings',
    
    // Photos
    photos: [],
    
    // Expiration
    expirationDate: '',
    bestByDate: '',
    
    // Location & Pickup
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
      contactName: '',
      contactPhone: ''
    },
    pickupTimes: [],
    specialInstructions: '',
    
    // Safety
    safetyChecklist: [],
    certifications: []
  });

  const steps = [
    { id: 1, title: 'Food Category', component: 'category' },
    { id: 2, title: 'Quantity & Details', component: 'quantity' },
    { id: 3, title: 'Photos', component: 'photos' },
    { id: 4, title: 'Expiration Date', component: 'expiration' },
    { id: 5, title: 'Pickup Details', component: 'pickup' },
    { id: 6, title: 'Safety Compliance', component: 'safety' },
    { id: 7, title: 'Preview & Publish', component: 'preview' }
  ];

  // Load draft from localStorage on component mount
  useEffect(() => {
    const savedDraft = localStorage.getItem('foodListingDraft');
    if (savedDraft) {
      try {
        const draftData = JSON.parse(savedDraft);
        setFormData(draftData);
        setIsDraft(true);
      } catch (error) {
        console.error('Error loading draft:', error);
      }
    }
  }, []);

  // Save draft to localStorage
  const saveDraft = () => {
    localStorage.setItem('foodListingDraft', JSON.stringify(formData));
    setIsDraft(true);
    // Show success message (you could add a toast notification here)
    alert('Draft saved successfully!');
  };

  // Clear draft
  const clearDraft = () => {
    localStorage.removeItem('foodListingDraft');
    setIsDraft(false);
  };

  // Validation functions
  const validateStep = (step) => {
    switch (step) {
      case 1:
        return formData?.category !== '';
      case 2:
        return formData?.quantity !== '' && formData?.unit !== '';
      case 3:
        return true; // Photos are optional
      case 4:
        return formData?.expirationDate !== '';
      case 5:
        return (formData?.location?.address !== '' &&
        formData?.location?.city !== '' &&
        formData?.location?.state !== '' && formData?.pickupTimes?.length > 0);
      case 6:
        const requiredSafetyItems = ['proper_storage', 'no_contamination', 'clean_preparation', 'safe_packaging', 'no_recalls'];
        return requiredSafetyItems?.every(item => formData?.safetyChecklist?.includes(item));
      case 7:
        return true;
      default:
        return false;
    }
  };

  const canProceedToNext = () => {
    return validateStep(currentStep);
  };

  const handleNext = () => {
    if (canProceedToNext() && currentStep < steps?.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepNumber) => {
    // Allow navigation to previous steps or current step
    if (stepNumber <= currentStep) {
      setCurrentStep(stepNumber);
    }
  };

  const handleSubmit = async () => {
    if (!validateStep(6)) {
      alert('Please complete all required safety checks before publishing.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Clear draft after successful submission
      clearDraft();
      
      // Navigate to success page or dashboard
      navigate('/dashboard-home', { 
        state: { 
          message: 'Food listing published successfully!',
          type: 'success'
        }
      });
    } catch (error) {
      console.error('Error submitting listing:', error);
      alert('Error publishing listing. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Form data update handlers
  const updateFormData = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const updateLocationData = (locationData) => {
    setFormData(prev => ({
      ...prev,
      location: locationData
    }));
  };

  // Render current step component
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <FoodCategorySelection
            selectedCategory={formData?.category}
            onCategorySelect={(category) => updateFormData('category', category)}
          />
        );
      
      case 2:
        return (
          <div className="space-y-6">
            <QuantityEstimation
              quantity={formData?.quantity}
              onQuantityChange={(quantity) => updateFormData('quantity', quantity)}
              unit={formData?.unit}
              onUnitChange={(unit) => updateFormData('unit', unit)}
            />
            <div className="space-y-4">
              <h4 className="font-medium text-foreground">Additional Details</h4>
              <Input
                label="Listing Title (Optional)"
                type="text"
                placeholder="Give your listing a descriptive title"
                value={formData?.title}
                onChange={(e) => updateFormData('title', e?.target?.value)}
              />
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description (Optional)
                </label>
                <textarea
                  placeholder="Describe the food, preparation method, or any special notes"
                  value={formData?.description}
                  onChange={(e) => updateFormData('description', e?.target?.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm"
                />
              </div>
            </div>
          </div>
        );
      
      case 3:
        return (
          <PhotoUpload
            photos={formData?.photos}
            onPhotosChange={(photos) => updateFormData('photos', photos)}
          />
        );
      
      case 4:
        return (
          <ExpirationDatePicker
            expirationDate={formData?.expirationDate}
            onExpirationDateChange={(date) => updateFormData('expirationDate', date)}
            selectedCategory={formData?.category}
            bestByDate={formData?.bestByDate}
            onBestByDateChange={(date) => updateFormData('bestByDate', date)}
          />
        );
      
      case 5:
        return (
          <LocationPickupDetails
            location={formData?.location}
            onLocationChange={updateLocationData}
            pickupTimes={formData?.pickupTimes}
            onPickupTimesChange={(times) => updateFormData('pickupTimes', times)}
            specialInstructions={formData?.specialInstructions}
            onSpecialInstructionsChange={(instructions) => updateFormData('specialInstructions', instructions)}
          />
        );
      
      case 6:
        return (
          <FoodSafetyCompliance
            safetyChecklist={formData?.safetyChecklist}
            onSafetyChecklistChange={(checklist) => updateFormData('safetyChecklist', checklist)}
            certifications={formData?.certifications}
            onCertificationsChange={(certs) => updateFormData('certifications', certs)}
          />
        );
      
      case 7:
        return (
          <ListingPreview
            formData={formData}
            onEdit={(section) => {
              // Navigate to appropriate step based on section
              const sectionStepMap = {
                basic: 2,
                photos: 3,
                expiration: 4,
                pickup: 5,
                safety: 6
              };
              setCurrentStep(sectionStepMap?.[section] || 1);
            }}
          />
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
          <button 
            onClick={() => navigate('/dashboard-home')}
            className="hover:text-foreground transition-colors duration-200"
          >
            Dashboard
          </button>
          <Icon name="ChevronRight" size={16} />
          <span className="text-foreground">Create Listing</span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Create Food Listing
            </h1>
            <p className="text-muted-foreground">
              Share your surplus food with those who need it most
            </p>
          </div>
          
          {/* Draft Actions */}
          <div className="flex items-center space-x-3">
            {isDraft && (
              <div className="flex items-center space-x-2 text-warning">
                <Icon name="Save" size={16} />
                <span className="text-sm font-medium">Draft Saved</span>
              </div>
            )}
            
            <Button
              variant="outline"
              size="sm"
              onClick={saveDraft}
              iconName="Save"
              iconPosition="left"
            >
              Save Draft
            </Button>
          </div>
        </div>

        {/* Progress Indicator */}
        <ProgressIndicator
          currentStep={currentStep}
          totalSteps={steps?.length}
          steps={steps}
        />

        {/* Main Content */}
        <div className="bg-card rounded-lg shadow-elevation-1 p-6 lg:p-8 mb-8">
          {renderStepContent()}
        </div>

        {/* Navigation Controls */}
        <div className="flex items-center justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 1}
            iconName="ChevronLeft"
            iconPosition="left"
          >
            Previous
          </Button>

          <div className="flex items-center space-x-3">
            {currentStep < steps?.length ? (
              <Button
                onClick={handleNext}
                disabled={!canProceedToNext()}
                iconName="ChevronRight"
                iconPosition="right"
              >
                Next Step
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                loading={isSubmitting}
                disabled={!validateStep(6)}
                iconName="Upload"
                iconPosition="left"
                variant="default"
              >
                {isSubmitting ? 'Publishing...' : 'Publish Listing'}
              </Button>
            )}
          </div>
        </div>

        {/* Step Validation Messages */}
        {!canProceedToNext() && (
          <div className="mt-4 p-4 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
              <div>
                <h5 className="font-medium text-warning mb-1">Complete Required Fields</h5>
                <p className="text-sm text-warning/80">
                  Please fill in all required information before proceeding to the next step.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodListingCreation;