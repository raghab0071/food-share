import React from 'react';
import ConversationList from './ConversationList';
import ChatArea from './ChatArea';

const MobileConversationView = ({ 
  showChat, 
  conversations, 
  activeConversation, 
  messages, 
  searchQuery,
  onSearchChange,
  onConversationSelect, 
  onSendMessage, 
  onBack 
}) => {
  if (showChat && activeConversation) {
    return (
      <div className="h-full">
        <ChatArea
          conversation={activeConversation}
          messages={messages}
          onSendMessage={onSendMessage}
          onBack={onBack}
        />
      </div>
    );
  }

  return (
    <div className="h-full">
      <ConversationList
        conversations={conversations}
        activeConversationId={activeConversation?.id}
        onConversationSelect={onConversationSelect}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />
    </div>
  );
};

export default MobileConversationView;