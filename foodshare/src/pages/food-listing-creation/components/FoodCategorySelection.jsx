import React from 'react';
import Icon from '../../../components/AppIcon';

const FoodCategorySelection = ({ selectedCategory, onCategorySelect }) => {
  const categories = [
    {
      id: 'produce',
      name: 'Fresh Produce',
      icon: 'Apple',
      description: 'Fruits, vegetables, herbs',
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      id: 'prepared',
      name: 'Prepared Meals',
      icon: 'ChefHat',
      description: 'Cooked food, ready-to-eat',
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
    },
    {
      id: 'packaged',
      name: 'Packaged Goods',
      icon: 'Package',
      description: 'Canned, boxed, sealed items',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      id: 'bakery',
      name: 'Bakery Items',
      icon: 'Cookie',
      description: 'Bread, pastries, desserts',
      color: 'bg-yellow-50 border-yellow-200 hover:bg-yellow-100'
    },
    {
      id: 'dairy',
      name: 'Dairy Products',
      icon: 'Milk',
      description: 'Milk, cheese, yogurt',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    },
    {
      id: 'frozen',
      name: 'Frozen Foods',
      icon: 'Snowflake',
      description: 'Frozen meals, ice cream',
      color: 'bg-cyan-50 border-cyan-200 hover:bg-cyan-100'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          What type of food are you donating?
        </h3>
        <p className="text-sm text-muted-foreground">
          Select the category that best describes your food donation
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories?.map((category) => (
          <button
            key={category?.id}
            onClick={() => onCategorySelect(category?.id)}
            className={`p-6 rounded-lg border-2 transition-all duration-200 text-left ${
              selectedCategory === category?.id
                ? 'border-primary bg-primary/5 shadow-elevation-2'
                : `${category?.color} border-2`
            }`}
          >
            <div className="flex items-center space-x-3 mb-3">
              <div className={`p-2 rounded-lg ${
                selectedCategory === category?.id ? 'bg-primary text-white' : 'bg-white'
              }`}>
                <Icon name={category?.icon} size={24} />
              </div>
              <h4 className="font-semibold text-foreground">{category?.name}</h4>
            </div>
            <p className="text-sm text-muted-foreground">{category?.description}</p>
            
            {selectedCategory === category?.id && (
              <div className="mt-3 flex items-center text-primary">
                <Icon name="Check" size={16} className="mr-2" />
                <span className="text-sm font-medium">Selected</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FoodCategorySelection;