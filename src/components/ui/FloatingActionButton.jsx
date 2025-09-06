import React from 'react';
import { useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const FloatingActionButton = ({ 
  onClick, 
  icon = 'Plus', 
  label = 'Add Item',
  className = '' 
}) => {
  const location = useLocation();
  
  // Only show on order list generator page
  const shouldShow = location?.pathname === '/order-list-generator';

  if (!shouldShow) return null;

  return (
    <button
      onClick={onClick}
      className={`
        fixed bottom-20 lg:bottom-6 right-4 lg:right-6
        w-14 h-14 lg:w-16 lg:h-16
        bg-primary hover:bg-primary/90 active:bg-primary/80
        text-primary-foreground
        rounded-full shadow-lg hover:shadow-xl
        flex items-center justify-center
        transition-all duration-200 ease-out
        transform hover:scale-105 active:scale-95
        z-50
        ${className}
      `}
      aria-label={label}
      title={label}
    >
      <Icon 
        name={icon} 
        size={24} 
        color="currentColor" 
        strokeWidth={2}
      />
    </button>
  );
};

export default FloatingActionButton;