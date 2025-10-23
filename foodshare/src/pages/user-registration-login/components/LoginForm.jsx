import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onForgotPassword, onLoginSuccess }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Mock credentials for different user types
  const mockCredentials = {
    'donor@foodshare.com': { password: 'donor123', role: 'donor' },
    'recipient@foodshare.com': { password: 'recipient123', role: 'recipient' },
    'admin@foodshare.com': { password: 'admin123', role: 'admin' }
  };

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/?.test(formData?.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData?.password) {
      newErrors.password = 'Password is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const mockUser = mockCredentials?.[formData?.email];
      
      if (mockUser && mockUser?.password === formData?.password) {
        // Store auth data
        localStorage.setItem('authToken', 'mock-jwt-token');
        localStorage.setItem('userRole', mockUser?.role);
        localStorage.setItem('userEmail', formData?.email);
        
        onLoginSuccess(mockUser?.role);
        navigate('/dashboard-home');
      } else {
        setErrors({
          general: 'Invalid email or password. Try: donor@foodshare.com / donor123'
        });
      }
      
      setIsLoading(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errors?.general && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-lg">
          <p className="text-sm text-error">{errors?.general}</p>
        </div>
      )}
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
      <div className="relative">
        <Input
          label="Password"
          type={showPassword ? 'text' : 'password'}
          name="password"
          placeholder="Enter your password"
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
      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            className="w-4 h-4 text-primary bg-card border-border rounded focus:ring-primary focus:ring-2"
          />
          <span className="ml-2 text-sm text-muted-foreground">Remember me</span>
        </label>
        
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:text-primary/80 font-medium"
        >
          Forgot password?
        </button>
      </div>
      <Button
        type="submit"
        fullWidth
        loading={isLoading}
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
      {/* Mock credentials hint */}
      <div className="mt-4 p-3 bg-muted rounded-lg">
        <p className="text-xs text-muted-foreground mb-2">Demo Credentials:</p>
        <div className="space-y-1 text-xs">
          <p><strong>Donor:</strong> donor@foodshare.com / donor123</p>
          <p><strong>Recipient:</strong> recipient@foodshare.com / recipient123</p>
          <p><strong>Admin:</strong> admin@foodshare.com / admin123</p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;