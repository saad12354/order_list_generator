import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Icon from '../AppIcon';
import Button from './Button';

const InventoryOverlayManager = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  size = 'default',
  showCloseButton = true 
}) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e?.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e) => {
    if (e?.target === overlayRef?.current) {
      onClose();
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'lg:max-w-md';
      case 'lg':
        return 'lg:max-w-4xl';
      case 'xl':
        return 'lg:max-w-6xl';
      case 'full':
        return 'lg:max-w-full lg:max-h-full lg:m-4';
      default:
        return 'lg:max-w-2xl';
    }
  };

  if (!isOpen) return null;

  const overlayContent = (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-200 flex items-end lg:items-center justify-center bg-black/50 backdrop-blur-sm animate-fade-in"
      onClick={handleBackdropClick}
    >
      {/* Mobile: Full screen slide up */}
      <div className={`
        w-full h-full lg:h-auto lg:w-auto lg:relative lg:rounded-lg lg:shadow-xl
        bg-card border-t lg:border border-border
        flex flex-col
        animate-slide-up lg:animate-scale-in
        ${getSizeClasses()}
      `}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 lg:p-6 border-b border-border bg-card lg:rounded-t-lg">
          <h2 className="text-lg lg:text-xl font-semibold text-foreground">
            {title}
          </h2>
          {showCloseButton && (
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-8 w-8 lg:h-10 lg:w-10"
              aria-label="Close"
            >
              <Icon name="X" size={18} />
            </Button>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(overlayContent, document.body);
};

export default InventoryOverlayManager;