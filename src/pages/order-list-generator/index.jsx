import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';

import CategoryCard from './components/CategoryCard';
import InventoryItemForm from './components/InventoryItemForm';
import StockSummaryCard from './components/StockSummaryCard';
import QuickActionBar from './components/QuickActionBar';
import SearchAndFilter from './components/SearchAndFilter';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const InventoryManagement = () => {
  const navigate = useNavigate();
  const [expandedCategories, setExpandedCategories] = useState({});
  const [inventoryData, setInventoryData] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [showAllItems, setShowAllItems] = useState(true); // Show all items by default for order making
  const [generatedReport, setGeneratedReport] = useState(null);

  // Comprehensive order list categories with all required items
  const inventoryCategories = [
    {
      id: 'copper-pipes',
      title: 'Copper Pipes',
      icon: 'Pipe',
      variant: 'primary',
      items: [
        {
          id: 'cp-1-4',
          name: '1/4" Copper Pipe',
          fields: [
            { key: 'type', type: 'toggle', label: 'Type', options: [{ value: 'soft', label: 'Soft' }, { value: 'hard', label: 'Hard' }], defaultValue: 'soft' },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'length', type: 'number', label: 'Length (ft)', placeholder: '0', min: 0, step: 0.1 }
          ]
        },
        {
          id: 'cp-3-8',
          name: '3/8" Copper Pipe',
          fields: [
            { key: 'type', type: 'toggle', label: 'Type', options: [{ value: 'soft', label: 'Soft' }, { value: 'hard', label: 'Hard' }], defaultValue: 'soft' },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'length', type: 'number', label: 'Length (ft)', placeholder: '0', min: 0, step: 0.1 }
          ]
        },
        {
          id: 'cp-1-2',
          name: '1/2" Copper Pipe',
          fields: [
            { key: 'type', type: 'toggle', label: 'Type', options: [{ value: 'soft', label: 'Soft' }, { value: 'hard', label: 'Hard' }], defaultValue: 'soft' },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'length', type: 'number', label: 'Length (ft)', placeholder: '0', min: 0, step: 0.1 }
          ]
        },
        {
          id: 'cp-5-8',
          name: '5/8" Copper Pipe',
          fields: [
            { key: 'type', type: 'toggle', label: 'Type', options: [{ value: 'soft', label: 'Soft' }, { value: 'hard', label: 'Hard' }], defaultValue: 'soft' },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'length', type: 'number', label: 'Length (ft)', placeholder: '0', min: 0, step: 0.1 }
          ]
        },
        {
          id: 'cp-3-4',
          name: '3/4" Copper Pipe',
          fields: [
            { key: 'type', type: 'toggle', label: 'Type', options: [{ value: 'soft', label: 'Soft' }, { value: 'hard', label: 'Hard' }], defaultValue: 'soft' },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'length', type: 'number', label: 'Length (ft)', placeholder: '0', min: 0, step: 0.1 }
          ]
        },
        {
          id: 'cp-7-8',
          name: '7/8" Copper Pipe',
          fields: [
            { key: 'type', type: 'toggle', label: 'Type', options: [{ value: 'soft', label: 'Soft' }, { value: 'hard', label: 'Hard' }], defaultValue: 'soft' },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'length', type: 'number', label: 'Length (ft)', placeholder: '0', min: 0, step: 0.1 }
          ]
        },
        {
          id: 'cp-1',
          name: '1" Copper Pipe',
          fields: [
            { key: 'type', type: 'toggle', label: 'Type', options: [{ value: 'soft', label: 'Soft' }, { value: 'hard', label: 'Hard' }], defaultValue: 'soft' },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'length', type: 'number', label: 'Length (ft)', placeholder: '0', min: 0, step: 0.1 }
          ]
        },
        {
          id: 'cp-1-1-8',
          name: '1 1/8" Copper Pipe',
          fields: [
            { key: 'type', type: 'toggle', label: 'Type', options: [{ value: 'soft', label: 'Soft' }, { value: 'hard', label: 'Hard' }], defaultValue: 'soft' },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'length', type: 'number', label: 'Length (ft)', placeholder: '0', min: 0, step: 0.1 }
          ]
        },
        {
          id: 'cp-1-3-8',
          name: '1 3/8" Copper Pipe',
          fields: [
            { key: 'type', type: 'toggle', label: 'Type', options: [{ value: 'soft', label: 'Soft' }, { value: 'hard', label: 'Hard' }], defaultValue: 'soft' },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'length', type: 'number', label: 'Length (ft)', placeholder: '0', min: 0, step: 0.1 }
          ]
        },
        {
          id: 'cp-1-5-8',
          name: '1 5/8" Copper Pipe',
          fields: [
            { key: 'type', type: 'toggle', label: 'Type', options: [{ value: 'soft', label: 'Soft' }, { value: 'hard', label: 'Hard' }], defaultValue: 'soft' },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'length', type: 'number', label: 'Length (ft)', placeholder: '0', min: 0, step: 0.1 }
          ]
        }
      ]
    },
    {
      id: 'insulation',
      title: 'Insulation',
      icon: 'Shield',
      variant: 'success',
      items: [
        {
          id: 'ins-1-8',
          name: '1/8" Insulation',
          fields: [
            { key: 'length', type: 'number', label: 'Length', placeholder: '0', min: 0, step: 0.1 },
            { key: 'unit', type: 'toggle', label: 'Unit', options: [{ value: 'ft', label: 'Feet' }, { value: 'meter', label: 'Meter' }], defaultValue: 'ft' },
            { key: 'thickness', type: 'select', label: 'Thickness', options: [
              { value: '9mm', label: '9mm' },
              { value: '13mm', label: '13mm' },
              { value: '19mm', label: '19mm' },
              { value: '25mm', label: '25mm' }
            ], defaultValue: '9mm' }
          ]
        },
        {
          id: 'ins-1-4',
          name: '1/4" Insulation',
          fields: [
            { key: 'length', type: 'number', label: 'Length', placeholder: '0', min: 0, step: 0.1 },
            { key: 'unit', type: 'toggle', label: 'Unit', options: [{ value: 'ft', label: 'Feet' }, { value: 'meter', label: 'Meter' }], defaultValue: 'ft' },
            { key: 'thickness', type: 'select', label: 'Thickness', options: [
              { value: '9mm', label: '9mm' },
              { value: '13mm', label: '13mm' },
              { value: '19mm', label: '19mm' },
              { value: '25mm', label: '25mm' }
            ], defaultValue: '9mm' }
          ]
        },
        {
          id: 'ins-3-8',
          name: '3/8" Insulation',
          fields: [
            { key: 'length', type: 'number', label: 'Length', placeholder: '0', min: 0, step: 0.1 },
            { key: 'unit', type: 'toggle', label: 'Unit', options: [{ value: 'ft', label: 'Feet' }, { value: 'meter', label: 'Meter' }], defaultValue: 'ft' },
            { key: 'thickness', type: 'select', label: 'Thickness', options: [
              { value: '9mm', label: '9mm' },
              { value: '13mm', label: '13mm' },
              { value: '19mm', label: '19mm' },
              { value: '25mm', label: '25mm' }
            ], defaultValue: '9mm' }
          ]
        },
        {
          id: 'ins-1-2',
          name: '1/2" Insulation',
          fields: [
            { key: 'length', type: 'number', label: 'Length', placeholder: '0', min: 0, step: 0.1 },
            { key: 'unit', type: 'toggle', label: 'Unit', options: [{ value: 'ft', label: 'Feet' }, { value: 'meter', label: 'Meter' }], defaultValue: 'ft' },
            { key: 'thickness', type: 'select', label: 'Thickness', options: [
              { value: '9mm', label: '9mm' },
              { value: '13mm', label: '13mm' },
              { value: '19mm', label: '19mm' },
              { value: '25mm', label: '25mm' }
            ], defaultValue: '9mm' }
          ]
        },
        {
          id: 'ins-5-8',
          name: '5/8" Insulation',
          fields: [
            { key: 'length', type: 'number', label: 'Length', placeholder: '0', min: 0, step: 0.1 },
            { key: 'unit', type: 'toggle', label: 'Unit', options: [{ value: 'ft', label: 'Feet' }, { value: 'meter', label: 'Meter' }], defaultValue: 'ft' },
            { key: 'thickness', type: 'select', label: 'Thickness', options: [
              { value: '9mm', label: '9mm' },
              { value: '13mm', label: '13mm' },
              { value: '19mm', label: '19mm' },
              { value: '25mm', label: '25mm' }
            ], defaultValue: '9mm' }
          ]
        },
        {
          id: 'ins-3-4',
          name: '3/4" Insulation',
          fields: [
            { key: 'length', type: 'number', label: 'Length', placeholder: '0', min: 0, step: 0.1 },
            { key: 'unit', type: 'toggle', label: 'Unit', options: [{ value: 'ft', label: 'Feet' }, { value: 'meter', label: 'Meter' }], defaultValue: 'ft' },
            { key: 'thickness', type: 'select', label: 'Thickness', options: [
              { value: '9mm', label: '9mm' },
              { value: '13mm', label: '13mm' },
              { value: '19mm', label: '19mm' },
              { value: '25mm', label: '25mm' }
            ], defaultValue: '9mm' }
          ]
        },
        {
          id: 'ins-7-8',
          name: '7/8" Insulation',
          fields: [
            { key: 'length', type: 'number', label: 'Length', placeholder: '0', min: 0, step: 0.1 },
            { key: 'unit', type: 'toggle', label: 'Unit', options: [{ value: 'ft', label: 'Feet' }, { value: 'meter', label: 'Meter' }], defaultValue: 'ft' },
            { key: 'thickness', type: 'select', label: 'Thickness', options: [
              { value: '9mm', label: '9mm' },
              { value: '13mm', label: '13mm' },
              { value: '19mm', label: '19mm' },
              { value: '25mm', label: '25mm' }
            ], defaultValue: '9mm' }
          ]
        },
        {
          id: 'ins-1',
          name: '1" Insulation',
          fields: [
            { key: 'length', type: 'number', label: 'Length', placeholder: '0', min: 0, step: 0.1 },
            { key: 'unit', type: 'toggle', label: 'Unit', options: [{ value: 'ft', label: 'Feet' }, { value: 'meter', label: 'Meter' }], defaultValue: 'ft' },
            { key: 'thickness', type: 'select', label: 'Thickness', options: [
              { value: '9mm', label: '9mm' },
              { value: '13mm', label: '13mm' },
              { value: '19mm', label: '19mm' },
              { value: '25mm', label: '25mm' }
            ], defaultValue: '9mm' }
          ]
        },
        {
          id: 'ins-1-1-8',
          name: '1 1/8" Insulation',
          fields: [
            { key: 'length', type: 'number', label: 'Length', placeholder: '0', min: 0, step: 0.1 },
            { key: 'unit', type: 'toggle', label: 'Unit', options: [{ value: 'ft', label: 'Feet' }, { value: 'meter', label: 'Meter' }], defaultValue: 'ft' },
            { key: 'thickness', type: 'select', label: 'Thickness', options: [
              { value: '9mm', label: '9mm' },
              { value: '13mm', label: '13mm' },
              { value: '19mm', label: '19mm' },
              { value: '25mm', label: '25mm' }
            ], defaultValue: '9mm' }
          ]
        },
        {
          id: 'ins-1-3-8',
          name: '1 3/8" Insulation',
          fields: [
            { key: 'length', type: 'number', label: 'Length', placeholder: '0', min: 0, step: 0.1 },
            { key: 'unit', type: 'toggle', label: 'Unit', options: [{ value: 'ft', label: 'Feet' }, { value: 'meter', label: 'Meter' }], defaultValue: 'ft' },
            { key: 'thickness', type: 'select', label: 'Thickness', options: [
              { value: '9mm', label: '9mm' },
              { value: '13mm', label: '13mm' },
              { value: '19mm', label: '19mm' },
              { value: '25mm', label: '25mm' }
            ], defaultValue: '9mm' }
          ]
        },
        {
          id: 'ins-1-5-8',
          name: '1 5/8" Insulation',
          fields: [
            { key: 'length', type: 'number', label: 'Length', placeholder: '0', min: 0, step: 0.1 },
            { key: 'unit', type: 'toggle', label: 'Unit', options: [{ value: 'ft', label: 'Feet' }, { value: 'meter', label: 'Meter' }], defaultValue: 'ft' },
            { key: 'thickness', type: 'select', label: 'Thickness', options: [
              { value: '9mm', label: '9mm' },
              { value: '13mm', label: '13mm' },
              { value: '19mm', label: '19mm' },
              { value: '25mm', label: '25mm' }
            ], defaultValue: '9mm' }
          ]
        },
        {
          id: 'ins-2',
          name: '2" Insulation',
          fields: [
            { key: 'length', type: 'number', label: 'Length', placeholder: '0', min: 0, step: 0.1 },
            { key: 'unit', type: 'toggle', label: 'Unit', options: [{ value: 'ft', label: 'Feet' }, { value: 'meter', label: 'Meter' }], defaultValue: 'ft' },
            { key: 'thickness', type: 'select', label: 'Thickness', options: [
              { value: '9mm', label: '9mm' },
              { value: '13mm', label: '13mm' },
              { value: '19mm', label: '19mm' },
              { value: '25mm', label: '25mm' }
            ], defaultValue: '9mm' }
          ]
        }
      ]
    },
    {
      id: 'pipe-fittings',
      title: 'Pipe Fittings',
      icon: 'Wrench',
      variant: 'warning',
      items: [
        {
          id: 'pf-1-4',
          name: '1/4" Pipe Fittings',
          fields: [
            { key: 'elbowQuantity', type: 'number', label: 'Elbow Quantity', placeholder: '0', min: 0 },
            { key: 'couplingQuantity', type: 'number', label: 'Coupling Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'pf-3-8',
          name: '3/8" Pipe Fittings',
          fields: [
            { key: 'elbowQuantity', type: 'number', label: 'Elbow Quantity', placeholder: '0', min: 0 },
            { key: 'couplingQuantity', type: 'number', label: 'Coupling Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'pf-1-2',
          name: '1/2" Pipe Fittings',
          fields: [
            { key: 'elbowQuantity', type: 'number', label: 'Elbow Quantity', placeholder: '0', min: 0 },
            { key: 'couplingQuantity', type: 'number', label: 'Coupling Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'pf-5-8',
          name: '5/8" Pipe Fittings',
          fields: [
            { key: 'elbowQuantity', type: 'number', label: 'Elbow Quantity', placeholder: '0', min: 0 },
            { key: 'couplingQuantity', type: 'number', label: 'Coupling Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'pf-3-4',
          name: '3/4" Pipe Fittings',
          fields: [
            { key: 'elbowQuantity', type: 'number', label: 'Elbow Quantity', placeholder: '0', min: 0 },
            { key: 'couplingQuantity', type: 'number', label: 'Coupling Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'pf-7-8',
          name: '7/8" Pipe Fittings',
          fields: [
            { key: 'elbowQuantity', type: 'number', label: 'Elbow Quantity', placeholder: '0', min: 0 },
            { key: 'couplingQuantity', type: 'number', label: 'Coupling Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'pf-1',
          name: '1" Pipe Fittings',
          fields: [
            { key: 'elbowQuantity', type: 'number', label: 'Elbow Quantity', placeholder: '0', min: 0 },
            { key: 'couplingQuantity', type: 'number', label: 'Coupling Quantity', placeholder: '0', min: 0 }
          ]
        },
          {
            id: 'pf-1-1-8',
            name: '1 1/8" Pipe Fittings',
            fields: [
              { key: 'elbowQuantity', type: 'number', label: 'Elbow Quantity', placeholder: '0', min: 0 },
              { key: 'couplingQuantity', type: 'number', label: 'Coupling Quantity', placeholder: '0', min: 0 }
            ]
          },
          {
            id: 'pf-1-3-8',
            name: '1 3/8" Pipe Fittings',
            fields: [
              { key: 'elbowQuantity', type: 'number', label: 'Elbow Quantity', placeholder: '0', min: 0 },
              { key: 'couplingQuantity', type: 'number', label: 'Coupling Quantity', placeholder: '0', min: 0 }
            ]
          },
          {
            id: 'pf-1-5-8',
            name: '1 5/8" Pipe Fittings',
            fields: [
              { key: 'elbowQuantity', type: 'number', label: 'Elbow Quantity', placeholder: '0', min: 0 },
              { key: 'couplingQuantity', type: 'number', label: 'Coupling Quantity', placeholder: '0', min: 0 }
            ]
          },
          {
            id: 'pf-cpvc',
            name: 'CPVC',
            fields: [
              { key: 'quantity', type: 'number', label: 'Quantity (feet)', placeholder: '0', min: 0, step: 0.1 }
            ]
          },
          {
            id: 'pf-upvc',
            name: 'UPVC',
            fields: [
              { key: 'quantity', type: 'number', label: 'Quantity (feet)', placeholder: '0', min: 0, step: 0.1 }
            ]
          },
          {
            id: 'pf-pvc',
            name: 'PVC',
            fields: [
              { key: 'quantity', type: 'number', label: 'Quantity (feet)', placeholder: '0', min: 0, step: 0.1 }
            ]
          },
          {
            id: 'pf-solvent',
            name: 'Solvent',
            fields: [
              { key: 'quantity', type: 'number', label: 'Quantity (ml)', placeholder: '0', min: 0 }
            ]
          }
      ]
    },
    {
      id: 'flare-nuts',
      title: 'Flare Nuts',
      icon: 'Nut',
      variant: 'default',
      items: [
        {
          id: 'fn-1-4',
          name: '1/4" Flare Nuts',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'meter', type: 'number', label: 'Per Meter', placeholder: '0', min: 0, step: 0.1 }
          ]
        },
        {
          id: 'fn-3-8',
          name: '3/8" Flare Nuts',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'meter', type: 'number', label: 'Per Meter', placeholder: '0', min: 0, step: 0.1 }
          ]
        },
        {
          id: 'fn-1-2',
          name: '1/2" Flare Nuts',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'meter', type: 'number', label: 'Per Meter', placeholder: '0', min: 0, step: 0.1 }
          ]
        },
        {
          id: 'fn-5-8',
          name: '5/8" Flare Nuts',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'meter', type: 'number', label: 'Per Meter', placeholder: '0', min: 0, step: 0.1 }
          ]
        },
        {
          id: 'fn-3-4',
          name: '3/4" Flare Nuts',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'meter', type: 'number', label: 'Per Meter', placeholder: '0', min: 0, step: 0.1 }
          ]
        }
      ]
    },
      {
        id: 'wire',
        title: 'Wire',
        icon: 'Zap',
        variant: 'primary',
        items: [
          {
            id: 'wire-0-5',
            name: '0.5 sq mm Wire',
            fields: [
              { key: 'length', type: 'number', label: 'Length (m)', placeholder: '0', min: 0, step: 0.1 },
              { key: 'cores', type: 'toggle', label: 'Cores', options: [
                { value: '2', label: '2 Core' },
                { value: '4', label: '4 Core' },
                { value: '6', label: '6 Core' }
              ], defaultValue: '2' }
            ]
          },
          {
            id: 'wire-0-75',
            name: '0.75 sq mm Wire',
            fields: [
              { key: 'length', type: 'number', label: 'Length (m)', placeholder: '0', min: 0, step: 0.1 },
              { key: 'cores', type: 'toggle', label: 'Cores', options: [
                { value: '2', label: '2 Core' },
                { value: '4', label: '4 Core' },
                { value: '6', label: '6 Core' }
              ], defaultValue: '2' }
            ]
          },
          {
            id: 'wire-1-0',
            name: '1.0 sq mm Wire',
            fields: [
              { key: 'length', type: 'number', label: 'Length (m)', placeholder: '0', min: 0, step: 0.1 },
              { key: 'cores', type: 'toggle', label: 'Cores', options: [
                { value: '2', label: '2 Core' },
                { value: '4', label: '4 Core' },
                { value: '6', label: '6 Core' }
              ], defaultValue: '2' }
            ]
          },
          {
            id: 'wire-1-5',
            name: '1.5 sq mm Wire',
            fields: [
              { key: 'length', type: 'number', label: 'Length (m)', placeholder: '0', min: 0, step: 0.1 },
              { key: 'cores', type: 'toggle', label: 'Cores', options: [
                { value: '2', label: '2 Core' },
                { value: '4', label: '4 Core' },
                { value: '6', label: '6 Core' }
              ], defaultValue: '2' }
            ]
          },
          {
            id: 'wire-2-5',
            name: '2.5 sq mm Wire',
            fields: [
              { key: 'length', type: 'number', label: 'Length (m)', placeholder: '0', min: 0, step: 0.1 },
              { key: 'cores', type: 'toggle', label: 'Cores', options: [
                { value: '2', label: '2 Core' },
                { value: '4', label: '4 Core' },
                { value: '6', label: '6 Core' }
              ], defaultValue: '2' }
            ]
          },
          {
            id: 'wire-4-0',
            name: '4.0 sq mm Wire',
            fields: [
              { key: 'length', type: 'number', label: 'Length (m)', placeholder: '0', min: 0, step: 0.1 },
              { key: 'cores', type: 'toggle', label: 'Cores', options: [
                { value: '2', label: '2 Core' },
                { value: '4', label: '4 Core' },
                { value: '6', label: '6 Core' }
              ], defaultValue: '2' }
            ]
          },
          {
            id: 'wire-6-0',
            name: '6.0 sq mm Wire',
            fields: [
              { key: 'length', type: 'number', label: 'Length (m)', placeholder: '0', min: 0, step: 0.1 },
              { key: 'cores', type: 'toggle', label: 'Cores', options: [
                { value: '2', label: '2 Core' },
                { value: '4', label: '4 Core' },
                { value: '6', label: '6 Core' }
              ], defaultValue: '2' }
            ]
          }
        ]
      },
    {
      id: 'tools',
      title: 'Tools',
      icon: 'Hammer',
      variant: 'success',
      items: [
        {
          id: 'tool-flaring',
          name: 'Flaring Tools',
          fields: [
            { key: 'required', type: 'checkbox', label: 'Required for project' },
            { key: 'condition', type: 'select', label: 'Condition', options: [
              { value: 'excellent', label: 'Excellent' },
              { value: 'good', label: 'Good' },
              { value: 'fair', label: 'Fair' },
              { value: 'needs-repair', label: 'Needs Repair' }
            ], defaultValue: 'good' }
          ]
        },
        {
          id: 'tool-brazing',
          name: 'Brazing Rods',
          fields: [
            { key: 'required', type: 'checkbox', label: 'Required for project' },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'tool-drill',
          name: 'Drill Machine',
          fields: [
            { key: 'required', type: 'checkbox', label: 'Required for project' },
            { key: 'type', type: 'select', label: 'Type', options: [
              { value: 'cordless', label: 'Cordless' },
              { value: 'corded', label: 'Corded' },
              { value: 'hammer', label: 'Hammer Drill' }
            ], defaultValue: 'cordless' }
          ]
        },
        {
          id: 'tool-tube-cutter',
          name: 'Tube Cutter',
          fields: [
            { key: 'required', type: 'checkbox', label: 'Required for project' },
            { key: 'size', type: 'radio', label: 'Size Range', options: [
              { value: 'small', label: '1/8" - 5/8"' },
              { value: 'medium', label: '1/4" - 1 1/8"' },
              { value: 'large', label: '5/8" - 2 1/8"' }
            ], defaultValue: 'medium' }
          ]
        },
        {
          id: 'tool-pipe-bender',
          name: 'Pipe Bender',
          fields: [
            { key: 'required', type: 'checkbox', label: 'Required for project' },
            { key: 'manual', type: 'checkbox', label: 'Manual Bender' },
            { key: 'hydraulic', type: 'checkbox', label: 'Hydraulic Bender' }
          ]
        },
        {
          id: 'tool-drain-heater',
          name: 'Drain Heater',
          fields: [
            { key: 'length', type: 'number', label: 'Length (ft)', placeholder: '0', min: 0, step: 0.1 }
          ]
        },
        {
          id: 'tool-monsoon-tape',
          name: 'Monsoon Tape',
          fields: [
            { key: 'length', type: 'number', label: 'Length', placeholder: '0', min: 0, step: 0.1 },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'tool-teflon-tape',
          name: 'Teflon Tape',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'tool-tarfelt',
          name: 'Tarfelt',
          fields: [
            { key: 'length', type: 'number', label: 'Length', placeholder: '0', min: 0, step: 0.1 },
            { key: 'unit', type: 'toggle', label: 'Unit', options: [{ value: 'meter', label: 'Meter' }, { value: 'roll', label: 'Roll' }], defaultValue: 'meter' },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'tool-liquid-puff',
          name: 'Liquid Puff',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity (L)', placeholder: '0', min: 0, step: 0.1 }
          ]
        },
        {
          id: 'tool-hatlon',
          name: 'Hatlon',
          fields: [
            { key: 'length', type: 'number', label: 'Length', placeholder: '0', min: 0, step: 0.1 },
            { key: 'unit', type: 'toggle', label: 'Unit', options: [{ value: 'ft', label: 'Feet' }, { value: 'meter', label: 'Meter' }], defaultValue: 'ft' }
          ]
        },
        {
          id: 'tool-threaded-rod',
          name: 'Threaded Rod',
          fields: [
            { key: 'size', type: 'select', label: 'Size', options: [
              { value: '8mm', label: '8mm' },
              { value: '10mm', label: '10mm' },
              { value: '12mm', label: '12mm' }
            ], defaultValue: '10mm' },
            { key: 'length', type: 'number', label: 'Length (m)', placeholder: '0', min: 0, step: 0.1 },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'tool-nut-washer',
          name: 'Nut & Washer',
          fields: [
            { key: 'size', type: 'select', label: 'Size', options: [
              { value: '8mm', label: '8mm' },
              { value: '10mm', label: '10mm' },
              { value: '12mm', label: '12mm' }
            ], defaultValue: '10mm' },
            { key: 'length', type: 'radio', label: 'Length', options: [
              { value: '3', label: '3 inch' },
              { value: '4', label: '4 inch' },
              { value: '5', label: '5 inch' },
              { value: '6', label: '6 inch' }
            ], defaultValue: '4' },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'tool-nut-bolt',
          name: 'Nut Bolt',
          fields: [
            { key: 'size', type: 'select', label: 'Size', options: [
              { value: '8mm', label: '8mm' },
              { value: '10mm', label: '10mm' },
              { value: '12mm', label: '12mm' }
            ], defaultValue: '10mm' },
            { key: 'length', type: 'select', label: 'Length', options: [
              { value: '3', label: '3 inch' },
              { value: '4', label: '4 inch' },
              { value: '5', label: '5 inch' },
              { value: '6', label: '6 inch' }
            ], defaultValue: '4' },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'tool-drill-bit-set',
          name: 'Drill Bit Set',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'sizes', type: 'text', label: 'Sizes', placeholder: '8mm,10mm,12mm' }
          ]
        },
        {
          id: 'tool-silicone',
          name: 'Silicone',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'color', type: 'radio', label: 'Color', options: [
              { value: 'white', label: 'White' },
              { value: 'clear', label: 'Clear' },
              { value: 'gray', label: 'Gray' }
            ], defaultValue: 'clear' },
            { key: 'gun_required', type: 'checkbox', label: 'Gun Required' }
          ]
        },
        {
          id: 'tool-fastener',
          name: 'Fastener',
          fields: [
            { key: 'size', type: 'select', label: 'Size', options: [
              { value: '8mm', label: '8mm' },
              { value: '10mm', label: '10mm' },
              { value: '12mm', label: '12mm' }
            ], defaultValue: '10mm' },
            { key: 'length', type: 'checkboxes', label: 'Length', options: [
              { value: '3', label: '3 inch' },
              { value: '4', label: '4 inch' },
              { value: '5', label: '5 inch' },
              { value: '6', label: '6 inch' }
            ] },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'tool-spring-bender',
          name: 'Spring Bender',
          fields: [
            { key: 'size', type: 'select', label: 'Size', options: [
              { value: 'small', label: 'Small' },
              { value: 'medium', label: 'Medium' },
              { value: 'large', label: 'Large' }
            ], defaultValue: 'medium' },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'tool-gas-batti-set',
          name: 'Gas Batti Set',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'tool-sensor-wire',
          name: 'Sensor Wire',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'length', type: 'number', label: 'Length (m)', placeholder: '0', min: 0, step: 0.1 }
          ]
        },
        {
          id: 'tool-vacuum-pump',
          name: 'Vacuum Pump',
          fields: [
            { key: 'required', type: 'checkbox', label: 'Required for project' }
          ]
        },
        {
          id: 'tool-drain-selection-t',
          name: 'Drain Selection T',
          fields: [
            { key: 'required', type: 'checkbox', label: 'Required for project' }
          ]
        },
        {
          id: 'tool-led-light',
          name: 'LED Light',
          fields: [
            { key: 'size', type: 'toggle', label: 'Size', options: [
              { value: '2ft', label: '2ft' },
              { value: '4ft', label: '4ft' }
            ], defaultValue: '4ft' },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'tool-controller',
          name: 'Controller',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'tool-controller-box',
          name: 'Controller Box',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 }
          ]
        }
      ]
    },
    {
      id: 'materials',
      title: 'Materials',
      icon: 'Package2',
      variant: 'warning',
      items: [
        {
          id: 'mat-butane',
          name: 'Butane/LPG',
          fields: [
            { key: 'size', type: 'toggle', label: 'Size', options: [
              { value: 'small', label: 'Small' },
              { value: 'medium', label: 'Medium' },
              { value: 'large', label: 'Large' }
            ], defaultValue: 'medium' },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'mat-oxygen',
          name: 'Oxygen Cylinders',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'pressure', type: 'number', label: 'Pressure (PSI)', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'mat-nitrogen',
          name: 'Nitrogen',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity (L)', placeholder: '0', min: 0, step: 0.1 },
            { key: 'purity', type: 'select', label: 'Purity', options: [
              { value: '99.9', label: '99.9%' },
              { value: '99.99', label: '99.99%' },
              { value: '99.999', label: '99.999%' }
            ], defaultValue: '99.9' }
          ]
        },
        {
          id: 'mat-flux',
          name: 'Flux Paste',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity (oz)', placeholder: '0', min: 0 },
            { key: 'type', type: 'select', label: 'Type', options: [
              { value: 'water-soluble', label: 'Water Soluble' },
              { value: 'petrolatum', label: 'Petrolatum Base' },
              { value: 'paste', label: 'Paste Form' }
            ], defaultValue: 'paste' }
          ]
        },
        {
          id: 'mat-sandpaper',
          name: 'Sandpaper/Emery Cloth',
          fields: [
            { key: 'sheets', type: 'number', label: 'Sheets', placeholder: '0', min: 0 },
            { key: 'grit', type: 'select', label: 'Grit', options: [
              { value: '120', label: '120 Grit' },
              { value: '220', label: '220 Grit' },
              { value: '320', label: '320 Grit' },
              { value: '400', label: '400 Grit' }
            ], defaultValue: '220' }
          ]
        }
      ]
    },
    {
      id: 'electrical',
      title: 'Electrical Components',
      icon: 'Zap',
      variant: 'primary',
      items: [
        {
          id: 'elec-contactor',
          name: 'Contactors',
          fields: [
            { key: 'type', type: 'toggle', label: 'Type', options: [
              { value: 'NO', label: 'Normally Open' },
              { value: 'NC', label: 'Normally Closed' }
            ], defaultValue: 'NO' },
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'amperage', type: 'select', label: 'Amperage', options: [
              { value: '10A', label: '10A' },
              { value: '16A', label: '16A' },
              { value: '25A', label: '25A' },
              { value: '32A', label: '32A' }
            ], defaultValue: '16A' }
          ]
        },
        {
          id: 'elec-surge',
          name: 'SPPR Surge Protectors',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'voltage', type: 'select', label: 'Voltage Rating', options: [
              { value: '120V', label: '120V' },
              { value: '240V', label: '240V' },
              { value: '480V', label: '480V' }
            ], defaultValue: '240V' }
          ]
        },
        {
          id: 'elec-clips',
          name: 'Wire Clips',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'size', type: 'select', label: 'Size', options: [
              { value: 'small', label: 'Small (1/4")' },
              { value: 'medium', label: 'Medium (3/8")' },
              { value: 'large', label: 'Large (1/2")' }
            ], defaultValue: 'medium' }
          ]
        },
        {
          id: 'elec-terminals',
          name: 'Wire Terminals',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 },
            { key: 'type', type: 'radio', label: 'Terminal Type', options: [
              { value: 'ring', label: 'Ring Terminal' },
              { value: 'spade', label: 'Spade Terminal' },
              { value: 'butt', label: 'Butt Connector' }
            ], defaultValue: 'ring' }
          ]
        },
        {
          id: 'elec-conduit',
          name: 'Electrical Conduit',
          fields: [
            { key: 'length', type: 'number', label: 'Length (ft)', placeholder: '0', min: 0, step: 0.1 },
            { key: 'diameter', type: 'toggle', label: 'Diameter', options: [
              { value: '1/2', label: '1/2"' },
              { value: '3/4', label: '3/4"' },
              { value: '1', label: '1"' }
            ], defaultValue: '1/2' }
          ]
        },
        {
          id: 'elec-switch-box',
          name: 'Switch Box',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'elec-hooter',
          name: 'Hooter',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'elec-weather-switch',
          name: 'Weather Switch',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'elec-bell-switch',
          name: 'Bell Switch',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 }
          ]
        }
      ]
    },
    {
      id: 'basic-items',
      title: 'Basic Items',
      icon: 'Package',
      variant: 'default',
      items: [
        {
          id: 'bi-expansion-wall',
          name: 'Expansion Wall',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'bi-asbestos-rope',
          name: 'Asbestos Rope',
          fields: [
            { key: 'quantity', type: 'number', label: 'Quantity', placeholder: '0', min: 0 }
          ]
        },
        {
          id: 'bi-heater',
          name: 'Heater',
          fields: [
            { key: 'length', type: 'number', label: 'Length (ft)', placeholder: '0', min: 0, step: 0.1 }
          ]
        }
      ]
    }
  ];

  // Initialize all categories as expanded for order making view
  useEffect(() => {
    const initialExpanded = {};
    inventoryCategories?.forEach(category => {
      initialExpanded[category.id] = true;
    });
    setExpandedCategories(initialExpanded);
  }, []);

  // Initialize inventory data
  useEffect(() => {
    const savedData = localStorage.getItem('hvac-order-data');
    if (savedData) {
      setInventoryData(JSON.parse(savedData));
    } else {
      // Initialize with empty data structure
      const initialData = {};
      inventoryCategories?.forEach(category => {
        category?.items?.forEach(item => {
          initialData[item.id] = {};
          item?.fields?.forEach(field => {
            initialData[item.id][field.key] = field?.defaultValue || '';
          });
        });
      });
      setInventoryData(initialData);
    }
  }, []);

  // Save data to localStorage whenever inventoryData changes
  useEffect(() => {
    if (Object.keys(inventoryData)?.length > 0) {
      localStorage.setItem('hvac-order-data', JSON.stringify(inventoryData));
    }
  }, [inventoryData]);

  const toggleCategory = useCallback((categoryId) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev?.[categoryId]
    }));
  }, []);

  const handleInventoryChange = useCallback((itemId, newData) => {
    setInventoryData(prev => ({
      ...prev,
      [itemId]: newData
    }));
  }, []);

  const handleInventoryUpdate = useCallback((itemId, data) => {
    setInventoryData(prev => ({
      ...prev,
      [itemId]: data
    }));
  }, []);

  const calculateCategoryStats = (category) => {
    const itemCount = category?.items?.length;
    return { itemCount };
  };

  const calculateOverallStats = () => {
    let totalItems = 0;

    inventoryCategories?.forEach(category => {
      const stats = calculateCategoryStats(category);
      totalItems += stats?.itemCount;
    });

    return { totalItems };
  };

  const filteredCategories = inventoryCategories?.filter(category => {
    if (selectedCategory === 'all') return true;
    return category?.id === selectedCategory;
  });

  const overallStats = calculateOverallStats();

  const handleAddItem = () => {
    navigate('/custom-item-creator');
  };

  const handleGenerateReport = () => {
    navigate('/reports-analytics');
  };

  const handleExportData = () => {
    const dataStr = JSON.stringify(inventoryData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hvac-order-${new Date()?.toISOString()?.split('T')?.[0]}.json`;
    link?.click();
    URL.revokeObjectURL(url);
  };

  const handleSyncData = () => {
    // Mock sync functionality
    console.log('Syncing order data...');
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSortBy('name-asc');
  };

  // Enhanced report generation with emoji formatting
  const generateOrderReport = () => {
    const allItems = [];
    const currentDate = new Date()?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // Collect all items with quantities
    inventoryCategories?.forEach(category => {
      const categoryEmoji = getCategoryEmoji(category?.id);
      category?.items?.forEach(item => {
        const itemData = inventoryData?.[item?.id] || {};
        const quantity = itemData?.quantity || 0;
        const length = itemData?.length || 0;
        const elbowQuantity = itemData?.elbowQuantity || 0;
        const couplingQuantity = itemData?.couplingQuantity || 0;
        const required = itemData?.required || false;

        if (quantity > 0 || length > 0 || elbowQuantity > 0 || couplingQuantity > 0 || required) {
          allItems?.push({
            category: `${categoryEmoji} ${category?.title}`,
            name: item?.name,
            quantity: quantity > 0 ? `${quantity}` : '',
            length: length > 0 ? `${length}` : '',
            elbowQuantity: elbowQuantity > 0 ? `${elbowQuantity}` : '',
            couplingQuantity: couplingQuantity > 0 ? `${couplingQuantity}` : '',
            type: itemData?.type || '',
            unit: itemData?.unit || '',
            cores: itemData?.cores || '',
            thickness: itemData?.thickness || '',
            condition: itemData?.condition || '',
            required: required ? 'Required' : ''
          });
        }
      });
    });

    // Generate comprehensive emoji-formatted report
    const reportHeader = `🏢 HVAC PROJECT ORDER LIST\n\n📅 Generated: ${currentDate}\n\n`;
    
    let reportBody = '📦 COMPLETE ORDER SUMMARY:\n';
    reportBody += '━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n';
    
    allItems?.forEach((item, index) => {
      const quantityText = item?.quantity ? `Qty: ${item?.quantity}` : '';
      const lengthText = item?.length ? `Length: ${item?.length} ${item?.unit || 'ft'}` : '';
      const elbowQuantityText = item?.elbowQuantity ? `Elbow Qty: ${item?.elbowQuantity}` : '';
      const couplingQuantityText = item?.couplingQuantity ? `Coupling Qty: ${item?.couplingQuantity}` : '';
      const typeText = item?.type ? `Type: ${item?.type}` : '';
      const coresText = item?.cores ? `Cores: ${item?.cores}` : '';
      const thicknessText = item?.thickness ? `Thickness: ${item?.thickness}` : '';
      const conditionText = item?.condition ? `Condition: ${item?.condition}` : '';
      const requiredText = item?.required ? `✅ ${item?.required}` : '';
      
      reportBody += `${index + 1}. ${item?.category}\n`;
      reportBody += `   📝 ${item?.name}\n`;
      
      if (quantityText) reportBody += `   🔢 ${quantityText}\n`;
      if (lengthText) reportBody += `   📏 ${lengthText}\n`;
      if (elbowQuantityText) reportBody += `   🔧 ${elbowQuantityText}\n`;
      if (couplingQuantityText) reportBody += `   🔗 ${couplingQuantityText}\n`;
      if (typeText) reportBody += `   ⚙️ ${typeText}\n`;
      if (coresText) reportBody += `   🔌 ${coresText}\n`;
      if (thicknessText) reportBody += `   📐 ${thicknessText}\n`;
      if (conditionText) reportBody += `   🔧 ${conditionText}\n`;
      if (requiredText) reportBody += `   ${requiredText}\n`;
      
      reportBody += '\n';
    });
    
    const reportFooter = `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n🛠️ Generated by Professional Order Manager\n📱 Complete HVAC Project Planning\n💼 Ready for procurement and installation`;
    
    const fullReport = reportHeader + reportBody + reportFooter;
    
    setGeneratedReport({
      content: fullReport,
      items: allItems,
      date: currentDate,
      totalItems: allItems?.length
    });
  };

  const getCategoryEmoji = (categoryId) => {
    const emojiMap = {
      'copper-pipes': '🔧',
      'insulation': '🧊',
      'pipe-fittings': '🔩',
      'flare-nuts': '🔗',
      'wire': '⚡',
      'tools': '🔨',
      'materials': '🧪',
      'electrical': '💡'
    };
    return emojiMap?.[categoryId] || '📦';
  };

  const handleCopyReport = async () => {
    if (!generatedReport) return;
    
    try {
      await navigator.clipboard?.writeText(generatedReport?.content);
      alert('✅ Order report copied to clipboard!');
    } catch (error) {
      alert('❌ Failed to copy report. Please try again.');
    }
  };

  const handleShareReport = () => {
    if (!generatedReport) return;
    
    const encodedReport = encodeURIComponent(generatedReport?.content);
    const whatsappUrl = `https://wa.me/?text=${encodedReport}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar Spacing */}
      <div className="lg:ml-64">
        {/* Header */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="px-4 lg:px-6 py-4">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <div>
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground">
                  Order List Generator
                </h1>
                <p className="text-muted-foreground mt-1">
                  Select items and quantities to generate comprehensive order reports
                </p>
              </div>
              <div className="flex items-center gap-2">
                <QuickActionBar
                  onAddItem={handleAddItem}
                  onGenerateReport={handleGenerateReport}
                  onExportData={handleExportData}
                  onSyncData={handleSyncData}
                />
                <Button
                  onClick={generateOrderReport}
                  className="bg-success hover:bg-success/90"
                  iconName="FileText"
                  iconPosition="left"
                >
                  Generate Report
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-4 lg:px-6 py-6 pb-20 lg:pb-6">
          {/* Summary Cards - Updated for Order Management */}
          {/* Inventory Summary removed as per user request */}

          {/* Report Preview Section removed as per user request */}

          {/* Search and Filter */}
          <SearchAndFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onClearFilters={handleClearFilters}
            className="mb-6"
          />

          {/* All Items Display - Always Expanded for Order Making */}
          <div className="space-y-4">
            {filteredCategories?.map((category) => {
              const stats = calculateCategoryStats(category);
              return (
                <CategoryCard
                  key={category?.id}
                  title={`${getCategoryEmoji(category?.id)} ${category?.title}`}
                  icon={category?.icon}
                  itemCount={stats?.itemCount}
                  variant={category?.variant}
                  isExpanded={true} // Always expanded for order making
                  onToggle={() => {}} // Disabled toggle for order making view
                >
                  <div className="space-y-6">
                    {category?.items?.filter(item => 
                        searchQuery === '' || 
                        item?.name?.toLowerCase()?.includes(searchQuery?.toLowerCase())
                      )?.map((item) => (
                        <div key={item?.id} className="bg-background rounded-lg border border-border p-4 hover:border-primary/20 transition-colors">
                          <h4 className="font-medium text-foreground mb-4 flex items-center gap-2">
                            <Icon name="Package" size={16} className="text-muted-foreground" />
                            {item?.name}
                          </h4>
                          <InventoryItemForm
                            item={item}
                            value={inventoryData?.[item?.id] || {}}
                            onChange={handleInventoryChange}
                            onUpdate={handleInventoryUpdate}
                          />
                        </div>
                      ))}
                  </div>
                </CategoryCard>
              );
            })}
          </div>
        </div>
      </div>
      
      {/* Fixed Generate Report Button */}
      <div className="fixed bottom-20 lg:bottom-6 right-4 lg:right-6 z-20">
        <Button
          onClick={generateOrderReport}
          className="bg-success hover:bg-success/90 shadow-lg"
          size="lg"
          iconName="FileText"
          iconPosition="left"
        >
          Generate Order Report
        </Button>
      </div>
      
      {/* Bottom Navigation */}
      <BottomTabNavigation />
    </div>
  );
};

export default InventoryManagement;