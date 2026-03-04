import { createContext, useContext, useMemo, useState } from 'react';

const translations = {
  en: {
    heroTitle: 'UG TRB Online Coaching & Test Batch',
    heroSub: 'Smart preparation with live classes, mock tests, and analytics.',
    joinNow: 'Join Now',
    trbSyllabus: 'TRB Syllabus',
    prevYear: 'Previous Year Questions'
  },
  ta: {
    heroTitle: 'UG TRB ஆன்லைன் பயிற்சி & தேர்வு தொகுப்பு',
    heroSub: 'நேரலை வகுப்புகள், மாதிரி தேர்வுகள் மற்றும் பகுப்பாய்வுடன் புத்திசாலி தயாரிப்பு.',
    joinNow: 'இப்போதே சேரவும்',
    trbSyllabus: 'TRB பாடத்திட்டம்',
    prevYear: 'முந்தைய ஆண்டு வினாத்தொகுப்பு'
  }
};

const LanguageContext = createContext(null);

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('en');
  const value = useMemo(() => ({ language, setLanguage, t: translations[language] }), [language]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

export const useLanguage = () => useContext(LanguageContext);
