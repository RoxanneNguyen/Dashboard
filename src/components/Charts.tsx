import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ReferenceLine,
  ComposedChart
} from 'recharts';
import { useContext } from 'react';
import { LanguageContext } from '@/context/LanguageContext';

const conversationData = [
  { name: 'John', conversations: 45 },
  { name: 'Sarah', conversations: 38 },
  { name: 'Mike', conversations: 52 },
  { name: 'Emily', conversations: 29 },
  { name: 'David', conversations: 41 },
  { name: 'Lisa', conversations: 47 },
  { name: 'James', conversations: 33 },
  { name: 'Amanda', conversations: 56 },
  { name: 'Robert', conversations: 39 },
  { name: 'Maria', conversations: 44 },
  { name: 'Alex', conversations: 35 },
  { name: 'Sophie', conversations: 42 },
  { name: 'Carlos', conversations: 48 },
  { name: 'Nina', conversations: 31 },
  { name: 'Tom', conversations: 53 },
  { name: 'Rachel', conversations: 36 },
  { name: 'Daniel', conversations: 49 },
  { name: 'Kate', conversations: 40 },
];

// Calculate average
const averageConversations = Math.round(
  conversationData.reduce((sum, item) => sum + item.conversations, 0) / conversationData.length
);

// Add color property based on whether below average
const conversationDataWithColors = conversationData.map(item => ({
  ...item,
  fill: item.conversations < averageConversations ? '#ef4444' : '#007852'
}));

const allEmployeeRates = [85, 78, 92, 71, 83, 94, 76, 88, 91, 79, 82, 89, 77, 95, 73, 86, 90, 84];

// Group employees by performance categories
const groupByPerformance = (rates: number[]) => {
  const outstanding = rates.filter(rate => rate > 90).length;
  const average = rates.filter(rate => rate >= 80 && rate <= 90).length;
  const needSupport = rates.filter(rate => rate < 80).length;
  
  return [
    { name: 'Outstanding', count: outstanding, fill: '#3b82f6' },
    { name: 'Average', count: average, fill: '#10b981' },
    { name: 'Need Support', count: needSupport, fill: '#ef4444' }
  ];
};

const performanceCategories = groupByPerformance(allEmployeeRates);

const translations = {
  vi: {
    conversationsPerEmployee: 'Cuộc trò chuyện trên mỗi nhân viên',
    averageConversations: 'Trung bình: {value} cuộc trò chuyện',
    performanceDistribution: 'Hiệu suất',
    categoryA: 'Loại A (>90%)',
    categoryB: 'Loại B (80-90%)',
    categoryC: 'Loại C (<80%)',
    outstanding: 'Xuất sắc: {value}',
    average: 'Trung bình: {value}',
    needSupport: 'Cần hỗ trợ: {value}',
  },
  'zh-tw': {
    conversationsPerEmployee: '每位員工的對話',
    averageConversations: '平均: {value} 對話',
    performanceDistribution: '績效分佈',
    categoryA: '類別 A (>90%)',
    categoryB: '類別 B (80-90%)',
    categoryC: '類別 C (<80%)',
    outstanding: '傑出: {value}',
    average:'普通: {value}',
    needSupport: '需要支持: {value}',
  }
};

export const Charts = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-10 gap-6">
      {/* Conversation Count Chart */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm lg:col-span-6">
        <h3 className="text-lg font-semibold text-[#343541] mb-4">{t.conversationsPerEmployee}</h3>
        <div className="mb-2 text-sm text-gray-600">
          {t.averageConversations.replace('{value}', averageConversations.toString())}
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={conversationDataWithColors}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} fontSize={12} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="conversations" radius={[4, 4, 0, 0]}>
              {conversationDataWithColors.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Bar>
            <ReferenceLine 
              y={averageConversations} 
              stroke="#666" 
              strokeDasharray="5 5" 
              label="Average"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Performance Categories */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm lg:col-span-4">
        <h3 className="text-lg font-semibold text-[#343541] mb-4">{t.performanceDistribution}</h3>
        <div className="mb-4 flex flex-wrap gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span>{t.categoryA}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>{t.categoryB}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>{t.categoryC}</span>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={performanceCategories}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, count }) => `${name}: ${count}`}
              outerRadius={80}
              dataKey="count"
            >
              {performanceCategories.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip formatter={(value, name) => [`${value} employees`, name]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
