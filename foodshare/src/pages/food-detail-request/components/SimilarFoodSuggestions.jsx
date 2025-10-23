import React from 'react';
import { Link } from 'react-router-dom';
import Image from '../../../components/AppImage';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const SimilarFoodSuggestions = ({ suggestions, currentFoodId }) => {
  const filteredSuggestions = suggestions?.filter(item => item?.id !== currentFoodId);

  if (filteredSuggestions?.length === 0) {
    return null;
  }

  const getExpirationStatus = (expirationDate) => {
    const now = new Date();
    const expiry = new Date(expirationDate);
    const hoursUntilExpiry = (expiry - now) / (1000 * 60 * 60);

    if (hoursUntilExpiry < 24) {
      return { status: 'urgent', color: 'text-warning', bgColor: 'bg-warning/10' };
    } else {
      return { status: 'fresh', color: 'text-success', bgColor: 'bg-success/10' };
    }
  };

  return (
    <div className="bg-card rounded-lg p-6 shadow-elevation-1">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Icon name="Grid3X3" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Similar Food Available</h3>
        </div>
        <Link
          to="/dashboard-home"
          className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
        >
          View All
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSuggestions?.slice(0, 6)?.map((item) => {
          const expirationInfo = getExpirationStatus(item?.expirationDate);
          
          return (
            <Link
              key={item?.id}
              to={`/food-detail-request?id=${item?.id}`}
              className="group block bg-background rounded-lg border border-border hover:border-primary/50 hover:shadow-elevation-2 transition-all duration-200"
            >
              {/* Image */}
              <div className="relative aspect-video overflow-hidden rounded-t-lg">
                <Image
                  src={item?.images?.[0]}
                  alt={item?.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                />
                
                {/* Status Badge */}
                <div className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${expirationInfo?.bgColor} ${expirationInfo?.color}`}>
                  {expirationInfo?.status === 'urgent' ? 'Expires Soon' : 'Fresh'}
                </div>

                {/* Distance Badge */}
                <div className="absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium bg-black/70 text-white">
                  {item?.distance}
                </div>
              </div>
              {/* Content */}
              <div className="p-4">
                <div className="space-y-2">
                  <h4 className="font-semibold text-foreground group-hover:text-primary transition-colors line-clamp-1">
                    {item?.title}
                  </h4>
                  
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {item?.description}
                  </p>

                  {/* Details */}
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Icon name="Package" size={12} />
                      <span>{item?.quantity}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Icon name="MapPin" size={12} />
                      <span>{item?.location}</span>
                    </div>
                  </div>

                  {/* Donor Info */}
                  <div className="flex items-center gap-2 pt-2 border-t border-border">
                    <Image
                      src={item?.donor?.avatar}
                      alt={item?.donor?.name}
                      className="w-6 h-6 rounded-full object-cover"
                    />
                    <span className="text-sm text-muted-foreground">{item?.donor?.name}</span>
                    {item?.donor?.isVerified && (
                      <Icon name="Shield" size={12} className="text-success" />
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      {/* View More Button */}
      {filteredSuggestions?.length > 6 && (
        <div className="text-center mt-6">
          <Button variant="outline" asChild>
            <Link to="/dashboard-home">
              <Icon name="Grid3X3" size={16} className="mr-2" />
              View More Food
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
};

export default SimilarFoodSuggestions;