import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import InventoryOverlayManager from '../../components/ui/InventoryOverlayManager';
import BasicItemDetails from './components/BasicItemDetails';
import FormFieldBuilder from './components/FormFieldBuilder';
import ItemPreview from './components/ItemPreview';

const CustomItemCreator = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('details');
  const [itemData, setItemData] = useState({
    name: '',
    category: '',
    description: '',
    unitType: '',
    sku: '',
    brand: '',
    model: ''
  });
  const [formFields, setFormFields] = useState([]);
  const [errors, setErrors] = useState({});
  const [showSaveConfirm, setShowSaveConfirm] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Check for existing custom items in localStorage
  useEffect(() => {
    const existingItems = JSON.parse(localStorage.getItem('customInventoryItems') || '[]');
    console.log('Existing custom items:', existingItems?.length);
  }, []);

  const tabs = [
    { id: 'details', label: 'Item Details', icon: 'Settings' },
    { id: 'fields', label: 'Form Builder', icon: 'FormInput' },
    { id: 'preview', label: 'Preview', icon: 'Eye' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!itemData?.name?.trim()) {
      newErrors.name = 'Item name is required';
    }

    if (!itemData?.category) {
      newErrors.category = 'Category selection is required';
    }

    // Check for duplicate names
    const existingItems = JSON.parse(localStorage.getItem('customInventoryItems') || '[]');
    const isDuplicate = existingItems?.some(item => 
      item?.name?.toLowerCase() === itemData?.name?.toLowerCase()?.trim()
    );
    
    if (isDuplicate) {
      newErrors.name = 'An item with this name already exists';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      setActiveTab('details');
      return;
    }

    setIsSaving(true);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      const newCustomItem = {
        id: `custom_${Date.now()}`,
        ...itemData,
        formFields,
        createdAt: new Date()?.toISOString(),
        type: 'custom'
      };

      // Save to localStorage
      const existingItems = JSON.parse(localStorage.getItem('customInventoryItems') || '[]');
      const updatedItems = [...existingItems, newCustomItem];
      localStorage.setItem('customInventoryItems', JSON.stringify(updatedItems));

      // Show success and redirect
      setShowSaveConfirm(false);
      navigate('/order-list-generator', { 
        state: { 
          message: `Custom item "${itemData?.name}" created successfully!`,
          newItemId: newCustomItem?.id
        }
      });
    } catch (error) {
      console.error('Error saving custom item:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    navigate('/order-list-generator');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          <BasicItemDetails
            itemData={itemData}
            onItemDataChange={setItemData}
            errors={errors}
          />
        );
      case 'fields':
        return (
          <FormFieldBuilder
            fields={formFields}
            onFieldsChange={setFormFields}
          />
        );
      case 'preview':
        return (
          <ItemPreview
            itemData={itemData}
            formFields={formFields}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Layout */}
      <div className="hidden lg:flex lg:ml-64">
        <div className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-card border-b border-border px-6 py-4">
            <div className="flex items-center justify-between">
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
                  <h1 className="text-xl font-semibold text-foreground">Custom Item Creator</h1>
                  <p className="text-sm text-muted-foreground">Create specialized inventory items with custom forms</p>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleCancel}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setShowSaveConfirm(true)}
                  disabled={!itemData?.name?.trim() || !itemData?.category}
                  iconName="Save"
                  iconPosition="left"
                >
                  Save Item
                </Button>
              </div>
            </div>
          </header>

          {/* Tab Navigation */}
          <div className="bg-card border-b border-border px-6">
            <nav className="flex space-x-8">
              {tabs?.map((tab) => (
                <button
                  key={tab?.id}
                  onClick={() => setActiveTab(tab?.id)}
                  className={`flex items-center space-x-2 px-1 py-4 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab?.id
                      ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                  }`}
                >
                  <Icon name={tab?.icon} size={16} />
                  <span>{tab?.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <main className="flex-1 p-6 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
              {renderTabContent()}
            </div>
          </main>
        </div>
      </div>
      {/* Mobile Layout */}
      <div className="lg:hidden">
        <InventoryOverlayManager
          isOpen={true}
          onClose={handleCancel}
          title="Custom Item Creator"
          size="full"
          showCloseButton={false}
        >
          {/* Mobile Tab Navigation */}
          <div className="flex bg-muted/30 rounded-lg p-1 mb-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex-1 flex items-center justify-center space-x-2 px-3 py-2 rounded-md font-medium text-sm transition-colors ${
                  activeTab === tab?.id
                    ? 'bg-card text-primary shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span className="hidden sm:inline">{tab?.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Content */}
          <div className="space-y-6">
            {renderTabContent()}
          </div>

          {/* Mobile Actions */}
          <div className="flex space-x-3 pt-6 border-t border-border mt-8">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              onClick={() => setShowSaveConfirm(true)}
              disabled={!itemData?.name?.trim() || !itemData?.category}
              className="flex-1"
              iconName="Save"
              iconPosition="left"
            >
              Save Item
            </Button>
          </div>
        </InventoryOverlayManager>
      </div>
      {/* Save Confirmation Modal */}
      <InventoryOverlayManager
        isOpen={showSaveConfirm}
        onClose={() => setShowSaveConfirm(false)}
        title="Save Custom Item"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Package" size={24} className="text-success" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">
                {itemData?.name || 'Custom Item'}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                Category: {itemData?.category || 'Not specified'}
              </p>
              <p className="text-sm text-muted-foreground">
                Form Fields: {formFields?.length} configured
              </p>
            </div>
          </div>

          <div className="bg-muted/30 rounded-lg p-3">
            <p className="text-sm text-muted-foreground">
              This custom item will be added to your inventory and will be available for tracking alongside standard HVAC components.
            </p>
          </div>

          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={() => setShowSaveConfirm(false)}
              className="flex-1"
              disabled={isSaving}
            >
              Review
            </Button>
            <Button
              onClick={handleSave}
              loading={isSaving}
              className="flex-1"
              iconName="Check"
              iconPosition="left"
            >
              {isSaving ? 'Saving...' : 'Confirm Save'}
            </Button>
          </div>
        </div>
      </InventoryOverlayManager>
      {/* Navigation */}
      <BottomTabNavigation />
    </div>
  );
};

export default CustomItemCreator;