import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ReportGenerationPanel = ({ onGenerateReport, isGenerating }) => {
  const [reportData, setReportData] = useState({
    clientName: '',
    jobSite: '',
    projectDate: '',
    reportType: 'inventory-summary',
    notes: ''
  });

  const reportTypeOptions = [
    { value: 'inventory-summary', label: '📋 Inventory Summary' },
    { value: 'usage-report', label: '📊 Usage Report' },
    { value: 'project-materials', label: '🔧 Project Materials' },
    { value: 'cost-analysis', label: '💰 Cost Analysis' },
    { value: 'maintenance-log', label: '⚙️ Maintenance Log' }
  ];

  const handleInputChange = (field, value) => {
    setReportData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    onGenerateReport(reportData);
  };

  const isFormValid = reportData?.clientName && reportData?.jobSite && reportData?.projectDate;

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
          <Icon name="FileText" size={20} className="text-primary" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-foreground">Generate Report</h2>
          <p className="text-sm text-muted-foreground">Create professional documentation for clients</p>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            label="Client Name"
            type="text"
            placeholder="Enter client name"
            value={reportData?.clientName}
            onChange={(e) => handleInputChange('clientName', e?.target?.value)}
            required
          />
          
          <Input
            label="Job Site Location"
            type="text"
            placeholder="Enter job site address"
            value={reportData?.jobSite}
            onChange={(e) => handleInputChange('jobSite', e?.target?.value)}
            required
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <Input
            label="Project Date"
            type="date"
            value={reportData?.projectDate}
            onChange={(e) => handleInputChange('projectDate', e?.target?.value)}
            required
          />
          
          <Select
            label="Report Type"
            options={reportTypeOptions}
            value={reportData?.reportType}
            onChange={(value) => handleInputChange('reportType', value)}
            placeholder="Select report type"
          />
        </div>

        <Input
          label="Additional Notes"
          type="text"
          placeholder="Add any special notes or requirements"
          value={reportData?.notes}
          onChange={(e) => handleInputChange('notes', e?.target?.value)}
          description="Optional notes to include in the report"
        />

        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button
            type="submit"
            variant="default"
            loading={isGenerating}
            disabled={!isFormValid}
            iconName="FileText"
            iconPosition="left"
            className="flex-1 sm:flex-none"
          >
            {isGenerating ? 'Generating...' : 'Generate Report'}
          </Button>
          
          <Button
            type="button"
            variant="outline"
            iconName="Save"
            iconPosition="left"
            disabled={!isFormValid}
          >
            Save Template
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ReportGenerationPanel;