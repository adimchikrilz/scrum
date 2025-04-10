import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../contexts/LanguageContext';
import translations from '../utils/translations';

const HomePage = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  
  return (
    <div className="home-page">
      <section className="hero">
        <div className="container">
          <h1>{t.heroTitle}</h1>
          <p>{t.heroSubtitle}</p>
          <Link to="/quick-check" className="cta-button">
            {t.startVerifying}
          </Link>
        </div>
      </section>
      
      <section className="features">
        <div className="container">
          <h2>{t.featuresTitle}</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🔍</div>
              <h3>{t.quickCheckFeature}</h3>
              <p>{t.quickCheckDescription}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>{t.offlineFeature}</h3>
              <p>{t.offlineDescription}</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🗣️</div>
              <h3>{t.languageFeature}</h3>
              <p>{t.languageDescription}</p>
            </div>
          </div>
        </div>
      </section>
      
      <section className="how-it-works">
        <div className="container">
          <h2>{t.howItWorksTitle}</h2>
          <div className="steps">
            <div className="step">
              <div className="step-number">1</div>
              <h3>{t.step1Title}</h3>
              <p>{t.step1Description}</p>
            </div>
            <div className="step">
              <div className="step-number">2</div>
              <h3>{t.step2Title}</h3>
              <p>{t.step2Description}</p>
            </div>
            <div className="step">
              <div className="step-number">3</div>
              <h3>{t.step3Title}</h3>
              <p>{t.step3Description}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default HomePage;