// import React, { useState, useContext, useRef } from 'react';
// import { useNavigate } from 'react-router-dom';
// import LanguageContext from '../contexts/LanguageContext';
// import { ClaimsContext } from '../contexts/ClaimsContext';
// import translations from '../utils/translations';
// import axios from 'axios';

// const QuickCheckPage = () => {
//   const [input, setInput] = useState('');
//   const [state, setState] = useState('initial'); // 'initial', 'verifying', 'result'
//   const [result, setResult] = useState(null);
//   const [isOnline, setIsOnline] = useState(navigator.onLine);
//   const { language } = useContext(LanguageContext);
//   const { addClaim } = useContext(ClaimsContext);
//   const t = translations[language] || translations['en'];
//   const navigate = useNavigate();
//   const navigationTimeoutRef = useRef(null); // Ref to store the timeout ID

//   const toggleOnlineStatus = () => {
//     setIsOnline((prev) => !prev);
//   };

//   // Helper function to check if the input is a URL
//   const isURL = (text) => {
//     try {
//       new URL(text);
//       return true;
//     } catch (e) {
//       return false;
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     setState('verifying');

//     // Clear any existing timeout to prevent navigation from a previous result
//     if (navigationTimeoutRef.current) {
//       clearTimeout(navigationTimeoutRef.current);
//       navigationTimeoutRef.current = null;
//     }

//     // Check if offline
//     if (!isOnline) {
//       // Use mock response or offlineDB
//       const verdictOptions = ['true', 'false', 'uncertain'];
//       const verdict = verdictOptions[Math.floor(Math.random() * 3)];
//       const resultData = {
//         input,
//         verdict,
//         explanation: 'Offline mode: Using mock data.',
//         blockchainHash: 'abct123',
//         timestamp: new Date().toLocaleTimeString(),
//         date: new Date().toLocaleDateString(),
//         wallet: 'BRBK...sLJM',
//       };
//       setResult(resultData);
//       setState('result');
//       addClaim({
//         text: input,
//         timestamp: resultData.timestamp,
//         date: resultData.date,
//         wallet: resultData.wallet,
//         status: verdict === 'true' ? 'true' : 'false',
//       });

//       // Set the timeout for navigation
//       navigationTimeoutRef.current = setTimeout(() => {
//         navigate('/verified-claims');
//       }, 10000);
//       return;
//     }

//     // Proceed with API calls if online
//     try {
//       let textToCheck = input;

//       // Step 1: If the input is a URL, extract text using /extract-text
//       if (isURL(input)) {
//         const extractResponse = await axios.post(
//           'https://truthcheck-dapps.onrender.com/extract-text',
//           { url: input },
//           { headers: { 'Content-Type': 'application/json' } }
//         );
//         textToCheck = extractResponse.data.text;
//       }

//       // Step 2: Fact-check the text (either extracted or direct input)
//       const factCheckResponse = await axios.post(
//         'https://truthcheck-dapps.onrender.com/fact-check',
//         { content: textToCheck },
//         { headers: { 'Content-Type': 'application/json' } }
//       );

//       // Step 3: Process the fact-check result
//       const factCheckResult = factCheckResponse.data.fact_check_result.toLowerCase();
//       let verdict = 'uncertain';
//       if (factCheckResult.includes('true')) {
//         verdict = 'true';
//       } else if (factCheckResult.includes('false') || factCheckResult.includes('not true')) {
//         verdict = 'false';
//       }

//       const resultData = {
//         input,
//         verdict,
//         explanation: factCheckResult,
//         blockchainHash: 'abct123',
//         timestamp: new Date().toLocaleTimeString(),
//         date: new Date().toLocaleDateString(),
//         wallet: 'BRBK...sLJM',
//       };

//       setResult(resultData);
//       setState('result');

//       // Add the claim to the shared state
//       addClaim({
//         text: input,
//         timestamp: resultData.timestamp,
//         date: resultData.date,
//         wallet: resultData.wallet,
//         status: verdict === 'true' ? 'true' : 'false',
//       });

//       // Set the timeout for navigation
//       navigationTimeoutRef.current = setTimeout(() => {
//         navigate('/verified-claims');
//       }, 1000);
//     } catch (error) {
//       console.error('API Error:', error);

//       // Fallback to mock response on error
//       const verdictOptions = ['true', 'false', 'uncertain'];
//       const verdict = verdictOptions[Math.floor(Math.random() * 3)];
//       const resultData = {
//         input,
//         verdict,
//         explanation:
//           verdict === 'true'
//             ? 'This claim is true. After years of aggressive immunization campaigns and surveillance, the WHO declared Nigeria free of wild poliovirus on August 25, 2020.'
//             : verdict === 'false'
//             ? 'This went viral in 2014 but seems to be false. The claim seems to be false—salt-water does not prevent or cure Ebola and can lead to health complications.'
//             : 'Hmm... While allegations have surfaced, there is no conclusive public evidence or official confirmation of foreign interference.',
//         blockchainHash: 'abct123',
//         timestamp: new Date().toLocaleTimeString(),
//         date: new Date().toLocaleDateString(),
//         wallet: 'BRBK...sLJM',
//       };

//       setResult(resultData);
//       setState('result');

//       addClaim({
//         text: input,
//         timestamp: resultData.timestamp,
//         date: resultData.date,
//         wallet: resultData.wallet,
//         status: verdict === 'true' ? 'true' : 'false',
//       });

//       // Set the timeout for navigation
//       navigationTimeoutRef.current = setTimeout(() => {
//         navigate('/verified-claims');
//       }, 10000);
//     }
//   };

//   const handleCheckAnother = () => {
//     // Clear the timeout to prevent navigation
//     if (navigationTimeoutRef.current) {
//       clearTimeout(navigationTimeoutRef.current);
//       navigationTimeoutRef.current = null;
//     }

//     setInput('');
//     setResult(null);
//     setState('initial');
//   };

//   const handleLearnMore = () => {
//     console.log('Learn more clicked');
//   };

//   return (
//     <div className="quick-check-page">
//       <div className="container">
//         {state === 'initial' && (
//           <>
//             <h1
//               className="title-h1"
//               style={{
//                 fontSize: '2rem',
//                 fontWeight: 600,
//                 lineHeight: 1.2,
//                 marginBottom: '1rem',
//                 color: 'white',
//                 textAlign: 'center',
//               }}
//             >
//               {t.quickCheckTitle || 'Quick Check'}
//             </h1>
//             <div className="wallet-status">
//               <span className="connected">Connected: BRBK...sLJM</span>
//             </div>
//             <p className="real-or-fake">{language === 'en' ? 'Is It Real or Fake?' : 'Is It Real or Fake?'}</p>
//             <form onSubmit={handleSubmit} className="quick-check-form">
//               <div className="input-container">
//                 <input
//                   type="text"
//                   placeholder={t.enterText || 'Paste claim or URL here'}
//                   value={input}
//                   onChange={(e) => setInput(e.target.value)}
//                   className="claim-input"
//                 />
//                 <button type="button" className="plus-button">
//                   +
//                 </button>
//                 <button type="button" className="offline-toggle" onClick={toggleOnlineStatus}>
//                   <span className="offline-icon"></span>
//                   {isOnline ? 'Online' : 'Offline'}
//                 </button>
//                 <button type="submit" className="verify-button">
//                   {t.checkText || 'Verify'}
//                 </button>
//               </div>
//             </form>
//           </>
//         )}

//         {state === 'verifying' && (
//           <>
//             <h1>Verifying...</h1>
//             <form className="quick-check-form">
//               <div className="input-container">
//                 <input type="text" value={input} className="claim-input" disabled />
//                 <button type="button" className="plus-button" disabled>
//                   +
//                 </button>
//                 <button type="button" className="offline-toggle" disabled>
//                   <span className="offline-icon"></span>
//                   {isOnline ? 'Online' : 'Offline'}
//                 </button>
//                 <button type="button" className="verify-button" disabled>
//                   {t.checkText || 'Verify'}
//                 </button>
//               </div>
//             </form>
//           </>
//         )}

//         {state === 'result' && (
//           <div className="result-container">
//             <h1 className={`result-title ${result.verdict}`}>
//               {result.verdict === 'true' ? 'TRUE!' : result.verdict === 'false' ? 'False!' : 'Uncertain...'}
//             </h1>
//             {result.explanation.includes('Offline mode') && (
//               <p className="offline-message">⚠️ Offline: Results are based on mock data.</p>
//             )}
//             <p className="result-explanation">{result.explanation}</p>
//             <p className="blockchain-info">Verified on blockchain: #{result.blockchainHash}</p>
//             <button onClick={handleCheckAnother} className="check-another-button">
//               Check Another
//             </button>
//             <button onClick={handleLearnMore} className="learn-more-link">
//               Learn more...
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default QuickCheckPage;

import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageContext from '../contexts/LanguageContext';
import { ClaimsContext } from '../contexts/ClaimsContext';
import translations from '../utils/translations';
import axios from 'axios';

const QuickCheckPage = () => {
  const [input, setInput] = useState('');
  const [textToCheck, setTextToCheck] = useState('');
  const [state, setState] = useState('initial'); // 'initial', 'verifying', 'result'
  const [result, setResult] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { language } = useContext(LanguageContext);
  const { addClaim } = useContext(ClaimsContext);
  const t = translations[language] || translations['en'];
  const navigate = useNavigate();
  const navigationTimeoutRef = useRef(null);

  // Monitor online status with event listeners
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Cleanup navigation timeout on unmount
  useEffect(() => {
    return () => {
      if (navigationTimeoutRef.current) {
        clearTimeout(navigationTimeoutRef.current);
      }
    };
  }, []);

  const toggleOnlineStatus = () => {
    setIsOnline((prev) => !prev);
  };

  const isURL = (text) => {
    try {
      new URL(text);
      return true;
    } catch (e) {
      return false;
    }
  };

  // Helper function to safely convert any value to string for rendering
  const safeToString = (value) => {
    if (value === null || value === undefined) {
      return '';
    }
    if (typeof value === 'object') {
      try {
        return JSON.stringify(value);
      } catch (e) {
        return '[Object]';
      }
    }
    return String(value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setState('verifying');
    setTextToCheck('');
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }

    if (!isOnline) {
      const verdictOptions = ['true', 'false', 'uncertain'];
      const verdict = verdictOptions[Math.floor(Math.random() * 3)];
      const resultData = {
        input,
        claim: input,
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
        status: verdict,
      });

      navigationTimeoutRef.current = setTimeout(() => {
        navigate('/verified-claims');
      }, 10000);
      return;
    }

    try {
      let claimText = input;

      if (isURL(input)) {
        try {
          console.log('Extracting text from URL:', input);
          const extractResponse = await axios.post(
            'https://truthcheck-dapps.onrender.com/extract-text',
            { url: input },
            { headers: { 'Content-Type': 'application/json' }, timeout: 15000 }
          );
          
          console.log('Text extraction response:', extractResponse.data);
          
          if (extractResponse.data && extractResponse.data.text) {
            claimText = extractResponse.data.text;
            setTextToCheck(claimText);
          } else {
            console.error('Text extraction failed: No text returned');
            setTextToCheck('Could not extract text from URL. Using input as claim.');
          }
        } catch (extractError) {
          console.error('Text extraction error:', extractError);
          setTextToCheck('Could not extract text from URL. Using input as claim.');
        }
      } else {
        setTextToCheck(input);
      }

      console.log('Sending text for fact-checking:', claimText);
      
      const factCheckResponse = await axios.post(
        'https://truthcheck-dapps.onrender.com/fact-check',
        { content: claimText },
        { headers: { 'Content-Type': 'application/json' }, timeout: 1000 }
      );
      
      console.log('Fact check response:', factCheckResponse.data);

      let verdict = 'uncertain';
      let explanation = 'No fact-check result provided.';
      
      if (factCheckResponse.data) {
        // Log the structure of the response for debugging
        console.log('Fact check result structure:', typeof factCheckResponse.data.fact_check_result);
        
        // Handle object response
        if (factCheckResponse.data.fact_check_result) {
          // Check if fact_check_result is an object
          if (typeof factCheckResponse.data.fact_check_result === 'object') {
            console.log('Fact check result is an object:', factCheckResponse.data.fact_check_result);
            
            // Try to extract relevant information from the object
            const result = factCheckResponse.data.fact_check_result;
            
            if (result.explanation) {
              explanation = safeToString(result.explanation);
            }
            
            if (result.label) {
              const label = safeToString(result.label).toLowerCase();
              if (label.includes('true')) {
                verdict = 'true';
              } else if (label.includes('false') || label.includes('not true')) {
                verdict = 'false';
              }
            }
          } else {
            // Handle string response
            const factCheckResult = String(factCheckResponse.data.fact_check_result).toLowerCase();
            explanation = factCheckResponse.data.fact_check_result;
            
            if (factCheckResult.includes('true')) {
              verdict = 'true';
            } else if (factCheckResult.includes('false') || factCheckResult.includes('not true')) {
              verdict = 'false';
            }
          }
        }
      }

      const resultData = {
        input,
        claim: claimText,
        verdict,
        explanation,
        blockchainHash: 'abct123',
        timestamp: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        wallet: 'BRBK...sLJM',
      };

      setResult(resultData);
      setState('result');

      addClaim({
        text: claimText,
        timestamp: resultData.timestamp,
        date: resultData.date,
        wallet: resultData.wallet,
        status: verdict,
      });

      navigationTimeoutRef.current = setTimeout(() => {
        navigate('/verified-claims');
      }, 10000);
    } catch (error) {
      console.error('API Error:', error);
      const fallbackVerdict = ['true', 'false', 'uncertain'][Math.floor(Math.random() * 3)];
      const errorMessage = error.message || 'Unknown error';
      
      const resultData = {
        input,
        claim: textToCheck || input,
        verdict: fallbackVerdict,
        explanation: `⚠️ An error occurred: ${errorMessage}. Using fallback mock explanation.`,
        blockchainHash: 'abct123',
        timestamp: new Date().toLocaleTimeString(),
        date: new Date().toLocaleDateString(),
        wallet: 'BRBK...sLJM',
      };

      setResult(resultData);
      setState('result');

      addClaim({
        text: textToCheck || input,
        timestamp: resultData.timestamp,
        date: resultData.date,
        wallet: resultData.wallet,
        status: fallbackVerdict,
      });

      navigationTimeoutRef.current = setTimeout(() => {
        navigate('/verified-claims');
      }, 10000);
    }
  };

  const handleCheckAnother = () => {
    if (navigationTimeoutRef.current) {
      clearTimeout(navigationTimeoutRef.current);
      navigationTimeoutRef.current = null;
    }

    setInput('');
    setResult(null);
    setTextToCheck('');
    setState('initial');
  };

  const handleLearnMore = () => {
    console.log('Learn more clicked');
    // Implement learn more functionality here
  };

  return (
    <div className="quick-check-page">
      <div className="container">
        {state === 'initial' && (
          <>
            <h1 className="title-h1" style={{ fontSize: '2rem', fontWeight: 600, color: 'white', textAlign: 'center' }}>
              {t.quickCheckTitle || 'Quick Check'}
            </h1>
            <div className="wallet-status">
              <span className="connected">Connected: BRBK...sLJM</span>
            </div>
            <p className="real-or-fake">{t.realOrFake || 'Is It Real or Fake?'}</p>
            <form onSubmit={handleSubmit} className="quick-check-form">
              <div className="input-container">
                <input
                  type="text"
                  placeholder={t.enterText || 'Paste claim or URL here'}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="claim-input"
                />
                <button type="button" className="plus-button">+</button>
                <button type="button" className="offline-toggle" onClick={toggleOnlineStatus}>
                  <span className="offline-icon"></span>
                  {isOnline ? 'Online' : 'Offline'}
                </button>
                <button type="submit" className="verify-button" disabled={!input.trim()}>
                  {t.checkText || 'Verify'}
                </button>
              </div>
            </form>
          </>
        )}

        {state === 'verifying' && (
          <>
            <h1>Verifying...</h1>
            <div className="loading-indicator">
              <div className="spinner"></div>
            </div>
            <form className="quick-check-form">
              <div className="input-container">
                <input type="text" value={input} className="claim-input" disabled />
                <button type="button" className="plus-button" disabled>+</button>
                <button type="button" className="offline-toggle" disabled>
                  <span className="offline-icon"></span>
                  {isOnline ? 'Online' : 'Offline'}
                </button>
                <button type="button" className="verify-button" disabled>
                  {t.checkText || 'Verify'}
                </button>
              </div>
            </form>
            {textToCheck && (
              <div className="extracted-preview" style={{ marginTop: '1rem', background: '#eee', padding: '10px' }}>
                <strong>Extracted Claim:</strong>
                <p>{textToCheck}</p>
              </div>
            )}
          </>
        )}

        {state === 'result' && result && (
          <div className="result-container">
            <h1 className={`result-title ${result.verdict}`}>
              {result.verdict === 'true' ? '✅ TRUE!' : result.verdict === 'false' ? '❌ False!' : '🤔 Uncertain...'}
            </h1>
            <p><strong>Claim Checked:</strong> {result.claim}</p>
            {!isOnline && (
              <p className="offline-message">⚠️ Offline: Results are based on mock data.</p>
            )}
            <p className="result-explanation">{typeof result.explanation === 'string' ? result.explanation : JSON.stringify(result.explanation)}</p>
            <p className="blockchain-info">Verified on blockchain: #{result.blockchainHash}</p>
            <div className="button-container">
              <button onClick={handleCheckAnother} className="check-another-button">Check Another</button>
              <button onClick={handleLearnMore} className="learn-more-link">Learn more...</button>
            </div>
            <p className="auto-redirect">
              You will be redirected to verified claims page in 10 seconds...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickCheckPage;