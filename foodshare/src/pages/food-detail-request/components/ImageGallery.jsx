import React, { useState } from 'react';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ImageGallery = ({ images, foodTitle }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images?.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images?.length) % images?.length);
  };

  const goToImage = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <div className="relative bg-card rounded-lg overflow-hidden shadow-elevation-1">
      {/* Main Image Display */}
      <div className="relative aspect-video bg-muted">
        <Image
          src={images?.[currentImageIndex]}
          alt={`${foodTitle} - Image ${currentImageIndex + 1}`}
          className="w-full h-full object-cover"
        />
        
        {/* Navigation Arrows */}
        {images?.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 w-10 h-10"
              onClick={prevImage}
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 w-10 h-10"
              onClick={nextImage}
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </>
        )}

        {/* Image Counter */}
        {images?.length > 1 && (
          <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
            {currentImageIndex + 1} / {images?.length}
          </div>
        )}
      </div>
      {/* Thumbnail Navigation */}
      {images?.length > 1 && (
        <div className="flex gap-2 p-4 overflow-x-auto">
          {images?.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                index === currentImageIndex
                  ? 'border-primary shadow-elevation-1'
                  : 'border-border hover:border-primary/50'
              }`}
            >
              <Image
                src={image}
                alt={`${foodTitle} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageGallery;