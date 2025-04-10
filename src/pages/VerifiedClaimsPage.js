// src/pages/VerifiedClaimsPage.js
import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faUser, faTimesCircle, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import LanguageContext from '../contexts/LanguageContext';
import { ClaimsContext } from '../contexts/ClaimsContext'; // Import ClaimsContext
import translations from '../utils/translations';

const VerifiedClaimsPage = () => {
  const { language } = useContext(LanguageContext);
  const { claims } = useContext(ClaimsContext); // Access claims from ClaimsContext
  const t = translations[language] || translations['en'];

  // Mock data for verified claims (used as a fallback)
  const mockClaims = [
    {
      id: 1,
      text: "Ukraine claims Chinese mercenaries fighting for Russia: Ukraine states over 150 Chinese mercenaries are...",
      timestamp: "12:13 PM",
      date: "2/4/2025",
      wallet: "BRBK...sLJM",
      status: "false",
    },
    {
      id: 2,
      text: "Ukraine claims Chinese mercenaries fighting for Russia: Ukraine states over 150 Chinese mercenaries are...",
      timestamp: "12:13 PM",
      date: "2/4/2025",
      wallet: "BRBK...sLJM",
      status: "false",
    },
    {
      id: 3,
      text: "Ukraine claims Chinese mercenaries fighting for Russia: Ukraine states over 150 Chinese mercenaries are...",
      timestamp: "12:13 PM",
      date: "2/4/2025",
      wallet: "BRBK...sLJM",
      status: "false",
    },
    {
      id: 4,
      text: "Ukraine claims Chinese mercenaries fighting for Russia: Ukraine states over 150 Chinese mercenaries are...",
      timestamp: "12:13 PM",
      date: "2/4/2025",
      wallet: "BRBK...sLJM",
      status: "false",
    },
    {
      id: 5,
      text: "Americans convicted in Congo of a botched coup attempt now face US charges: Three Americans repatriated from Congo for...",
      timestamp: "12:13 PM",
      date: "2/4/2025",
      wallet: "BRBK...sLJM",
      status: "true",
    },
  ];

  // Combine mock data with claims from context
  const allClaims = [...mockClaims, ...claims];

  return (
    <div className="verified-claims-page">
      <div className="container">
        <h1>{t.verifiedClaims || 'Verified Claims'}</h1>
        <div className="claims-list">
          {allClaims.length === 0 ? (
            <p className="no-claims">No verified claims yet.</p>
          ) : (
            allClaims.map((claim) => (
              <div key={claim.id} className="claim-card">
                <div className="claim-image-placeholder"></div>
                <div className="claim-content">
                  <p className="claim-text">{claim.text}</p>
                  <div className="claim-meta">
                    <span className="claim-timestamp">{claim.timestamp}</span>
                    <span className="claim-date">
                      <FontAwesomeIcon icon={faCalendarAlt} className="meta-icon" />
                      {claim.date}
                    </span>
                    <span className="claim-wallet">
                      <FontAwesomeIcon icon={faUser} className="meta-icon" />
                      {claim.wallet}
                    </span>
                  </div>
                </div>
                <div className="claim-status">
                  <FontAwesomeIcon
                    icon={claim.status === 'true' ? faCheckCircle : faTimesCircle}
                    className={`status-icon ${claim.status}`}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default VerifiedClaimsPage;