// // components/Header.js
// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import LanguageSelector from './LanguageSelector';
// import LanguageContext from '../contexts/LanguageContext';
// import translations from '../utils/translations';

// const Header = () => {
//   const { language } = useContext(LanguageContext);
//   const t = translations[language];
  
//   return (
//     <header className="header">
//       <div className="logo">
//         <Link to="/">
//           <img src="/logo.svg" alt="TruthCheck" />
//           <span>TruthCheck</span>
//         </Link>
//       </div>
//       <nav className="main-nav">
//         <ul>
//           <li><Link to="/">{t.home}</Link></li>
//           <li><Link to="/quick-check">{t.quickCheck}</Link></li>
//           <li><Link to="/education">{t.education}</Link></li>
//         </ul>
//       </nav>
//       <LanguageSelector />
//     </header>
//   );
// };
// export default Header;

// // components/Header.js
// import React, { useContext, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { ethers } from 'ethers'; // Import ethers for Web3
// import LanguageSelector from './LanguageSelector';
// import LanguageContext from '../contexts/LanguageContext';
// import translations from '../utils/translations';

// const Header = () => {
//   const { language } = useContext(LanguageContext);
//   const t = translations[language];
//   const [walletAddress, setWalletAddress] = useState(null);

//   // Function to shorten the address for display (e.g., BRBK...sLJM)
//   const shortenAddress = (addr) => {
//     if (!addr) return '';
//     return ${addr.slice(0, 4)}...${addr.slice(-4)};
//   };

//   // Connect to MetaMask or other wallet
//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         await provider.send('eth_requestAccounts', []); // Request wallet connection
//         const signer = await provider.getSigner();
//         const addr = await signer.getAddress(); // Unique variable name
//         const shortAddress = shortenAddress(addr);
//         setWalletAddress(shortAddress);
//       } catch (error) {
//         console.error('Wallet connection failed:', error);
//       }
//     } else {
//       alert('Please install MetaMask or another Web3 wallet.');
//     }
//   };

//   // Check if wallet is already connected on mount
//   useEffect(() => {
//     if (!window.ethereum) return;

//     const checkWalletConnection = async () => {
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const accounts = await provider.listAccounts();
//         if (accounts.length > 0) {
//           const addr = accounts[0]; // Unique variable name
//           const shortAddress = shortenAddress(addr);
//           setWalletAddress(shortAddress);
//         }
//       } catch (error) {
//         console.error('Error checking wallet connection:', error);
//       }
//     };

//     checkWalletConnection();

//     // Listen for account changes
//     window.ethereum.on('accountsChanged', (accounts) => {
//       if (accounts.length > 0) {
//         const shortAddress = shortenAddress(accounts[0]);
//         setWalletAddress(shortAddress);
//       } else {
//         setWalletAddress(null);
//       }
//     });

//     // Cleanup event listener on unmount
//     return () => {
//       if (window.ethereum) {
//         window.ethereum.removeListener('accountsChanged', () => {});
//       }
//     };
//   }, []);

//   return (
//     <header className="header">
//       <div className="logo">
//         <Link to="/">
//           <img src="/logo.svg" alt="TruthCheck" />
//           <span>truthCheck</span>
//         </Link>
//       </div>
//       <nav className="main-nav">
//         <ul>
//           <li><Link to="/quick-check">{t.quickCheck}</Link></li>
//           <li><Link to="/verified-claims">{language === 'en' ? 'Verified Claims' : 'Verified Claims'}</Link></li>
//           <li><Link to="/blog">{language === 'en' ? 'Blog' : 'Blog'}</Link></li>
//         </ul>
//       </nav>
//       <div className="header-right">
//         <LanguageSelector />
//         <div className="wallet-status">
//           {walletAddress ? (
//             <span className="connected">Connected: {walletAddress}</span>
//           ) : (
//             <button onClick={connectWallet} className="connect-wallet">
//               Connect Wallet
//             </button>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;
// components/Header.js
// import React, { useContext, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { ethers } from 'ethers'; // Import ethers for Web3
// import LanguageSelector from './LanguageSelector';
// import LanguageContext from '../contexts/LanguageContext';
// import translations from '../utils/translations';

// const Header = () => {
//   const { language } = useContext(LanguageContext);
//   const t = translations[language];
//   const [walletAddress, setWalletAddress] = useState(null);

//   const shortenAddress = (addr) => {
//     if (!addr) return '';
//     return `${addr.slice(0, 4)}...${addr.slice(-4)}`; // Use backticks (`) for template literals
//   };

//   // Connect to MetaMask or other wallet
//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         await provider.send('eth_requestAccounts', []); // Request wallet connection
//         const signer = await provider.getSigner();
//         const addr = await signer.getAddress(); // Unique variable name
//         const shortAddress = shortenAddress(addr); // Added semicolon
//         setWalletAddress(shortAddress);
//       } catch (error) {
//         console.error('Wallet connection failed:', error);
//       }
//     } else {
//       alert('Please install MetaMask or another Web3 wallet.');
//     }
//   };

//   // Check if wallet is already connected on mount
//   useEffect(() => {
//     if (!window.ethereum) return;

//     const checkWalletConnection = async () => {
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const accounts = await provider.listAccounts();
//         if (accounts.length > 0) {
//           const addr = accounts[0]; // Unique variable name
//           const shortAddress = shortenAddress(addr);
//           setWalletAddress(shortAddress);
//         }
//       } catch (error) {
//         console.error('Error checking wallet connection:', error);
//       }
//     };

//     checkWalletConnection();

//     // Listen for account changes
//     window.ethereum.on('accountsChanged', (accounts) => {
//       if (accounts.length > 0) {
//         const shortAddress = shortenAddress(accounts[0]);
//         setWalletAddress(shortAddress);
//       } else {
//         setWalletAddress(null);
//       }
//     });

//     // Cleanup event listener on unmount
//     return () => {
//       if (window.ethereum) {
//         window.ethereum.removeListener('accountsChanged', () => {});
//       }
//     };
//   }, []);

//   return (
//     <header className="header">
//       <div className="logo">
//         <Link to="/">
//           <img src="/logo.svg" alt="TruthCheck" />
//           <span>truthCheck</span>
//         </Link>
//       </div>
//       <nav className="main-nav">
//         <ul>
//           <li><Link to="/quick-check">{t.quickCheck}</Link></li>
//           <li><Link to="/verified-claims">{language === 'en' ? 'Verified Claims' : 'Verified Claims'}</Link></li>
//           <li><Link to="/blog">{language === 'en' ? 'Blog' : 'Blog'}</Link></li>
//         </ul>
//       </nav>
//       <div className="header-right">
//         <LanguageSelector />
//         <div className="wallet-status">
//           {walletAddress ? (
//             <span className="connected">Connected: {walletAddress}</span>
//           ) : (
//             <button onClick={connectWallet} className="connect-wallet">
//               Connect Wallet
//             </button>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

// // components/Header.js
// import React, { useContext, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import { ethers } from 'ethers';
// import LanguageSelector from './LanguageSelector';
// import LanguageContext from '../contexts/LanguageContext';
// import translations from '../utils/translations';
// import Logo from '../assets/logo.png';

// const Header = () => {
//   const { language } = useContext(LanguageContext);
//   const t = translations[language] || translations['en']; // Fallback to 'en' if language is invalid
//   const [walletAddress, setWalletAddress] = useState(null);

//   const shortenAddress = (addr) => {
//     if (!addr) return '';
//     return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
//   };

//   const connectWallet = async () => {
//     if (window.ethereum) {
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         await provider.send('eth_requestAccounts', []);
//         const signer = await provider.getSigner();
//         const addr = await signer.getAddress();
//         const shortAddress = shortenAddress(addr);
//         setWalletAddress(shortAddress);
//       } catch (error) {
//         console.error('Wallet connection failed:', error);
//       }
//     } else {
//       alert('Please install MetaMask or another Web3 wallet.');
//     }
//   };

//   useEffect(() => {
//     if (!window.ethereum) return;

//     const checkWalletConnection = async () => {
//       try {
//         const provider = new ethers.BrowserProvider(window.ethereum);
//         const accounts = await provider.listAccounts();
//         if (accounts.length > 0) {
//           const addr = accounts[0];
//           const shortAddress = shortenAddress(addr);
//           setWalletAddress(shortAddress);
//         }
//       } catch (error) {
//         console.error('Error checking wallet connection:', error);
//       }
//     };

//     checkWalletConnection();

//     window.ethereum.on('accountsChanged', (accounts) => {
//       if (accounts.length > 0) {
//         const shortAddress = shortenAddress(accounts[0]);
//         setWalletAddress(shortAddress);
//       } else {
//         setWalletAddress(null);
//       }
//     });

//     return () => {
//       if (window.ethereum) {
//         window.ethereum.removeListener('accountsChanged', () => {});
//       }
//     };
//   }, []);

//   return (
//     <header className="header">
//       <div className="container">
//         <div className="logo">
//           <Link to="/">
//             <img src={Logo} alt="TruthCheck" />
//           </Link>
//         </div>
//         <nav className="main-nav">
//           <ul>
//             <li>
//               <Link to="/quick-check" className="active">
//                 {t.quickCheck || 'Quick Check'}
//               </Link>
//             </li>
//             <li>
//               <Link to="/verified-claims">
//                 {t.verifiedClaims || 'Verified Claims'}
//               </Link>
//             </li>
//             <li>
//               <Link to="/blog">{t.blog || 'Blog'}</Link>
//             </li>
//           </ul>
//         </nav>
//         <div className="header-right">
//           <LanguageSelector />
//           <div className="wallet-status">
//             {walletAddress ? (
//               <span className="connected">Connected: {walletAddress}</span>
//             ) : (
//               <button onClick={connectWallet} className="connect-wallet">
//                 Connect Wallet
//               </button>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;

// components/Header.js
import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom'; // Replace Link with NavLink
import { ethers } from 'ethers';
import LanguageSelector from './LanguageSelector';
import LanguageContext from '../contexts/LanguageContext';
import translations from '../utils/translations';
import Logo from '../assets/logo.png';

const Header = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations['en'];
  const [walletAddress, setWalletAddress] = useState(null);

  const shortenAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const addr = await signer.getAddress();
        const shortAddress = shortenAddress(addr);
        setWalletAddress(shortAddress);
      } catch (error) {
        console.error('Wallet connection failed:', error);
      }
    } else {
      alert('Please install MetaMask or another Web3 wallet.');
    }
  };

  useEffect(() => {
    if (!window.ethereum) return;

    const checkWalletConnection = async () => {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const addr = accounts[0];
          const shortAddress = shortenAddress(addr);
          setWalletAddress(shortAddress);
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };

    checkWalletConnection();

    window.ethereum.on('accountsChanged', (accounts) => {
      if (accounts.length > 0) {
        const shortAddress = shortenAddress(accounts[0]);
        setWalletAddress(shortAddress);
      } else {
        setWalletAddress(null);
      }
    });

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  return (
    <header className="header">
      <div className="container">
        <div className="logo">
          <NavLink to="/">
            <img src={Logo} alt="TruthCheck" />
          </NavLink>
        </div>
        <nav className="main-nav">
          <ul>
            <li>
              <NavLink to="/quick-check" activeClassName="active">
                {t.quickCheck || 'Quick Check'}
              </NavLink>
            </li>
            <li>
              <NavLink to="/verified-claims" activeClassName="active">
                {t.verifiedClaims || 'Verified Claims'}
              </NavLink>
            </li>
            <li>
              <NavLink to="/blog" activeClassName="active">
                {t.blog || 'Blog'}
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="header-right">
          <LanguageSelector />
          <div className="wallet-status">
            {walletAddress ? (
              <span className="connected">Connected: {walletAddress}</span>
            ) : (
              <button onClick={connectWallet} className="connect-wallet">
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;