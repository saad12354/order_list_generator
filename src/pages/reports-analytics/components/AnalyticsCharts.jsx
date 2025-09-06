import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';
import Select from '../../../components/ui/Select';

const AnalyticsCharts = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30-days');
  const [selectedChart, setSelectedChart] = useState('usage-trends');

  const periodOptions = [
    { value: '7-days', label: 'Last 7 Days' },
    { value: '30-days', label: 'Last 30 Days' },
    { value: '90-days', label: 'Last 3 Months' },
    { value: '1-year', label: 'Last Year' }
  ];

  const chartOptions = [
    { value: 'usage-trends', label: '📊 Usage Trends' },
    { value: 'cost-analysis', label: '💰 Cost Analysis' },
    { value: 'category-distribution', label: '🥧 Category Distribution' }
  ];

  const usageData = [
    { name: 'Week 1', copperPipes: 45, insulation: 32, fittings: 28, wires: 15 },
    { name: 'Week 2', copperPipes: 52, insulation: 28, fittings: 35, wires: 22 },
    { name: 'Week 3', copperPipes: 38, insulation: 45, fittings: 42, wires: 18 },
    { name: 'Week 4', copperPipes: 61, insulation: 38, fittings: 31, wires: 25 }
  ];

  const costData = [
    { name: 'Jan', cost: 2400 },
    { name: 'Feb', cost: 1800 },
    { name: 'Mar', cost: 3200 },
    { name: 'Apr', cost: 2800 },
    { name: 'May', cost: 3600 },
    { name: 'Jun', cost: 2900 }
  ];

  const categoryData = [
    { name: 'Copper Pipes', value: 35, color: '#1E3A8A' },
    { name: 'Insulation', value: 25, color: '#059669' },
    { name: 'Fittings', value: 20, color: '#F59E0B' },
    { name: 'Wires', value: 12, color: '#DC2626' },
    { name: 'Tools', value: 8, color: '#7C3AED' }
  ];

  const renderChart = () => {
    switch (selectedChart) {
      case 'usage-trends':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={usageData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }} 
              />
              <Bar dataKey="copperPipes" fill="#1E3A8A" name="Copper Pipes" />
              <Bar dataKey="insulation" fill="#059669" name="Insulation" />
              <Bar dataKey="fittings" fill="#F59E0B" name="Fittings" />
              <Bar dataKey="wires" fill="#DC2626" name="Wires" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case 'cost-analysis':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={costData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
              <XAxis dataKey="name" stroke="#64748B" />
              <YAxis stroke="#64748B" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`$${value}`, 'Cost']}
              />
              <Line 
                type="monotone" 
                dataKey="cost" 
                stroke="#1E3A8A" 
                strokeWidth={3}
                dot={{ fill: '#1E3A8A', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
      
      case 'category-distribution':
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100)?.toFixed(0)}%`}
              >
                {categoryData?.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry?.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#FFFFFF', 
                  border: '1px solid #E2E8F0',
                  borderRadius: '8px'
                }}
                formatter={(value) => [`${value}%`, 'Usage']}
              />
            </PieChart>
          </ResponsiveContainer>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 space-y-4 lg:space-y-0">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-lg">
            <Icon name="TrendingUp" size={20} className="text-accent" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-foreground">Analytics Dashboard</h2>
            <p className="text-sm text-muted-foreground">Inventory usage patterns and trends</p>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <Select
            options={chartOptions}
            value={selectedChart}
            onChange={setSelectedChart}
            placeholder="Select chart type"
            className="w-full sm:w-48"
          />
          <Select
            options={periodOptions}
            value={selectedPeriod}
            onChange={setSelectedPeriod}
            placeholder="Select period"
            className="w-full sm:w-40"
          />
        </div>
      </div>

      <div className="bg-background border border-border rounded-lg p-4">
        {renderChart()}
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <Icon name="Package" size={24} className="text-primary mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">1,247</p>
          <p className="text-sm text-muted-foreground">Total Items</p>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <Icon name="TrendingUp" size={24} className="text-success mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">+12%</p>
          <p className="text-sm text-muted-foreground">Usage Growth</p>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <Icon name="DollarSign" size={24} className="text-accent mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">$15,420</p>
          <p className="text-sm text-muted-foreground">Total Value</p>
        </div>
        
        <div className="bg-muted/30 rounded-lg p-4 text-center">
          <Icon name="AlertTriangle" size={24} className="text-warning mx-auto mb-2" />
          <p className="text-2xl font-bold text-foreground">7</p>
          <p className="text-sm text-muted-foreground">Low Stock</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsCharts;