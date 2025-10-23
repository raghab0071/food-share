import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const ChatArea = ({ conversation, messages, onSendMessage, onBack }) => {
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showAttachments, setShowAttachments] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const templateMessages = [
    { id: 1, text: "I\'m running about 15 minutes late for pickup", category: "timing" },
    { id: 2, text: "Pickup completed successfully. Thank you!", category: "completion" },
    { id: 3, text: "The food looks great and is still fresh", category: "quality" },
    { id: 4, text: "Could you please confirm the pickup location?", category: "logistics" },
    { id: 5, text: "I\'ll be there in 10 minutes", category: "timing" },
    { id: 6, text: "Is the food still available for pickup?", category: "availability" }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage?.trim()) {
      onSendMessage(newMessage?.trim());
      setNewMessage('');
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const handleInputChange = (e) => {
    setNewMessage(e?.target?.value);
    setIsTyping(e?.target?.value?.length > 0);
  };

  const handleTemplateSelect = (template) => {
    setNewMessage(template?.text);
    setShowTemplates(false);
  };

  const handleFileUpload = (e) => {
    const file = e?.target?.files?.[0];
    if (file) {
      // Mock file upload - in real app, this would upload to server
      const fileMessage = {
        type: 'file',
        fileName: file?.name,
        fileSize: file?.size,
        fileType: file?.type
      };
      onSendMessage('', fileMessage);
    }
    setShowAttachments(false);
  };

  const formatMessageTime = (timestamp) => {
    return new Date(timestamp)?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i))?.toFixed(2)) + ' ' + sizes?.[i];
  };

  const getDeliveryStatusIcon = (status) => {
    switch (status) {
      case 'sent': return 'Check';
      case 'delivered': return 'CheckCheck';
      case 'read': return 'CheckCheck';
      default: return 'Clock';
    }
  };

  const getDeliveryStatusColor = (status) => {
    switch (status) {
      case 'read': return 'text-primary';
      case 'delivered': return 'text-muted-foreground';
      case 'sent': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  if (!conversation) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-muted/20">
        <Icon name="MessageCircle" size={64} className="text-muted-foreground mb-4" />
        <h3 className="text-xl font-medium text-foreground mb-2">Select a conversation</h3>
        <p className="text-muted-foreground text-center max-w-md">
          Choose a conversation from the list to start messaging with donors, recipients, or volunteers.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="md:hidden"
          >
            <Icon name="ArrowLeft" size={20} />
          </Button>
          
          <div className="relative">
            <Image
              src={conversation?.avatar}
              alt={conversation?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            {conversation?.isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
            )}
          </div>
          
          <div>
            <h3 className="font-medium text-foreground">{conversation?.name}</h3>
            <p className="text-sm text-muted-foreground">
              {conversation?.isTyping ? 'typing...' : conversation?.isOnline ? 'Online' : 'Offline'}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Icon name="Phone" size={18} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="Video" size={18} />
          </Button>
          <Button variant="ghost" size="sm">
            <Icon name="MoreVertical" size={18} />
          </Button>
        </div>
      </div>
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages?.map((message, index) => {
          const isOwnMessage = message?.sender === 'You';
          const showAvatar = !isOwnMessage && (index === 0 || messages?.[index - 1]?.sender !== message?.sender);
          
          return (
            <div
              key={message?.id}
              className={`flex ${isOwnMessage ? 'justify-end' : 'justify-start'} ${
                showAvatar ? 'mt-4' : 'mt-1'
              }`}
            >
              {!isOwnMessage && showAvatar && (
                <Image
                  src={conversation?.avatar}
                  alt={conversation?.name}
                  className="w-8 h-8 rounded-full object-cover mr-2 mt-auto"
                />
              )}
              {!isOwnMessage && !showAvatar && (
                <div className="w-8 mr-2"></div>
              )}
              <div className={`max-w-xs lg:max-w-md ${isOwnMessage ? 'ml-auto' : ''}`}>
                {message?.type === 'file' ? (
                  <div className={`p-3 rounded-lg ${
                    isOwnMessage 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card border border-border'
                  }`}>
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded ${
                        isOwnMessage ? 'bg-primary-foreground/20' : 'bg-muted'
                      }`}>
                        <Icon 
                          name={message?.attachment?.fileType?.startsWith('image/') ? 'Image' : 'File'} 
                          size={20} 
                          className={isOwnMessage ? 'text-primary-foreground' : 'text-foreground'}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className={`text-sm font-medium truncate ${
                          isOwnMessage ? 'text-primary-foreground' : 'text-foreground'
                        }`}>
                          {message?.attachment?.fileName}
                        </p>
                        <p className={`text-xs ${
                          isOwnMessage ? 'text-primary-foreground/70' : 'text-muted-foreground'
                        }`}>
                          {formatFileSize(message?.attachment?.fileSize)}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className={`p-3 rounded-lg ${
                    isOwnMessage 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card border border-border'
                  }`}>
                    <p className="text-sm whitespace-pre-wrap">{message?.content}</p>
                  </div>
                )}

                <div className={`flex items-center mt-1 space-x-2 ${
                  isOwnMessage ? 'justify-end' : 'justify-start'
                }`}>
                  <span className="text-xs text-muted-foreground">
                    {formatMessageTime(message?.timestamp)}
                  </span>
                  {isOwnMessage && (
                    <Icon 
                      name={getDeliveryStatusIcon(message?.status)} 
                      size={14} 
                      className={getDeliveryStatusColor(message?.status)}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      {/* Quick Actions */}
      <div className="px-4 py-2 border-t border-border bg-card">
        <div className="flex items-center space-x-2 overflow-x-auto">
          <Button variant="outline" size="sm">
            <Icon name="MapPin" size={16} className="mr-1" />
            Share Location
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="CheckCircle" size={16} className="mr-1" />
            Confirm Pickup
          </Button>
          <Button variant="outline" size="sm">
            <Icon name="Clock" size={16} className="mr-1" />
            Running Late
          </Button>
        </div>
      </div>
      {/* Message Input */}
      <div className="p-4 border-t border-border bg-card">
        {/* Template Messages */}
        {showTemplates && (
          <div className="mb-3 p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-foreground">Quick Responses</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowTemplates(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            <div className="grid grid-cols-1 gap-2">
              {templateMessages?.map((template) => (
                <button
                  key={template?.id}
                  onClick={() => handleTemplateSelect(template)}
                  className="text-left p-2 text-sm bg-background hover:bg-muted/50 rounded border border-border transition-colors duration-200"
                >
                  {template?.text}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Attachment Options */}
        {showAttachments && (
          <div className="mb-3 p-3 bg-muted rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-foreground">Attachments</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAttachments(false)}
              >
                <Icon name="X" size={16} />
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef?.current?.click()}
              >
                <Icon name="Camera" size={16} className="mr-1" />
                Photo
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => fileInputRef?.current?.click()}
              >
                <Icon name="File" size={16} className="mr-1" />
                Document
              </Button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*,.pdf,.doc,.docx"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Input Area */}
        <div className="flex items-end space-x-2">
          <div className="flex space-x-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAttachments(!showAttachments)}
            >
              <Icon name="Paperclip" size={18} />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowTemplates(!showTemplates)}
            >
              <Icon name="MessageSquare" size={18} />
            </Button>
          </div>
          
          <div className="flex-1 relative">
            <textarea
              value={newMessage}
              onChange={handleInputChange}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              rows={1}
              className="w-full px-4 py-2 text-sm bg-muted border border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              style={{ minHeight: '40px', maxHeight: '120px' }}
            />
          </div>
          
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage?.trim()}
            size="sm"
          >
            <Icon name="Send" size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatArea;