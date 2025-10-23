import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import ImageGallery from './components/ImageGallery';
import FoodInfoCard from './components/FoodInfoCard';
import DonorProfile from './components/DonorProfile';
import PickupScheduler from './components/PickupScheduler';
import LocationMap from './components/LocationMap';
import RequestForm from './components/RequestForm';
import SimilarFoodSuggestions from './components/SimilarFoodSuggestions';
import MessagingWidget from './components/MessagingWidget';

const FoodDetailRequest = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const foodId = searchParams?.get('id') || '1';
  
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [isRequestSubmitting, setIsRequestSubmitting] = useState(false);
  const [showRequestForm, setShowRequestForm] = useState(false);

  // Mock food data
  const mockFoodData = {
    id: foodId,
    title: "Fresh Bakery Items - Assorted Pastries & Bread",
    description: `High-quality bakery items including croissants, muffins, artisan bread, and Danish pastries. All items were baked this morning and are still fresh. Perfect for breakfast programs, shelters, or community events. Items include both sweet and savory options to accommodate different preferences.`,
    category: "Bakery",
    quantity: "50 pieces (mixed items)",
    servingSize: "50-75 people",
    expirationDate: "2025-08-21T18:00:00Z",
    storageType: "Room Temperature",
    images: [
      "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg",
      "https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg",
      "https://images.pexels.com/photos/1586947/pexels-photo-1586947.jpeg",
      "https://images.pexels.com/photos/1775043/pexels-photo-1775043.jpeg"
    ],
    dietaryInfo: ["Vegetarian Options Available", "Contains Gluten", "Contains Dairy"],
    safetyGuidelines: [
      "Items should be consumed within 24 hours of pickup",
      "Store in cool, dry place until consumption",
      "Check individual items for any signs of spoilage",
      "Suitable for immediate distribution or consumption"
    ]
  };

  // Mock donor data
  const mockDonorData = {
    id: "donor-1",
    name: "Sunrise Bakery & Café",
    type: "Local Bakery",
    avatar: "https://images.pexels.com/photos/2067396/pexels-photo-2067396.jpeg",
    isVerified: true,
    rating: 4.8,
    reviewCount: 127,
    totalDonations: 89,
    mealsProvided: "2.1K",
    monthsActive: 8,
    recentDonations: [
      { item: "Fresh Bread Loaves", date: "2 days ago", status: "Completed" },
      { item: "Pastry Assortment", date: "5 days ago", status: "Completed" },
      { item: "Sandwich Rolls", date: "1 week ago", status: "Completed" }
    ]
  };

  // Mock location data
  const mockLocationData = {
    name: "Sunrise Bakery & Café",
    address: "1234 Main Street",
    city: "Springfield",
    state: "IL",
    zipCode: "62701",
    latitude: 39.7817,
    longitude: -89.6501,
    phone: "(555) 123-4567",
    operatingHours: [
      { day: "Mon-Fri", hours: "6:00 AM - 8:00 PM" },
      { day: "Saturday", hours: "7:00 AM - 9:00 PM" },
      { day: "Sunday", hours: "8:00 AM - 6:00 PM" }
    ],
    parkingInstructions: "Free parking available in rear lot. Use back entrance for pickups.",
    specialInstructions: "Please call ahead and ask for the manager when arriving for pickup."
  };

  // Mock available time slots
  const mockAvailableSlots = {
    "2025-08-20": [
      { slot: "2:00 PM - 3:00 PM", duration: "1 hour" },
      { slot: "4:00 PM - 5:00 PM", duration: "1 hour" }
    ],
    "2025-08-21": [
      { slot: "10:00 AM - 11:00 AM", duration: "1 hour" },
      { slot: "2:00 PM - 3:00 PM", duration: "1 hour" },
      { slot: "4:00 PM - 5:00 PM", duration: "1 hour" }
    ],
    "2025-08-22": [
      { slot: "9:00 AM - 10:00 AM", duration: "1 hour" },
      { slot: "1:00 PM - 2:00 PM", duration: "1 hour" }
    ],
    "2025-08-23": [
      { slot: "11:00 AM - 12:00 PM", duration: "1 hour" },
      { slot: "3:00 PM - 4:00 PM", duration: "1 hour" }
    ]
  };

  // Mock similar food suggestions
  const mockSimilarFood = [
    {
      id: "2",
      title: "Restaurant Surplus - Prepared Meals",
      description: "Variety of prepared meals from our restaurant including pasta, salads, and sandwiches.",
      quantity: "30 meals",
      expirationDate: "2025-08-21T20:00:00Z",
      images: ["https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg"],
      location: "Downtown",
      distance: "1.2 miles",
      donor: {
        name: "City Bistro",
        avatar: "https://images.pexels.com/photos/941861/pexels-photo-941861.jpeg",
        isVerified: true
      }
    },
    {
      id: "3",
      title: "Grocery Store Produce",
      description: "Fresh fruits and vegetables that are approaching sell-by date but still perfectly good.",
      quantity: "Mixed produce box",
      expirationDate: "2025-08-22T10:00:00Z",
      images: ["https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg"],
      location: "Westside",
      distance: "2.8 miles",
      donor: {
        name: "Fresh Market",
        avatar: "https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg",
        isVerified: true
      }
    },
    {
      id: "4",
      title: "Catering Leftovers - Party Platters",
      description: "Assorted party platters from a corporate event including sandwiches, wraps, and sides.",
      quantity: "5 large platters",
      expirationDate: "2025-08-21T16:00:00Z",
      images: ["https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg"],
      location: "Business District",
      distance: "0.9 miles",
      donor: {
        name: "Elite Catering Co.",
        avatar: "https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg",
        isVerified: false
      }
    }
  ];

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleRequestSubmit = async (requestData) => {
    setIsRequestSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock successful submission
    alert('Request submitted successfully! You will receive a confirmation email shortly.');
    setIsRequestSubmitting(false);
    setShowRequestForm(false);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: mockFoodData?.title,
        text: `Check out this food donation: ${mockFoodData?.title}`,
        url: window.location?.href
      });
    } else {
      navigator.clipboard?.writeText(window.location?.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleBackClick = () => {
    navigate('/dashboard-home');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Page Header */}
      <div className="sticky top-16 z-40 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackClick}
              >
                <Icon name="ArrowLeft" size={18} className="mr-2" />
                Back to Browse
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleShare}
              >
                <Icon name="Share2" size={18} />
              </Button>
              <Button
                variant="ghost"
                size="sm"
              >
                <Icon name="Heart" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Gallery */}
            <ImageGallery 
              images={mockFoodData?.images} 
              foodTitle={mockFoodData?.title}
            />

            {/* Food Information */}
            <FoodInfoCard foodData={mockFoodData} />

            {/* Location & Map */}
            <LocationMap location={mockLocationData} />

            {/* Similar Food Suggestions */}
            <SimilarFoodSuggestions 
              suggestions={mockSimilarFood}
              currentFoodId={mockFoodData?.id}
            />
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-6">
            {/* Donor Profile */}
            <DonorProfile donor={mockDonorData} />

            {/* Pickup Scheduler */}
            <PickupScheduler 
              availableSlots={mockAvailableSlots}
              onSlotSelect={handleSlotSelect}
            />

            {/* Request Button */}
            <div className="sticky top-32">
              {!showRequestForm ? (
                <Button
                  variant="default"
                  size="lg"
                  fullWidth
                  onClick={() => setShowRequestForm(true)}
                  disabled={!selectedSlot}
                >
                  <Icon name="Send" size={18} className="mr-2" />
                  {selectedSlot ? 'Request This Food' : 'Select Pickup Time First'}
                </Button>
              ) : (
                <RequestForm
                  foodId={mockFoodData?.id}
                  onSubmit={handleRequestSubmit}
                  isLoading={isRequestSubmitting}
                />
              )}
            </div>

            {/* Messaging Widget */}
            <MessagingWidget 
              donorInfo={mockDonorData}
              foodTitle={mockFoodData?.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodDetailRequest;