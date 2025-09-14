import React from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const InventoryItemForm = ({ 
  item, 
  value, 
  onChange, 
  onUpdate,
  className = '' 
}) => {
  const handleInputChange = (field, newValue) => {
    onChange(item?.id, { ...value, [field]: newValue });
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onUpdate(item?.id, value);
  };

  const renderFormField = (field) => {
    const fieldValue = value?.[field?.key] || field?.defaultValue || '';

    switch (field?.type) {
      case 'number':
        return (
          <Input
            key={field?.key}
            type="number"
            label={field?.label}
            placeholder={field?.placeholder}
            value={fieldValue}
            onChange={(e) => handleInputChange(field?.key, parseFloat(e?.target?.value) || 0)}
            min={field?.min || 0}
            step={field?.step || 1}
            className="mb-4"
          />
        );

      case 'select':
        return (
          <Select
            key={field?.key}
            label={field?.label}
            options={field?.options}
            value={fieldValue}
            onChange={(newValue) => handleInputChange(field?.key, newValue)}
            placeholder={field?.placeholder}
            className="mb-4"
          />
        );

      case 'toggle':
        return (
          <div key={field?.key} className="mb-4">
            <label className="block text-sm font-medium text-foreground mb-2">
              {field?.label}
            </label>
            <div className="flex space-x-2">
              {field?.options?.map((option) => (
                <Button
                  key={option?.value}
                  variant={fieldValue === option?.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => handleInputChange(field?.key, option?.value)}
                  className="flex-1"
                >
                  {option?.label}
                </Button>
              ))}
            </div>
          </div>
        );

      case 'checkbox':
        return (
          <Checkbox
            key={field?.key}
            label={field?.label}
            checked={fieldValue || false}
            onChange={(e) => handleInputChange(field?.key, e?.target?.checked)}
            className="mb-4"
          />
        );

      case 'text':
        return (
          <Input
            key={field?.key}
            type="text"
            label={field?.label}
            placeholder={field?.placeholder}
            value={fieldValue}
            onChange={(e) => handleInputChange(field?.key, e?.target?.value)}
            className="mb-4"
          />
        );

      default:
        return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {item?.fields?.map(renderFormField)}
      </div>
      <div className="flex justify-end pt-4 border-t border-border">
        <Button type="submit" variant="default" size="sm">
          Add
        </Button>
      </div>
    </form>
  );
};

export default InventoryItemForm;