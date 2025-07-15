import { useState, useEffect, useContext } from 'react';
import { Bell, ChevronDown, Calendar, Settings, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { LanguageContext } from '@/context/LanguageContext';

// Language Switcher Component
const LanguageSwitcher = ({ isMobile = false }: { isMobile?: boolean }) => {
  const { language, setLanguage } = useContext(LanguageContext);
  const languages = [
    { code: 'vi', name: 'Tiếng Việt', short: 'Vi', flag: '/flags/vietnam.png' },
    { code: 'zh-tw', name: '繁體中文', short: '中', flag: '/flags/taiwan.webp' },
  ];
  const currentLanguage = languages.find((lang) => lang.code === language);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="flex items-center gap-2 px-3 py-2 border-0 rounded-md bg-white hover:bg-gray-50"
        >
          <img
            src={currentLanguage?.flag}
            alt={`${currentLanguage?.name} flag`}
            className="w-5 h-4 object-cover rounded-sm"
          />
          <span className="text-sm font-medium text-gray-700">
            {currentLanguage?.short}
          </span>
          <ChevronDown className="w-4 h-4 text-gray-500" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-40 z-[110] bg-white border border-gray-200 rounded-md shadow-lg">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code as 'vi' | 'zh-tw')}
            className="flex items-center gap-3 cursor-pointer py-2 px-3 hover:bg-gray-50"
          >
            <img
              src={lang.flag}
              alt={`${lang.name} flag`}
              className="w-5 h-4 object-cover rounded-sm"
            />
            <span className="flex-1 text-sm font-medium text-gray-700">{lang.name}</span>
            {language === lang.code && (
              <Check className="w-4 h-4 text-green-600" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const Header = () => {
  const { language } = useContext(LanguageContext);
  const translations = {
    vi: {
      adminDashboard: 'Bảng Quản Trị',
      last7: '7 ngày qua',
      last14: '14 ngày qua',
      last30: '30 ngày qua',
      logout: 'Đăng xuất',
      settings: 'Cài đặt',
    },
    'zh-tw': {
      adminDashboard: '管理面板',
      last7: '最近7天',
      last14: '最近14天',
      last30: '最近30天',
      logout: '登出',
      settings: '設定',
    }
  };
  const t = translations[language];
  const [dateFilter, setDateFilter] = useState(t.last7);
  const dateOptions = [t.last7, t.last14, t.last30];
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceType('mobile');
      } else if (width < 1024) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-300 px-4 sm:px-6 lg:px-8 py-3 lg:py-4">
      <div className="w-full flex items-center justify-between">
        {/* Left spacer for balance - smaller on mobile */}
        <div
          className={`${
            deviceType === "mobile" ? "flex-shrink-0 w-4" : "flex-1"
          }`}
        ></div>

        {/* Title - Centered with responsive width */}
        <h1
          className={`font-semibold text-teal-700 text-center ${
            deviceType === "mobile"
              ? "text-sm leading-tight px-2 flex-1 min-w-0"
              : "text-lg sm:text-xl lg:text-2xl"
          }`}
        >
          {deviceType === "mobile"
            ? `Intelligent Dialogue Training System for Insurance Agents - ${t.adminDashboard}`
            : 'Intelligent Dialogue Training System for Insurance Agents'}
        </h1>

        {/* Right side - Buttons */}
        <div
          className={`${
            deviceType === "mobile" ? "flex-shrink-0" : "flex-1"
          } flex justify-end`}
        >
          {/* Mobile Layout: Language + Action Buttons grouped right */}
          {deviceType === "mobile" && (
            <div className="flex items-center gap-2">
              <LanguageSwitcher isMobile={true} />
              <div className="flex items-center gap-1">
                {/* Exit/Logout Button */}
                <Button variant="ghost" size="sm" className="px-2">
                  <svg viewBox="0 0 24 24" width="20" height="20">
                    <path
                      fill="currentColor"
                      d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
                    ></path>
                  </svg>
                  <span className="sr-only">{t.logout}</span>
                </Button>
              </div>
            </div>
          )}

          {/* Tablet Layout: Language switcher and action buttons */}
          {deviceType === "tablet" && (
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              {/* Exit/Logout Button */}
              <Button variant="ghost" size="sm" className="px-3">
                <svg viewBox="0 0 24 24" width="24" height="24">
                  <path
                    fill="currentColor"
                    d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
                  ></path>
                </svg>
                <span className="sr-only">{t.logout}</span>
              </Button>
            </div>
          )}

          {/* Desktop Layout: Language switcher and action buttons aligned right */}
          {deviceType === "desktop" && (
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <div className="flex items-center gap-4">
                {/* Exit/Logout Button */}
                <Button variant="ghost" size="sm" className="px-3">
                  <svg
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    className="w-7 h-7"
                  >
                    <path
                      fill="currentColor"
                      d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z"
                    ></path>
                  </svg>
                  <span className="sr-only">{t.logout}</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
