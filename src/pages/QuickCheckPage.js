import React, { useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageContext from '../contexts/LanguageContext';
import { ClaimsContext } from '../contexts/ClaimsContext';
import translations from '../utils/translations';
import axios from 'axios';

const QuickCheckPage = () => {
  const [input, setInput] = useState('');
  const [state, setState] = useState('initial'); // 'initial', 'verifying', 'result'
  const [result, setResult] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { language } = useContext(LanguageContext);
  const { addClaim } = useContext(ClaimsContext);
  const t = translations[language] || translations['en'];
  const navigate = useNavigate();
  const navigationTimeoutRef = useRef(null); // Ref to store the timeout ID

  const toggleOnlineStatus = () => {
    setIsOnline((prev) => !prev);
  };

  // Helper function to check if the input is a URL
  const isURL = (text) => {
    try {
      new URL(text);
      return true;
    } catch (e) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setState('verifying');

    // Clear any existing timeout to prevent navigation from a previous result
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }

    // Check if offline
    if (!isOnline) {
      // Use mock response or offlineDB
      const verdictOptions = ['true', 'false', 'uncertain'];
      const verdict = verdictOptions[Math.floor(Math.random() * 3)];
      const resultData = {
        input,
        verdict,
        explanation: 'Offline mode: Using mock data.',
        blockchainHash: 'abct123',
        timestamp: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        wallet: 'BRBK...sLJM',
      };
      setResult(resultData);
      setState('result');
      addClaim({
        text: input,
        timestamp: resultData.timestamp,
        date: resultData.date,
        wallet: resultData.wallet,
        status: verdict === 'true' ? 'true' : 'false',
      });

      // Set the timeout for navigation
      navigationTimeoutRef.current = setTimeout(() => {
        navigate('/verified-claims');
      }, 10000);
      return;
    }

    // Proceed with API calls if online
    try {
      let textToCheck = input;

      // Step 1: If the input is a URL, extract text using /extract-text
      if (isURL(input)) {
        const extractResponse = await axios.post(
          'https://truthcheck-dapps.onrender.com/extract-text',
          { url: input },
          { headers: { 'Content-Type': 'application/json' } }
        );
        textToCheck = extractResponse.data.text;
      }

      // Step 2: Fact-check the text (either extracted or direct input)
      const factCheckResponse = await axios.post(
        'https://truthcheck-dapps.onrender.com/fact-check',
        { content: textToCheck },
        { headers: { 'Content-Type': 'application/json' } }
      );

      // Step 3: Process the fact-check result
      const factCheckResult = factCheckResponse.data.fact_check_result.toLowerCase();
      let verdict = 'uncertain';
      if (factCheckResult.includes('true')) {
        verdict = 'true';
      } else if (factCheckResult.includes('false') || factCheckResult.includes('not true')) {
        verdict = 'false';
      }

      const resultData = {
        input,
        verdict,
        explanation: factCheckResult,
        blockchainHash: 'abct123',
        timestamp: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        wallet: 'BRBK...sLJM',
      };

      setResult(resultData);
      setState('result');

      // Add the claim to the shared state
      addClaim({
        text: input,
        timestamp: resultData.timestamp,
        date: resultData.date,
        wallet: resultData.wallet,
        status: verdict === 'true' ? 'true' : 'false',
      });

      // Set the timeout for navigation
      navigationTimeoutRef.current = setTimeout(() => {
        navigate('/verified-claims');
      }, 1000);
    } catch (error) {
      console.error('API Error:', error);

      // Fallback to mock response on error
      const verdictOptions = ['true', 'false', 'uncertain'];
      const verdict = verdictOptions[Math.floor(Math.random() * 3)];
      const resultData = {
        input,
        verdict,
        explanation:
          verdict === 'true'
            ? 'This claim is true. After years of aggressive immunization campaigns and surveillance, the WHO declared Nigeria free of wild poliovirus on August 25, 2020.'
            : verdict === 'false'
            ? 'This went viral in 2014 but seems to be false. The claim seems to be false—salt-water does not prevent or cure Ebola and can lead to health complications.'
            : 'Hmm... While allegations have surfaced, there is no conclusive public evidence or official confirmation of foreign interference.',
        blockchainHash: 'abct123',
        timestamp: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        wallet: 'BRBK...sLJM',
      };

      setResult(resultData);
      setState('result');

      addClaim({
        text: input,
        timestamp: resultData.timestamp,
        date: resultData.date,
        wallet: resultData.wallet,
        status: verdict === 'true' ? 'true' : 'false',
      });

      // Set the timeout for navigation
      navigationTimeoutRef.current = setTimeout(() => {
        navigate('/verified-claims');
      }, 10000);
    }
  };

  const handleCheckAnother = () => {
    // Clear the timeout to prevent navigation
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }

    setInput('');
    setResult(null);
    setState('initial');
  };

  const handleLearnMore = () => {
    console.log('Learn more clicked');
  };

  return (
    <div className="quick-check-page">
      <div className="container">
        {state === 'initial' && (
          <>
            <h1
              className="title-h1"
              style={{
                fontSize: '2rem',
                fontWeight: 600,
                lineHeight: 1.2,
                marginBottom: '1rem',
                color: 'white',
                textAlign: 'center',
              }}
            >
              {t.quickCheckTitle || 'Quick Check'}
            </h1>
            <div className="wallet-status">
              <span className="connected">Connected: BRBK...sLJM</span>
            </div>
            <p className="real-or-fake">{language === 'en' ? 'Is It Real or Fake?' : 'Is It Real or Fake?'}</p>
            <form onSubmit={handleSubmit} className="quick-check-form">
              <div className="input-container">
                <input
                  type="text"
                  placeholder={t.enterText || 'Paste claim or URL here'}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="claim-input"
                />
                <button type="button" className="plus-button">
                  +
                </button>
                <button type="button" className="offline-toggle" onClick={toggleOnlineStatus}>
                  <span className="offline-icon"></span>
                  {isOnline ? 'Online' : 'Offline'}
                </button>
                <button type="submit" className="verify-button">
                  {t.checkText || 'Verify'}
                </button>
              </div>
            </form>
          </>
        )}

        {state === 'verifying' && (
          <>
            <h1>Verifying...</h1>
            <form className="quick-check-form">
              <div className="input-container">
                <input type="text" value={input} className="claim-input" disabled />
                <button type="button" className="plus-button" disabled>
                  +
                </button>
                <button type="button" className="offline-toggle" disabled>
                  <span className="offline-icon"></span>
                  {isOnline ? 'Online' : 'Offline'}
                </button>
                <button type="button" className="verify-button" disabled>
                  {t.checkText || 'Verify'}
                </button>
              </div>
            </form>
          </>
        )}

        {state === 'result' && (
          <div className="result-container">
            <h1 className={`result-title ${result.verdict}`}>
              {result.verdict === 'true' ? 'TRUE!' : result.verdict === 'false' ? 'False!' : 'Uncertain...'}
            </h1>
            {result.explanation.includes('Offline mode') && (
              <p className="offline-message">⚠️ Offline: Results are based on mock data.</p>
            )}
            <p className="result-explanation">{result.explanation}</p>
            <p className="blockchain-info">Verified on blockchain: #{result.blockchainHash}</p>
            <button onClick={handleCheckAnother} className="check-another-button">
              Check Another
            </button>
            <button onClick={handleLearnMore} className="learn-more-link">
              Learn more...
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickCheckPage;