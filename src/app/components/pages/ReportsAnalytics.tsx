import { Printer, Download, FileText, Building2, CreditCard, Users, Wrench } from 'lucide-react';
import { toast } from 'sonner';

interface Report {
  id: string;
  title: string;
  description: string;
  icon: typeof FileText;
  color: string;
  category: 'occupancy' | 'payments' | 'tenants' | 'maintenance';
}

export function ReportsAnalytics() {
  const reports: Report[] = [
    {
      id: 'occupancy-monthly',
      title: 'Monthly Occupancy Report',
      description: 'Detailed occupancy statistics, vacancy rates, and room turnover for the current month',
      icon: Building2,
      color: 'bg-primary',
      category: 'occupancy',
    },
    {
      id: 'occupancy-quarterly',
      title: 'Quarterly Occupancy Report',
      description: 'Comprehensive occupancy analysis for Q1 2026 with trends and forecasts',
      icon: Building2,
      color: 'bg-primary',
      category: 'occupancy',
    },
    {
      id: 'payments-monthly',
      title: 'Monthly Payment Report',
      description: 'Payment collection summary, outstanding balances, and revenue breakdown',
      icon: CreditCard,
      color: 'bg-success',
      category: 'payments',
    },
    {
      id: 'payments-overdue',
      title: 'Overdue Payments Report',
      description: 'List of all overdue payments with tenant details and amounts',
      icon: CreditCard,
      color: 'bg-danger',
      category: 'payments',
    },
    {
      id: 'tenants-directory',
      title: 'Tenant Directory',
      description: 'Complete list of all current tenants with contact information and room assignments',
      icon: Users,
      color: 'bg-accent',
      category: 'tenants',
    },
    {
      id: 'tenants-expiring',
      title: 'Expiring Contracts Report',
      description: 'Tenants with contracts expiring within the next 30 days',
      icon: Users,
      color: 'bg-warning',
      category: 'tenants',
    },
    {
      id: 'maintenance-summary',
      title: 'Maintenance Summary Report',
      description: 'Overview of all maintenance requests, completion rates, and pending tasks',
      icon: Wrench,
      color: 'bg-secondary',
      category: 'maintenance',
    },
    {
      id: 'maintenance-costs',
      title: 'Maintenance Cost Report',
      description: 'Breakdown of maintenance expenses by category and room',
      icon: Wrench,
      color: 'bg-secondary',
      category: 'maintenance',
    },
  ];

  const handlePrint = (reportId: string, reportTitle: string) => {
    toast.success(`Preparing to print: ${reportTitle}`);
    setTimeout(() => {
      console.log(`Printing report: ${reportId}`);
    }, 500);
  };

  const handleExport = (reportId: string, reportTitle: string) => {
    toast.success(`Exporting: ${reportTitle} to PDF`);
    setTimeout(() => {
      console.log(`Exporting report: ${reportId}`);
    }, 500);
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'occupancy': return 'Occupancy Reports';
      case 'payments': return 'Payment Reports';
      case 'tenants': return 'Tenant Reports';
      case 'maintenance': return 'Maintenance Reports';
      default: return category;
    }
  };

  const groupedReports = reports.reduce((acc, report) => {
    if (!acc[report.category]) acc[report.category] = [];
    acc[report.category].push(report);
    return acc;
  }, {} as Record<string, Report[]>);

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl mb-2">Reports & Analytics</h2>
          <p className="text-sm lg:text-base text-muted-foreground">
            Generate and export comprehensive reports for property management
          </p>
        </div>

        {/* Desktop Layout - Multi-column Grid */}
        <div className="hidden lg:block">
          <div className="grid grid-cols-2 gap-6">
            {Object.entries(groupedReports).map(([category, categoryReports]) => (
              <div key={category} className="bg-white rounded-xl border border-gray-200 shadow-sm">
                <div className="px-6 py-4 border-b border-gray-200">
                  <h3 className="text-lg lg:text-xl">{getCategoryName(category)}</h3>
                </div>
                <div className="p-6 space-y-4">
                  {categoryReports.map((report) => {
                    const Icon = report.icon;
                    return (
                      <div
                        key={report.id}
                        className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all"
                      >
                        <div className="flex items-start gap-3 mb-3">
                          <div className={`w-12 h-12 ${report.color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                            <Icon className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium mb-1">{report.title}</h4>
                            <p className="text-sm text-muted-foreground">{report.description}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button
                            onClick={() => handlePrint(report.id, report.title)}
                            className="flex-1 px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-sm"
                          >
                            <Printer className="w-4 h-4" />
                            Print
                          </button>
                          <button
                            onClick={() => handleExport(report.id, report.title)}
                            className="flex-1 px-4 py-2 bg-white text-primary border-2 border-primary rounded-xl hover:bg-primary/5 transition-all flex items-center justify-center gap-2 text-sm"
                          >
                            <Download className="w-4 h-4" />
                            Export PDF
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile Layout - Stacked */}
        <div className="lg:hidden space-y-6">
          {Object.entries(groupedReports).map(([category, categoryReports]) => (
            <div key={category} className="bg-white rounded-xl border border-gray-200 shadow-sm">
              <div className="px-4 py-3 border-b border-gray-200">
                <h3 className="text-lg">{getCategoryName(category)}</h3>
              </div>
              <div className="p-4 space-y-3">
                {categoryReports.map((report) => {
                  const Icon = report.icon;
                  return (
                    <div
                      key={report.id}
                      className="border border-gray-200 rounded-xl p-4"
                    >
                      <div className="flex items-start gap-3 mb-3">
                        <div className={`w-10 h-10 ${report.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1 text-sm">{report.title}</h4>
                          <p className="text-xs text-muted-foreground">{report.description}</p>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <button
                          onClick={() => handlePrint(report.id, report.title)}
                          className="w-full px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2 text-sm"
                        >
                          <Printer className="w-4 h-4" />
                          Print
                        </button>
                        <button
                          onClick={() => handleExport(report.id, report.title)}
                          className="w-full px-4 py-2 bg-white text-primary border-2 border-primary rounded-xl hover:bg-primary/5 transition-all flex items-center justify-center gap-2 text-sm"
                        >
                          <Download className="w-4 h-4" />
                          Export PDF
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
