import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserPreferencesPanel = ({ isExpanded, onToggle }) => {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [soundEffects, setSoundEffects] = useState(false);
  const [reportFormat, setReportFormat] = useState('detailed');
  const [autoSave, setAutoSave] = useState(true);
  const [confirmActions, setConfirmActions] = useState(true);

  const themeOptions = [
    { value: 'light', label: 'Light Theme' },
    { value: 'dark', label: 'Dark Theme' },
    { value: 'auto', label: 'Auto (System)' }
  ];

  const reportFormatOptions = [
    { value: 'detailed', label: 'Detailed Report' },
    { value: 'summary', label: 'Summary Only' },
    { value: 'minimal', label: 'Minimal Format' }
  ];

  const handleThemeChange = (value) => {
    setTheme(value);
    // Apply theme logic here
    if (value === 'dark') {
      document.documentElement?.classList?.add('dark');
    } else if (value === 'light') {
      document.documentElement?.classList?.remove('dark');
    } else {
      // Auto theme - check system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)')?.matches;
      document.documentElement?.classList?.toggle('dark', prefersDark);
    }
  };

  const handleNotificationPermission = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      setNotifications(permission === 'granted');
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 lg:p-6 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-lg">
            <Icon name="User" size={20} className="text-warning" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">User Preferences</h3>
            <p className="text-sm text-muted-foreground">Interface and behavior settings</p>
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
          {/* Theme Selection */}
          <div className="space-y-3">
            <Select
              label="Interface Theme"
              description="Choose your preferred visual theme"
              options={themeOptions}
              value={theme}
              onChange={handleThemeChange}
            />
            
            {/* Theme Preview */}
            <div className="grid grid-cols-3 gap-2 mt-3">
              <div className="bg-white border-2 border-muted rounded-lg p-2 text-center">
                <div className="w-full h-8 bg-slate-100 rounded mb-1"></div>
                <div className="text-xs text-slate-600">Light</div>
              </div>
              <div className="bg-slate-900 border-2 border-muted rounded-lg p-2 text-center">
                <div className="w-full h-8 bg-slate-700 rounded mb-1"></div>
                <div className="text-xs text-slate-300">Dark</div>
              </div>
              <div className="bg-gradient-to-br from-white to-slate-900 border-2 border-muted rounded-lg p-2 text-center">
                <div className="w-full h-8 bg-gradient-to-r from-slate-100 to-slate-700 rounded mb-1"></div>
                <div className="text-xs text-slate-600">Auto</div>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Notifications</h4>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Checkbox
                  label="Enable notifications"
                  description="Receive alerts for low stock and updates"
                  checked={notifications}
                  onChange={(e) => {
                    if (e?.target?.checked) {
                      handleNotificationPermission();
                    } else {
                      setNotifications(false);
                    }
                  }}
                />
                {notifications && (
                  <div className="flex items-center space-x-1 text-xs text-success">
                    <Icon name="CheckCircle" size={14} />
                    <span>Enabled</span>
                  </div>
                )}
              </div>
              
              <Checkbox
                label="Sound effects"
                description="Play sounds for actions and alerts"
                checked={soundEffects}
                onChange={(e) => setSoundEffects(e?.target?.checked)}
              />
            </div>
          </div>

          {/* Report Settings */}
          <div className="space-y-3">
            <Select
              label="Default Report Format"
              description="Choose the default format for generated reports"
              options={reportFormatOptions}
              value={reportFormat}
              onChange={setReportFormat}
            />
          </div>

          {/* Behavior Settings */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Behavior</h4>
            
            <div className="space-y-3">
              <Checkbox
                label="Auto-save changes"
                description="Automatically save changes as you work"
                checked={autoSave}
                onChange={(e) => setAutoSave(e?.target?.checked)}
              />
              
              <Checkbox
                label="Confirm destructive actions"
                description="Show confirmation dialogs for delete operations"
                checked={confirmActions}
                onChange={(e) => setConfirmActions(e?.target?.checked)}
              />
            </div>
          </div>

          {/* Language & Region */}
          <div className="space-y-3">
            <h4 className="font-medium text-foreground">Language & Region</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Select
                label="Language"
                options={[
                  { value: 'en', label: 'English' },
                  { value: 'es', label: 'Spanish' },
                  { value: 'fr', label: 'French' }
                ]}
                value="en"
                onChange={() => {}}
              />
              
              <Select
                label="Date Format"
                options={[
                  { value: 'mm-dd-yyyy', label: 'MM/DD/YYYY' },
                  { value: 'dd-mm-yyyy', label: 'DD/MM/YYYY' },
                  { value: 'yyyy-mm-dd', label: 'YYYY-MM-DD' }
                ]}
                value="mm-dd-yyyy"
                onChange={() => {}}
              />
            </div>
          </div>

          {/* Reset Preferences */}
          <div className="pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => {
                setTheme('light');
                setNotifications(true);
                setSoundEffects(false);
                setReportFormat('detailed');
                setAutoSave(true);
                setConfirmActions(true);
              }}
              iconName="RotateCcw"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Reset Preferences
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserPreferencesPanel;