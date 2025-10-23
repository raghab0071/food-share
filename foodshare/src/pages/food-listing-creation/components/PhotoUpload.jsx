import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PhotoUpload = ({ photos, onPhotosChange }) => {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

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
      handleFiles(e?.dataTransfer?.files);
    }
  };

  const handleChange = (e) => {
    e?.preventDefault();
    if (e?.target?.files && e?.target?.files?.[0]) {
      handleFiles(e?.target?.files);
    }
  };

  const handleFiles = (files) => {
    const fileArray = Array.from(files);
    const validFiles = fileArray?.filter(file => 
      file?.type?.startsWith('image/') && file?.size <= 5 * 1024 * 1024 // 5MB limit
    );

    validFiles?.forEach(file => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newPhoto = {
          id: Date.now() + Math.random(),
          file: file,
          url: e?.target?.result,
          name: file?.name,
          size: file?.size
        };
        onPhotosChange([...photos, newPhoto]);
      };
      reader?.readAsDataURL(file);
    });
  };

  const removePhoto = (photoId) => {
    onPhotosChange(photos?.filter(photo => photo?.id !== photoId));
  };

  const onButtonClick = () => {
    fileInputRef?.current?.click();
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Add Photos of Your Food
        </h3>
        <p className="text-sm text-muted-foreground">
          Clear photos help recipients understand what you're offering. Add up to 5 images.
        </p>
      </div>
      {/* Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200 ${
          dragActive
            ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50'
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
        
        <div className="space-y-4">
          <div className="flex justify-center">
            <div className="p-3 bg-muted rounded-full">
              <Icon name="ImagePlus" size={32} className="text-muted-foreground" />
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-medium text-foreground mb-2">
              Drop photos here or click to browse
            </h4>
            <p className="text-sm text-muted-foreground mb-4">
              Supports JPG, PNG, WebP up to 5MB each
            </p>
            
            <button
              onClick={onButtonClick}
              className="inline-flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              <Icon name="Upload" size={16} />
              <span>Choose Files</span>
            </button>
          </div>
        </div>
      </div>
      {/* Photo Preview Grid */}
      {photos?.length > 0 && (
        <div>
          <h4 className="font-medium text-foreground mb-4">
            Uploaded Photos ({photos?.length}/5)
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {photos?.map((photo) => (
              <div key={photo?.id} className="relative group">
                <div className="aspect-square rounded-lg overflow-hidden bg-muted">
                  <Image
                    src={photo?.url}
                    alt={photo?.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <button
                  onClick={() => removePhoto(photo?.id)}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-error text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-error/90"
                >
                  <Icon name="X" size={12} />
                </button>
                
                <div className="mt-2">
                  <p className="text-xs text-muted-foreground truncate">
                    {photo?.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatFileSize(photo?.size)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* Photo Tips */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h5 className="font-medium text-foreground mb-2 flex items-center">
          <Icon name="Lightbulb" size={16} className="mr-2 text-warning" />
          Photo Tips
        </h5>
        <ul className="text-sm text-muted-foreground space-y-1">
          <li>• Take photos in good lighting to show food quality</li>
          <li>• Include close-ups and overview shots</li>
          <li>• Show packaging labels and expiration dates when visible</li>
          <li>• Avoid blurry or dark images</li>
        </ul>
      </div>
    </div>
  );
};

export default PhotoUpload;