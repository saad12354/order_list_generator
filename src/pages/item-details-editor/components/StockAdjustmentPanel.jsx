import React, { useState } from 'react';

import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const StockAdjustmentPanel = ({ item, onAdjustment }) => {
  const [adjustmentType, setAdjustmentType] = useState('add');
  const [adjustmentValue, setAdjustmentValue] = useState('');
  const [reason, setReason] = useState('');
  const [targetLocation, setTargetLocation] = useState('');

  const adjustmentTypes = [
    { value: 'add', label: 'Add Stock' },
    { value: 'remove', label: 'Remove Stock' },
    { value: 'transfer', label: 'Transfer Location' },
    { value: 'set', label: 'Set Exact Amount' }
  ];

  const reasonOptions = [
    { value: 'restock', label: 'Restocking' },
    { value: 'usage', label: 'Used in Project' },
    { value: 'damaged', label: 'Damaged/Lost' },
    { value: 'transfer', label: 'Location Transfer' },
    { value: 'correction', label: 'Inventory Correction' },
    { value: 'other', label: 'Other' }
  ];

  const locationOptions = [
    { value: 'Main Warehouse', label: 'Main Warehouse' },
    { value: 'Service Van 1', label: 'Service Van 1' },
    { value: 'Service Van 2', label: 'Service Van 2' },
    { value: 'Site Storage', label: 'Site Storage' }
  ];

  const handleQuickAdjustment = (amount) => {
    let newQuantity = Math.max(0, (item?.quantity || 0) + amount);
    onAdjustment({
      type: amount > 0 ? 'add' : 'remove',
      value: Math.abs(amount),
      newQuantity,
      reason: amount > 0 ? 'restock' : 'usage',
      timestamp: new Date()?.toISOString()
    });
  };

  const handleCustomAdjustment = () => {
    if (!adjustmentValue || adjustmentValue <= 0) return;
    
    let newQuantity = item?.quantity || 0;
    const value = parseFloat(adjustmentValue);
    
    switch (adjustmentType) {
      case 'add':
        newQuantity += value;
        break;
      case 'remove':
        newQuantity = Math.max(0, newQuantity - value);
        break;
      case 'set':
        newQuantity = Math.max(0, value);
        break;
      case 'transfer':
        // For transfer, quantity stays same but location changes
        break;
    }
    
    onAdjustment({
      type: adjustmentType,
      value,
      newQuantity,
      reason,
      targetLocation: adjustmentType === 'transfer' ? targetLocation : null,
      timestamp: new Date()?.toISOString()
    });
    
    // Reset form
    setAdjustmentValue('');
    setReason('');
    setTargetLocation('');
  };

  const getCurrentStock = () => {
    const quantity = item?.quantity || 0;
    const unit = item?.category === 'Copper Pipes' || item?.category === 'Insulation' || item?.category === 'Wire' 
      ? `${item?.unit || 'ft'}` 
      : 'pcs';
    
    return `${quantity} ${unit}`;
  };

  return (
    <div className="space-y-6">
      {/* Current Stock Display */}
      <div className="bg-muted/50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium text-foreground">Current Stock</h4>
            <p className="text-2xl font-bold text-primary mt-1">{getCurrentStock()}</p>
            <p className="text-sm text-muted-foreground mt-1">
              Location: {item?.location || 'Main Warehouse'}
            </p>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              (item?.quantity || 0) > 10 
                ? 'bg-success/10 text-success' 
                : (item?.quantity || 0) > 5 
                  ? 'bg-warning/10 text-warning' :'bg-error/10 text-error'
            }`}>
              {(item?.quantity || 0) > 10 ? 'In Stock' : (item?.quantity || 0) > 5 ? 'Low Stock' : 'Critical'}
            </div>
          </div>
        </div>
      </div>
      {/* Quick Adjustments */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Quick Adjustments</h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdjustment(-1)}
            iconName="Minus"
            iconPosition="left"
          >
            -1
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdjustment(-5)}
            iconName="Minus"
            iconPosition="left"
          >
            -5
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdjustment(5)}
            iconName="Plus"
            iconPosition="left"
          >
            +5
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleQuickAdjustment(10)}
            iconName="Plus"
            iconPosition="left"
          >
            +10
          </Button>
        </div>
      </div>
      {/* Custom Adjustment */}
      <div className="space-y-4">
        <h4 className="font-medium text-foreground">Custom Adjustment</h4>
        
        <Select
          label="Adjustment Type"
          options={adjustmentTypes}
          value={adjustmentType}
          onChange={setAdjustmentType}
          className="mb-4"
        />
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            label="Amount"
            type="number"
            value={adjustmentValue}
            onChange={(e) => setAdjustmentValue(e?.target?.value)}
            placeholder="Enter amount"
            min="0"
            step="0.1"
          />
          
          <Select
            label="Reason"
            options={reasonOptions}
            value={reason}
            onChange={setReason}
            placeholder="Select reason"
          />
        </div>
        
        {adjustmentType === 'transfer' && (
          <Select
            label="Transfer To"
            options={locationOptions?.filter(loc => loc?.value !== item?.location)}
            value={targetLocation}
            onChange={setTargetLocation}
            placeholder="Select destination"
            className="mt-4"
          />
        )}
        
        <Button
          variant="default"
          onClick={handleCustomAdjustment}
          disabled={!adjustmentValue || !reason || (adjustmentType === 'transfer' && !targetLocation)}
          iconName="Check"
          iconPosition="left"
          className="w-full"
        >
          Apply Adjustment
        </Button>
      </div>
      {/* Stock Level Indicators */}
      <div className="space-y-3">
        <h4 className="font-medium text-foreground">Stock Levels</h4>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Minimum Stock:</span>
            <span className="font-medium">5 {item?.unit || 'pcs'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Reorder Point:</span>
            <span className="font-medium">10 {item?.unit || 'pcs'}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Maximum Stock:</span>
            <span className="font-medium">100 {item?.unit || 'pcs'}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAdjustmentPanel;