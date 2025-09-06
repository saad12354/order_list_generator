import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Button from '../../../components/ui/Button';

const ItemPreview = ({ itemData, formFields }) => {
  const [previewValues, setPreviewValues] = React.useState({});

  const handlePreviewChange = (fieldId, value) => {
    setPreviewValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const renderPreviewField = (field) => {
    const value = previewValues?.[field?.id] || '';

    switch (field?.type) {
      case 'text':
        return (
          <Input
            key={field?.id}
            label={field?.label}
            placeholder={field?.placeholder}
            value={value}
            onChange={(e) => handlePreviewChange(field?.id, e?.target?.value)}
            required={field?.required}
            className="mb-4"
          />
        );

      case 'number':
        return (
          <Input
            key={field?.id}
            type="number"
            label={field?.label}
            placeholder={field?.placeholder}
            value={value}
            onChange={(e) => handlePreviewChange(field?.id, e?.target?.value)}
            required={field?.required}
            className="mb-4"
          />
        );

      case 'select':
        const selectOptions = field?.options?.map(option => ({
          value: option?.toLowerCase()?.replace(/\s+/g, '_'),
          label: option
        }));
        
        return (
          <Select
            key={field?.id}
            label={field?.label}
            placeholder={field?.placeholder || 'Select an option'}
            options={selectOptions}
            value={value}
            onChange={(selectedValue) => handlePreviewChange(field?.id, selectedValue)}
            required={field?.required}
            className="mb-4"
          />
        );

      case 'checkbox':
        return (
          <div key={field?.id} className="mb-4">
            <Checkbox
              label={field?.label}
              checked={value === true}
              onChange={(e) => handlePreviewChange(field?.id, e?.target?.checked)}
              required={field?.required}
            />
          </div>
        );

      case 'toggle':
        return (
          <div key={field?.id} className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              {field?.label}
              {field?.required && <span className="text-error ml-1">*</span>}
            </label>
            <div className="flex space-x-2">
              <Button
                variant={value === 'yes' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePreviewChange(field?.id, 'yes')}
              >
                Yes
              </Button>
              <Button
                variant={value === 'no' ? 'default' : 'outline'}
                size="sm"
                onClick={() => handlePreviewChange(field?.id, 'no')}
              >
                No
              </Button>
            </div>
          </div>
        );

      case 'textarea':
        return (
          <div key={field?.id} className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              {field?.label}
              {field?.required && <span className="text-error ml-1">*</span>}
            </label>
            <textarea
              className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
              rows={3}
              placeholder={field?.placeholder}
              value={value}
              onChange={(e) => handlePreviewChange(field?.id, e?.target?.value)}
              required={field?.required}
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Icon name="Eye" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Preview</h3>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        {/* Item Header */}
        <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-border">
          <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon name="Package" size={24} className="text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground">
              {itemData?.name || 'Custom Item Name'}
            </h4>
            <p className="text-sm text-muted-foreground">
              {itemData?.category || 'Category'} • Custom Item
            </p>
          </div>
        </div>

        {/* Item Description */}
        {itemData?.description && (
          <div className="mb-6">
            <p className="text-sm text-muted-foreground">{itemData?.description}</p>
          </div>
        )}

        {/* Dynamic Form Fields */}
        <div className="space-y-4">
          {formFields?.length > 0 ? (
            formFields?.map(field => renderPreviewField(field))
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Icon name="FormInput" size={48} className="mx-auto mb-4 opacity-50" />
              <p>No form fields configured</p>
              <p className="text-sm">Add form fields to see the preview</p>
            </div>
          )}
        </div>

        {/* Action Buttons Preview */}
        {formFields?.length > 0 && (
          <div className="flex space-x-3 pt-6 border-t border-border">
            <Button variant="default" className="flex-1">
              Save to Inventory
            </Button>
            <Button variant="outline" size="icon">
              <Icon name="MoreVertical" size={16} />
            </Button>
          </div>
        )}
      </div>
      {/* Preview Info */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Info" size={16} className="text-primary mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Preview Information</p>
            <p>This shows how your custom item will appear in the order list generator interface. Users will be able to input values and track this item alongside standard HVAC components.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemPreview;