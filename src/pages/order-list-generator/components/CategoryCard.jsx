import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const CategoryCard = ({ 
  title, 
  icon, 
  itemCount, 
  totalValue, 
  children, 
  isExpanded, 
  onToggle,
  variant = 'default' 
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return 'border-primary/20 bg-primary/5';
      case 'success':
        return 'border-success/20 bg-success/5';
      case 'warning':
        return 'border-warning/20 bg-warning/5';
      default:
        return 'border-border bg-card';
    }
  };

  return (
    <div className={`rounded-lg border ${getVariantStyles()} transition-all duration-200`}>
      <button
        onClick={onToggle}
        className="w-full p-4 lg:p-6 text-left hover:bg-muted/50 transition-colors duration-200 rounded-t-lg"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name={icon} size={20} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground text-lg">{title}</h3>
              <div className="flex items-center space-x-4 mt-1">
                <span className="text-sm text-muted-foreground">
                  {itemCount} items
                </span>
                {totalValue && (
                  <span className="text-sm font-medium text-success">
                    ${totalValue?.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>
          <Icon 
            name={isExpanded ? "ChevronUp" : "ChevronDown"} 
            size={20} 
            className="text-muted-foreground transition-transform duration-200"
          />
        </div>
      </button>
      {isExpanded && (
        <div className="px-4 lg:px-6 pb-4 lg:pb-6 border-t border-border bg-muted/20">
          <div className="pt-4">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoryCard;