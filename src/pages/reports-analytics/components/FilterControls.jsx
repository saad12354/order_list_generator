import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const FilterControls = ({ onApplyFilters, onResetFilters }) => {
  const [filters, setFilters] = useState({
    dateRange: {
      startDate: '',
      endDate: ''
    },
    categories: [],
    projects: [],
    stockStatus: 'all',
    minValue: '',
    maxValue: ''
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const categoryOptions = [
    { value: 'copper-pipes', label: '🔧 Copper Pipes' },
    { value: 'insulation', label: '🧊 Insulation' },
    { value: 'pipe-fittings', label: '🔩 Pipe Fittings' },
    { value: 'flare-nuts', label: '🔗 Flare Nuts' },
    { value: 'wires', label: '⚡ Electrical Wires' },
    { value: 'tools', label: '🛠️ Tools & Equipment' }
  ];

  const projectOptions = [
    { value: 'residential-hvac-2024', label: 'Residential HVAC Installation 2024' },
    { value: 'commercial-cooling-system', label: 'Commercial Cooling System' },
    { value: 'office-building-retrofit', label: 'Office Building Retrofit' },
    { value: 'warehouse-ventilation', label: 'Warehouse Ventilation Project' },
    { value: 'hospital-hvac-upgrade', label: 'Hospital HVAC Upgrade' }
  ];

  const stockStatusOptions = [
    { value: 'all', label: 'All Items' },
    { value: 'in-stock', label: 'In Stock' },
    { value: 'low-stock', label: 'Low Stock' },
    { value: 'out-of-stock', label: 'Out of Stock' }
  ];

  const handleFilterChange = (field, value) => {
    if (field?.includes('.')) {
      const [parent, child] = field?.split('.');
      setFilters(prev => ({
        ...prev,
        [parent]: {
          ...prev?.[parent],
          [child]: value
        }
      }));
    } else {
      setFilters(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleCategoryChange = (categoryValue, checked) => {
    setFilters(prev => ({
      ...prev,
      categories: checked 
        ? [...prev?.categories, categoryValue]
        : prev?.categories?.filter(cat => cat !== categoryValue)
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters(filters);
  };

  const handleResetFilters = () => {
    const resetFilters = {
      dateRange: { startDate: '', endDate: '' },
      categories: [],
      projects: [],
      stockStatus: 'all',
      minValue: '',
      maxValue: ''
    };
    setFilters(resetFilters);
    onResetFilters();
  };

  const hasActiveFilters = 
    filters?.dateRange?.startDate || 
    filters?.dateRange?.endDate || 
    filters?.categories?.length > 0 || 
    filters?.projects?.length > 0 || 
    filters?.stockStatus !== 'all' ||
    filters?.minValue ||
    filters?.maxValue;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-lg">
            <Icon name="Filter" size={20} className="text-secondary" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Filter Controls</h2>
            <p className="text-sm text-muted-foreground">Customize your report data</p>
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          iconName={isExpanded ? "ChevronUp" : "ChevronDown"}
          iconPosition="right"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? 'Collapse' : 'Expand'}
        </Button>
      </div>
      {hasActiveFilters && (
        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Icon name="Filter" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">
                Active filters applied
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              iconName="X"
              onClick={handleResetFilters}
            >
              Clear All
            </Button>
          </div>
        </div>
      )}
      <div className="space-y-4">
        {/* Date Range */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            label="Start Date"
            type="date"
            value={filters?.dateRange?.startDate}
            onChange={(e) => handleFilterChange('dateRange.startDate', e?.target?.value)}
          />
          <Input
            label="End Date"
            type="date"
            value={filters?.dateRange?.endDate}
            onChange={(e) => handleFilterChange('dateRange.endDate', e?.target?.value)}
          />
        </div>

        {isExpanded && (
          <>
            {/* Stock Status and Projects */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Select
                label="Stock Status"
                options={stockStatusOptions}
                value={filters?.stockStatus}
                onChange={(value) => handleFilterChange('stockStatus', value)}
              />
              <Select
                label="Projects"
                options={projectOptions}
                value={filters?.projects}
                onChange={(value) => handleFilterChange('projects', value)}
                multiple
                searchable
                placeholder="Select projects"
              />
            </div>

            {/* Value Range */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input
                label="Minimum Value ($)"
                type="number"
                placeholder="0.00"
                value={filters?.minValue}
                onChange={(e) => handleFilterChange('minValue', e?.target?.value)}
              />
              <Input
                label="Maximum Value ($)"
                type="number"
                placeholder="10000.00"
                value={filters?.maxValue}
                onChange={(e) => handleFilterChange('maxValue', e?.target?.value)}
              />
            </div>

            {/* Categories */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-3">
                Categories
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {categoryOptions?.map((category) => (
                  <Checkbox
                    key={category?.value}
                    label={category?.label}
                    checked={filters?.categories?.includes(category?.value)}
                    onChange={(e) => handleCategoryChange(category?.value, e?.target?.checked)}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
          <Button
            variant="default"
            iconName="Search"
            iconPosition="left"
            onClick={handleApplyFilters}
            className="flex-1 sm:flex-none"
          >
            Apply Filters
          </Button>
          <Button
            variant="outline"
            iconName="RotateCcw"
            iconPosition="left"
            onClick={handleResetFilters}
            disabled={!hasActiveFilters}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FilterControls;