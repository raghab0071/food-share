import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import MobileConversationView from './components/MobileConversationView';
import DesktopSplitView from './components/DesktopSplitView';

const MessagesAndCommunication = () => {
  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showChat, setShowChat] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mock conversations data
  const mockConversations = [
    {
      id: 1,
      name: "Green Valley Restaurant",
      avatar: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=150&h=150&fit=crop&crop=face",
      type: "donor",
      lastMessage: "The food is ready for pickup at the back entrance",
      timestamp: new Date(Date.now() - 300000), // 5 minutes ago
      unreadCount: 2,
      isOnline: true,
      isTyping: false,
      isPinned: true,
      contextType: "food-listing",
      contextTag: "Fresh Sandwiches - Expires Today"
    },
    {
      id: 2,
      name: "Downtown Food Bank",
      avatar: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=150&h=150&fit=crop&crop=face",
      type: "recipient",
      lastMessage: "Thank you so much! We\'ll be there in 20 minutes",
      timestamp: new Date(Date.now() - 900000), // 15 minutes ago
      unreadCount: 0,
      isOnline: true,
      isTyping: true,
      isPinned: false,
      contextType: "pickup-request",
      contextTag: "Pickup Request #PR-2024-001"
    },
    {
      id: 3,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      type: "volunteer",
      lastMessage: "I can help with the delivery to the shelter",
      timestamp: new Date(Date.now() - 1800000), // 30 minutes ago
      unreadCount: 1,
      isOnline: false,
      isTyping: false,
      isPinned: false,
      contextType: "volunteer-help",
      contextTag: "Volunteer Assistance"
    },
    {
      id: 4,
      name: "Sunrise Grocery",
      avatar: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=150&h=150&fit=crop&crop=face",
      type: "donor",
      lastMessage: "We have fresh produce available until 6 PM",
      timestamp: new Date(Date.now() - 3600000), // 1 hour ago
      unreadCount: 0,
      isOnline: true,
      isTyping: false,
      isPinned: false,
      contextType: "food-listing",
      contextTag: "Fresh Produce - Bulk Available"
    },
    {
      id: 5,
      name: "Community Kitchen",
      avatar: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=150&h=150&fit=crop&crop=face",
      type: "recipient",
      lastMessage: "Could you confirm the pickup time?",
      timestamp: new Date(Date.now() - 7200000), // 2 hours ago
      unreadCount: 3,
      isOnline: false,
      isTyping: false,
      isPinned: false,
      contextType: "pickup-request",
      contextTag: "Pickup Coordination"
    },
    {
      id: 6,
      name: "Mike Rodriguez",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      type: "volunteer",
      lastMessage: "I\'m available for pickup and delivery this evening",
      timestamp: new Date(Date.now() - 10800000), // 3 hours ago
      unreadCount: 0,
      isOnline: true,
      isTyping: false,
      isPinned: false,
      contextType: "volunteer-help",
      contextTag: "Evening Delivery Support"
    }
  ];

  // Mock messages data
  const mockMessages = {
    1: [
      {
        id: 1,
        sender: "Green Valley Restaurant",
        content: "Hi! We have 20 fresh sandwiches that need to be picked up by 6 PM today. They\'re all individually wrapped and ready to go.",
        timestamp: new Date(Date.now() - 1800000),
        status: "read",
        type: "text"
      },
      {
        id: 2,
        sender: "You",
        content: "That\'s perfect! What\'s the best entrance to use for pickup?",
        timestamp: new Date(Date.now() - 1500000),
        status: "read",
        type: "text"
      },
      {
        id: 3,
        sender: "Green Valley Restaurant",
        content: "Please use the back entrance near the loading dock. I'll have someone waiting there with the food.",
        timestamp: new Date(Date.now() - 1200000),
        status: "read",
        type: "text"
      },
      {
        id: 4,
        sender: "You",
        content: "Great! I\'ll be there in about 15 minutes. Should I call when I arrive?",
        timestamp: new Date(Date.now() - 900000),
        status: "delivered",
        type: "text"
      },
      {
        id: 5,
        sender: "Green Valley Restaurant",
        content: "The food is ready for pickup at the back entrance",
        timestamp: new Date(Date.now() - 300000),
        status: "sent",
        type: "text"
      }
    ],
    2: [
      {
        id: 1,
        sender: "You",
        content: "Hi! I have 20 sandwiches from Green Valley Restaurant available for pickup. Are you interested?",
        timestamp: new Date(Date.now() - 2400000),
        status: "read",
        type: "text"
      },
      {
        id: 2,
        sender: "Downtown Food Bank",
        content: "Yes, absolutely! We can use those for our evening meal service. What time works for pickup?",
        timestamp: new Date(Date.now() - 2100000),
        status: "read",
        type: "text"
      },
      {
        id: 3,
        sender: "You",
        content: "I can have them ready by 6:30 PM. Does that work for you?",
        timestamp: new Date(Date.now() - 1800000),
        status: "read",
        type: "text"
      },
      {
        id: 4,
        sender: "Downtown Food Bank",
        content: "Perfect timing! Our volunteers will be there to collect them.",
        timestamp: new Date(Date.now() - 1500000),
        status: "read",
        type: "text"
      },
      {
        id: 5,
        sender: "Downtown Food Bank",
        content: "Thank you so much! We\'ll be there in 20 minutes",
        timestamp: new Date(Date.now() - 900000),
        status: "sent",
        type: "text"
      }
    ],
    3: [
      {
        id: 1,
        sender: "Sarah Chen",
        content: "Hi! I saw your post about needing help with food delivery. I'm available this afternoon if you need assistance.",
        timestamp: new Date(Date.now() - 3600000),
        status: "read",
        type: "text"
      },
      {
        id: 2,
        sender: "You",
        content: "That would be amazing! I have a pickup from Green Valley Restaurant that needs to go to the Downtown Food Bank.",
        timestamp: new Date(Date.now() - 3300000),
        status: "read",
        type: "text"
      },
      {
        id: 3,
        sender: "Sarah Chen",
        content: "I can help with the delivery to the shelter",
        timestamp: new Date(Date.now() - 1800000),
        status: "sent",
        type: "text"
      }
    ]
  };

  useEffect(() => {
    setConversations(mockConversations);
    
    // Set first conversation as active by default on desktop
    if (mockConversations?.length > 0 && window.innerWidth >= 768) {
      setActiveConversationId(mockConversations?.[0]?.id);
      setMessages(mockMessages?.[mockConversations?.[0]?.id] || []);
    }

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleConversationSelect = (conversationId) => {
    setActiveConversationId(conversationId);
    setMessages(mockMessages?.[conversationId] || []);
    
    // Mark conversation as read
    setConversations(prev => 
      prev?.map(conv => 
        conv?.id === conversationId 
          ? { ...conv, unreadCount: 0 }
          : conv
      )
    );

    // Show chat on mobile
    if (isMobile) {
      setShowChat(true);
    }
  };

  const handleSendMessage = (content, attachment = null) => {
    const newMessage = {
      id: messages?.length + 1,
      sender: "You",
      content: content,
      timestamp: new Date(),
      status: "sent",
      type: attachment ? "file" : "text",
      attachment: attachment
    };

    setMessages(prev => [...prev, newMessage]);

    // Update conversation last message
    setConversations(prev =>
      prev?.map(conv =>
        conv?.id === activeConversationId
          ? {
              ...conv,
              lastMessage: attachment ? `Sent ${attachment?.fileName}` : content,
              timestamp: new Date()
            }
          : conv
      )
    );

    // Simulate message delivery status updates
    setTimeout(() => {
      setMessages(prev =>
        prev?.map(msg =>
          msg?.id === newMessage?.id ? { ...msg, status: "delivered" } : msg
        )
      );
    }, 1000);

    setTimeout(() => {
      setMessages(prev =>
        prev?.map(msg =>
          msg?.id === newMessage?.id ? { ...msg, status: "read" } : msg
        )
      );
    }, 3000);
  };

  const handleBack = () => {
    setShowChat(false);
    setActiveConversationId(null);
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const activeConversation = conversations?.find(conv => conv?.id === activeConversationId);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="h-[calc(100vh-4rem)]">
        {isMobile ? (
          <MobileConversationView
            showChat={showChat}
            conversations={conversations}
            activeConversation={activeConversation}
            messages={messages}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onConversationSelect={handleConversationSelect}
            onSendMessage={handleSendMessage}
            onBack={handleBack}
          />
        ) : (
          <DesktopSplitView
            conversations={conversations}
            activeConversation={activeConversation}
            messages={messages}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            onConversationSelect={handleConversationSelect}
            onSendMessage={handleSendMessage}
          />
        )}
      </main>
    </div>
  );
};

export default MessagesAndCommunication;