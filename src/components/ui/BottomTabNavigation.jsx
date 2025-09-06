import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const BottomTabNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('inventory');

  const navigationItems = [
    {
      id: 'inventory',
      label: 'Inventory',
      icon: 'Package',
      path: '/order-list-generator',
      badge: null
    },
    {
      id: 'reports',
      label: 'Reports',
      icon: 'BarChart3',
      path: '/reports-analytics',
      badge: null
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: 'Settings',
      path: '/settings-customization',
      badge: null
    }
  ];

  useEffect(() => {
    const currentPath = location?.pathname;
    const currentItem = navigationItems?.find(item => 
      currentPath?.startsWith(item?.path) || 
      (item?.id === 'inventory' && (
        currentPath?.includes('/custom-item-creator') || 
        currentPath?.includes('/item-details-editor')
      ))
    );
    
    if (currentItem) {
      setActiveTab(currentItem?.id);
      localStorage.setItem('activeTab', currentItem?.id);
    }
  }, [location?.pathname]);

  useEffect(() => {
    const savedTab = localStorage.getItem('activeTab');
    if (savedTab) {
      setActiveTab(savedTab);
    }
  }, []);

  const handleTabClick = (item) => {
    setActiveTab(item?.id);
    localStorage.setItem('activeTab', item?.id);
    navigate(item?.path);
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-100">
        <div className="flex items-center justify-around px-2 py-2 safe-area-pb">
          {navigationItems?.map((item) => (
            <button
              key={item?.id}
              onClick={() => handleTabClick(item)}
              className={`flex flex-col items-center justify-center px-3 py-2 rounded-lg transition-all duration-200 ease-out min-w-0 flex-1 relative ${
                activeTab === item?.id
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
              aria-label={item?.label}
            >
              <div className="relative">
                <Icon 
                  name={item?.icon} 
                  size={20} 
                  strokeWidth={activeTab === item?.id ? 2.5 : 2}
                />
                {item?.badge && (
                  <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse-gentle">
                    {item?.badge}
                  </span>
                )}
              </div>
              <span className={`text-xs mt-1 font-medium truncate ${
                activeTab === item?.id ? 'text-primary' : 'text-muted-foreground'
              }`}>
                {item?.label}
              </span>
            </button>
          ))}
        </div>
      </nav>
      {/* Desktop Sidebar Navigation */}
      <nav className="hidden lg:flex lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-64 lg:bg-card lg:border-r lg:border-border lg:flex-col lg:z-100">
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Icon 
                name="Thermometer" 
                size={24} 
                color="white" 
                strokeWidth={2}
              />
            </div>
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold text-foreground leading-tight">
                HVAC Inventory
              </h1>
              <span className="text-sm text-muted-foreground leading-tight">
                Manager
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex-1 px-4 py-6">
          <div className="space-y-2">
            {navigationItems?.map((item) => (
              <button
                key={item?.id}
                onClick={() => handleTabClick(item)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ease-out text-left relative ${
                  activeTab === item?.id
                    ? 'text-primary bg-primary/10 border border-primary/20' :'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
                title={item?.label}
              >
                <div className="relative">
                  <Icon 
                    name={item?.icon} 
                    size={20} 
                    strokeWidth={activeTab === item?.id ? 2.5 : 2}
                  />
                  {item?.badge && (
                    <span className="absolute -top-1 -right-1 bg-error text-error-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center animate-pulse-gentle">
                      {item?.badge}
                    </span>
                  )}
                </div>
                <span className={`font-medium ${
                  activeTab === item?.id ? 'text-primary' : 'text-muted-foreground'
                }`}>
                  {item?.label}
                </span>
              </button>
            ))}
          </div>
        </div>
        
        <div className="p-4 border-t border-border">
          <div className="text-xs text-muted-foreground text-center">
            Version 1.0.0
          </div>
        </div>
      </nav>
    </>
  );
};

export default BottomTabNavigation;