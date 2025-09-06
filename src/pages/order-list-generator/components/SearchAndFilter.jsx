import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';


const SearchAndFilter = ({ 
  searchQuery, 
  onSearchChange, 
  selectedCategory, 
  onCategoryChange,
  sortBy,
  onSortChange,
  onClearFilters,
  className = '' 
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'copper-pipes', label: 'Copper Pipes' },
    { value: 'insulation', label: 'Insulation' },
    { value: 'pipe-fittings', label: 'Pipe Fittings' },
    { value: 'flare-nuts', label: 'Flare Nuts' },
    { value: 'wire', label: 'Wire' },
    { value: 'individual-items', label: 'Individual Items' },
    { value: 'tools', label: 'Tools' },
    { value: 'materials', label: 'Materials' },
    { value: 'electrical', label: 'Electrical Components' }
  ];

  const sortOptions = [
    { value: 'name-asc', label: 'Name (A-Z)' },
    { value: 'name-desc', label: 'Name (Z-A)' },
    { value: 'stock-high', label: 'Stock (High to Low)' },
    { value: 'stock-low', label: 'Stock (Low to High)' },
    { value: 'value-high', label: 'Value (High to Low)' },
    { value: 'value-low', label: 'Value (Low to High)' }
  ];

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search Input */}
        <div className="flex-1">
          <Input
            type="search"
            placeholder="Search inventory items..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>

        {/* Filter Toggle Button (Mobile) */}
        <div className="lg:hidden">
          <Button
            variant="outline"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            iconName="Filter"
            iconPosition="left"
            fullWidth
          >
            Filters
          </Button>
        </div>

        {/* Filter Controls */}
        <div className={`flex flex-col lg:flex-row gap-4 lg:gap-2 ${isFilterOpen ? 'block' : 'hidden lg:flex'}`}>
          <Select
            placeholder="Category"
            options={categoryOptions}
            value={selectedCategory}
            onChange={onCategoryChange}
            className="lg:w-48"
          />

          <Select
            placeholder="Sort by"
            options={sortOptions}
            value={sortBy}
            onChange={onSortChange}
            className="lg:w-48"
          />

          <Button
            variant="ghost"
            size="sm"
            onClick={onClearFilters}
            iconName="X"
            className="lg:w-auto"
          >
            Clear
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;