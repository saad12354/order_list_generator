import React from 'react';
import Icon from '../AppIcon';

const HeaderBrand = ({ subtitle }) => {
  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
        <Icon 
          name="Thermometer" 
          size={24} 
          color="white" 
          strokeWidth={2}
        />
      </div>
      <div className="flex flex-col">
        <h1 className="text-xl font-semibold text-foreground leading-tight">
          HVAC Inventory
        </h1>
        {subtitle && (
          <span className="text-sm text-muted-foreground leading-tight">
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};

export default HeaderBrand;