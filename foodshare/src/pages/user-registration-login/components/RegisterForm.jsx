import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import UserTypeSelector from './UserTypeSelector';
import BusinessVerificationUpload from './BusinessVerificationUpload';
import NeedsAssessment from './NeedsAssessment';

const RegisterForm = ({ onRegisterSuccess }) => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    userType: '',
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    organization: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    agreeToTerms: false,
    agreeToPrivacy: false,
    // Business verification fields
    businessLicense: null,
    taxId: '',
    // Needs assessment fields
    householdSize: '',
    dietaryRestrictions: [],
    preferredPickupTimes: []
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Calculate password strength
    if (name === 'password') {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password?.length >= 8) strength += 25;
    if (/[A-Z]/?.test(password)) strength += 25;
    if (/[0-9]/?.test(password)) strength += 25;
    if (/[^A-Za-z0-9]/?.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthColor = () => {
    if (passwordStrength < 50) return 'bg-error';
    if (passwordStrength < 75) return 'bg-warning';
    return 'bg-success';
  };

  const getPasswordStrengthText = () => {
    if (passwordStrength < 25) return 'Very Weak';
    if (passwordStrength < 50) return 'Weak';
    if (passwordStrength < 75) return 'Good';
    return 'Strong';
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData?.userType) {
        newErrors.userType = 'Please select your account type';
      }
    }
    
    if (step === 2) {
      if (!formData?.email) {
        newErrors.email = 'Email is required';
      } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
        newErrors.email = 'Please enter a valid email address';
      }
      
      if (!formData?.password) {
        newErrors.password = 'Password is required';
      } else if (formData?.password?.length < 8) {
        newErrors.password = 'Password must be at least 8 characters';
      }
      
      if (!formData?.confirmPassword) {
        newErrors.confirmPassword = 'Please confirm your password';
      } else if (formData?.password !== formData?.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
      
      if (!formData?.firstName) {
        newErrors.firstName = 'First name is required';
      }
      
      if (!formData?.lastName) {
        newErrors.lastName = 'Last name is required';
      }
      
      if (!formData?.phone) {
        newErrors.phone = 'Phone number is required';
      }
    }
    
    if (step === 3) {
      if (!formData?.organization) {
        newErrors.organization = 'Organization name is required';
      }
      
      if (!formData?.address) {
        newErrors.address = 'Address is required';
      }
      
      if (!formData?.city) {
        newErrors.city = 'City is required';
      }
      
      if (!formData?.state) {
        newErrors.state = 'State is required';
      }
      
      if (!formData?.zipCode) {
        newErrors.zipCode = 'ZIP code is required';
      }
      
      if (!formData?.agreeToTerms) {
        newErrors.agreeToTerms = 'You must agree to the terms of service';
      }
      
      if (!formData?.agreeToPrivacy) {
        newErrors.agreeToPrivacy = 'You must agree to the privacy policy';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Store auth data
      localStorage.setItem('authToken', 'mock-jwt-token');
      localStorage.setItem('userRole', formData?.userType);
      localStorage.setItem('userEmail', formData?.email);
      
      onRegisterSuccess(formData?.userType);
      navigate('/dashboard-home');
      setIsLoading(false);
    }, 2000);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <UserTypeSelector
              selectedType={formData?.userType}
              onTypeChange={(type) => setFormData(prev => ({ ...prev, userType: type }))}
            />
            {errors?.userType && (
              <p className="text-sm text-error">{errors?.userType}</p>
            )}
          </div>
        );
      
      case 2:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="First Name"
                type="text"
                name="firstName"
                placeholder="Enter your first name"
                value={formData?.firstName}
                onChange={handleInputChange}
                error={errors?.firstName}
                required
              />
              
              <Input
                label="Last Name"
                type="text"
                name="lastName"
                placeholder="Enter your last name"
                value={formData?.lastName}
                onChange={handleInputChange}
                error={errors?.lastName}
                required
              />
            </div>
            <Input
              label="Email Address"
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData?.email}
              onChange={handleInputChange}
              error={errors?.email}
              required
            />
            <Input
              label="Phone Number"
              type="tel"
              name="phone"
              placeholder="Enter your phone number"
              value={formData?.phone}
              onChange={handleInputChange}
              error={errors?.phone}
              required
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Create a password"
                value={formData?.password}
                onChange={handleInputChange}
                error={errors?.password}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
              </button>
            </div>
            {formData?.password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Password strength:</span>
                  <span className={`font-medium ${
                    passwordStrength < 50 ? 'text-error' : 
                    passwordStrength < 75 ? 'text-warning' : 'text-success'
                  }`}>
                    {getPasswordStrengthText()}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor()}`}
                    style={{ width: `${passwordStrength}%` }}
                  ></div>
                </div>
              </div>
            )}
            <div className="relative">
              <Input
                label="Confirm Password"
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData?.confirmPassword}
                onChange={handleInputChange}
                error={errors?.confirmPassword}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-9 text-muted-foreground hover:text-foreground"
              >
                <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
              </button>
            </div>
          </div>
        );
      
      case 3:
        return (
          <div className="space-y-4">
            <Input
              label="Organization Name"
              type="text"
              name="organization"
              placeholder="Enter your organization name"
              value={formData?.organization}
              onChange={handleInputChange}
              error={errors?.organization}
              required
            />
            <Input
              label="Address"
              type="text"
              name="address"
              placeholder="Enter your address"
              value={formData?.address}
              onChange={handleInputChange}
              error={errors?.address}
              required
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="City"
                type="text"
                name="city"
                placeholder="City"
                value={formData?.city}
                onChange={handleInputChange}
                error={errors?.city}
                required
                className="md:col-span-1"
              />
              
              <Input
                label="State"
                type="text"
                name="state"
                placeholder="State"
                value={formData?.state}
                onChange={handleInputChange}
                error={errors?.state}
                required
                className="md:col-span-1"
              />
              
              <Input
                label="ZIP Code"
                type="text"
                name="zipCode"
                placeholder="ZIP"
                value={formData?.zipCode}
                onChange={handleInputChange}
                error={errors?.zipCode}
                required
                className="md:col-span-1"
              />
            </div>
            {formData?.userType === 'donor' && (
              <BusinessVerificationUpload
                formData={formData}
                onChange={setFormData}
                errors={errors}
              />
            )}
            {formData?.userType === 'recipient' && (
              <NeedsAssessment
                formData={formData}
                onChange={setFormData}
                errors={errors}
              />
            )}
            <div className="space-y-3 pt-4 border-t border-border">
              <Checkbox
                label="I agree to the Terms of Service"
                checked={formData?.agreeToTerms}
                onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e?.target?.checked }))}
                error={errors?.agreeToTerms}
                required
              />
              
              <Checkbox
                label="I agree to the Privacy Policy"
                checked={formData?.agreeToPrivacy}
                onChange={(e) => setFormData(prev => ({ ...prev, agreeToPrivacy: e?.target?.checked }))}
                error={errors?.agreeToPrivacy}
                required
              />
            </div>
          </div>
        );
      
      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case 1: return 'Choose Account Type';
      case 2: return 'Personal Information';
      case 3: return 'Organization Details';
      default: return '';
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress Indicator */}
      <div className="flex items-center justify-between mb-6">
        {[1, 2, 3]?.map((step) => (
          <div key={step} className="flex items-center">
            <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
              step <= currentStep
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground'
            }`}>
              {step < currentStep ? (
                <Icon name="Check" size={16} />
              ) : (
                step
              )}
            </div>
            {step < 3 && (
              <div className={`w-16 h-1 mx-2 ${
                step < currentStep ? 'bg-primary' : 'bg-muted'
              }`} />
            )}
          </div>
        ))}
      </div>
      {/* Step Title */}
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-foreground">{getStepTitle()}</h3>
        <p className="text-sm text-muted-foreground">Step {currentStep} of 3</p>
      </div>
      {/* Step Content */}
      <form onSubmit={handleSubmit}>
        {renderStep()}
        
        {/* Navigation Buttons */}
        <div className="flex justify-between pt-6">
          {currentStep > 1 ? (
            <Button
              type="button"
              variant="outline"
              onClick={handleBack}
            >
              <Icon name="ArrowLeft" size={16} className="mr-2" />
              Back
            </Button>
          ) : (
            <div />
          )}
          
          {currentStep < 3 ? (
            <Button
              type="button"
              onClick={handleNext}
            >
              Next
              <Icon name="ArrowRight" size={16} className="ml-2" />
            </Button>
          ) : (
            <Button
              type="submit"
              loading={isLoading}
              disabled={isLoading}
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegisterForm;