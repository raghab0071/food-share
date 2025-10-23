import React from 'react';
import ConversationList from './ConversationList';
import ChatArea from './ChatArea';

const DesktopSplitView = ({ 
  conversations, 
  activeConversation, 
  messages, 
  searchQuery,
  onSearchChange,
  onConversationSelect, 
  onSendMessage 
}) => {
  return (
    <div className="flex h-full">
      {/* Left Panel - Conversations */}
      <div className="w-80 flex-shrink-0">
        <ConversationList
          conversations={conversations}
          activeConversationId={activeConversation?.id}
          onConversationSelect={onConversationSelect}
          searchQuery={searchQuery}
          onSearchChange={onSearchChange}
        />
      </div>

      {/* Right Panel - Chat */}
      <div className="flex-1">
        <ChatArea
          conversation={activeConversation}
          messages={messages}
          onSendMessage={onSendMessage}
          onBack={() => {}}
        />
      </div>
    </div>
  );
};

export default DesktopSplitView;