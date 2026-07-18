import { CreditCard, Calendar, User, Upload, FileText, Download, CheckCircle, AlertCircle, Clock } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';

interface PaymentRecord {
  id: string;
  tenantName: string;
  room: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'paid' | 'pending' | 'overdue';
  paymentMethod?: string;
  receiptUrl?: string;
}

interface ContractFile {
  id: string;
  tenantName: string;
  room: string;
  fileName: string;
  uploadDate: string;
  contractPeriod: string;
}

export function TrackPayments() {
  const [payments] = useState<PaymentRecord[]>([
    {
      id: '1',
      tenantName: 'Angel',
      room: 'Room 302',
      amount: 5500,
      dueDate: '2026-05-01',
      paidDate: '2026-05-01',
      status: 'paid',
      paymentMethod: 'Bank Transfer',
      receiptUrl: '#',
    },
    {
      id: '2',
      tenantName: 'James Ayunting',
      room: 'Room 301',
      amount: 5500,
      dueDate: '2026-05-01',
      paidDate: '2026-04-30',
      status: 'paid',
      paymentMethod: 'GCash',
      receiptUrl: '#',
    },
    {
      id: '3',
      tenantName: 'Maria Santos',
      room: 'Room 212',
      amount: 5000,
      dueDate: '2026-05-01',
      status: 'pending',
    },
    {
      id: '4',
      tenantName: 'Carlos Reyes',
      room: 'Room 518',
      amount: 6000,
      dueDate: '2026-04-25',
      status: 'overdue',
    },
    {
      id: '5',
      tenantName: 'Isabella Cruz',
      room: 'Room 103',
      amount: 4500,
      dueDate: '2026-05-05',
      status: 'pending',
    },
    {
      id: '6',
      tenantName: 'Denver Paul',
      room: 'Room 405',
      amount: 5500,
      dueDate: '2026-05-01',
      paidDate: '2026-05-02',
      status: 'paid',
      paymentMethod: 'Cash',
      receiptUrl: '#',
    },
  ]);

  const [contracts, setContracts] = useState<ContractFile[]>([
    {
      id: '1',
      tenantName: 'Angel',
      room: 'Room 302',
      fileName: 'Contract_Angel_Room302.pdf',
      uploadDate: '2025-08-15',
      contractPeriod: 'Aug 2025 - May 2026',
    },
    {
      id: '2',
      tenantName: 'James Ayunting',
      room: 'Room 301',
      fileName: 'Contract_James_Room301.pdf',
      uploadDate: '2025-08-15',
      contractPeriod: 'Aug 2025 - May 2026',
    },
  ]);

  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    tenantName: '',
    room: '',
    contractPeriod: '',
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleUploadContract = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedFile && uploadForm.tenantName && uploadForm.room) {
      const newContract: ContractFile = {
        id: String(contracts.length + 1),
        tenantName: uploadForm.tenantName,
        room: uploadForm.room,
        fileName: selectedFile.name,
        uploadDate: new Date().toISOString().split('T')[0],
        contractPeriod: uploadForm.contractPeriod,
      };
      setContracts([...contracts, newContract]);
      toast.success('Contract uploaded successfully!');
      setIsUploadDialogOpen(false);
      setUploadForm({ tenantName: '', room: '', contractPeriod: '' });
      setSelectedFile(null);
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'paid':
        return { color: 'bg-success/10 text-success border-success/20', icon: CheckCircle, label: 'Paid' };
      case 'pending':
        return { color: 'bg-warning/10 text-warning border-warning/20', icon: Clock, label: 'Pending' };
      case 'overdue':
        return { color: 'bg-danger/10 text-danger border-danger/20', icon: AlertCircle, label: 'Overdue' };
      default:
        return { color: 'bg-gray-100 text-gray-700 border-gray-200', icon: Clock, label: status };
    }
  };

  const paidPayments = payments.filter(p => p.status === 'paid');
  const pendingPayments = payments.filter(p => p.status === 'pending');
  const overduePayments = payments.filter(p => p.status === 'overdue');

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      <div className="p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <h2 className="text-2xl lg:text-3xl mb-2">Track Payments & Contracts</h2>
          <p className="text-sm lg:text-base text-muted-foreground">
            Monitor payment status and manage tenant contracts
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Paid</p>
                <p className="text-2xl lg:text-3xl font-medium text-success">{paidPayments.length}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  ₱{paidPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                </p>
              </div>
              <CheckCircle className="w-10 h-10 lg:w-12 lg:h-12 text-success" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Pending</p>
                <p className="text-2xl lg:text-3xl font-medium text-warning">{pendingPayments.length}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  ₱{pendingPayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                </p>
              </div>
              <Clock className="w-10 h-10 lg:w-12 lg:h-12 text-warning" />
            </div>
          </div>
          <div className="bg-white rounded-xl p-4 lg:p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Overdue</p>
                <p className="text-2xl lg:text-3xl font-medium text-danger">{overduePayments.length}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  ₱{overduePayments.reduce((sum, p) => sum + p.amount, 0).toLocaleString()}
                </p>
              </div>
              <AlertCircle className="w-10 h-10 lg:w-12 lg:h-12 text-danger" />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Payment Tracking */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-4 lg:px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg lg:text-xl">Payment Status</h3>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      Tenant
                    </th>
                    <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs uppercase tracking-wider text-muted-foreground">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {payments.map((payment) => {
                    const statusConfig = getStatusConfig(payment.status);
                    const StatusIcon = statusConfig.icon;
                    return (
                      <tr key={payment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="font-medium">{payment.tenantName}</div>
                            <div className="text-sm text-muted-foreground">{payment.room}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium">₱{payment.amount.toLocaleString()}</div>
                          <div className="text-sm text-muted-foreground">
                            Due: {new Date(payment.dueDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border inline-flex items-center gap-1 ${statusConfig.color}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusConfig.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="lg:hidden divide-y divide-gray-200">
              {payments.map((payment) => {
                const statusConfig = getStatusConfig(payment.status);
                const StatusIcon = statusConfig.icon;
                return (
                  <div key={payment.id} className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{payment.tenantName}</h4>
                        <p className="text-sm text-muted-foreground">{payment.room}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border inline-flex items-center gap-1 ${statusConfig.color}`}>
                        <StatusIcon className="w-3 h-3" />
                        {statusConfig.label}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">₱{payment.amount.toLocaleString()}</span>
                      <span className="text-muted-foreground">
                        Due: {new Date(payment.dueDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contract Management */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-4 lg:px-6 py-4 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg lg:text-xl">Contracts</h3>
              <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
                <DialogTrigger asChild>
                  <button className="px-4 py-2 bg-primary text-white rounded-xl hover:bg-primary/90 transition-all text-sm flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Upload
                  </button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Upload Contract</DialogTitle>
                  </DialogHeader>
                  <form onSubmit={handleUploadContract} className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm mb-2">Tenant Name</label>
                      <input
                        type="text"
                        value={uploadForm.tenantName}
                        onChange={(e) => setUploadForm({ ...uploadForm, tenantName: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                        placeholder="Enter tenant name"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Room Number</label>
                      <input
                        type="text"
                        value={uploadForm.room}
                        onChange={(e) => setUploadForm({ ...uploadForm, room: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                        placeholder="e.g., Room 302"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Contract Period</label>
                      <input
                        type="text"
                        value={uploadForm.contractPeriod}
                        onChange={(e) => setUploadForm({ ...uploadForm, contractPeriod: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary bg-white"
                        placeholder="e.g., Aug 2025 - May 2026"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2">Contract File (PDF)</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary transition-colors">
                        <input
                          type="file"
                          id="contract-file"
                          onChange={handleFileChange}
                          accept=".pdf"
                          className="hidden"
                          required
                        />
                        <label htmlFor="contract-file" className="cursor-pointer">
                          <Upload className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                          {selectedFile ? (
                            <div>
                              <p className="text-sm font-medium">{selectedFile.name}</p>
                              <p className="text-xs text-muted-foreground mt-1">Click to change</p>
                            </div>
                          ) : (
                            <div>
                              <p className="text-sm font-medium">Click to upload</p>
                              <p className="text-xs text-muted-foreground mt-1">PDF only, max 10MB</p>
                            </div>
                          )}
                        </label>
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button
                        type="submit"
                        className="flex-1 bg-primary text-white py-2.5 rounded-xl hover:bg-primary/90 transition-all"
                      >
                        Upload Contract
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsUploadDialogOpen(false)}
                        className="flex-1 bg-gray-100 text-gray-700 py-2.5 rounded-xl hover:bg-gray-200 transition-all"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </DialogContent>
              </Dialog>
            </div>

            <div className="p-4 lg:p-6 space-y-3 max-h-[500px] overflow-y-auto">
              {contracts.map((contract) => (
                <div
                  key={contract.id}
                  className="border border-gray-200 rounded-xl p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <FileText className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">{contract.tenantName}</h4>
                      <p className="text-sm text-muted-foreground">{contract.room}</p>
                      <p className="text-sm text-muted-foreground mt-1">{contract.contractPeriod}</p>
                      <p className="text-xs text-muted-foreground mt-2">
                        Uploaded: {new Date(contract.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                    <button className="text-primary hover:text-primary/80 transition-colors">
                      <Download className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
              {contracts.length === 0 && (
                <p className="text-center py-8 text-muted-foreground">No contracts uploaded</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
