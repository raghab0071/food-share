import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BusinessVerificationUpload = ({ formData, onChange, errors }) => {
  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      const file = e?.dataTransfer?.files?.[0];
      onChange(prev => ({
        ...prev,
        businessLicense: file
      }));
    }
  };

  const handleFileSelect = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      const file = e?.target?.files?.[0];
      onChange(prev => ({
        ...prev,
        businessLicense: file
      }));
    }
  };

  const removeFile = () => {
    onChange(prev => ({
      ...prev,
      businessLicense: null
    }));
  };

  return (
    <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
      <div className="flex items-center space-x-2 mb-4">
        <Icon name="Shield" size={20} className="text-primary" />
        <h4 className="font-semibold text-foreground">Business Verification</h4>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        To ensure food safety and build trust, we require business verification for all donors.
      </p>
      <Input
        label="Tax ID / EIN"
        type="text"
        name="taxId"
        placeholder="Enter your Tax ID or EIN"
        value={formData?.taxId}
        onChange={(e) => onChange(prev => ({ ...prev, taxId: e?.target?.value }))}
        error={errors?.taxId}
        description="Your business tax identification number"
      />
      <div className="space-y-2">
        <label className="block text-sm font-medium text-foreground">
          Business License <span className="text-error">*</span>
        </label>
        
        {!formData?.businessLicense ? (
          <div
            className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
              dragActive
                ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            
            <div className="space-y-2">
              <Icon name="Upload" size={32} className="mx-auto text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  Drop your business license here, or <span className="text-primary">browse</span>
                </p>
                <p className="text-xs text-muted-foreground">
                  PDF, JPG, PNG up to 10MB
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
                <Icon name="FileText" size={20} className="text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{formData?.businessLicense?.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(formData?.businessLicense?.size / 1024 / 1024)?.toFixed(2)} MB
                </p>
              </div>
            </div>
            
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={removeFile}
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
        )}
        
        {errors?.businessLicense && (
          <p className="text-sm text-error">{errors?.businessLicense}</p>
        )}
      </div>
      <div className="bg-card p-3 rounded-lg border border-border">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-xs text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Verification Process:</p>
            <ul className="space-y-1">
              <li>• Documents are reviewed within 24-48 hours</li>
              <li>• You'll receive email confirmation once approved</li>
              <li>• Approved donors can immediately start posting food</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessVerificationUpload;