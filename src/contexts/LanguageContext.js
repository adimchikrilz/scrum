// contexts/LanguageContext.js
import { createContext } from 'react';

// Create context with default values
const LanguageContext = createContext({
  language: 'en',
  changeLanguage: () => {},
});

export default LanguageContext;