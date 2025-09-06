import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const CustomCategoriesPanel = ({ isExpanded, onToggle }) => {
  const navigate = useNavigate();
  const [customCategories, setCustomCategories] = useState([
    {
      id: 1,
      name: "Custom Fittings",
      itemCount: 5,
      fields: ["quantity", "size", "type"],
      createdDate: "2025-08-15"
    },
    {
      id: 2,
      name: "Specialty Tools",
      itemCount: 3,
      fields: ["quantity", "condition"],
      createdDate: "2025-08-20"
    }
  ]);

  const [newCategoryName, setNewCategoryName] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('');

  const templateOptions = [
    { value: '', label: 'Select a template...' },
    { value: 'basic', label: 'Basic (Name, Quantity)' },
    { value: 'sized', label: 'Sized Items (Name, Size, Quantity)' },
    { value: 'measured', label: 'Measured Items (Name, Length, Unit)' },
    { value: 'complex', label: 'Complex (Multiple attributes)' }
  ];

  const handleCreateCategory = () => {
    if (newCategoryName?.trim() && selectedTemplate) {
      navigate('/custom-item-creator', { 
        state: { 
          categoryName: newCategoryName,
          template: selectedTemplate 
        }
      });
    }
  };

  const handleEditCategory = (category) => {
    navigate('/item-details-editor', { 
      state: { 
        category: category,
        mode: 'edit-category'
      }
    });
  };

  const handleDeleteCategory = (categoryId) => {
    if (window.confirm('Are you sure you want to delete this category? All items in this category will be removed.')) {
      setCustomCategories(prev => prev?.filter(cat => cat?.id !== categoryId));
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 lg:p-6 text-left hover:bg-muted/50 transition-colors"
      >
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
            <Icon name="FolderPlus" size={20} className="text-success" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Custom Categories</h3>
            <p className="text-sm text-muted-foreground">Create and manage custom inventory types</p>
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
          {/* Create New Category */}
          <div className="bg-muted/30 rounded-lg p-4 space-y-4">
            <h4 className="font-medium text-foreground">Create New Category</h4>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input
                label="Category Name"
                placeholder="e.g., Custom Fittings"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e?.target?.value)}
              />
              
              <Select
                label="Template"
                options={templateOptions}
                value={selectedTemplate}
                onChange={setSelectedTemplate}
              />
            </div>
            
            <Button
              onClick={handleCreateCategory}
              disabled={!newCategoryName?.trim() || !selectedTemplate}
              iconName="Plus"
              iconPosition="left"
              className="w-full sm:w-auto"
            >
              Create Category
            </Button>
          </div>

          {/* Existing Categories */}
          <div className="space-y-4">
            <h4 className="font-medium text-foreground">Existing Categories ({customCategories?.length})</h4>
            
            {customCategories?.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                <Icon name="FolderOpen" size={48} className="mx-auto mb-3 opacity-50" />
                <p>No custom categories created yet</p>
                <p className="text-sm">Create your first category above</p>
              </div>
            ) : (
              <div className="space-y-3">
                {customCategories?.map((category) => (
                  <div key={category?.id} className="border border-border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <Icon name="Folder" size={20} className="text-primary" />
                          <div>
                            <h5 className="font-medium text-foreground">{category?.name}</h5>
                            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                              <span>{category?.itemCount} items</span>
                              <span>Created {new Date(category.createdDate)?.toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mt-2 flex flex-wrap gap-1">
                          {category?.fields?.map((field) => (
                            <span
                              key={field}
                              className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground"
                            >
                              {field}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleEditCategory(category)}
                          title="Edit category"
                        >
                          <Icon name="Edit2" size={16} />
                        </Button>
                        
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleDeleteCategory(category?.id)}
                          title="Delete category"
                          className="text-destructive hover:text-destructive"
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category Templates Info */}
          <div className="bg-muted/30 rounded-lg p-4">
            <h5 className="font-medium text-foreground mb-3">Template Guide</h5>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <Icon name="Circle" size={4} className="mt-2 flex-shrink-0" />
                <span><strong>Basic:</strong> Simple name and quantity tracking</span>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="Circle" size={4} className="mt-2 flex-shrink-0" />
                <span><strong>Sized:</strong> Items with size variations and quantities</span>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="Circle" size={4} className="mt-2 flex-shrink-0" />
                <span><strong>Measured:</strong> Length-based items with unit toggles</span>
              </div>
              <div className="flex items-start space-x-2">
                <Icon name="Circle" size={4} className="mt-2 flex-shrink-0" />
                <span><strong>Complex:</strong> Multiple attributes and custom fields</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomCategoriesPanel;