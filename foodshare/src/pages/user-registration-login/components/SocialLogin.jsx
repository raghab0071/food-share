import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const SocialLogin = ({ onSocialLogin }) => {
  const socialProviders = [
    {
      id: 'google',
      name: 'Google',
      icon: 'Chrome',
      bgColor: 'bg-white',
      textColor: 'text-gray-700',
      borderColor: 'border-gray-300'
    },
    {
      id: 'facebook',
      name: 'Facebook',
      icon: 'Facebook',
      bgColor: 'bg-blue-600',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    }
  ];

  return (
    <div className="space-y-3 mb-6">
      {socialProviders?.map((provider) => (
        <Button
          key={provider?.id}
          variant="outline"
          fullWidth
          onClick={() => onSocialLogin(provider?.id)}
          className={`${provider?.bgColor} ${provider?.textColor} ${provider?.borderColor} hover:opacity-90`}
        >
          <Icon name={provider?.icon} size={20} className="mr-2" />
          Continue with {provider?.name}
        </Button>
      ))}
      <div className="relative my-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-card text-muted-foreground">Or continue with email</span>
        </div>
      </div>
    </div>
  );
};

export default SocialLogin;