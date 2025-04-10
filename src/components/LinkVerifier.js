// components/LinkVerifier.js
import React, { useState, useContext } from 'react';
import offlineDB from '../utils/offlineDB';
import LanguageContext from '../contexts/LanguageContext';
import translations from '../utils/translations';

const LinkVerifier = ({ onResult }) => {
  const [link, setLink] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  
  const handleLinkChange = (e) => {
    setLink(e.target.value);
    setError('');
  };
  
  const validateUrl = (url) => {
    // Simple URL validation - check if it looks like a URL
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear any previous errors
    setError('');
    
    // Validate URL
    if (!link.trim()) {
      return;
    }
    
    // Check if it's a valid URL format
    let urlToCheck = link.trim();
    if (!urlToCheck.startsWith('http://') && !urlToCheck.startsWith('https://')) {
      urlToCheck = 'https://' + urlToCheck;
    }
    
    if (!validateUrl(urlToCheck)) {
      setError(language === 'en' ? 'Please enter a valid URL' : 'Please enter a valid URL');
      return;
    }
    
    setIsAnalyzing(true);
    
    // In a real app, you would send this to your backend
    // For the demo, we'll simulate a response after a delay
    setTimeout(() => {
      // Check if it's in our offline database of suspicious sites
      const isSuspicious = offlineDB.checkWebsite(urlToCheck);
      
      // Create simulated result
      const result = {
        url: urlToCheck,
        isLegitimate: !isSuspicious,
        trustScore: isSuspicious ? Math.floor(Math.random() * 30) : 70 + Math.floor(Math.random() * 30),
        domain: new URL(urlToCheck).hostname,
        registrationDate: "2020-03-15", // Simulated data
        recentFactChecks: isSuspicious ? [
          { title: "False story about Lagos floods", date: "2023-05-12" },
          { title: "Misleading COVID-19 treatment claim", date: "2023-02-28" }
        ] : [],
        similarReliableSources: isSuspicious ? [
          "legitnews.com.ng",
          "factsng.org"
        ] : []
      };
      
      setIsAnalyzing(false);
      onResult(result);
    }, 2000);
  };
  
  return (
    <div className="link-verifier">
      <h3>{t.linkVerifierTitle}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            placeholder={t.enterLink}
            value={link}
            onChange={handleLinkChange}
            className="link-input"
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        
        <button 
          type="submit" 
          className="primary-button"
          disabled={!link.trim() || isAnalyzing}
        >
          {isAnalyzing ? t.analyzing || 'Analyzing...' : t.checkLink}
        </button>
      </form>
    </div>
  );
};

export default LinkVerifier;