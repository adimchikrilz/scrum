// components/OfflineNotice.js
import React, { useContext } from 'react';
import LanguageContext from '../contexts/LanguageContext';
import translations from '../utils/translations';

const OfflineNotice = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  
  return (
    <div className="offline-notice">
      <div className="container">
        <span className="offline-icon">⚠️</span>
        <p>{t.offlineNotice}</p>
      </div>
    </div>
  );
};
export default OfflineNotice;