import React, { useState, useEffect } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';


const ItemEditForm = ({ item, onSave, onCancel }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (item) {
      setFormData({
        name: item?.name || '',
        category: item?.category || '',
        quantity: item?.quantity || 0,
        length: item?.length || 0,
        size: item?.size || '',
        type: item?.type || '',
        thickness: item?.thickness || '',
        unit: item?.unit || 'ft',
        cores: item?.cores || 2,
        location: item?.location || 'Main Warehouse',
        notes: item?.notes || ''
      });
    }
  }, [item]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.name?.trim()) {
      newErrors.name = 'Item name is required';
    }
    
    if (!formData?.category?.trim()) {
      newErrors.category = 'Category is required';
    }
    
    if (formData?.quantity < 0) {
      newErrors.quantity = 'Quantity cannot be negative';
    }
    
    if (formData?.length < 0) {
      newErrors.length = 'Length cannot be negative';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onSave({
        ...item,
        ...formData,
        lastModified: new Date()?.toISOString()
      });
    } catch (error) {
      console.error('Error saving item:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const sizeOptions = [
    { value: '1/4"', label: '1/4 inch' },
    { value: '3/8"', label: '3/8 inch' },
    { value: '1/2"', label: '1/2 inch' },
    { value: '5/8"', label: '5/8 inch' },
    { value: '3/4"', label: '3/4 inch' },
    { value: '7/8"', label: '7/8 inch' },
    { value: '1"', label: '1 inch' },
    { value: '1-1/8"', label: '1-1/8 inch' },
    { value: '1-5/8"', label: '1-5/8 inch' }
  ];

  const typeOptions = [
    { value: 'soft', label: 'Soft Copper' },
    { value: 'hard', label: 'Hard Copper' }
  ];

  const thicknessOptions = [
    { value: '9mm', label: '9mm' },
    { value: '13mm', label: '13mm' },
    { value: '19mm', label: '19mm' },
    { value: '25mm', label: '25mm' }
  ];

  const unitOptions = [
    { value: 'ft', label: 'Feet' },
    { value: 'm', label: 'Meters' }
  ];

  const locationOptions = [
    { value: 'Main Warehouse', label: 'Main Warehouse' },
    { value: 'Service Van 1', label: 'Service Van 1' },
    { value: 'Service Van 2', label: 'Service Van 2' },
    { value: 'Site Storage', label: 'Site Storage' }
  ];

  const renderCategorySpecificFields = () => {
    switch (item?.category) {
      case 'Copper Pipes':
        return (
          <>
            <Select
              label="Size"
              options={sizeOptions}
              value={formData?.size}
              onChange={(value) => handleInputChange('size', value)}
              error={errors?.size}
              className="mb-4"
            />
            <Select
              label="Type"
              options={typeOptions}
              value={formData?.type}
              onChange={(value) => handleInputChange('type', value)}
              error={errors?.type}
              className="mb-4"
            />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label="Quantity"
                type="number"
                value={formData?.quantity}
                onChange={(e) => handleInputChange('quantity', parseInt(e?.target?.value) || 0)}
                error={errors?.quantity}
                min="0"
              />
              <Input
                label="Length"
                type="number"
                value={formData?.length}
                onChange={(e) => handleInputChange('length', parseFloat(e?.target?.value) || 0)}
                error={errors?.length}
                min="0"
                step="0.1"
              />
            </div>
          </>
        );
      
      case 'Insulation':
        return (
          <>
            <Select
              label="Size"
              options={sizeOptions}
              value={formData?.size}
              onChange={(value) => handleInputChange('size', value)}
              error={errors?.size}
              className="mb-4"
            />
            <Select
              label="Thickness"
              options={thicknessOptions}
              value={formData?.thickness}
              onChange={(value) => handleInputChange('thickness', value)}
              error={errors?.thickness}
              className="mb-4"
            />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label="Length"
                type="number"
                value={formData?.length}
                onChange={(e) => handleInputChange('length', parseFloat(e?.target?.value) || 0)}
                error={errors?.length}
                min="0"
                step="0.1"
              />
              <Select
                label="Unit"
                options={unitOptions}
                value={formData?.unit}
                onChange={(value) => handleInputChange('unit', value)}
                className="mb-0"
              />
            </div>
          </>
        );
      
      case 'Wire':
        return (
          <>
            <Select
              label="Size (sq mm)"
              options={[
                { value: '0.5', label: '0.5 sq mm' },
                { value: '1.0', label: '1.0 sq mm' },
                { value: '1.5', label: '1.5 sq mm' },
                { value: '2.5', label: '2.5 sq mm' },
                { value: '4.0', label: '4.0 sq mm' },
                { value: '6.0', label: '6.0 sq mm' }
              ]}
              value={formData?.size}
              onChange={(value) => handleInputChange('size', value)}
              error={errors?.size}
              className="mb-4"
            />
            <div className="grid grid-cols-2 gap-4 mb-4">
              <Input
                label="Length (m)"
                type="number"
                value={formData?.length}
                onChange={(e) => handleInputChange('length', parseFloat(e?.target?.value) || 0)}
                error={errors?.length}
                min="0"
                step="0.1"
              />
              <Select
                label="Cores"
                options={[
                  { value: 2, label: '2 Core' },
                  { value: 4, label: '4 Core' },
                  { value: 6, label: '6 Core' }
                ]}
                value={formData?.cores}
                onChange={(value) => handleInputChange('cores', value)}
              />
            </div>
          </>
        );
      
      default:
        return (
          <Input
            label="Quantity"
            type="number"
            value={formData?.quantity}
            onChange={(e) => handleInputChange('quantity', parseInt(e?.target?.value) || 0)}
            error={errors?.quantity}
            min="0"
            className="mb-4"
          />
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Basic Information</h3>
        
        <Input
          label="Item Name"
          type="text"
          value={formData?.name}
          onChange={(e) => handleInputChange('name', e?.target?.value)}
          error={errors?.name}
          required
          placeholder="Enter item name"
        />
        
        <Input
          label="Category"
          type="text"
          value={formData?.category}
          onChange={(e) => handleInputChange('category', e?.target?.value)}
          error={errors?.category}
          disabled
          description="Category cannot be changed"
        />
      </div>
      {/* Category Specific Fields */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Specifications</h3>
        {renderCategorySpecificFields()}
      </div>
      {/* Location and Notes */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Additional Information</h3>
        
        <Select
          label="Storage Location"
          options={locationOptions}
          value={formData?.location}
          onChange={(value) => handleInputChange('location', value)}
          className="mb-4"
        />
        
        <Input
          label="Notes"
          type="text"
          value={formData?.notes}
          onChange={(e) => handleInputChange('notes', e?.target?.value)}
          placeholder="Add any additional notes..."
        />
      </div>
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        <Button
          variant="default"
          onClick={handleSave}
          loading={isLoading}
          iconName="Save"
          iconPosition="left"
          className="flex-1"
        >
          Save Changes
        </Button>
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="flex-1"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default ItemEditForm;