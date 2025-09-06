import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';

import ItemEditForm from './components/ItemEditForm';
import StockAdjustmentPanel from './components/StockAdjustmentPanel';
import ChangeHistoryPanel from './components/ChangeHistoryPanel';
import ItemActionPanel from './components/ItemActionPanel';

const ItemDetailsEditor = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const itemId = searchParams?.get('id');
  
  const [item, setItem] = useState(null);
  const [activeTab, setActiveTab] = useState('edit');
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  // Mock item data - in real app, this would come from API/database
  const mockItems = {
    1: {
      id: 1,
      name: '1/2" Soft Copper Pipe',
      category: 'Copper Pipes',
      quantity: 40,
      length: 50,
      size: '1/2"',
      type: 'soft',
      unit: 'ft',
      location: 'Main Warehouse',
      notes: 'High-quality copper pipe for refrigeration systems',
      createdAt: '2025-01-01T10:00:00.000Z',
      lastModified: '2025-01-04T16:45:00.000Z'
    },
    2: {
      id: 2,
      name: '3/8" Insulation',
      category: 'Insulation',
      quantity: 25,
      length: 100,
      size: '3/8"',
      thickness: '13mm',
      unit: 'ft',
      location: 'Service Van 1',
      notes: 'Foam insulation for pipe protection',
      createdAt: '2025-01-02T14:30:00.000Z',
      lastModified: '2025-01-04T12:20:00.000Z'
    },
    3: {
      id: 3,
      name: '2.5 sq mm Wire',
      category: 'Wire',
      quantity: 15,
      length: 200,
      size: '2.5',
      cores: 4,
      unit: 'm',
      location: 'Main Warehouse',
      notes: 'Multi-core electrical wire for HVAC systems',
      createdAt: '2025-01-03T09:15:00.000Z',
      lastModified: '2025-01-04T08:30:00.000Z'
    }
  };

  useEffect(() => {
    const loadItem = async () => {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        if (itemId && mockItems?.[itemId]) {
          setItem(mockItems?.[itemId]);
        } else {
          // If no item found, redirect to order list generator
          navigate('/order-list-generator');
          return;
        }
      } catch (error) {
        console.error('Error loading item:', error);
        navigate('/inventory-management');
      } finally {
        setIsLoading(false);
      }
    };

    loadItem();
  }, [itemId, navigate]);

  const handleSaveItem = (updatedItem) => {
    setItem(updatedItem);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleStockAdjustment = (adjustment) => {
    const updatedItem = {
      ...item,
      quantity: adjustment?.newQuantity,
      location: adjustment?.targetLocation || item?.location,
      lastModified: adjustment?.timestamp
    };
    setItem(updatedItem);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleDuplicateItem = (duplicatedItem) => {
    // In real app, this would create a new item in the database
    console.log('Duplicating item:', duplicatedItem);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleDeleteItem = (itemId) => {
    // In real app, this would delete the item from the database
    console.log('Deleting item:', itemId);
    navigate('/inventory-management');
  };

  const handleExportItem = (item, format) => {
    // In real app, this would generate and download the export file
    console.log('Exporting item:', item, 'Format:', format);
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const handleCancel = () => {
    navigate('/inventory-management');
  };

  const tabs = [
    { id: 'edit', label: 'Edit Details', icon: 'Edit' },
    { id: 'stock', label: 'Stock Control', icon: 'Package' },
    { id: 'history', label: 'History', icon: 'Clock' },
    { id: 'actions', label: 'Actions', icon: 'Settings' }
  ];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center space-y-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <p className="text-muted-foreground">Loading item details...</p>
          </div>
        </div>
        <BottomTabNavigation />
      </div>
    );
  }

  if (!item) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center h-screen">
          <div className="text-center space-y-4">
            <Icon name="AlertCircle" size={48} className="text-error mx-auto" />
            <h2 className="text-xl font-semibold text-foreground">Item Not Found</h2>
            <p className="text-muted-foreground">The requested item could not be found.</p>
            <Button onClick={() => navigate('/inventory-management')}>
              Return to Inventory
            </Button>
          </div>
        </div>
        <BottomTabNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Success Message */}
      {showSuccessMessage && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-fade-in">
          <div className="bg-success text-success-foreground px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2">
            <Icon name="Check" size={16} />
            <span className="text-sm font-medium">Changes saved successfully</span>
          </div>
        </div>
      )}
      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:pl-64">
        <div className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={handleCancel}
                className="h-10 w-10"
              >
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">{item?.name}</h1>
                <p className="text-muted-foreground">{item?.category} • ID: {item?.id}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                (item?.quantity || 0) > 10 
                  ? 'bg-success/10 text-success' 
                  : (item?.quantity || 0) > 5 
                    ? 'bg-warning/10 text-warning' :'bg-error/10 text-error'
              }`}>
                {(item?.quantity || 0) > 10 ? 'In Stock' : (item?.quantity || 0) > 5 ? 'Low Stock' : 'Critical'}
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex space-x-1 mb-6 bg-muted p-1 rounded-lg">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all duration-200 ${
                  activeTab === tab?.id
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span className="font-medium">{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-card rounded-lg border border-border p-6">
            {activeTab === 'edit' && (
              <ItemEditForm
                item={item}
                onSave={handleSaveItem}
                onCancel={handleCancel}
              />
            )}
            {activeTab === 'stock' && (
              <StockAdjustmentPanel
                item={item}
                onAdjustment={handleStockAdjustment}
              />
            )}
            {activeTab === 'history' && (
              <ChangeHistoryPanel item={item} />
            )}
            {activeTab === 'actions' && (
              <ItemActionPanel
                item={item}
                onDuplicate={handleDuplicateItem}
                onDelete={handleDeleteItem}
                onExport={handleExportItem}
              />
            )}
          </div>
        </div>
      </div>
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Header */}
        <div className="bg-card border-b border-border p-4">
          <div className="flex items-center space-x-3 mb-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleCancel}
              className="h-10 w-10"
            >
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-semibold text-foreground truncate">{item?.name}</h1>
              <p className="text-sm text-muted-foreground">{item?.category}</p>
            </div>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              (item?.quantity || 0) > 10 
                ? 'bg-success/10 text-success' 
                : (item?.quantity || 0) > 5 
                  ? 'bg-warning/10 text-warning' :'bg-error/10 text-error'
            }`}>
              {(item?.quantity || 0) > 10 ? 'In Stock' : (item?.quantity || 0) > 5 ? 'Low' : 'Critical'}
            </div>
          </div>

          {/* Mobile Tab Navigation */}
          <div className="flex space-x-1 bg-muted p-1 rounded-lg">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex-1 flex flex-col items-center py-2 px-1 rounded-md transition-all duration-200 ${
                  activeTab === tab?.id
                    ? 'bg-card text-foreground shadow-sm'
                    : 'text-muted-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span className="text-xs font-medium mt-1">{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Content */}
        <div className="p-4 pb-24">
          {activeTab === 'edit' && (
            <ItemEditForm
              item={item}
              onSave={handleSaveItem}
              onCancel={handleCancel}
            />
          )}
          {activeTab === 'stock' && (
            <StockAdjustmentPanel
              item={item}
              onAdjustment={handleStockAdjustment}
            />
          )}
          {activeTab === 'history' && (
            <ChangeHistoryPanel item={item} />
          )}
          {activeTab === 'actions' && (
            <ItemActionPanel
              item={item}
              onDuplicate={handleDuplicateItem}
              onDelete={handleDeleteItem}
              onExport={handleExportItem}
            />
          )}
        </div>
      </div>
      <BottomTabNavigation />
    </div>
  );
};

export default ItemDetailsEditor;