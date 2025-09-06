import React from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const BasicItemDetails = ({ itemData, onItemDataChange, errors }) => {
  const categoryOptions = [
    { value: 'copper_pipes', label: 'Copper Pipes' },
    { value: 'insulation', label: 'Insulation' },
    { value: 'pipe_fittings', label: 'Pipe Fittings' },
    { value: 'flare_nuts', label: 'Flare Nuts' },
    { value: 'wires', label: 'Wires' },
    { value: 'tools', label: 'Tools' },
    { value: 'materials', label: 'Materials' },
    { value: 'electrical', label: 'Electrical Components' },
    { value: 'specialized', label: 'Specialized Equipment' },
    { value: 'custom', label: 'Custom Category' }
  ];

  const handleInputChange = (field, value) => {
    onItemDataChange({
      ...itemData,
      [field]: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-2">
        <Icon name="Settings" size={20} className="text-primary" />
        <h3 className="text-lg font-semibold text-foreground">Basic Item Details</h3>
      </div>
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Item Name */}
          <div className="md:col-span-2">
            <Input
              label="Item Name"
              placeholder="Enter custom item name"
              value={itemData?.name || ''}
              onChange={(e) => handleInputChange('name', e?.target?.value)}
              error={errors?.name}
              required
              description="Choose a descriptive name for your custom inventory item"
            />
          </div>

          {/* Category Selection */}
          <Select
            label="Category"
            placeholder="Select item category"
            options={categoryOptions}
            value={itemData?.category || ''}
            onChange={(value) => handleInputChange('category', value)}
            error={errors?.category}
            required
            description="Choose the most appropriate category for organization"
          />

          {/* Unit Type */}
          <Input
            label="Unit Type"
            placeholder="e.g., pieces, meters, liters"
            value={itemData?.unitType || ''}
            onChange={(e) => handleInputChange('unitType', e?.target?.value)}
            description="Specify the measurement unit for this item"
          />
        </div>

        {/* Description */}
        <div className="mt-6">
          <label className="block text-sm font-medium text-foreground mb-2">
            Description
            <span className="text-muted-foreground ml-1">(Optional)</span>
          </label>
          <textarea
            className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-none"
            rows={4}
            placeholder="Provide additional details about this custom item, its usage, or special requirements..."
            value={itemData?.description || ''}
            onChange={(e) => handleInputChange('description', e?.target?.value)}
          />
          {errors?.description && (
            <p className="mt-1 text-sm text-error">{errors?.description}</p>
          )}
        </div>

        {/* Item Properties */}
        <div className="mt-6 pt-6 border-t border-border">
          <h4 className="font-medium text-foreground mb-4">Item Properties</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              label="SKU/Code"
              placeholder="Item identifier"
              value={itemData?.sku || ''}
              onChange={(e) => handleInputChange('sku', e?.target?.value)}
              description="Optional item code"
            />
            
            <Input
              label="Brand"
              placeholder="Manufacturer name"
              value={itemData?.brand || ''}
              onChange={(e) => handleInputChange('brand', e?.target?.value)}
              description="Item brand or manufacturer"
            />
            
            <Input
              label="Model"
              placeholder="Model number"
              value={itemData?.model || ''}
              onChange={(e) => handleInputChange('model', e?.target?.value)}
              description="Specific model identifier"
            />
          </div>
        </div>
      </div>
      {/* Guidelines */}
      <div className="bg-muted/30 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
          <div className="text-sm text-muted-foreground">
            <p className="font-medium text-foreground mb-1">Naming Guidelines</p>
            <ul className="space-y-1">
              <li>• Use clear, descriptive names that technicians will recognize</li>
              <li>• Include size, type, or specification details when relevant</li>
              <li>• Avoid abbreviations that might be confusing</li>
              <li>• Consider how the item will appear in reports and lists</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicItemDetails;