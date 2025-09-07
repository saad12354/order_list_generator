import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ReportPreview = ({ reportData, onExport, onPrint, onShare }) => {
  const currentDate = new Date()?.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Enhanced emoji-based inventory items with better categorization
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
    const reportHeader = `🏢 HVAC INVENTORY REPORT\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    const projectDetails = `📋 PROJECT DETAILS:\n• 👤 Client: ${reportData?.clientName || 'Professional HVAC Service'}\n• 📍 Location: ${reportData?.jobSite || 'Service Location'}\n• 📅 Date: ${reportData?.projectDate || currentDate}\n• 👨‍🔧 Technician: John Smith\n\n`;
    
    let inventorySection = `📦 INVENTORY SUMMARY:\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    
    mockInventoryItems?.forEach((item, index) => {
      inventorySection += `${index + 1}. ${item?.category}\n`;
      inventorySection += `   📝 ${item?.item}\n`;
      inventorySection += `   🔢 Quantity: ${item?.quantity}\n\n`;
    });

    const notesSection = reportData?.notes ? `📝 ADDITIONAL NOTES:\n${reportData?.notes}\n\n` : '';
    
    const footerSection = ``;
    
    return reportHeader + projectDetails + inventorySection + notesSection + footerSection;
  };

  const handleEnhancedCopy = async () => {
    const enhancedReport = generateEnhancedReport();
    try {
      await navigator.clipboard?.writeText(enhancedReport);
      alert('✅ Enhanced report copied to clipboard with emoji formatting!');
    } catch (error) {
      alert('❌ Failed to copy report. Please try again.');
    }
  };

  const handleEnhancedShare = () => {
    const enhancedReport = generateEnhancedReport();
    const encodedReport = encodeURIComponent(enhancedReport);
    const whatsappUrl = `https://wa.me/?text=${encodedReport}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!reportData) {
    return (
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="text-center py-12">
          <Icon name="FileText" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No Report Generated</h3>
          <p className="text-muted-foreground">Fill in the report details and click generate to preview</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-card border border-border rounded-lg overflow-hidden">
      <div className="bg-primary/5 border-b border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-lg">
              <Icon name="Eye" size={20} className="text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-foreground">📋 Report Preview</h2>
              <p className="text-sm text-muted-foreground">Professional format with emoji indicators</p>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="sm"
              iconName="Copy"
              iconPosition="left"
              onClick={handleEnhancedCopy}
              className="hover:bg-blue-50"
            >
              Copy
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Share"
              iconPosition="left"
              onClick={handleEnhancedShare}
              className="bg-green-500 hover:bg-green-600 text-white border-green-500"
            >
              Share
            </Button>
            <Button
              variant="outline"
              size="sm"
              iconName="Printer"
              iconPosition="left"
              onClick={onPrint}
            >
              Print
            </Button>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="bg-background border border-border rounded-lg p-6 font-mono text-sm">
          {/* Enhanced Header with Emojis */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold text-foreground mb-2">🏢 HVAC INVENTORY REPORT</h1>
            <div className="text-muted-foreground">
              <p>📅 Generated on: {currentDate}</p>
              <p>📊 Report Type: {reportData?.reportType?.replace('-', ' ')?.toUpperCase()}</p>
            </div>
          </div>

          {/* Enhanced Project Details */}
          <div className="border-t border-border pt-4 mb-6">
            <h2 className="font-semibold text-foreground mb-3">📋 PROJECT DETAILS</h2>
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">👤 Client:</span> 
                <span className="font-medium">{reportData?.clientName}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">📍 Location:</span> 
                <span className="font-medium">{reportData?.jobSite}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">📅 Date:</span> 
                <span className="font-medium">{reportData?.projectDate}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">👨‍🔧 Technician:</span> 
                <span className="font-medium">John Smith</span>
              </div>
            </div>
          </div>

          {/* Enhanced Inventory Summary with Emojis */}
          <div className="border-t border-border pt-4 mb-6">
            <h2 className="font-semibold text-foreground mb-3">📦 INVENTORY SUMMARY</h2>
            <div className="space-y-3">
              {mockInventoryItems?.map((item, index) => (
                <div key={index} className="bg-gray-50 rounded p-3">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="font-medium text-foreground mb-1">
                        {item?.category}
                      </div>
                      <div className="text-sm text-muted-foreground ml-4">
                        📝 {item?.item}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-medium mb-1">🔢 {item?.quantity}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Enhanced Notes Section */}
          {reportData?.notes && (
            <div className="border-t border-border pt-4 mb-6">
              <h2 className="font-semibold text-foreground mb-3">📝 ADDITIONAL NOTES</h2>
              <div className="bg-gray-50 rounded p-3">
                <p className="text-muted-foreground">{reportData?.notes}</p>
              </div>
            </div>
          )}


        </div>
      </div>
    </div>
  );
};

export default ReportPreview;