import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ConversationList = ({ conversations, activeConversationId, onConversationSelect, searchQuery, onSearchChange }) => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filteredConversations = conversations?.filter(conversation => {
    const matchesSearch = conversation?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase()) ||
                         conversation?.lastMessage?.toLowerCase()?.includes(searchQuery?.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
                         (selectedFilter === 'unread' && conversation?.unreadCount > 0) ||
                         (selectedFilter === 'donors' && conversation?.type === 'donor') ||
                         (selectedFilter === 'recipients' && conversation?.type === 'recipient') ||
                         (selectedFilter === 'volunteers' && conversation?.type === 'volunteer');
    
    return matchesSearch && matchesFilter;
  });

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const messageTime = new Date(timestamp);
    const diffInHours = (now - messageTime) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return 'Just now';
    } else if (diffInHours < 24) {
      return messageTime?.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true 
      });
    } else if (diffInHours < 168) { // 7 days
      return messageTime?.toLocaleDateString('en-US', { weekday: 'short' });
    } else {
      return messageTime?.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  const getContextIcon = (contextType) => {
    switch (contextType) {
      case 'food-listing': return 'Package';
      case 'pickup-request': return 'Truck';
      case 'volunteer-help': return 'Users';
      default: return 'MessageCircle';
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'donor': return 'Store';
      case 'recipient': return 'Heart';
      case 'volunteer': return 'Users';
      default: return 'User';
    }
  };

  const filterOptions = [
    { key: 'all', label: 'All', count: conversations?.length },
    { key: 'unread', label: 'Unread', count: conversations?.filter(c => c?.unreadCount > 0)?.length },
    { key: 'donors', label: 'Donors', count: conversations?.filter(c => c?.type === 'donor')?.length },
    { key: 'recipients', label: 'Recipients', count: conversations?.filter(c => c?.type === 'recipient')?.length },
    { key: 'volunteers', label: 'Volunteers', count: conversations?.filter(c => c?.type === 'volunteer')?.length }
  ];

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground mb-3">Messages</h2>
        
        {/* Search */}
        <div className="relative mb-3">
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full pl-10 pr-4 py-2 text-sm bg-muted border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-1">
          {filterOptions?.map((filter) => (
            <button
              key={filter?.key}
              onClick={() => setSelectedFilter(filter?.key)}
              className={`px-3 py-1 text-xs font-medium rounded-full transition-colors duration-200 ${
                selectedFilter === filter?.key
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-muted-foreground hover:bg-muted/80'
              }`}
            >
              {filter?.label} {filter?.count > 0 && `(${filter?.count})`}
            </button>
          ))}
        </div>
      </div>
      {/* Conversations List */}
      <div className="flex-1 overflow-y-auto">
        {filteredConversations?.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Icon name="MessageCircle" size={48} className="text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No conversations found</h3>
            <p className="text-sm text-muted-foreground">
              {searchQuery ? 'Try adjusting your search terms' : 'Start a conversation to see it here'}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {filteredConversations?.map((conversation) => (
              <button
                key={conversation?.id}
                onClick={() => onConversationSelect(conversation?.id)}
                className={`w-full p-4 text-left hover:bg-muted/50 transition-colors duration-200 ${
                  activeConversationId === conversation?.id ? 'bg-muted' : ''
                }`}
              >
                <div className="flex items-start space-x-3">
                  {/* Avatar */}
                  <div className="relative flex-shrink-0">
                    <Image
                      src={conversation?.avatar}
                      alt={conversation?.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="absolute -bottom-1 -right-1 flex items-center justify-center w-5 h-5 bg-card border-2 border-card rounded-full">
                      <Icon 
                        name={getTypeIcon(conversation?.type)} 
                        size={12} 
                        className="text-muted-foreground" 
                      />
                    </div>
                    {conversation?.isOnline && (
                      <div className="absolute top-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-medium text-foreground truncate">
                        {conversation?.name}
                      </h3>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        {conversation?.contextType && (
                          <Icon 
                            name={getContextIcon(conversation?.contextType)} 
                            size={14} 
                            className="text-muted-foreground" 
                          />
                        )}
                        <span className="text-xs text-muted-foreground">
                          {formatTimestamp(conversation?.timestamp)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate flex-1">
                        {conversation?.isTyping ? (
                          <span className="text-primary italic">typing...</span>
                        ) : (
                          conversation?.lastMessage
                        )}
                      </p>
                      
                      <div className="flex items-center space-x-2 flex-shrink-0 ml-2">
                        {conversation?.unreadCount > 0 && (
                          <span className="flex items-center justify-center min-w-5 h-5 px-1 text-xs font-bold text-white bg-accent rounded-full">
                            {conversation?.unreadCount > 99 ? '99+' : conversation?.unreadCount}
                          </span>
                        )}
                        {conversation?.isPinned && (
                          <Icon name="Pin" size={14} className="text-accent" />
                        )}
                      </div>
                    </div>

                    {/* Context Tag */}
                    {conversation?.contextTag && (
                      <div className="mt-2">
                        <span className="inline-flex items-center px-2 py-1 text-xs font-medium bg-secondary/20 text-secondary rounded-full">
                          <Icon 
                            name={getContextIcon(conversation?.contextType)} 
                            size={12} 
                            className="mr-1" 
                          />
                          {conversation?.contextTag}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationList;