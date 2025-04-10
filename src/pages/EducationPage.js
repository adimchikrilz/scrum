// pages/EducationPage.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../contexts/LanguageContext';
import translations from '../utils/translations';

const EducationPage = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  
  // Translation fallbacks for education page content
  const educationContent = {
    title: language === 'en' ? 'Learn to Identify Misinformation' : 'Learn to Identify Misinformation',
    introText: language === 'en' 
      ? 'Learning how to identify misinformation is an essential skill in today\'s digital world. Use these resources to help you become more information literate.'
      : 'Learning how to identify misinformation is an essential skill in today\'s digital world. Use these resources to help you become more information literate.',
    
    section1Title: language === 'en' ? 'Common Types of Misinformation' : 'Common Types of Misinformation',
    section2Title: language === 'en' ? 'Red Flags to Watch For' : 'Red Flags to Watch For',
    section3Title: language === 'en' ? 'Fact-Checking Resources' : 'Fact-Checking Resources',
    
    typesContent: [
      {
        title: language === 'en' ? 'Manipulated Content' : 'Manipulated Content',
        description: language === 'en' 
          ? 'Content that has been edited, photoshopped, or otherwise altered to mislead.'
          : 'Content that has been edited, photoshopped, or otherwise altered to mislead.'
      },
      {
        title: language === 'en' ? 'False Context' : 'False Context',
        description: language === 'en' 
          ? 'Genuine content shared with false contextual information.'
          : 'Genuine content shared with false contextual information.'
      },
      {
        title: language === 'en' ? 'Imposter Content' : 'Imposter Content',
        description: language === 'en' 
          ? 'Content that impersonates genuine sources to spread misinformation.'
          : 'Content that impersonates genuine sources to spread misinformation.'
      },
      {
        title: language === 'en' ? 'Fabricated Content' : 'Fabricated Content',
        description: language === 'en' 
          ? '100% false information designed to deceive and cause harm.'
          : '100% false information designed to deceive and cause harm.'
      }
    ],
    
    redFlagsContent: [
      {
        flag: language === 'en' ? 'Emotionally manipulative language' : 'Emotionally manipulative language',
        explanation: language === 'en' 
          ? 'Content designed to make you angry, scared, or outraged is often meant to cloud your judgment.'
          : 'Content designed to make you angry, scared, or outraged is often meant to cloud your judgment.'
      },
      {
        flag: language === 'en' ? 'Urgency to share' : 'Urgency to share',
        explanation: language === 'en' 
          ? 'Claims that ask you to "share before they take this down" are usually false.'
          : 'Claims that ask you to "share before they take this down" are usually false.'
      },
      {
        flag: language === 'en' ? 'Poor grammar and spelling' : 'Poor grammar and spelling',
        explanation: language === 'en' 
          ? 'Professional news organizations proofread their content. Numerous errors may indicate an unreliable source.'
          : 'Professional news organizations proofread their content. Numerous errors may indicate an unreliable source.'
      },
      {
        flag: language === 'en' ? 'No author or publication date' : 'No author or publication date',
        explanation: language === 'en' 
          ? 'Legitimate news includes who wrote it and when. Missing information can be a warning sign.'
          : 'Legitimate news includes who wrote it and when. Missing information can be a warning sign.'
      }
    ],
    
    resourcesContent: [
      {
        name: 'Africa Check',
        description: language === 'en' 
          ? 'Independent fact-checking organization focusing on Africa.'
          : 'Independent fact-checking organization focusing on Africa.',
        url: 'https://africacheck.org'
      },
      {
        name: 'Dubawa',
        description: language === 'en' 
          ? 'Fact-checking platform active in Nigeria and other West African countries.'
          : 'Fact-checking platform active in Nigeria and other West African countries.',
        url: 'https://dubawa.org'
      },
      {
        name: 'International Fact-Checking Network',
        description: language === 'en' 
          ? 'Global network of fact-checking organizations.'
          : 'Global network of fact-checking organizations.',
        url: 'https://www.poynter.org/ifcn/'
      }
    ]
  };
  
  return (
    <div className="education-page">
      <div className="container">
        <h1>{educationContent.title}</h1>
        <p className="intro-text">{educationContent.introText}</p>
        
        <section className="education-section">
          <h2>{educationContent.section1Title}</h2>
          <div className="info-cards">
            {educationContent.typesContent.map((type, index) => (
              <div className="info-card" key={index}>
                <h3>{type.title}</h3>
                <p>{type.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        <section className="education-section">
          <h2>{educationContent.section2Title}</h2>
          <div className="red-flags">
            {educationContent.redFlagsContent.map((flag, index) => (
              <div className="red-flag" key={index}>
                <div className="flag-icon">🚩</div>
                <div className="flag-content">
                  <h3>{flag.flag}</h3>
                  <p>{flag.explanation}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        
        <section className="education-section">
          <h2>{educationContent.section3Title}</h2>
          <div className="resources">
            {educationContent.resourcesContent.map((resource, index) => (
              <div className="resource" key={index}>
                <h3>{resource.name}</h3>
                <p>{resource.description}</p>
                <a href={resource.url} target="_blank" rel="noopener noreferrer" className="resource-link">
                  {language === 'en' ? 'Visit Website' : 'Visit Website'}
                </a>
              </div>
            ))}
          </div>
        </section>
        
        <div className="cta-section">
          <h2>{language === 'en' ? 'Ready to Verify Content?' : 'Ready to Verify Content?'}</h2>
          <Link to="/quick-check" className="cta-button">
            {language === 'en' ? 'Use Quick Check Tool' : 'Use Quick Check Tool'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EducationPage;