import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ForgotPasswordModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/?.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1500);
  };

  const handleClose = () => {
    setEmail('');
    setError('');
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-fade-in">
      <div className="w-full max-w-md bg-card rounded-lg shadow-modal animate-slide-down">
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h3 className="text-lg font-semibold text-foreground">Reset Password</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClose}
          >
            <Icon name="X" size={20} />
          </Button>
        </div>
        
        <div className="p-6">
          {!isSuccess ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="text-center mb-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full mx-auto mb-3">
                  <Icon name="Mail" size={24} className="text-primary" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
              </div>
              
              <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => {
                  setEmail(e?.target?.value);
                  setError('');
                }}
                error={error}
                required
              />
              
              <div className="flex space-x-3">
                <Button
                  type="button"
                  variant="outline"
                  fullWidth
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  fullWidth
                  loading={isLoading}
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>
              </div>
            </form>
          ) : (
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-full mx-auto">
                <Icon name="CheckCircle" size={24} className="text-success" />
              </div>
              
              <div>
                <h4 className="font-semibold text-foreground mb-2">Check Your Email</h4>
                <p className="text-sm text-muted-foreground">
                  We've sent a password reset link to <strong>{email}</strong>
                </p>
              </div>
              
              <div className="bg-muted p-3 rounded-lg text-left">
                <p className="text-xs text-muted-foreground">
                  <strong>Didn't receive the email?</strong><br />
                  • Check your spam folder<br />
                  • Make sure the email address is correct<br />
                  • Wait a few minutes and try again
                </p>
              </div>
              
              <Button
                fullWidth
                onClick={handleClose}
              >
                Got it
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;