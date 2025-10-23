import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentModeration = () => {
  const [activeTab, setActiveTab] = useState('reports');

  const reports = [
    {
      id: 1,
      type: 'inappropriate_content',
      reportedItem: 'Food Listing #FB-2024-0892',
      reportedBy: 'Anonymous User',
      reason: 'Misleading food description',
      description: 'The listing claims fresh vegetables but images show wilted produce',
      timestamp: '2024-08-20 16:45:00',
      status: 'pending',
      priority: 'medium'
    },
    {
      id: 2,
      type: 'spam',
      reportedItem: 'User Message Thread',
      reportedBy: 'City Food Bank',
      reason: 'Spam messages',
      description: 'User sending repeated promotional messages unrelated to food donation',
      timestamp: '2024-08-20 14:30:00',
      status: 'pending',
      priority: 'low'
    },
    {
      id: 3,
      type: 'safety_concern',
      reportedItem: 'Food Listing #FB-2024-0889',
      reportedBy: 'Metro Shelter',
      reason: 'Food safety violation',
      description: 'Expired dairy products being offered for donation',
      timestamp: '2024-08-20 12:15:00',
      status: 'under_review',
      priority: 'high'
    }
  ];

  const flaggedContent = [
    {
      id: 1,
      type: 'listing',
      title: 'Fresh Bakery Items - Downtown Bakery',
      flagReason: 'Automated: Expired date detected',
      content: '20 assorted pastries and bread loaves, best by 08/19/2024',
      timestamp: '2024-08-20 18:00:00',
      autoFlag: true
    },
    {
      id: 2,
      type: 'message',
      title: 'Message from John Smith',
      flagReason: 'Keyword filter: Commercial promotion',
      content: 'Hey, check out my new catering business! Special discounts available...',
      timestamp: '2024-08-20 17:30:00',
      autoFlag: true
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'text-error';
      case 'medium':
        return 'text-warning';
      case 'low':
        return 'text-success';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-warning text-warning-foreground';
      case 'under_review':
        return 'bg-accent text-accent-foreground';
      case 'resolved':
        return 'bg-success text-success-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-elevation-1 border border-border">
      <div className="p-6 border-b border-border">
        <h3 className="text-lg font-semibold text-foreground mb-4">Content Moderation</h3>
        <div className="flex space-x-1">
          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'reports' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            User Reports ({reports?.length})
          </button>
          <button
            onClick={() => setActiveTab('flagged')}
            className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
              activeTab === 'flagged' ?'bg-primary text-primary-foreground' :'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            Auto-Flagged ({flaggedContent?.length})
          </button>
        </div>
      </div>
      <div className="p-6">
        {activeTab === 'reports' && (
          <div className="space-y-4">
            {reports?.map((report) => (
              <div key={report?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-2">
                      <Icon name="AlertTriangle" size={16} className={getPriorityColor(report?.priority)} />
                      <span className={`text-sm font-medium capitalize ${getPriorityColor(report?.priority)}`}>
                        {report?.priority} Priority
                      </span>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report?.status)}`}>
                      {report?.status?.replace('_', ' ')}
                    </span>
                  </div>
                  <span className="text-xs text-muted-foreground">{report?.timestamp}</span>
                </div>
                
                <div className="mb-3">
                  <h4 className="font-medium text-foreground mb-1">{report?.reportedItem}</h4>
                  <p className="text-sm text-muted-foreground mb-2">
                    Reported by: {report?.reportedBy} • Reason: {report?.reason}
                  </p>
                  <p className="text-sm text-foreground">{report?.description}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Icon name="Eye" size={16} className="mr-2" />
                    Review
                  </Button>
                  <Button variant="success" size="sm">
                    <Icon name="Check" size={16} className="mr-2" />
                    Approve
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Icon name="X" size={16} className="mr-2" />
                    Remove
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="MessageSquare" size={16} className="mr-2" />
                    Contact User
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {activeTab === 'flagged' && (
          <div className="space-y-4">
            {flaggedContent?.map((item) => (
              <div key={item?.id} className="border border-border rounded-lg p-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <Icon name="Flag" size={16} className="text-warning" />
                    <span className="text-sm font-medium text-warning">Auto-Flagged</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground capitalize">{item?.type}</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{item?.timestamp}</span>
                </div>
                
                <div className="mb-3">
                  <h4 className="font-medium text-foreground mb-1">{item?.title}</h4>
                  <p className="text-sm text-warning mb-2">{item?.flagReason}</p>
                  <p className="text-sm text-foreground bg-muted p-2 rounded">{item?.content}</p>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="success" size="sm">
                    <Icon name="Check" size={16} className="mr-2" />
                    Approve
                  </Button>
                  <Button variant="destructive" size="sm">
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Remove
                  </Button>
                  <Button variant="outline" size="sm">
                    <Icon name="Edit" size={16} className="mr-2" />
                    Edit
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Icon name="MoreHorizontal" size={16} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentModeration;