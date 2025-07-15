import { useState, useContext } from 'react';
import { Search, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { LanguageContext } from '@/context/LanguageContext';

interface Employee {
  id: number;
  name: string;
  conversations: number;
  avgDuration: number;
  successfulAppointmentRate: string;
}

const employees: Employee[] = [
  {
    id: 245783,
    name: 'John Smith',
    conversations: 45,
    avgDuration: 12.5,
    successfulAppointmentRate: '85%'
  },
  {
    id: 398562,
    name: 'Sarah Johnson',
    conversations: 38,
    avgDuration: 8.2,
    successfulAppointmentRate: '78%'
  },
  {
    id: 156924,
    name: 'Mike Chen',
    conversations: 52,
    avgDuration: 15.1,
    successfulAppointmentRate: '92%'
  },
  {
    id: 732849,
    name: 'Emily Davis',
    conversations: 29,
    avgDuration: 9.8,
    successfulAppointmentRate: '71%'
  },
  {
    id: 624157,
    name: 'David Wilson',
    conversations: 41,
    avgDuration: 11.3,
    successfulAppointmentRate: '83%'
  },
  {
    id: 891073,
    name: 'Lisa Rodriguez',
    conversations: 47,
    avgDuration: 14.2,
    successfulAppointmentRate: '94%'
  },
  {
    id: 427658,
    name: 'James Brown',
    conversations: 33,
    avgDuration: 10.7,
    successfulAppointmentRate: '76%'
  },
  {
    id: 584921,
    name: 'Amanda Taylor',
    conversations: 56,
    avgDuration: 13.8,
    successfulAppointmentRate: '88%'
  },
  {
    id: 367492,
    name: 'Robert Lee',
    conversations: 39,
    avgDuration: 11.9,
    successfulAppointmentRate: '91%'
  },
  {
    id: 759284,
    name: 'Maria Garcia',
    conversations: 44,
    avgDuration: 9.5,
    successfulAppointmentRate: '79%'
  },
  {
    id: 642185,
    name: 'Alex Thompson',
    conversations: 35,
    avgDuration: 10.2,
    successfulAppointmentRate: '82%'
  },
  {
    id: 753692,
    name: 'Sophie Martinez',
    conversations: 42,
    avgDuration: 12.8,
    successfulAppointmentRate: '87%'
  },
  {
    id: 581347,
    name: 'Carlos Rivera',
    conversations: 48,
    avgDuration: 13.5,
    successfulAppointmentRate: '89%'
  },
  {
    id: 924675,
    name: 'Nina Patel',
    conversations: 31,
    avgDuration: 8.9,
    successfulAppointmentRate: '74%'
  },
  {
    id: 816240,
    name: 'Tom Anderson',
    conversations: 53,
    avgDuration: 14.7,
    successfulAppointmentRate: '93%'
  },
  {
    id: 392874,
    name: 'Rachel Kim',
    conversations: 36,
    avgDuration: 9.1,
    successfulAppointmentRate: '77%'
  },
  {
    id: 657193,
    name: 'Daniel White',
    conversations: 49,
    avgDuration: 12.3,
    successfulAppointmentRate: '90%'
  },
  {
    id: 428506,
    name: 'Kate Johnson',
    conversations: 40,
    avgDuration: 11.6,
    successfulAppointmentRate: '84%'
  }
];

const translations = {
  vi: {
    name: 'Tên',
    employeeName: 'Tên nhân viên',
    employeeId: 'Mã nhân viên',
    totalConversations: 'Tổng số cuộc trò chuyện',
    avgDuration: 'Thời lượng TB (phút)',
    performance: 'Hiệu suất',
    appointmentRate: 'Tỉ lệ đặt lịch',
    actions: 'Hành động',
    view: 'Xem',
    search: 'Tìm kiếm nhân viên...',
    noData: 'Không có dữ liệu',
    prev: 'Trước',
    next: 'Tiếp',
    page: 'Trang',
    of: 'của',
  },
  'zh-tw': {
    name: '姓名',
    employeeName: '員工姓名',
    employeeId: '員工編號',
    totalConversations: '總對話數',
    avgDuration: '平均時長 (分鐘)',
    performance: '績效',
    appointmentRate: '預約率',
    actions: '操作',
    view: '查看',
    search: '搜尋員工...',
    noData: '沒有數據',
    prev: '上一頁',
    next: '下一頁',
    page: '頁',
    of: '共',
  }
};

export const EmployeeTable = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState<keyof Employee | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleSort = (field: keyof Employee) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredEmployees = employees.filter(employee =>
    employee.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = filteredEmployees.slice(startIndex, endIndex);

  const getAppointmentRateColor = (rate: string) => {
    const numericRate = parseInt(rate.replace('%', ''));
    if (numericRate < 80) return 'text-red-600';
    if (numericRate > 90) return 'text-blue-600';
    return 'text-[#007852]';
  };

  const getAppointmentRateBoxStyle = (rate: string) => {
    const numericRate = parseInt(rate.replace('%', ''));
    if (numericRate < 80) return 'text-red-700 bg-red-50 border-red-200';
    if (numericRate > 90) return 'text-blue-700 bg-blue-50 border-blue-200';
    return 'text-green-700 bg-green-50 border-green-200';
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#343541]">{t.performance}</h3>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder={t.search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th 
                className="text-left p-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                style={{ width: '20%' }}
                onClick={() => handleSort('name')}
              >
                {t.name} {t.employeeName}
              </th>
              <th 
                className="text-left p-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                style={{ width: '20%' }}
                onClick={() => handleSort('id')}
              >
                {t.employeeId}
              </th>
              <th 
                className="text-left p-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                style={{ width: '20%' }}
                onClick={() => handleSort('conversations')}
              >
                {t.totalConversations}
              </th>
              <th 
                className="text-left p-4 font-medium text-gray-700 cursor-pointer hover:bg-gray-100"
                style={{ width: '20%' }}
                onClick={() => handleSort('avgDuration')}
              >
                {t.avgDuration}
              </th>
              <th 
                className="text-left p-4 font-medium text-gray-700"
                style={{ width: '20%' }}
              >
                {t.appointmentRate}
              </th>
              <th 
                className="text-left p-4 font-medium text-gray-700"
                style={{ width: '20%' }}
              >
                {t.actions}
              </th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-4 text-center text-gray-400">{t.noData}</td>
              </tr>
            ) : (
              currentEmployees.map((employee) => (
                <tr key={employee.id} className="border-t border-gray-200 hover:bg-gray-50">
                  <td className="p-4">
                    <div className="font-medium text-[#343541]">{employee.name}</div>
                  </td>
                  <td className="p-4">
                    <div className="font-medium text-gray-500">#{employee.id}</div>
                  </td>
                  <td className="p-4 text-gray-600">{employee.conversations}</td>
                  <td className="p-4 text-gray-600">{employee.avgDuration}</td>
                  <td className="p-4">
                    <div className={`inline-flex items-center px-3 py-1.5 rounded-lg border font-medium text-sm ${getAppointmentRateBoxStyle(employee.successfulAppointmentRate)}`}>
                      {employee.successfulAppointmentRate}
                    </div>
                  </td>
                  <td className="p-4">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4 mr-1" />
                      {t.view}
                    </Button>
                  </td>
                </tr>
              ))
            )}
            {/* Add empty rows to maintain consistent table height */}
            {Array.from({ length: itemsPerPage - currentEmployees.length }, (_, index) => (
              <tr key={`empty-${index}`} className="border-t border-gray-200">
                <td className="p-4" style={{ height: '73px' }}>&nbsp;</td>
                <td className="p-4">&nbsp;</td>
                <td className="p-4">&nbsp;</td>
                <td className="p-4">&nbsp;</td>
                <td className="p-4">&nbsp;</td>
                <td className="p-4">&nbsp;</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-end items-center p-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              {t.prev}
            </Button>
            <span className="text-sm text-gray-600">
              {t.page} {currentPage} {t.of} {totalPages}
            </span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              {t.next}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
