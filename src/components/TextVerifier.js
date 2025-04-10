// components/TextVerifier.js
import React, { useState, useContext } from 'react';
import offlineDB from '../utils/offlineDB';
import LanguageContext from '../contexts/LanguageContext';
import translations from '../utils/translations';

const TextVerifier = ({ onResult }) => {
  const [text, setText] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  
  const handleTextChange = (e) => {
    setText(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    setIsAnalyzing(true);
    
    // In a real app, we would send this to the backend
    // For the demo, we'll use our offline DB and simulate a server delay
    setTimeout(() => {
      // First check our local database
      const offlineResult = offlineDB.searchClaim(text);
      
      // Create result object
      const result = offlineResult ? {
        text: text,
        verdict: offlineResult.verdict,
        truthScore: getScoreFromVerdict(offlineResult.verdict),
        explanation: offlineResult.explanation,
        sources: offlineResult.sources,
        isOfflineResult: true
      } : {
        text: text,
        // If no match in our local DB, we'll generate a simulated result
        verdict: ['confirmed', 'mostlyTrue', 'mixed', 'mostlyFalse', 'false', 'unverifiable'][Math.floor(Math.random() * 6)],
        truthScore: Math.floor(Math.random() * 100),
        explanation: "This is a simulated result for demonstration purposes.",
        sources: ["Example Source 1", "Example Source 2"],
        isOfflineResult: false
      };
      
      setIsAnalyzing(false);
      onResult(result);
    }, 1500);
  };
  
  // Helper function to convert verdict to score
  const getScoreFromVerdict = (verdict) => {
    switch(verdict) {
      case 'confirmed': return 95;
      case 'mostlyTrue': return 75;
      case 'mixed': return 50;
      case 'mostlyFalse': return 25;
      case 'false': return 5;
      case 'unverifiable': return 'N/A';
      default: return 50;
    }
  };
  
  return (
    <div className="text-verifier">
      <h3>{t.textVerifierTitle}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <textarea
            rows="6"
            placeholder={t.enterText}
            value={text}
            onChange={handleTextChange}
            className="text-input"
          ></textarea>
        </div>
        
        <button 
          type="submit" 
          className="primary-button"
          disabled={!text.trim() || isAnalyzing}
        >
          {isAnalyzing ? t.analyzing || 'Analyzing...' : t.checkText}
        </button>
      </form>
    </div>
  );
};

export default TextVerifier;