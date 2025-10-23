import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const MessagingWidget = ({ donorInfo, foodTitle }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'donor',
      content: `Hi! Thanks for your interest in the ${foodTitle}. Feel free to ask any questions about pickup or the food details.`,
      timestamp: new Date(Date.now() - 3600000),
      senderName: donorInfo?.name,
      senderAvatar: donorInfo?.avatar
    }
  ]);

  const handleSendMessage = () => {
    if (message?.trim()) {
      const newMessage = {
        id: messages?.length + 1,
        sender: 'recipient',
        content: message,
        timestamp: new Date(),
        senderName: 'You',
        senderAvatar: 'https://randomuser.me/api/portraits/men/1.jpg'
      };
      
      setMessages(prev => [...prev, newMessage]);
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter' && !e?.shiftKey) {
      e?.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (timestamp) => {
    return timestamp?.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 overflow-hidden">
      {/* Header */}
      <div 
        className="flex items-center justify-between p-4 border-b border-border cursor-pointer hover:bg-muted/50 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-3">
          <div className="relative">
            <Image
              src={donorInfo?.avatar}
              alt={donorInfo?.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-success rounded-full border-2 border-card"></div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{donorInfo?.name}</h3>
            <p className="text-sm text-muted-foreground">
              {isExpanded ? 'Click to minimize' : 'Click to message'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {messages?.length > 1 && (
            <span className="w-2 h-2 bg-primary rounded-full"></span>
          )}
          <Icon 
            name={isExpanded ? 'ChevronDown' : 'ChevronUp'} 
            size={20} 
            className="text-muted-foreground" 
          />
        </div>
      </div>
      {/* Expanded Chat Interface */}
      {isExpanded && (
        <div className="flex flex-col">
          {/* Messages Area */}
          <div className="h-64 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages?.map((msg) => (
              <div
                key={msg?.id}
                className={`flex gap-3 ${msg?.sender === 'recipient' ? 'flex-row-reverse' : ''}`}
              >
                <Image
                  src={msg?.senderAvatar}
                  alt={msg?.senderName}
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
                <div className={`flex-1 max-w-xs ${msg?.sender === 'recipient' ? 'text-right' : ''}`}>
                  <div
                    className={`inline-block p-3 rounded-lg text-sm ${
                      msg?.sender === 'recipient' ?'bg-primary text-primary-foreground' :'bg-card text-foreground border border-border'
                    }`}
                  >
                    {msg?.content}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatTime(msg?.timestamp)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-card">
            <div className="flex gap-2">
              <div className="flex-1">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e?.target?.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type your message..."
                  rows={2}
                  className="w-full px-3 py-2 border border-border rounded-lg text-sm text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
                />
              </div>
              <Button
                variant="default"
                size="icon"
                onClick={handleSendMessage}
                disabled={!message?.trim()}
                className="self-end"
              >
                <Icon name="Send" size={16} />
              </Button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex gap-2 mt-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMessage("Hi! I'm interested in picking up this food. When would be a good time?")}
              >
                <Icon name="Clock" size={14} className="mr-1" />
                Ask about timing
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMessage("Could you provide more details about the pickup location?")}
              >
                <Icon name="MapPin" size={14} className="mr-1" />
                Ask about location
              </Button>
            </div>
          </div>
        </div>
      )}
      {/* Collapsed Quick Actions */}
      {!isExpanded && (
        <div className="p-4 bg-muted/30">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex-1">
              <Icon name="MessageCircle" size={14} className="mr-2" />
              Quick Message
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="Phone" size={14} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagingWidget;