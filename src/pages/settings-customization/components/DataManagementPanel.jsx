import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const DataManagementPanel = ({ isExpanded, onToggle }) => {
  const [backupStatus, setBackupStatus] = useState('idle');
  const [autoBackup, setAutoBackup] = useState(true);
  const [dataSize, setDataSize] = useState('2.4 MB');

  const handleBackup = () => {
    setBackupStatus('backing-up');
    setTimeout(() => {
      setBackupStatus('completed');
      setTimeout(() => setBackupStatus('idle'), 2000);
    }, 2000);
  };

  const handleRestore = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e?.target?.files?.[0];
      if (file) {
        console.log('Restoring from:', file?.name);
      }
    };
    input?.click();
  };

  const handleExport = () => {
    const data = {
      inventory: [],
      settings: {},
      customCategories: [],
      exportDate: new Date()?.toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hvac-inventory-backup-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    a?.click();
    URL.revokeObjectURL(url);
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      localStorage.clear();
      window.location?.reload();
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 lg:p-6 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
            <Icon name="Database" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Data Management</h3>
            <p className="text-sm text-muted-foreground">Backup, restore, and manage your data</p>
          </div>
        </div>
        <Icon 
          name={isExpanded ? "ChevronUp" : "ChevronDown"} 
          size={20} 
          className="text-muted-foreground" 
        />
      </button>
      {isExpanded && (
        <div className="px-4 lg:px-6 pb-4 lg:pb-6 space-y-6">
          {/* Storage Info */}
          <div className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">Local Storage Usage</span>
              <span className="text-sm text-muted-foreground">{dataSize}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div className="bg-primary h-2 rounded-full" style={{ width: '24%' }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">24% of available storage used</p>
          </div>

          {/* Auto Backup Setting */}
          <div className="space-y-4">
            <Checkbox
              label="Enable automatic backup"
              description="Automatically backup data every 24 hours"
              checked={autoBackup}
              onChange={(e) => setAutoBackup(e?.target?.checked)}
            />
          </div>

          {/* Backup Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleBackup}
              disabled={backupStatus === 'backing-up'}
              loading={backupStatus === 'backing-up'}
              iconName="Download"
              iconPosition="left"
              className="w-full"
            >
              {backupStatus === 'completed' ? 'Backup Complete' : 'Create Backup'}
            </Button>
            
            <Button
              variant="outline"
              onClick={handleRestore}
              iconName="Upload"
              iconPosition="left"
              className="w-full"
            >
              Restore Data
            </Button>
          </div>

          {/* Export & Clear */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="secondary"
              onClick={handleExport}
              iconName="FileDown"
              iconPosition="left"
              className="w-full"
            >
              Export Data
            </Button>
            
            <Button
              variant="destructive"
              onClick={handleClearData}
              iconName="Trash2"
              iconPosition="left"
              className="w-full"
            >
              Clear All Data
            </Button>
          </div>

          {/* Last Backup Info */}
          <div className="text-xs text-muted-foreground bg-muted/30 rounded-lg p-3">
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={14} />
              <span>Last backup: September 3, 2025 at 10:30 AM</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DataManagementPanel;