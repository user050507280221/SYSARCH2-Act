interface StatusBadgeProps {
  status: 'paid' | 'overdue' | 'pending' | 'occupied' | 'vacant' | 'active' | 'completed';
  children: React.ReactNode;
}

export function StatusBadge({ status, children }: StatusBadgeProps) {
  const styles = {
    paid: 'bg-green-100 text-green-700 border border-green-200',
    overdue: 'bg-red-100 text-red-700 border border-red-200',
    pending: 'bg-yellow-100 text-yellow-700 border border-yellow-200',
    occupied: 'bg-blue-100 text-blue-700 border border-blue-200',
    vacant: 'bg-gray-100 text-gray-700 border border-gray-200',
    active: 'bg-blue-100 text-blue-700 border border-blue-200',
    completed: 'bg-green-100 text-green-700 border border-green-200',
  };

  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${styles[status]}`}>
      {children}
    </span>
  );
}