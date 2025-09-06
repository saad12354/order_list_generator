import React from 'react';
import Icon from '../../../components/AppIcon';

const InventorySummaryCard = ({ inventoryData }) => {
  const categories = [
    {
      id: 'copper-pipes',
      name: '🔧 Copper Pipes',
      items: 9,
      totalStock: 245,
      lowStock: 2,
      value: 1850.50,
      icon: 'Wrench'
    },
    {
      id: 'insulation',
      name: '🧊 Insulation',
      items: 11,
      totalStock: 180,
      lowStock: 1,
      value: 920.75,
      icon: 'Shield'
    },
    {
      id: 'pipe-fittings',
      name: '🔩 Pipe Fittings',
      items: 8,
      totalStock: 320,
      lowStock: 0,
      value: 640.25,
      icon: 'Settings'
    },
    {
      id: 'flare-nuts',
      name: '🔗 Flare Nuts',
      items: 5,
      totalStock: 150,
      lowStock: 3,
      value: 285.00,
      icon: 'Link'
    },
    {
      id: 'wires',
      name: '⚡ Electrical Wires',
      items: 6,
      totalStock: 95,
      lowStock: 1,
      value: 475.80,
      icon: 'Zap'
    },
    {
      id: 'tools',
      name: '🛠️ Tools & Equipment',
      items: 15,
      totalStock: 42,
      lowStock: 0,
      value: 2150.00,
      icon: 'Hammer'
    }
  ];

  const totalValue = categories?.reduce((sum, cat) => sum + cat?.value, 0);
  const totalLowStock = categories?.reduce((sum, cat) => sum + cat?.lowStock, 0);

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-lg">
            <Icon name="Package" size={20} className="text-success" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Inventory Summary</h2>
            <p className="text-sm text-muted-foreground">Current stock levels by category</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-2xl font-bold text-foreground">${totalValue?.toLocaleString()}</p>
          <p className="text-sm text-muted-foreground">Total Value</p>
        </div>
      </div>
      {totalLowStock > 0 && (
        <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 mb-6">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={16} className="text-warning" />
            <span className="text-sm font-medium text-warning">
              {totalLowStock} item{totalLowStock > 1 ? 's' : ''} running low on stock
            </span>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {categories?.map((category) => (
          <div key={category?.id} className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Icon name={category?.icon} size={16} className="text-muted-foreground" />
                <span className="font-medium text-foreground">{category?.name}</span>
              </div>
              {category?.lowStock > 0 && (
                <div className="flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} className="text-warning" />
                  <span className="text-xs text-warning font-medium">Low Stock</span>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Items</p>
                <p className="font-semibold text-foreground">{category?.items}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Stock</p>
                <p className="font-semibold text-foreground">{category?.totalStock}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Value</p>
                <p className="font-semibold text-foreground">${category?.value?.toFixed(2)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InventorySummaryCard;