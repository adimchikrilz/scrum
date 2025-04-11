// // App.js - Main application component
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import HomePage from './pages/HomePage';
// import QuickCheckPage from './pages/QuickCheckPage';
// import ResultsPage from './pages/ResultsPage';
// import EducationPage from './pages/EducationPage';
// import OfflineNotice from './components/OfflineNotice';
// import LanguageContext from './contexts/LanguageContext';
// import './App.css';

// const App = () => {
//   const [isOnline, setIsOnline] = useState(navigator.onLine);
//   const [language, setLanguage] = useState('en'); // Default language
  
//   useEffect(() => {
//     // Check for stored language preference
//     const storedLanguage = localStorage.getItem('language');
//     if (storedLanguage) {
//       setLanguage(storedLanguage);
//     }
    
//     // Update online status
//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);
    
//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);
    
//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//     };
//   }, []);
  
//   const changeLanguage = (newLanguage) => {
//     setLanguage(newLanguage);
//     localStorage.setItem('language', newLanguage);
//   };
  
//   return (
//     <LanguageContext.Provider value={{ language, changeLanguage }}>
//       <Router>
//         <div className="app">
//           {!isOnline && <OfflineNotice />}
//           <Header />
//           <main className="main-content">
//             <Routes>
//               <Route path="/" element={<HomePage />} />
//               <Route path="/quick-check" element={<QuickCheckPage />} />
//               <Route path="/results/:id" element={<ResultsPage />} />
//               <Route path="/education" element={<EducationPage />} />
//             </Routes>
//           </main>
//           <Footer />
//         </div>
//       </Router>
//     </LanguageContext.Provider>
//   );
// };

// export default App;
// // App.js
// import React, { useState, useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import QuickCheckPage from './pages/QuickCheckPage';
// import VerifiedClaimsPage from './pages/VerifiedClaimsPage';
// import LanguageContext from './contexts/LanguageContext';
// import { ClaimsProvider } from './contexts/ClaimsContext'; // Import ClaimsProvider

// import './App.css';

// const App = () => {
//   const [isOnline, setIsOnline] = useState(navigator.onLine);
//   const [language, setLanguage] = useState('en');
//   const supportedLanguages = ['en', 'ha', 'yo', 'ig'];

//   useEffect(() => {
//     const storedLanguage = localStorage.getItem('language');
//     if (storedLanguage && supportedLanguages.includes(storedLanguage)) {
//       setLanguage(storedLanguage);
//     } else {
//       setLanguage('en');
//       localStorage.setItem('language', 'en');
//     }

//     const handleOnline = () => setIsOnline(true);
//     const handleOffline = () => setIsOnline(false);

//     window.addEventListener('online', handleOnline);
//     window.addEventListener('offline', handleOffline);

//     return () => {
//       window.removeEventListener('online', handleOnline);
//       window.removeEventListener('offline', handleOffline);
//     };
//   }, []);

//   const changeLanguage = (newLanguage) => {
//     if (supportedLanguages.includes(newLanguage)) {
//       setLanguage(newLanguage);
//       localStorage.setItem('language', newLanguage);
//     } else {
//       setLanguage('en');
//       localStorage.setItem('language', 'en');
//     }
//   };

//   return (
//     <ClaimsProvider> {/* Wrap the app in ClaimsProvider */}
//       <LanguageContext.Provider value={{ language, changeLanguage }}>
//         <Router>
//           <div className="app">
//             {!isOnline && <div>Offline Notice</div>}
//             <Header />
//             <main className="main-content">
//               <Routes>
//                 <Route path="/" element={<div>Home Page</div>} />
//                 <Route path="/quick-check" element={<QuickCheckPage />} />
//                 <Route path="/verified-claims" element={<VerifiedClaimsPage />} />
//                 <Route path="/blog" element={<div>Blog</div>} />
//               </Routes>
//             </main>
//             <Footer />
//           </div>
//         </Router>
//       </LanguageContext.Provider>
//     </ClaimsProvider>
//   );
// };

// export default App;

// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import QuickCheckPage from './pages/QuickCheckPage';
import VerifiedClaimsPage from './pages/VerifiedClaimsPage';
import BlogPage from './pages/BlogPage'; // Add this import
import LanguageContext from './contexts/LanguageContext';
import { ClaimsProvider } from './contexts/ClaimsContext';
import './App.css';

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [language, setLanguage] = useState('en');
  const supportedLanguages = ['en', 'ha', 'yo', 'ig'];

  useEffect(() => {
    const storedLanguage = localStorage.getItem('language');
    if (storedLanguage && supportedLanguages.includes(storedLanguage)) {
      setLanguage(storedLanguage);
    } else {
      setLanguage('en');
      localStorage.setItem('language', 'en');
    }

    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const changeLanguage = (newLanguage) => {
    if (supportedLanguages.includes(newLanguage)) {
      setLanguage(newLanguage);
      localStorage.setItem('language', newLanguage);
    } else {
      setLanguage('en');
      localStorage.setItem('language', 'en');
    }
  };

  return (
    <ClaimsProvider>
      <LanguageContext.Provider value={{ language, changeLanguage }}>
        <Router>
          <div className="app">
            {!isOnline && <div>Offline Notice</div>}
            <Header />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<div>Home Page</div>} />
                <Route path="/quick-check" element={<QuickCheckPage />} />
                <Route path="/verified-claims" element={<VerifiedClaimsPage />} />
                <Route path="/blog" element={<BlogPage />} /> {/* Updated to use BlogPage */}
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </LanguageContext.Provider>
    </ClaimsProvider>
  );
};

export default App;