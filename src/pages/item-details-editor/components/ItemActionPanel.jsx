import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import InventoryOverlayManager from '../../../components/ui/InventoryOverlayManager';

const ItemActionPanel = ({ item, onDuplicate, onDelete, onExport }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleDuplicate = async () => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onDuplicate({
        ...item,
        id: Date.now(),
        name: `${item?.name} (Copy)`,
        quantity: 0,
        createdAt: new Date()?.toISOString()
      });
    } catch (error) {
      console.error('Error duplicating item:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDelete = async () => {
    setIsProcessing(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      onDelete(item?.id);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.error('Error deleting item:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleExport = (format) => {
    onExport(item, format);
    setShowExportOptions(false);
  };

  const exportOptions = [
    {
      id: 'pdf',
      label: 'Export as PDF',
      icon: 'FileText',
      description: 'Generate a detailed PDF report'
    },
    {
      id: 'csv',
      label: 'Export as CSV',
      icon: 'Table',
      description: 'Export data in spreadsheet format'
    },
    {
      id: 'json',
      label: 'Export as JSON',
      icon: 'Code',
      description: 'Export raw data format'
    },
    {
      id: 'print',
      label: 'Print Details',
      icon: 'Printer',
      description: 'Print item information'
    }
  ];

  return (
    <>
      <div className="space-y-6">
        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Quick Actions</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Button
              variant="outline"
              onClick={handleDuplicate}
              loading={isProcessing}
              iconName="Copy"
              iconPosition="left"
              className="justify-start"
            >
              Duplicate Item
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setShowExportOptions(true)}
              iconName="Download"
              iconPosition="left"
              className="justify-start"
            >
              Export Data
            </Button>
          </div>
        </div>

        {/* Item Information */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Item Information</h3>
          
          <div className="bg-muted/50 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Item ID:</span>
              <span className="font-mono text-sm">{item?.id}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Created:</span>
              <span className="text-sm">
                {new Date(item.createdAt || Date.now())?.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Modified:</span>
              <span className="text-sm">
                {new Date(item.lastModified || Date.now())?.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Status:</span>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                (item?.quantity || 0) > 10 
                  ? 'bg-success/10 text-success' 
                  : (item?.quantity || 0) > 5 
                    ? 'bg-warning/10 text-warning' 
                    : 'bg-error/10 text-error'
              }`}>
                {(item?.quantity || 0) > 10 ? 'In Stock' : (item?.quantity || 0) > 5 ? 'Low Stock' : 'Critical'}
              </span>
            </div>
          </div>
        </div>

        {/* Related Items */}
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Related Items</h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Package" size={16} className="text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">3/8" Soft Copper Pipe</div>
                  <div className="text-xs text-muted-foreground">Similar item</div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="ExternalLink" size={14} />
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-card border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <Icon name="Package" size={16} className="text-muted-foreground" />
                <div>
                  <div className="text-sm font-medium">1/2" Hard Copper Pipe</div>
                  <div className="text-xs text-muted-foreground">Same category</div>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <Icon name="ExternalLink" size={14} />
              </Button>
            </div>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="space-y-3 pt-4 border-t border-border">
          <h3 className="text-lg font-semibold text-error">Danger Zone</h3>
          
          <div className="bg-error/5 border border-error/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-error mt-0.5" />
              <div className="flex-1">
                <h4 className="font-medium text-error mb-1">Delete Item</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  This action cannot be undone. This will permanently delete the item and remove all associated data.
                </p>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => setShowDeleteConfirm(true)}
                  iconName="Trash2"
                  iconPosition="left"
                >
                  Delete Item
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      <InventoryOverlayManager
        isOpen={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        title="Confirm Deletion"
        size="sm"
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-error/10">
              <Icon name="AlertTriangle" size={24} className="text-error" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-2">Delete "{item?.name}"?</h3>
              <p className="text-sm text-muted-foreground">
                This action cannot be undone. The item will be permanently removed from your inventory.
              </p>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <Button
              variant="destructive"
              onClick={handleDelete}
              loading={isProcessing}
              iconName="Trash2"
              iconPosition="left"
              className="flex-1"
            >
              Delete Item
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowDeleteConfirm(false)}
              disabled={isProcessing}
              className="flex-1"
            >
              Cancel
            </Button>
          </div>
        </div>
      </InventoryOverlayManager>
      {/* Export Options Modal */}
      <InventoryOverlayManager
        isOpen={showExportOptions}
        onClose={() => setShowExportOptions(false)}
        title="Export Options"
        size="sm"
      >
        <div className="space-y-4">
          {exportOptions?.map((option) => (
            <button
              key={option?.id}
              onClick={() => handleExport(option?.id)}
              className="w-full flex items-center space-x-3 p-4 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                <Icon name={option?.icon} size={20} className="text-primary" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium text-foreground">{option?.label}</div>
                <div className="text-sm text-muted-foreground">{option?.description}</div>
              </div>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>
      </InventoryOverlayManager>
    </>
  );
};

export default ItemActionPanel;