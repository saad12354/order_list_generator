import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FormFieldBuilder = ({ fields, onFieldsChange }) => {
  const [showAddField, setShowAddField] = useState(false);
  const [newField, setNewField] = useState({
    id: '',
    type: 'text',
    label: '',
    placeholder: '',
    required: false,
    options: []
  });

  const fieldTypes = [
    { value: 'text', label: 'Text Input' },
    { value: 'number', label: 'Number Input' },
    { value: 'select', label: 'Dropdown Select' },
    { value: 'checkbox', label: 'Checkbox' },
    { value: 'toggle', label: 'Toggle Button' },
    { value: 'textarea', label: 'Text Area' }
  ];

  const handleAddField = () => {
    if (!newField?.label?.trim()) return;
    
    const field = {
      ...newField,
      id: `field_${Date.now()}`,
      label: newField?.label?.trim()
    };
    
    onFieldsChange([...fields, field]);
    setNewField({
      id: '',
      type: 'text',
      label: '',
      placeholder: '',
      required: false,
      options: []
    });
    setShowAddField(false);
  };

  const handleRemoveField = (fieldId) => {
    onFieldsChange(fields?.filter(field => field?.id !== fieldId));
  };

  const handleFieldUpdate = (fieldId, updates) => {
    onFieldsChange(fields?.map(field => 
      field?.id === fieldId ? { ...field, ...updates } : field
    ));
  };

  const addOption = (fieldId) => {
    const field = fields?.find(f => f?.id === fieldId);
    if (field) {
      const newOption = `Option ${field?.options?.length + 1}`;
      handleFieldUpdate(fieldId, {
        options: [...field?.options, newOption]
      });
    }
  };

  const updateOption = (fieldId, optionIndex, value) => {
    const field = fields?.find(f => f?.id === fieldId);
    if (field) {
      const updatedOptions = [...field?.options];
      updatedOptions[optionIndex] = value;
      handleFieldUpdate(fieldId, { options: updatedOptions });
    }
  };

  const removeOption = (fieldId, optionIndex) => {
    const field = fields?.find(f => f?.id === fieldId);
    if (field) {
      const updatedOptions = field?.options?.filter((_, index) => index !== optionIndex);
      handleFieldUpdate(fieldId, { options: updatedOptions });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Form Fields</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowAddField(true)}
          iconName="Plus"
          iconPosition="left"
        >
          Add Field
        </Button>
      </div>
      {/* Existing Fields */}
      <div className="space-y-4">
        {fields?.map((field, index) => (
          <div key={field?.id} className="bg-muted/30 rounded-lg p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <Icon name="GripVertical" size={16} className="text-muted-foreground" />
                <span className="font-medium text-foreground">Field {index + 1}</span>
                <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded">
                  {fieldTypes?.find(t => t?.value === field?.type)?.label}
                </span>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleRemoveField(field?.id)}
                className="h-8 w-8 text-error hover:text-error hover:bg-error/10"
              >
                <Icon name="Trash2" size={16} />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Field Label"
                value={field?.label}
                onChange={(e) => handleFieldUpdate(field?.id, { label: e?.target?.value })}
                placeholder="Enter field label"
              />
              
              <Input
                label="Placeholder Text"
                value={field?.placeholder}
                onChange={(e) => handleFieldUpdate(field?.id, { placeholder: e?.target?.value })}
                placeholder="Enter placeholder text"
              />
            </div>

            <div className="mt-4 flex items-center space-x-4">
              <Checkbox
                label="Required Field"
                checked={field?.required}
                onChange={(e) => handleFieldUpdate(field?.id, { required: e?.target?.checked })}
              />
            </div>

            {/* Options for select fields */}
            {field?.type === 'select' && (
              <div className="mt-4">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-foreground">Options</label>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => addOption(field?.id)}
                    iconName="Plus"
                    iconPosition="left"
                  >
                    Add Option
                  </Button>
                </div>
                <div className="space-y-2">
                  {field?.options?.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center space-x-2">
                      <Input
                        value={option}
                        onChange={(e) => updateOption(field?.id, optionIndex, e?.target?.value)}
                        placeholder={`Option ${optionIndex + 1}`}
                        className="flex-1"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(field?.id, optionIndex)}
                        className="h-8 w-8 text-error hover:text-error hover:bg-error/10"
                      >
                        <Icon name="X" size={16} />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {/* Add New Field Modal */}
      {showAddField && (
        <div className="bg-card border border-border rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-foreground">Add New Field</h4>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAddField(false)}
              className="h-8 w-8"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Field Label"
              value={newField?.label}
              onChange={(e) => setNewField({ ...newField, label: e?.target?.value })}
              placeholder="Enter field label"
              required
            />
            
            <Select
              label="Field Type"
              options={fieldTypes}
              value={newField?.type}
              onChange={(value) => setNewField({ ...newField, type: value })}
            />
          </div>

          <Input
            label="Placeholder Text"
            value={newField?.placeholder}
            onChange={(e) => setNewField({ ...newField, placeholder: e?.target?.value })}
            placeholder="Enter placeholder text"
            className="mb-4"
          />

          <div className="flex items-center justify-between">
            <Checkbox
              label="Required Field"
              checked={newField?.required}
              onChange={(e) => setNewField({ ...newField, required: e?.target?.checked })}
            />
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                onClick={() => setShowAddField(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={handleAddField}
                disabled={!newField?.label?.trim()}
              >
                Add Field
              </Button>
            </div>
          </div>
        </div>
      )}
      {fields?.length === 0 && (
        <div className="text-center py-8 text-muted-foreground">
          <Icon name="FormInput" size={48} className="mx-auto mb-4 opacity-50" />
          <p>No form fields added yet</p>
          <p className="text-sm">Click "Add Field" to start building your custom form</p>
        </div>
      )}
    </div>
  );
};

export default FormFieldBuilder;