// pages/ResultsPage.js
import React, { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import LanguageContext from '../contexts/LanguageContext';
import translations from '../utils/translations';

const ResultsPage = () => {
  const { id } = useParams();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [resultType, setResultType] = useState('');
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  
  useEffect(() => {
    // In a real app, we would fetch this from the backend
    // For the demo, we'll get it from sessionStorage
    const storedResult = sessionStorage.getItem(`result-${id}`);
    
    if (storedResult) {
      const parsedResult = JSON.parse(storedResult);
      setResult(parsedResult);
      
      // Determine the type of result based on the data structure
      if (parsedResult.hasOwnProperty('text')) {
        setResultType('text');
      } else if (parsedResult.hasOwnProperty('url')) {
        setResultType('link');
      } else if (parsedResult.hasOwnProperty('isManipulated')) {
        setResultType('image');
      }
    }
    
    setLoading(false);
  }, [id]);
  
  if (loading) {
    return (
      <div className="results-page loading">
        <div className="container">
          <div className="loading-spinner"></div>
          <p>{language === 'en' ? 'Loading results...' : 'Loading results...'}</p>
        </div>
      </div>
    );
  }
  
  if (!result) {
    return (
      <div className="results-page not-found">
        <div className="container">
          <h1>{language === 'en' ? 'Result Not Found' : 'Result Not Found'}</h1>
          <p>{language === 'en' ? 'The result you are looking for does not exist or has expired.' : 'The result you are looking for does not exist or has expired.'}</p>
          <Link to="/quick-check" className="primary-button">
            {language === 'en' ? 'Return to Verification' : 'Return to Verification'}
          </Link>
        </div>
      </div>
    );
  }
  
  // Different result views based on type
  const renderTextResult = () => (
    <div className="text-result">
      <div className="original-content">
        <h3>{language === 'en' ? 'Verified Text:' : 'Verified Text:'}</h3>
        <blockquote>"{result.text}"</blockquote>
      </div>
      
      <div className="verdict-box">
        <h3>{t.truthScore}</h3>
        <div className={`score-display ${result.verdict}`}>
          {result.truthScore !== 'N/A' ? `${result.truthScore}/100` : 'N/A'}
        </div>
        <h4 className={`verdict-label ${result.verdict}`}>
          {t[result.verdict] || result.verdict}
        </h4>
      </div>
      
      <div className="analysis">
        <h3>{t.analysisDetails}</h3>
        <p>{result.explanation}</p>
        
        {result.sources && result.sources.length > 0 && (
          <div className="sources">
            <h4>{language === 'en' ? 'Sources:' : 'Sources:'}</h4>
            <ul>
              {result.sources.map((source, index) => (
                <li key={index}>{source}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
  
  const renderLinkResult = () => (
    <div className="link-result">
      <div className="original-content">
        <h3>{language === 'en' ? 'Verified Website:' : 'Verified Website:'}</h3>
        <a href={result.url} target="_blank" rel="noopener noreferrer" className="verified-link">
          {result.domain}
        </a>
      </div>
      
      <div className="verdict-box">
        <h3>{language === 'en' ? 'Trust Score:' : 'Trust Score:'}</h3>
        <div className={`score-display ${result.trustScore > 50 ? 'confirmed' : 'false'}`}>
          {result.trustScore}/100
        </div>
        <h4 className={`verdict-label ${result.trustScore > 50 ? 'confirmed' : 'false'}`}>
          {result.trustScore > 50 
            ? (language === 'en' ? 'Likely Trustworthy' : 'Likely Trustworthy')
            : (language === 'en' ? 'Potentially Untrustworthy' : 'Potentially Untrustworthy')}
        </h4>
      </div>
      
      <div className="analysis">
        <h3>{t.analysisDetails}</h3>
        
        {result.registrationDate && (
          <p>
            {language === 'en' ? 'Domain Registration Date: ' : 'Domain Registration Date: '}
            {result.registrationDate}
          </p>
        )}
        
        {result.recentFactChecks && result.recentFactChecks.length > 0 && (
          <div className="fact-checks">
            <h4>{language === 'en' ? 'Recent Fact Checks:' : 'Recent Fact Checks:'}</h4>
            <ul>
              {result.recentFactChecks.map((check, index) => (
                <li key={index}>
                  <span className="fact-check-title">{check.title}</span>
                  <span className="fact-check-date">{check.date}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {result.similarReliableSources && result.similarReliableSources.length > 0 && (
          <div className="alternatives">
            <h4>{language === 'en' ? 'Reliable Alternatives:' : 'Reliable Alternatives:'}</h4>
            <ul>
              {result.similarReliableSources.map((source, index) => (
                <li key={index}>{source}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
  
  const renderImageResult = () => (
    <div className="image-result">
      <div className="original-content">
        <h3>{language === 'en' ? 'Verified Image:' : 'Verified Image:'}</h3>
        <div className="image-container">
          {/* In a real app, you'd display the actual image here */}
          <div className="placeholder-image">
            {language === 'en' ? '[Image Preview]' : '[Image Preview]'}
          </div>
        </div>
      </div>
      
      <div className="verdict-box">
        <h3>{language === 'en' ? 'Authenticity:' : 'Authenticity:'}</h3>
        <div className={`score-display ${result.isManipulated ? 'false' : 'confirmed'}`}>
          {result.isManipulated 
            ? (language === 'en' ? 'Modified' : 'Modified')
            : (language === 'en' ? 'Authentic' : 'Authentic')}
        </div>
      </div>
      
      <div className="analysis">
        <h3>{t.analysisDetails}</h3>
        
        {result.metadata && (
          <div className="metadata">
            <h4>{language === 'en' ? 'Image Metadata:' : 'Image Metadata:'}</h4>
            <ul>
              <li>{language === 'en' ? 'Created: ' : 'Created: '}{result.metadata.created}</li>
              <li>{language === 'en' ? 'Software: ' : 'Software: '}{result.metadata.software}</li>
              {result.metadata.edits && result.metadata.edits.length > 0 && (
                <li>
                  {language === 'en' ? 'Detected Edits: ' : 'Detected Edits: '}
                  {result.metadata.edits.join(', ')}
                </li>
              )}
            </ul>
          </div>
        )}
        
        {result.similarImages && result.similarImages.length > 0 && (
          <div className="similar-images">
            <h4>{language === 'en' ? 'Similar Images Found:' : 'Similar Images Found:'}</h4>
            <ul>
              {result.similarImages.map((img, index) => (
                <li key={index}>
                  {language === 'en' ? 'Match: ' : 'Match: '}{img.similarity}
                  {/* In a real app, you might show thumbnails */}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
  
  return (
    <div className="results-page">
      <div className="container">
        <h1>{t.resultTitle}</h1>
        
        <div className="results-container">
          {resultType === 'text' && renderTextResult()}
          {resultType === 'link' && renderLinkResult()}
          {resultType === 'image' && renderImageResult()}
        </div>
        
        <div className="next-steps">
          <h3>{t.whatNext}</h3>
          <div className="next-steps-buttons">
            <button className="secondary-button">
              {t.shareResults}
            </button>
            <Link to="/education" className="primary-button">
              {t.learnMore}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsPage;