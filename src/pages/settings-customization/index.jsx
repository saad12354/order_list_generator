import React, { useState, useEffect } from 'react';
import HeaderBrand from '../../components/ui/HeaderBrand';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import DataManagementPanel from './components/DataManagementPanel';
import CustomizationPanel from './components/CustomizationPanel';
import CustomCategoriesPanel from './components/CustomCategoriesPanel';
import UserPreferencesPanel from './components/UserPreferencesPanel';
import AdvancedSettingsPanel from './components/AdvancedSettingsPanel';
import Icon from '../../components/AppIcon';

const SettingsCustomization = () => {
  const [expandedPanels, setExpandedPanels] = useState({
    dataManagement: false,
    customization: false,
    customCategories: false,
    userPreferences: false,
    advancedSettings: false
  });

  const [lastSaved, setLastSaved] = useState(null);

  useEffect(() => {
    // Load saved panel states
    const savedStates = localStorage.getItem('settingsPanelStates');
    if (savedStates) {
      setExpandedPanels(JSON.parse(savedStates));
    }

    // Load last saved timestamp
    const savedTimestamp = localStorage.getItem('settingsLastSaved');
    if (savedTimestamp) {
      setLastSaved(new Date(savedTimestamp));
    }
  }, []);

  const togglePanel = (panelName) => {
    const newStates = {
      ...expandedPanels,
      [panelName]: !expandedPanels?.[panelName]
    };
    setExpandedPanels(newStates);
    localStorage.setItem('settingsPanelStates', JSON.stringify(newStates));
  };

  const handleSaveAll = () => {
    // Save all settings
    const timestamp = new Date();
    localStorage.setItem('settingsLastSaved', timestamp?.toISOString());
    setLastSaved(timestamp);
    
    // Show success feedback
    const event = new CustomEvent('showToast', {
      detail: { message: 'Settings saved successfully', type: 'success' }
    });
    window.dispatchEvent(event);
  };

  const handleResetAll = () => {
    if (window.confirm('Are you sure you want to reset all settings to defaults? This action cannot be undone.')) {
      // Clear all settings from localStorage
      const keysToKeep = ['activeTab', 'settingsPanelStates'];
      const allKeys = Object.keys(localStorage);
      
      allKeys?.forEach(key => {
        if (!keysToKeep?.includes(key)) {
          localStorage.removeItem(key);
        }
      });
      
      // Reset panel states
      setExpandedPanels({
        dataManagement: false,
        customization: false,
        customCategories: false,
        userPreferences: false,
        advancedSettings: false
      });
      
      setLastSaved(null);
      
      // Show success feedback
      const event = new CustomEvent('showToast', {
        detail: { message: 'All settings reset to defaults', type: 'success' }
      });
      window.dispatchEvent(event);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar Spacing */}
      <div className="lg:ml-64">
        {/* Header */}
        <header className="bg-card border-b border-border sticky top-0 z-10">
          <div className="px-4 lg:px-6 py-4">
            <div className="flex items-center justify-between">
              <HeaderBrand subtitle="Configuration & Preferences" />
              
              {/* Action Buttons */}
              <div className="hidden sm:flex items-center space-x-3">
                <button
                  onClick={handleResetAll}
                  className="flex items-center space-x-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                >
                  <Icon name="RotateCcw" size={16} />
                  <span>Reset All</span>
                </button>
                
                <button
                  onClick={handleSaveAll}
                  className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <Icon name="Save" size={16} />
                  <span>Save Changes</span>
                </button>
              </div>
            </div>
            
            {/* Last Saved Info */}
            {lastSaved && (
              <div className="mt-3 flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Clock" size={14} />
                <span>Last saved: {lastSaved?.toLocaleString()}</span>
              </div>
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className="px-4 lg:px-6 py-6 pb-20 lg:pb-6">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Settings Overview */}
            <div className="bg-card border border-border rounded-lg p-4 lg:p-6">
              <div className="flex items-start space-x-4">
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
                  <Icon name="Settings" size={24} className="text-primary" />
                </div>
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-foreground mb-2">
                    Settings & Customization
                  </h2>
                  <p className="text-muted-foreground mb-4">
                    Configure your HVAC Inventory Manager to match your workflow preferences. 
                    Customize data management, create custom categories, and adjust interface settings 
                    for optimal productivity.
                  </p>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-foreground">8</div>
                      <div className="text-xs text-muted-foreground">Categories</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-foreground">2</div>
                      <div className="text-xs text-muted-foreground">Custom Types</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-foreground">2.4MB</div>
                      <div className="text-xs text-muted-foreground">Data Size</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-foreground">Imperial</div>
                      <div className="text-xs text-muted-foreground">Unit System</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Panels */}
            <div className="space-y-4">
              <DataManagementPanel
                isExpanded={expandedPanels?.dataManagement}
                onToggle={() => togglePanel('dataManagement')}
              />
              
              <CustomizationPanel
                isExpanded={expandedPanels?.customization}
                onToggle={() => togglePanel('customization')}
              />
              
              <CustomCategoriesPanel
                isExpanded={expandedPanels?.customCategories}
                onToggle={() => togglePanel('customCategories')}
              />
              
              <UserPreferencesPanel
                isExpanded={expandedPanels?.userPreferences}
                onToggle={() => togglePanel('userPreferences')}
              />
              
              <AdvancedSettingsPanel
                isExpanded={expandedPanels?.advancedSettings}
                onToggle={() => togglePanel('advancedSettings')}
              />
            </div>

            {/* Mobile Action Buttons */}
            <div className="sm:hidden fixed bottom-20 left-4 right-4 z-20">
              <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={handleResetAll}
                    className="flex items-center justify-center space-x-2 px-4 py-3 text-sm text-destructive bg-destructive/10 rounded-lg"
                  >
                    <Icon name="RotateCcw" size={16} />
                    <span>Reset All</span>
                  </button>
                  
                  <button
                    onClick={handleSaveAll}
                    className="flex items-center justify-center space-x-2 px-4 py-3 bg-primary text-primary-foreground rounded-lg"
                  >
                    <Icon name="Save" size={16} />
                    <span>Save</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-muted/30 border border-border rounded-lg p-4 lg:p-6">
              <div className="flex items-start space-x-3">
                <Icon name="HelpCircle" size={20} className="text-primary mt-0.5" />
                <div>
                  <h3 className="font-medium text-foreground mb-2">Need Help?</h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Settings are automatically saved to your browser's local storage. 
                    Use the backup feature to save your configuration for other devices.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-primary/10 text-primary">
                      <Icon name="Shield" size={12} className="mr-1" />
                      Secure Local Storage
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-success/10 text-success">
                      <Icon name="Wifi" size={12} className="mr-1" />
                      Offline Ready
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-accent/10 text-accent">
                      <Icon name="Smartphone" size={12} className="mr-1" />
                      Mobile Optimized
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Bottom Navigation */}
      <BottomTabNavigation />
    </div>
  );
};

export default SettingsCustomization;