// // import React, { useState, useContext } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import ImageVerifier from '../components/ImageVerifier';
// // import TextVerifier from '../components/TextVerifier';
// // import LinkVerifier from '../components/LinkVerifier';
// // import LanguageContext from '../contexts/LanguageContext';
// // import translations from '../utils/translations';

// // const QuickCheckPage = () => {
// //   const [checkType, setCheckType] = useState('text');
// //   const navigate = useNavigate();
// //   const { language } = useContext(LanguageContext);
// //   const t = translations[language];
  
// //   const handleResult = (result) => {
// //     // In a real app, we'd save this result to the backend and get an ID
// //     const resultId = Date.now().toString();
// //     // For demo purposes, store in sessionStorage
// //     sessionStorage.setItem(`result-${resultId}`, JSON.stringify(result));
// //     navigate(`/results/${resultId}`);
// //   };
  
// //   return (
// //     <div className="quick-check-page">
// //       <div className="container">
// //         <h1>{t.quickCheckTitle}</h1>
// //         <p>{t.quickCheckDescription}</p>
        
// //         <div className="verification-tabs">
// //           <button 
// //             className={`tab ${checkType === 'text' ? 'active' : ''}`}
// //             onClick={() => setCheckType('text')}
// //           >
// //             {t.textTab}
// //           </button>
// //           <button 
// //             className={`tab ${checkType === 'image' ? 'active' : ''}`}
// //             onClick={() => setCheckType('image')}
// //           >
// //             {t.imageTab}
// //           </button>
// //           <button 
// //             className={`tab ${checkType === 'link' ? 'active' : ''}`}
// //             onClick={() => setCheckType('link')}
// //           >
// //             {t.linkTab}
// //           </button>
// //         </div>
        
// //         <div className="verification-content">
// //           {checkType === 'text' && <TextVerifier onResult={handleResult} />}
// //           {checkType === 'image' && <ImageVerifier onResult={handleResult} />}
// //           {checkType === 'link' && <LinkVerifier onResult={handleResult} />}
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };
// // export default QuickCheckPage;

// // pages/QuickCheckPage.js
// import React, { useState, useContext } from 'react';
// import { useNavigate } from 'react-router-dom';
// import LanguageContext from '../contexts/LanguageContext';
// import translations from '../utils/translations';

// const QuickCheckPage = () => {
//   const [input, setInput] = useState('');
//   const [isAnalyzing, setIsAnalyzing] = useState(false);
//   const navigate = useNavigate();
//   const { language } = useContext(LanguageContext);
//   const t = translations[language];

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     setIsAnalyzing(true);

//     // Mock analysis (replace with real API or Web3 call later)
//     setTimeout(() => {
//       const result = {
//         input,
//         verdict: ['confirmed', 'false', 'mixed'][Math.floor(Math.random() * 3)],
//         truthScore: Math.floor(Math.random() * 100),
//         explanation: 'This is a simulated result for demonstration.',
//         sources: ['Example Source'],
//       };

//       const resultId = Date.now().toString();
//       sessionStorage.setItem(`result-${resultId}`, JSON.stringify(result));
//       setIsAnalyzing(false);
//       navigate(`/results/${resultId}`);
//     }, 1500);
//   };

//   return (
//     <div className="quick-check-page">
//       <div className="container">
//         <h1>{t.quickCheckTitle}</h1>
//         <div className="wallet-status">
//           {/* This is already in Header, but Figma shows it here too */}
//           <span className="connected">Connected: BRBK...sLJM</span>
//         </div>
//         <form onSubmit={handleSubmit} className="quick-check-form">
//           <input
//             type="text"
//             placeholder={t.enterText || 'Paste claim or link here'}
//             value={input}
//             onChange={(e) => setInput(e.target.value)}
//             className="claim-input"
//             disabled={isAnalyzing}
//           />
//           <button
//             type="submit"
//             className="check-now-button"
//             disabled={!input.trim() || isAnalyzing}
//           >
//             {isAnalyzing ? t.analyzing || 'Analyzing...' : 'Check Now'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default QuickCheckPage;

// // pages/QuickCheckPage.js
// import React, { useState, useContext } from 'react';
// import LanguageContext from '../contexts/LanguageContext';
// import translations from '../utils/translations';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// const QuickCheckPage = () => {
//   const [input, setInput] = useState('');
//   const [state, setState] = useState('initial'); // 'initial', 'verifying', 'result'
//   const [result, setResult] = useState(null);
//   const [isOnline, setIsOnline] = useState(navigator.onLine); // Track online/offline state
//   const { language } = useContext(LanguageContext);
//   const t = translations[language];

//   // Toggle online/offline state (for demo purposes)
//   const toggleOnlineStatus = () => {
//     setIsOnline((prev) => !prev);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     setState('verifying');

//     // Mock verification (replace with real API or Web3 call later)
//     setTimeout(() => {
//       // Simulate different results
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
//       };

//       setResult(resultData);
//       setState('result');
//     }, 1500);
//   };

//   const handleCheckAnother = () => {
//     setInput('');
//     setResult(null);
//     setState('initial');
//   };

//   const handleLearnMore = () => {
//     // Placeholder for future navigation or action
//     console.log('Learn more clicked');
//   };

//   return (
//     <div className="quick-check-page">
//       <div className="container">
//       {state === 'initial' && (
//   <>
//     <h1 className='title-h1'
//     style={{
//       fontSize: '2rem',
//       fontWeight: 600,
//       lineHeight: 1.2,
//       marginBottom: '1rem',
//       color: 'white',
//       textAlign: 'center'
//     }}>{t.quickCheckTitle || 'Quick Check'}</h1>
//     <div className="wallet-status">
//       <span className="connected">Connected: BRBK...sLJM</span>
//     </div>
//     <p className="real-or-fake">{language === 'en' ? 'Is It Real or Fake?' : 'Is It Real or Fake?'}</p>
//     <form onSubmit={handleSubmit} className="quick-check-form">
//       <div className="input-container">
//         <input
//           type="text"
//           placeholder={t.enterText || 'Paste claim or URL here'}
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           className="claim-input"
//         />
//         <button type="button" className="plus-button">
//           +
//         </button>
//         <button type="button" className="offline-toggle" onClick={toggleOnlineStatus}>
//           <span className="offline-icon"></span>
//           {isOnline ? 'Online' : 'Offline'}
//         </button>
//         <button type="submit" className="verify-button">
//           {t.checkText || 'Verify'}
//         </button>
//       </div>
//     </form>
//   </>
// )}

//         {state === 'verifying' && (
//           <>
//             <h1 className='title-h1'>Verifying...</h1>
//             <form className="quick-check-form">
//               <div className="input-container">
//                 <input
//                   type="text"
//                   value={input}
//                   className="claim-input"
//                   disabled
//                 />
//                 <button type="button" className="plus-button" disabled>
//                   +
//                 </button>
//                 <button type="button" className="offline-toggle" disabled>
//                   <span className="offline-icon">
                 
//                   </span>
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
//             <p className="result-explanation">{result.explanation}</p>
//             <p className="blockchain-info">
//               Verified on blockchain: #{result.blockchainHash}
//             </p>
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
// pages/QuickCheckPage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import LanguageContext from '../contexts/LanguageContext';
import { ClaimsContext } from '../contexts/ClaimsContext'; // Import ClaimsContext
import translations from '../utils/translations';

const QuickCheckPage = () => {
  const [input, setInput] = useState('');
  const [state, setState] = useState('initial'); // 'initial', 'verifying', 'result'
  const [result, setResult] = useState(null);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const { language } = useContext(LanguageContext);
  const { addClaim } = useContext(ClaimsContext); // Access addClaim from ClaimsContext
  const t = translations[language] || translations['en'];
  const navigate = useNavigate(); // For navigation to Verified Claims page

  const toggleOnlineStatus = () => {
    setIsOnline((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setState('verifying');

    // Mock verification (replace with real API or Web3 call later)
    setTimeout(() => {
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
        timestamp: new Date().toLocaleTimeString(), // Current time
        date: new Date().toLocaleDateString(), // Current date
        wallet: 'BRBK...sLJM', // Mock wallet address
      };

      setResult(resultData);
      setState('result');

      // Add the claim to the shared state
      addClaim({
        text: input,
        timestamp: resultData.timestamp,
        date: resultData.date,
        wallet: resultData.wallet,
        status: verdict === 'true' ? 'true' : 'false', // Map verdict to status
      });

      // Navigate to Verified Claims page after a short delay to show the result
      setTimeout(() => {
        navigate('/verified-claims');
      }, 1000);
    }, 1500);
  };

  const handleCheckAnother = () => {
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
            <h1 className='title-h1'
    style={{
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.2,
      marginBottom: '1rem',
      color: 'white',
      textAlign: 'center'
    }}>{t.quickCheckTitle || 'Quick Check'}</h1>
            <div className="wallet-status">
              <span className="connected">Connected: BRBK...sLJM</span>
            </div>
            <p className="real-or-fake">{language === 'en' ? 'Is It Real or Fake?' : 'Is It Real or Fake?'}</p>
            {/* <form onSubmit={handleSubmit} className="quick-check-form">
              <div className="input-wrapper">
                <label className="input-label">{t.enterText || 'Paste claim or URL here'}</label>
                <div className="input-container">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="claim-input"
                  />
                  <div className="button-group">
                    <div className="left-buttons">
                      <button type="button" className="plus-button">
                        +
                      </button>
                      <button type="button" className="offline-toggle" onClick={toggleOnlineStatus}>
                        <span className="offline-icon"></span>
                        {isOnline ? 'Online' : 'Offline'}
                      </button>
                    </div>
                    <button type="submit" className="verify-button">
                      {t.checkText || 'Verify'}
                    </button>
                  </div>
                </div>
              </div>
            </form> */}
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
            {/* <form className="quick-check-form">
              <div className="input-wrapper">
                <label className="input-label">{t.enterText || 'Paste claim or URL here'}</label>
                <div className="input-container">
                  <input
                    type="text"
                    value={input}
                    className="claim-input"
                    disabled
                  />
                  <div className="button-group">
                    <div className="left-buttons">
                      <button type="button" className="plus-button" disabled>
                        +
                      </button>
                      <button type="button" className="offline-toggle" disabled>
                        <span className="offline-icon"></span>
                        {isOnline ? 'Online' : 'Offline'}
                      </button>
                    </div>
                    <button type="button" className="verify-button" disabled>
                      {t.checkText || 'Verify'}
                    </button>
                  </div>
                </div>
              </div>
            </form> */}
            <form className="quick-check-form">
              <div className="input-container">
                 <input
                  type="text"
                  value={input}
                  className="claim-input"
                  disabled
                />
                <button type="button" className="plus-button" disabled>
                  +
                </button>
                <button type="button" className="offline-toggle" disabled>
                  <span className="offline-icon">
                 
                  </span>
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
            <p className="result-explanation">{result.explanation}</p>
            <p className="blockchain-info">
              Verified on blockchain: #{result.blockchainHash}
            </p>
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
