import React from 'react';
import Button from '../../../components/ui/Button';


const QuickActionBar = ({ 
  onAddItem, 
  onGenerateReport, 
  onExportData, 
  onSyncData,
  className = '' 
}) => {
  const actions = [
    {
      id: 'add',
      label: 'Add Item',
      icon: 'Plus',
      onClick: onAddItem,
      variant: 'default'
    },
    {
      id: 'report',
      label: 'Report',
      icon: 'FileText',
      onClick: onGenerateReport,
      variant: 'outline'
    },
    {
      id: 'export',
      label: 'Export',
      icon: 'Download',
      onClick: onExportData,
      variant: 'outline'
    },
    {
      id: 'sync',
      label: 'Sync',
      icon: 'RefreshCw',
      onClick: onSyncData,
      variant: 'ghost'
    }
  ];

  return (
    <div className={`flex flex-wrap gap-2 lg:gap-3 ${className}`}>
      {actions?.map((action) => (
        <Button
          key={action?.id}
          variant={action?.variant}
          size="sm"
          onClick={action?.onClick}
          iconName={action?.icon}
          iconPosition="left"
          className="flex-1 lg:flex-none"
        >
          <span className="hidden lg:inline">{action?.label}</span>
          <span className="lg:hidden">{action?.label?.split(' ')?.[0]}</span>
        </Button>
      ))}
    </div>
  );
};

export default QuickActionBar;