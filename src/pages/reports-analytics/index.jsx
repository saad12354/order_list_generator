import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import BottomTabNavigation from '../../components/ui/BottomTabNavigation';
import ReportGenerationPanel from './components/ReportGenerationPanel';
import InventorySummaryCard from './components/InventorySummaryCard';
import ReportPreview from './components/ReportPreview';
import AnalyticsCharts from './components/AnalyticsCharts';
import FilterControls from './components/FilterControls';

const ReportsAnalytics = () => {
  const [generatedReport, setGeneratedReport] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [appliedFilters, setAppliedFilters] = useState(null);

  // Enhanced emoji-based inventory items matching the user's example
  const mockInventoryItems = [
    { category: '🔧 Copper Pipes', item: '1/4" Soft Copper Pipe', quantity: '25 ft' },
    { category: '🔧 Copper Pipes', item: '3/8" Hard Copper Pipe', quantity: '50 ft' },
    { category: '🧊 Insulation', item: '1/4" x 9mm Insulation', quantity: '100 ft' },
    { category: '🔩 Pipe Fittings', item: '1/4" Elbow Fitting', quantity: '15 pcs' },
    { category: '🔗 Flare Nuts', item: '3/8" Flare Nut', quantity: '8 pcs' },
    { category: '⚡ Electrical Wires', item: '2.5 sq mm - 4 Core Wire', quantity: '200 ft' },
    { category: '🔨 Tools', item: 'Flaring Tool Set', quantity: '1 set' },
    { category: '🧪 Materials', item: 'Brazing Rods', quantity: '10 pcs' }
  ];

  // Enhanced report generation with emoji formatting
  const generateEnhancedReport = () => {
    const currentDate = new Date()?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const reportHeader = `🏢 HVAC INVENTORY REPORT\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    const projectDetails = `📋 PROJECT DETAILS:\n• 👤 Client: ${generatedReport?.clientName || 'Professional HVAC Service'}\n• 📍 Location: ${generatedReport?.jobSite || 'Service Location'}\n• 📅 Date: ${generatedReport?.projectDate || currentDate}\n• 👨‍🔧 Prepared by: John Smith\n\n`;

    let inventorySection = `📦 INVENTORY SUMMARY:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;

    // Explicitly build inventory section ignoring any status or emoji fields
    mockInventoryItems?.forEach((item, index) => {
      inventorySection += `${index + 1}. ${item.category}\n`;
      inventorySection += `   📝 ${item.item}\n`;
      inventorySection += `   🔢 Quantity: ${item.quantity}\n\n`;
    });

    const notesSection = generatedReport?.notes ? `📝 ADDITIONAL NOTES:\n${generatedReport.notes}\n\n` : '';

    const footerSection = ``;

    return reportHeader + projectDetails + inventorySection + notesSection + footerSection;
  };

  const handleGenerateReport = async (reportData) => {
    setIsGenerating(true);
    
    // Simulate report generation
    setTimeout(() => {
      setGeneratedReport(reportData);
      setIsGenerating(false);
    }, 2000);
  };

  const handleExportReport = () => {
    if (!generatedReport) return;

    const reportText = generateEnhancedReport();

    alert("DEBUG: Report text to copy:\n\n" + reportText);

    navigator.clipboard?.writeText(reportText)?.then(() => {
      alert('✅ Enhanced report copied to clipboard with emoji formatting!');
    })?.catch(() => {
      alert('❌ Failed to copy report. Please try again.');
    });
  };

  const handlePrintReport = () => {
    window.print();
  };

  const handleShareReport = () => {
    if (!generatedReport) return;

    const reportText = generateEnhancedReport();
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(reportText)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleApplyFilters = (filters) => {
    setAppliedFilters(filters);
    // In a real app, this would trigger data refetch with filters
    console.log('Applied filters:', filters);
  };

  const handleResetFilters = () => {
    setAppliedFilters(null);
    // In a real app, this would reset data to unfiltered state
    console.log('Filters reset');
  };

  return (
    <>
      <Helmet>
        <title>Reports & Analytics - HVAC Inventory Manager</title>
        <meta name="description" content="Generate professional HVAC inventory reports and analyze usage patterns for client communication and project tracking." />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Desktop Layout */}
        <div className="lg:ml-64">
          <div className="container mx-auto px-4 py-6 lg:py-8 pb-20 lg:pb-8">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">
                Reports & Analytics
              </h1>
              <p className="text-muted-foreground">
                Generate professional documentation and analyze inventory usage patterns
              </p>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Left Column - Report Generation & Filters */}
              <div className="xl:col-span-1 space-y-6">
                <ReportGenerationPanel 
                  onGenerateReport={handleGenerateReport}
                  isGenerating={isGenerating}
                />
                
                <FilterControls 
                  onApplyFilters={handleApplyFilters}
                  onResetFilters={handleResetFilters}
                />
              </div>

              {/* Right Column - Preview & Analytics */}
              <div className="xl:col-span-2 space-y-6">
                <ReportPreview 
                  reportData={generatedReport}
                  onExport={handleExportReport}
                  onPrint={handlePrintReport}
                  onShare={handleShareReport}
                />
                
                <InventorySummaryCard inventoryData={appliedFilters} />
                
                <AnalyticsCharts />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <BottomTabNavigation />
      </div>
    </>
  );
};

export default ReportsAnalytics;