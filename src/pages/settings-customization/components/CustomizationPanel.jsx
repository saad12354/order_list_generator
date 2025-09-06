import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const CustomizationPanel = ({ isExpanded, onToggle }) => {
  const [unitSystem, setUnitSystem] = useState('imperial');
  const [defaultQuantity, setDefaultQuantity] = useState('1');
  const [showEmptyCategories, setShowEmptyCategories] = useState(false);
  const [compactView, setCompactView] = useState(false);
  const [quickAddMode, setQuickAddMode] = useState(true);

  const unitSystemOptions = [
    { value: 'imperial', label: 'Imperial (ft, inches)' },
    { value: 'metric', label: 'Metric (meters, mm)' }
  ];

  const handleUnitSystemChange = (value) => {
    setUnitSystem(value);
    localStorage.setItem('unitSystem', value);
  };

  const handleDefaultQuantityChange = (e) => {
    setDefaultQuantity(e?.target?.value);
    localStorage.setItem('defaultQuantity', e?.target?.value);
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 lg:p-6 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="Settings2" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Customization</h3>
            <p className="text-sm text-muted-foreground">Personalize your workflow preferences</p>
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
          {/* Unit System */}
          <div className="space-y-3">
            <Select
              label="Unit System"
              description="Choose your preferred measurement system"
              options={unitSystemOptions}
              value={unitSystem}
              onChange={handleUnitSystemChange}
            />
          </div>

          {/* Default Quantity */}
          <div className="space-y-3">
            <Input
              label="Default Quantity"
              type="number"
              description="Default quantity value for new items"
              value={defaultQuantity}
              onChange={handleDefaultQuantityChange}
              min="1"
              max="1000"
            />
          </div>

          {/* Display Options */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Display Options</h4>
            
            <Checkbox
              label="Show empty categories"
              description="Display categories even when they have no items"
              checked={showEmptyCategories}
              onChange={(e) => setShowEmptyCategories(e?.target?.checked)}
            />
            
            <Checkbox
              label="Compact view"
              description="Use smaller cards and reduced spacing"
              checked={compactView}
              onChange={(e) => setCompactView(e?.target?.checked)}
            />
            
            <Checkbox
              label="Quick add mode"
              description="Enable one-tap item addition with default values"
              checked={quickAddMode}
              onChange={(e) => setQuickAddMode(e?.target?.checked)}
            />
          </div>

          {/* Category Visibility */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Category Visibility</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                'Copper Pipes', 'Insulation', 'Pipe Fittings', 'Flare Nuts',
                'Wires', 'Individual Items', 'Tools', 'Materials'
              ]?.map((category) => (
                <Checkbox
                  key={category}
                  label={category}
                  checked
                  onChange={() => {}}
                />
              ))}
            </div>
          </div>

          {/* Reset Button */}
          <div className="pt-4 border-t border-border">
            <Button
              variant="outline"
              onClick={() => {
                setUnitSystem('imperial');
                setDefaultQuantity('1');
                setShowEmptyCategories(false);
                setCompactView(false);
                setQuickAddMode(true);
              }}
              iconName="RotateCcw"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Reset to Defaults
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomizationPanel;