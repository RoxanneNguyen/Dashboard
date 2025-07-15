import { createContext, useState, Dispatch, SetStateAction } from 'react';

export const LanguageContext = createContext<{
  language: 'vi' | 'zh-tw';
  setLanguage: Dispatch<SetStateAction<'vi' | 'zh-tw'>>;
}>({
  language: 'vi',
  setLanguage: () => {},
});

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [language, setLanguage] = useState<'vi' | 'zh-tw'>('vi');
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
