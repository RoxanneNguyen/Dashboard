
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
}

export const StatsCard = ({ title, value, change, changeType = 'neutral', icon: Icon }: StatsCardProps) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-2">{title}</p>
          <p className="text-3xl font-bold text-[#343541]">{value}</p>
          {change && (
            <p className={`text-sm font-medium mt-2 ${getChangeColor()}`}>
              {change}
            </p>
          )}
        </div>
        <div className="bg-[#007852]/10 p-3 rounded-lg">
          <Icon className="w-6 h-6 text-[#007852]" />
        </div>
      </div>
    </div>
  );
};
