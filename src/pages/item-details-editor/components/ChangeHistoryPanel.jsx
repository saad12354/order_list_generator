import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ChangeHistoryPanel = ({ item }) => {
  const [showAllHistory, setShowAllHistory] = useState(false);

  // Mock change history data
  const changeHistory = [
    {
      id: 1,
      timestamp: '2025-01-04T16:45:00.000Z',
      action: 'Stock Adjustment',
      details: 'Added 25 ft - Reason: Restocking',
      user: 'John Smith',
      previousValue: '15 ft',
      newValue: '40 ft',
      type: 'add'
    },
    {
      id: 2,
      timestamp: '2025-01-04T14:30:00.000Z',
      action: 'Item Updated',
      details: 'Changed type from Hard Copper to Soft Copper',
      user: 'Mike Johnson',
      previousValue: 'Hard Copper',
      newValue: 'Soft Copper',
      type: 'edit'
    },
    {
      id: 3,
      timestamp: '2025-01-04T10:15:00.000Z',
      action: 'Stock Adjustment',
      details: 'Removed 10 ft - Reason: Used in Project #2024-156',
      user: 'Sarah Davis',
      previousValue: '25 ft',
      newValue: '15 ft',
      type: 'remove'
    },
    {
      id: 4,
      timestamp: '2025-01-03T16:20:00.000Z',
      action: 'Location Transfer',
      details: 'Transferred from Main Warehouse to Service Van 1',
      user: 'Tom Wilson',
      previousValue: 'Main Warehouse',
      newValue: 'Service Van 1',
      type: 'transfer'
    },
    {
      id: 5,
      timestamp: '2025-01-03T09:45:00.000Z',
      action: 'Item Created',
      details: 'Initial inventory entry',
      user: 'Admin',
      previousValue: null,
      newValue: '25 ft',
      type: 'create'
    }
  ];

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now - date) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      const minutes = Math.floor((now - date) / (1000 * 60));
      return `${minutes} minutes ago`;
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)} hours ago`;
    } else {
      return date?.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const getActionIcon = (type) => {
    switch (type) {
      case 'add':
        return { name: 'Plus', color: 'text-success' };
      case 'remove':
        return { name: 'Minus', color: 'text-error' };
      case 'edit':
        return { name: 'Edit', color: 'text-warning' };
      case 'transfer':
        return { name: 'ArrowRightLeft', color: 'text-primary' };
      case 'create':
        return { name: 'Sparkles', color: 'text-accent' };
      default:
        return { name: 'Clock', color: 'text-muted-foreground' };
    }
  };

  const getActionBadge = (type) => {
    const badges = {
      add: { text: 'Added', class: 'bg-success/10 text-success' },
      remove: { text: 'Removed', class: 'bg-error/10 text-error' },
      edit: { text: 'Updated', class: 'bg-warning/10 text-warning' },
      transfer: { text: 'Transferred', class: 'bg-primary/10 text-primary' },
      create: { text: 'Created', class: 'bg-accent/10 text-accent' }
    };
    
    return badges?.[type] || { text: 'Changed', class: 'bg-muted text-muted-foreground' };
  };

  const displayedHistory = showAllHistory ? changeHistory : changeHistory?.slice(0, 3);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Change History</h3>
        <div className="text-sm text-muted-foreground">
          {changeHistory?.length} total changes
        </div>
      </div>
      {/* History Timeline */}
      <div className="space-y-4">
        {displayedHistory?.map((change, index) => {
          const actionIcon = getActionIcon(change?.type);
          const actionBadge = getActionBadge(change?.type);
          
          return (
            <div key={change?.id} className="relative">
              {/* Timeline Line */}
              {index < displayedHistory?.length - 1 && (
                <div className="absolute left-6 top-12 w-px h-16 bg-border"></div>
              )}
              <div className="flex items-start space-x-4">
                {/* Icon */}
                <div className={`flex items-center justify-center w-12 h-12 rounded-full bg-card border-2 border-border ${actionIcon?.color}`}>
                  <Icon name={actionIcon?.name} size={18} strokeWidth={2} />
                </div>
                
                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium text-foreground">{change?.action}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${actionBadge?.class}`}>
                        {actionBadge?.text}
                      </span>
                    </div>
                    <time className="text-xs text-muted-foreground">
                      {formatTimestamp(change?.timestamp)}
                    </time>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-2">
                    {change?.details}
                  </p>
                  
                  {change?.previousValue && change?.newValue && (
                    <div className="flex items-center space-x-2 text-xs">
                      <span className="px-2 py-1 bg-error/10 text-error rounded">
                        {change?.previousValue}
                      </span>
                      <Icon name="ArrowRight" size={12} className="text-muted-foreground" />
                      <span className="px-2 py-1 bg-success/10 text-success rounded">
                        {change?.newValue}
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-1 mt-2 text-xs text-muted-foreground">
                    <Icon name="User" size={12} />
                    <span>by {change?.user}</span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Show More/Less Button */}
      {changeHistory?.length > 3 && (
        <div className="text-center pt-4 border-t border-border">
          <Button
            variant="ghost"
            onClick={() => setShowAllHistory(!showAllHistory)}
            iconName={showAllHistory ? 'ChevronUp' : 'ChevronDown'}
            iconPosition="right"
          >
            {showAllHistory 
              ? 'Show Less' 
              : `Show ${changeHistory?.length - 3} More Changes`
            }
          </Button>
        </div>
      )}
      {/* Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-border">
        <div className="text-center">
          <div className="text-lg font-semibold text-success">
            {changeHistory?.filter(c => c?.type === 'add')?.length}
          </div>
          <div className="text-xs text-muted-foreground">Additions</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-error">
            {changeHistory?.filter(c => c?.type === 'remove')?.length}
          </div>
          <div className="text-xs text-muted-foreground">Removals</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-warning">
            {changeHistory?.filter(c => c?.type === 'edit')?.length}
          </div>
          <div className="text-xs text-muted-foreground">Updates</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-primary">
            {changeHistory?.filter(c => c?.type === 'transfer')?.length}
          </div>
          <div className="text-xs text-muted-foreground">Transfers</div>
        </div>
      </div>
    </div>
  );
};

export default ChangeHistoryPanel;