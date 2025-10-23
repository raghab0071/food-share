import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const RequestForm = ({ foodId, onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    recipientName: '',
    organization: '',
    email: '',
    phone: '',
    requestedQuantity: '',
    pickupMethod: 'self',
    specialRequirements: '',
    agreedToTerms: false,
    agreedToSafety: false
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.recipientName?.trim()) {
      newErrors.recipientName = 'Name is required';
    }

    if (!formData?.email?.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData?.requestedQuantity?.trim()) {
      newErrors.requestedQuantity = 'Please specify quantity needed';
    }

    if (!formData?.agreedToTerms) {
      newErrors.agreedToTerms = 'You must agree to the terms';
    }

    if (!formData?.agreedToSafety) {
      newErrors.agreedToSafety = 'You must acknowledge food safety guidelines';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        foodId,
        requestDate: new Date()?.toISOString()
      });
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center gap-2 mb-6">
        <Icon name="Send" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Request This Food</h3>
      </div>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Information */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Contact Information</h4>
          
          <Input
            label="Full Name"
            type="text"
            placeholder="Enter your full name"
            value={formData?.recipientName}
            onChange={(e) => handleInputChange('recipientName', e?.target?.value)}
            error={errors?.recipientName}
            required
          />

          <Input
            label="Organization (Optional)"
            type="text"
            placeholder="Food bank, shelter, etc."
            value={formData?.organization}
            onChange={(e) => handleInputChange('organization', e?.target?.value)}
            description="If requesting on behalf of an organization"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              error={errors?.email}
              required
            />

            <Input
              label="Phone Number"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              error={errors?.phone}
              required
            />
          </div>
        </div>

        {/* Request Details */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Request Details</h4>
          
          <Input
            label="Quantity Needed"
            type="text"
            placeholder="e.g., 50 servings, 10 lbs, all available"
            value={formData?.requestedQuantity}
            onChange={(e) => handleInputChange('requestedQuantity', e?.target?.value)}
            error={errors?.requestedQuantity}
            description="Specify how much you need"
            required
          />

          {/* Pickup Method */}
          <div>
            <label className="text-sm font-medium text-foreground mb-3 block">Pickup Method</label>
            <div className="space-y-2">
              <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input
                  type="radio"
                  name="pickupMethod"
                  value="self"
                  checked={formData?.pickupMethod === 'self'}
                  onChange={(e) => handleInputChange('pickupMethod', e?.target?.value)}
                  className="text-primary focus:ring-primary"
                />
                <div className="flex items-center gap-2">
                  <Icon name="User" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Self Pickup</span>
                </div>
              </label>
              
              <label className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input
                  type="radio"
                  name="pickupMethod"
                  value="volunteer"
                  checked={formData?.pickupMethod === 'volunteer'}
                  onChange={(e) => handleInputChange('pickupMethod', e?.target?.value)}
                  className="text-primary focus:ring-primary"
                />
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={16} className="text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Volunteer Pickup</span>
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">
              Special Requirements (Optional)
            </label>
            <textarea
              placeholder="Any special handling, dietary restrictions, or other requirements..."
              value={formData?.specialRequirements}
              onChange={(e) => handleInputChange('specialRequirements', e?.target?.value)}
              rows={3}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
            />
          </div>
        </div>

        {/* Agreements */}
        <div className="space-y-3 pt-4 border-t border-border">
          <Checkbox
            label="I agree to the terms and conditions"
            checked={formData?.agreedToTerms}
            onChange={(e) => handleInputChange('agreedToTerms', e?.target?.checked)}
            error={errors?.agreedToTerms}
            required
          />

          <Checkbox
            label="I acknowledge the food safety guidelines and will handle the food appropriately"
            checked={formData?.agreedToSafety}
            onChange={(e) => handleInputChange('agreedToSafety', e?.target?.checked)}
            error={errors?.agreedToSafety}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isLoading}
            disabled={isLoading}
          >
            <Icon name="Send" size={18} className="mr-2" />
            {isLoading ? 'Submitting Request...' : 'Submit Request'}
          </Button>
        </div>

        {/* Help Text */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Your request will be sent to the donor for approval. You'll receive a confirmation email shortly.
          </p>
        </div>
      </form>
    </div>
  );
};

export default RequestForm;