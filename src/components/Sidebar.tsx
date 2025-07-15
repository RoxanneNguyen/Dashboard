import { useState, useContext } from 'react';
import { BarChart3, Users, Calendar, Settings, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageContext } from '@/context/LanguageContext';

interface SidebarItem {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  active?: boolean;
}

const getSidebarItems = (t: any): SidebarItem[] => [
  { icon: BarChart3, label: t.overview, active: true },
  { icon: Users, label: t.employees },
  { icon: Calendar, label: t.reports },
  { icon: Settings, label: t.settings },
];

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const translations = {
  vi: {
    dashboard: 'Bảng điều khiển',
    overview: 'Tổng quan',
    employees: 'Nhân viên',
    reports: 'Báo cáo hàng tuần',
    settings: 'Cài đặt',
    logout: 'Đăng xuất',
  },
  'zh-tw': {
    dashboard: '儀表板',
    overview: '總覽',
    employees: '員工',
    reports: '每週報告',
    settings: '設定',
    logout: '登出',
  }
};

export const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const [activeItem, setActiveItem] = useState(t.overview);
  const sidebarItems = getSidebarItems(t);

  return (
    <div className={cn(
      "bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
      <div className="p-6 border-b border-gray-200 flex items-center justify-between">
        {!isCollapsed && (
          <h2 className="text-xl font-semibold text-[#343541]">{t.dashboard}</h2>
        )}
        <button
          onClick={onToggle}
          className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
        >
          {isCollapsed ? (
            <ChevronRight className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          )}
        </button>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.label;
            return (
              <li key={item.label}>
                <button
                  onClick={() => setActiveItem(item.label)}
                  className={cn(
                    "w-full flex items-center rounded-lg text-sm font-medium transition-colors",
                    isActive 
                      ? "bg-[#007852] text-white" 
                      : "text-[#343541] hover:bg-gray-50",
                    isCollapsed 
                      ? "justify-center px-2 py-3" 
                      : "space-x-3 px-4 py-3"
                  )}
                  title={isCollapsed ? item.label : undefined}
                >
                  <Icon className="w-5 h-5" />
                  {!isCollapsed && <span>{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
