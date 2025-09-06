import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';
import Select from '../../../components/ui/Select';

const AdvancedSettingsPanel = ({ isExpanded, onToggle }) => {
  const [offlineSync, setOfflineSync] = useState(true);
  const [cacheSize, setCacheSize] = useState('50MB');
  const [debugMode, setDebugMode] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [syncFrequency, setSyncFrequency] = useState('hourly');

  const syncFrequencyOptions = [
    { value: 'realtime', label: 'Real-time' },
    { value: 'hourly', label: 'Every hour' },
    { value: 'daily', label: 'Daily' },
    { value: 'manual', label: 'Manual only' }
  ];

  const handleClearCache = () => {
    if (window.confirm('Clear application cache? This will remove stored data and may slow down the next app load.')) {
      if ('caches' in window) {
        caches.keys()?.then(names => {
          names?.forEach(name => {
            caches.delete(name);
          });
        });
      }
      localStorage.removeItem('app-cache');
      setCacheSize('0MB');
      setTimeout(() => setCacheSize('15MB'), 1000);
    }
  };

  const handleInstallPWA = () => {
    // PWA installation logic would go here
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker?.register('/sw.js')?.then(() => {
        console.log('PWA installation initiated');
      });
    }
  };

  const handleExportSettings = () => {
    const settings = {
      theme: 'light',
      unitSystem: 'imperial',
      notifications: true,
      offlineSync: offlineSync,
      syncFrequency: syncFrequency,
      debugMode: debugMode,
      exportDate: new Date()?.toISOString()
    };
    
    const blob = new Blob([JSON.stringify(settings, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `hvac-settings-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    a?.click();
    URL.revokeObjectURL(url);
  };

  const handleImportSettings = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = e?.target?.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const settings = JSON.parse(e?.target?.result);
            console.log('Importing settings:', settings);
            // Apply imported settings
          } catch (error) {
            alert('Invalid settings file format');
          }
        };
        reader?.readAsText(file);
      }
    };
    input?.click();
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 lg:p-6 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-error/10 rounded-lg">
            <Icon name="Zap" size={20} className="text-error" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Advanced Settings</h3>
            <p className="text-sm text-muted-foreground">PWA, sync, and developer options</p>
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
          {/* PWA Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Progressive Web App</h4>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h5 className="font-medium text-foreground">Install App</h5>
                  <p className="text-sm text-muted-foreground">Add to home screen for better experience</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleInstallPWA}
                  iconName="Download"
                  iconPosition="left"
                >
                  Install
                </Button>
              </div>
              
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <Icon name="Wifi" size={14} />
                  <span>Offline Ready</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Smartphone" size={14} />
                  <span>Mobile Optimized</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Zap" size={14} />
                  <span>Fast Loading</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sync Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Synchronization</h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Enable offline sync"
                description="Sync data when connection is restored"
                checked={offlineSync}
                onChange={(e) => setOfflineSync(e?.target?.checked)}
              />
              
              <Select
                label="Sync Frequency"
                description="How often to sync data in the background"
                options={syncFrequencyOptions}
                value={syncFrequency}
                onChange={setSyncFrequency}
                disabled={!offlineSync}
              />
            </div>
          </div>

          {/* Cache Management */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Cache Management</h4>
            
            <div className="bg-muted/30 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h5 className="font-medium text-foreground">Application Cache</h5>
                  <p className="text-sm text-muted-foreground">Current cache size: {cacheSize}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleClearCache}
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Clear Cache
                </Button>
              </div>
              
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">30% of allocated cache used</p>
            </div>
          </div>

          {/* Privacy & Analytics */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Privacy & Analytics</h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Enable usage analytics"
                description="Help improve the app by sharing anonymous usage data"
                checked={analyticsEnabled}
                onChange={(e) => setAnalyticsEnabled(e?.target?.checked)}
              />
            </div>
          </div>

          {/* Developer Options */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Developer Options</h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Debug mode"
                description="Enable detailed logging and debug information"
                checked={debugMode}
                onChange={(e) => setDebugMode(e?.target?.checked)}
              />
            </div>
            
            {debugMode && (
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-warning">
                  <Icon name="AlertTriangle" size={16} />
                  <span className="text-sm font-medium">Debug Mode Active</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Additional logging enabled. This may impact performance.
                </p>
              </div>
            )}
          </div>

          {/* Settings Import/Export */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Settings Management</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleExportSettings}
                iconName="Download"
                iconPosition="left"
                className="w-full"
              >
                Export Settings
              </Button>
              
              <Button
                variant="outline"
                onClick={handleImportSettings}
                iconName="Upload"
                iconPosition="left"
                className="w-full"
              >
                Import Settings
              </Button>
            </div>
          </div>

          {/* System Information */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h5 className="font-medium text-foreground mb-3">System Information</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">App Version:</span>
                <span className="ml-2 font-medium">1.0.0</span>
              </div>
              <div>
                <span className="text-muted-foreground">Build Date:</span>
                <span className="ml-2 font-medium">Sep 4, 2025</span>
              </div>
              <div>
                <span className="text-muted-foreground">Browser:</span>
                <span className="ml-2 font-medium">{navigator.userAgent?.split(' ')?.[0]}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Platform:</span>
                <span className="ml-2 font-medium">{navigator.platform}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvancedSettingsPanel;