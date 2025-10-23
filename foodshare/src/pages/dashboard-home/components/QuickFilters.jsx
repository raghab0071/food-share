import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRole } from '../../../components/ui/RoleBasedMenu';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickFilters = () => {
  const { isRecipient } = useRole();
  const [activeFilter, setActiveFilter] = useState('all');

  // Only show for recipients
  if (!isRecipient) return null;

  const foodCategories = [
    {
      id: 'all',
      name: 'All Food',
      icon: 'Utensils',
      count: 47,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      id: 'produce',
      name: 'Fresh Produce',
      icon: 'Apple',
      count: 12,
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      id: 'prepared',
      name: 'Prepared Meals',
      icon: 'ChefHat',
      count: 8,
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      id: 'baked',
      name: 'Baked Goods',
      icon: 'Cookie',
      count: 15,
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      id: 'pantry',
      name: 'Pantry Items',
      icon: 'Package',
      count: 9,
      color: 'text-secondary',
      bgColor: 'bg-secondary/10'
    },
    {
      id: 'dairy',
      name: 'Dairy & Eggs',
      icon: 'Milk',
      count: 3,
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    }
  ];

  const urgentListings = [
    {
      id: 1,
      title: 'Fresh Sandwiches',
      donor: 'Downtown Deli',
      expiresIn: '2 hours',
      distance: '0.3 miles',
      image: 'https://images.pexels.com/photos/1600727/pexels-photo-1600727.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop'
    },
    {
      id: 2,
      title: 'Mixed Vegetables',
      donor: 'Green Market',
      expiresIn: '4 hours',
      distance: '0.8 miles',
      image: 'https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop'
    },
    {
      id: 3,
      title: 'Artisan Bread',
      donor: 'Sunrise Bakery',
      expiresIn: '6 hours',
      distance: '1.2 miles',
      image: 'https://images.pexels.com/photos/209206/pexels-photo-209206.jpeg?auto=compress&cs=tinysrgb&w=200&h=150&fit=crop'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Food Categories */}
      <div className="bg-card rounded-lg p-6 shadow-elevation-1">
        <h2 className="text-xl font-semibold text-foreground mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {foodCategories?.map((category) => (
            <button
              key={category?.id}
              onClick={() => setActiveFilter(category?.id)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-elevation-2 ${
                activeFilter === category?.id
                  ? 'border-primary bg-primary/5' :'border-border hover:border-primary/30'
              }`}
            >
              <div className={`flex items-center justify-center w-12 h-12 rounded-lg mx-auto mb-2 ${category?.bgColor}`}>
                <Icon name={category?.icon} size={24} className={category?.color} />
              </div>
              <h3 className="font-medium text-foreground text-sm mb-1">{category?.name}</h3>
              <p className="text-xs text-muted-foreground">{category?.count} available</p>
            </button>
          ))}
        </div>
        <div className="mt-4 text-center">
          <Link to="/food-detail-request">
            <Button variant="outline">
              <Icon name="Search" size={16} className="mr-2" />
              Browse All Food
            </Button>
          </Link>
        </div>
      </div>
      {/* Urgent Listings */}
      <div className="bg-card rounded-lg p-6 shadow-elevation-1">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <h2 className="text-xl font-semibold text-foreground">Expiring Soon</h2>
            <span className="flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-error rounded-full">
              {urgentListings?.length}
            </span>
          </div>
          <Link to="/food-detail-request" className="text-sm text-primary hover:text-primary/80 transition-colors duration-200">
            View All
          </Link>
        </div>
        
        <div className="space-y-3">
          {urgentListings?.map((listing) => (
            <div key={listing?.id} className="flex items-center space-x-4 p-3 rounded-lg border border-error/20 bg-error/5 hover:shadow-elevation-1 transition-shadow duration-200">
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                <img 
                  src={listing?.image} 
                  alt={listing?.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-foreground mb-1">{listing?.title}</h3>
                <p className="text-sm text-muted-foreground mb-1">{listing?.donor}</p>
                <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                  <span className="flex items-center space-x-1">
                    <Icon name="Clock" size={12} className="text-error" />
                    <span className="text-error font-medium">{listing?.expiresIn}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Icon name="MapPin" size={12} />
                    <span>{listing?.distance}</span>
                  </span>
                </div>
              </div>
              <Link to="/food-detail-request">
                <Button size="sm" variant="outline">
                  Reserve
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuickFilters;