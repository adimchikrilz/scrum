// // components/LanguageSelector.js
// import React, { useContext } from 'react';
// import LanguageContext from '../contexts/LanguageContext';

// const LanguageSelector = () => {
//   const { language, changeLanguage } = useContext(LanguageContext);
  
//   return (
//     <div className="language-selector">
//       <select 
//         value={language} 
//         onChange={(e) => changeLanguage(e.target.value)}
//       >
//         <option value="en">English</option>
//         <option value="ha">Hausa</option>
//         <option value="yo">Yoruba</option>
//         <option value="ig">Igbo</option>
//       </select>
//     </div>
//   );
// };
// export default LanguageSelector;

// // components/LanguageSelector.js
// import React, { useContext } from 'react';
// import LanguageContext from '../contexts/LanguageContext';
// import {FaGlobe} from 'react-icons/fa';

// const LanguageSelector = () => {
//   const { language, changeLanguage } = useContext(LanguageContext);

//   const handleLanguageChange = (event) => {
//     changeLanguage(event.target.value);
//   };

//   return (
//     <div className="language-selector">
//       <select value={language} onChange={handleLanguageChange}>
//         <option value="en">EN</option>
//         <option value="ha">HA</option>
//         <option value="yo">YO</option>
//         <option value="ig">IG</option>
//       </select>
//     </div>
//   );
// };

// export default LanguageSelector;
// components/LanguageSelector.js
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe } from '@fortawesome/free-solid-svg-icons'; // Import the fa-globe icon
import LanguageContext from '../contexts/LanguageContext';

const LanguageSelector = () => {
  const { language, changeLanguage } = useContext(LanguageContext);

  const handleLanguageChange = (event) => {
    changeLanguage(event.target.value);
  };

  return (
    <div className="language-selector">
      <FontAwesomeIcon icon={faGlobe} className="language-icon" />
      <select value={language} onChange={handleLanguageChange}>
        <option value="en">EN</option>
        <option value="ha">HA</option>
        <option value="yo">YO</option>
        <option value="ig">IG</option>
      </select>
    </div>
  );
};

export default LanguageSelector;