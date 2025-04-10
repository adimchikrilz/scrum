// // components/Footer.js
// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import LanguageContext from '../contexts/LanguageContext';
// import translations from '../utils/translations';

// const Footer = () => {
//   const { language } = useContext(LanguageContext);
//   const t = translations[language];
  
//   return (
//     <footer className="footer">
//       <div className="container">
//         <div className="footer-content">
//           <div className="footer-logo">
//             <Link to="/">
//               <img src="/logo.svg" alt="TruthCheck" />
//               <span>TruthCheck</span>
//             </Link>
//             <p>© {new Date().getFullYear()} TruthCheck</p>
//           </div>
          
//           <div className="footer-links">
//             <div className="footer-section">
//               <h4>Quick Links</h4>
//               <ul>
//                 <li><Link to="/">{t.home}</Link></li>
//                 <li><Link to="/quick-check">{t.quickCheck}</Link></li>
//                 <li><Link to="/education">{t.education}</Link></li>
//               </ul>
//             </div>
            
//             <div className="footer-section">
//               <h4>Resources</h4>
//               <ul>
//                 <li><a href="#">{language === 'en' ? 'About Us' : 'About Us'}</a></li>
//                 <li><a href="#">{language === 'en' ? 'Privacy Policy' : 'Privacy Policy'}</a></li>
//                 <li><a href="#">{language === 'en' ? 'Terms of Use' : 'Terms of Use'}</a></li>
//               </ul>
//             </div>
            
//             <div className="footer-section">
//               <h4>Contact</h4>
//               <ul>
//                 <li><a href="mailto:info@truthcheck.ng">info@truthcheck.ng</a></li>
//                 <li><a href="tel:+2348000000000">+234 800 000 0000</a></li>
//                 <li className="social-icons">
//                   <a href="#" aria-label="Facebook"><span role="img" aria-label="Facebook">📘</span></a>
//                   <a href="#" aria-label="Twitter"><span role="img" aria-label="Twitter">🐦</span></a>
//                   <a href="#" aria-label="Instagram"><span role="img" aria-label="Instagram">📷</span></a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
        
//         <div className="footer-bottom">
//           <p>{language === 'en' ? 'Developed to combat misinformation in Nigeria' : 'Developed to combat misinformation in Nigeria'}</p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

// components/Footer.js
import React from 'react';

const Footer = () => {
  return (
    <footer>
      <p>Fighting Misinformation in Nigeria with Blockchain © TruthCheck 2025</p>
    </footer>
  );
};

export default Footer;