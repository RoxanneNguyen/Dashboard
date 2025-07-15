import { useState, useContext } from 'react';
import { Sidebar } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { StatsCard } from '@/components/StatsCard';
import { EmployeeTable } from '@/components/EmployeeTable';
import { Charts } from '@/components/Charts';
import { Users, UserCheck, MessageCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { LanguageProvider, LanguageContext } from '@/context/LanguageContext';

const translations = {
  vi: {
    adminPanel: 'Bảng Quản Trị',
    welcome: 'Chào mừng bạn trở lại!',
    last7: '7 ngày qua',
    last14: '14 ngày qua',
    last30: '30 ngày qua',
    notifications: 'Thông báo',
    newEmployee: 'Nhân viên mới đã đăng ký',
    performanceReport: 'Báo cáo hiệu suất đã được cập nhật',
    maintenance: 'Bảo trì hệ thống đã được lên lịch',
    minutesAgo: 'phút trước',
    hourAgo: 'giờ trước',
    totalEmployees: 'Tổng số nhân viên',
    avgConversations: 'Trung bình cuộc trò chuyện mỗi nhân viên',
    totalActive: 'Tổng số nhân viên hoạt động',
    analytics: 'Tổng quan phân tích',
  },
  'zh-tw': {
    adminPanel: '管理面板',
    welcome: '歡迎回來！',
    last7: '最近7天',
    last14: '最近14天',
    last30: '最近30天',
    notifications: '通知',
    newEmployee: '新員工已註冊',
    performanceReport: '績效報告已更新',
    maintenance: '系統維護已排程',
    minutesAgo: '分鐘前',
    hourAgo: '小時前',
    totalEmployees: '員工總數',
    avgConversations: '每位員工平均對話',
    totalActive: '活躍員工總數',
    analytics: '分析總覽',
  }
};

const IndexContent = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [dateFilter, setDateFilter] = useState(t.last7);
  const dateOptions = [t.last7, t.last14, t.last30];

  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />
      <div className={`flex-1 transition-all duration-300 ${
        isSidebarCollapsed ? 'ml-16' : 'ml-64'
      }`}>
        <Header />
        {/* Admin Panel Title and Actions */}
        <div className="flex items-center gap-4 mt-6 mb-0 ml-8">
          <div>
            <h1 className="text-2xl font-bold text-[#222]">{t.adminPanel}</h1>
            <p className="text-gray-500 text-base mt-1">{t.welcome}</p>
          </div>
          <div className="flex items-center gap-2 ml-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-2 px-4 py-2 border rounded-md bg-white text-gray-700 text-base font-medium shadow-sm hover:bg-gray-100">
                  <span><svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></span>
                  {dateFilter}
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M6 9l6 6 6-6"/></svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {dateOptions.map(option => (
                  <DropdownMenuItem
                    key={option}
                    onClick={() => setDateFilter(option)}
                    className={dateFilter === option ? 'bg-gray-100' : ''}
                  >
                    {option}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <div className="relative">
                  <button className="flex items-center justify-center w-10 h-10 border rounded-md bg-white hover:bg-gray-100">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
                  </button>
                  <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-red-500 rounded-full"></span>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" side="bottom" sideOffset={8} className="w-80 p-4">
                <h3 className="text-lg font-semibold mb-2">{t.notifications}</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full mt-1"></span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{t.newEmployee}</p>
                      <span className="text-xs text-gray-500">2 {t.minutesAgo}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2.5 h-2.5 bg-blue-500 rounded-full mt-1"></span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{t.performanceReport}</p>
                      <span className="text-xs text-gray-500">10 {t.minutesAgo}</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="w-2.5 h-2.5 bg-green-500 rounded-full mt-1"></span>
                    <div>
                      <p className="text-sm font-medium text-gray-800">{t.maintenance}</p>
                      <span className="text-xs text-gray-500">1 {t.hourAgo}</span>
                    </div>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <main className="p-8">
          {/* Quick Stats Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <StatsCard
              title={t.totalEmployees}
              value={24}
              change="+3"
              changeType="positive"
              icon={Users}
            />
            <StatsCard
              title={t.avgConversations}
              value={8.5}
              change="+0.5"
              changeType="positive"
              icon={MessageCircle}
            />
          </div>
          {/* Employee Table Section */}
          <div className="mb-8">
            <EmployeeTable />
          </div>
          {/* Charts Section */}
          <div>
            <h2 className="text-xl font-semibold text-[#343541] mb-6">{t.analytics}</h2>
            <Charts />
          </div>
        </main>
      </div>
    </div>
  );
};

const Index = () => (
  <LanguageProvider>
    <IndexContent />
  </LanguageProvider>
);

export default Index;
