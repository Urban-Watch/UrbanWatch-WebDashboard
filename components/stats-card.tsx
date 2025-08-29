// components/stats-card.tsx
interface StatsCardProps {
  totalReports: number;
  highPriorityCount: number;
  mediumPriorityCount: number;
  lowPriorityCount: number;
  loading?: boolean;
}

export function StatsCard({ 
  totalReports, 
  highPriorityCount, 
  mediumPriorityCount, 
  lowPriorityCount,
  loading = false
}: StatsCardProps) {
  if (loading) {
    return (
      <div className="p-4 bg-white">
        <div className="mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-lg">Total Active Reports</h3>
            <div className="w-12 h-8 bg-gray-300 rounded animate-pulse"></div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-gray-300 rounded-lg animate-pulse mb-2"></div>
              <div className="w-12 h-3 bg-gray-300 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white">
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-semibold text-lg">Total Active Reports</h3>
          <div className="text-3xl font-bold">{totalReports}</div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-red-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl mb-2">
            {highPriorityCount}
          </div>
          <div className="text-xs text-red-500 font-medium text-center">
            High Priority
          </div>
        </div>
        
        <div className="text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-yellow-400 rounded-lg flex items-center justify-center text-white font-bold text-2xl mb-2">
            {mediumPriorityCount}
          </div>
          <div className="text-xs text-yellow-500 font-medium text-center">
            Medium Priority
          </div>
        </div>
        
        <div className="text-center flex flex-col items-center">
          <div className="w-16 h-16 bg-green-500 rounded-lg flex items-center justify-center text-white font-bold text-2xl mb-2">
            {lowPriorityCount}
          </div>
          <div className="text-xs text-green-500 font-medium text-center">
            Low Priority
          </div>
        </div>
      </div>
    </div>
  );
}