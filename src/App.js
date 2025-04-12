import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ethers } from 'ethers';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import QuickCheckPage from './pages/QuickCheckPage';
import VerifiedClaimsPage from './pages/VerifiedClaimsPage';
import BlogPage from './pages/BlogPage';
import LanguageContext from './contexts/LanguageContext';
import { ClaimsProvider } from './contexts/ClaimsContext';
import OfflineNotice from './components/OfflineNotice';
import ConnectWallet from './components/ConnectWallet';
import './App.css';

const App = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [language, setLanguage] = useState('en');
  const supportedLanguages = ['en', 'ha', 'yo', 'ig'];
  
  const [walletAddress, setWalletAddress] = useState(null);
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [isWalletModalOpen, setIsWalletModalOpen] = useState(false);

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

  const connectWallet = async (walletType) => {
    if (walletType === 'metamask' && typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const signer = await provider.getSigner();
        const address = await signer.getAddress();
        setWalletAddress(address);
        setIsWalletConnected(true);
        setIsGuestMode(false);

        window.ethereum.on('accountsChanged', (accounts) => {
          if (accounts.length === 0) {
            disconnectWallet();
          } else {
            setWalletAddress(accounts[0]);
          }
        });

        window.ethereum.on('chainChanged', () => {
          window.location.reload();
        });
      } catch (error) {
        console.error('Wallet connection failed:', error);
        alert(`Failed to connect wallet: ${error.message}. Please ensure MetaMask is unlocked and try again.`);
      }
    } else {
      alert(`Wallet type ${walletType} is not supported yet. Please use MetaMask for now.`);
    }
  };

  const disconnectWallet = () => {
    setWalletAddress(null);
    setIsWalletConnected(false);
    setIsGuestMode(false);
  };

  const truncateAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 4)}...${address.slice(-4)}`;
  };

  const handleConnectWalletClick = () => {
    setIsWalletModalOpen(true);
  };

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (typeof window.ethereum !== 'undefined') {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.listAccounts();
          if (accounts.length > 0) {
            const signer = await provider.getSigner();
            const address = await signer.getAddress();
            setWalletAddress(address);
            setIsWalletConnected(true);
          }
        } catch (error) {
          console.error('Error checking wallet connection:', error);
        }
      }
    };

    checkWalletConnection();
  }, []);

  return (
    <ClaimsProvider>
      <LanguageContext.Provider value={{ language, changeLanguage }}>
        <Router>
          <div className="app">
            {!isOnline && <OfflineNotice />}
            <Header
              walletAddress={walletAddress}
              isWalletConnected={isWalletConnected}
              connectWallet={handleConnectWalletClick}
              disconnectWallet={disconnectWallet}
              truncateAddress={truncateAddress}
            />
            <main className="main-content">
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomePage
                      walletAddress={walletAddress}
                      isWalletConnected={isWalletConnected}
                      connectWallet={handleConnectWalletClick}
                      disconnectWallet={disconnectWallet}
                      truncateAddress={truncateAddress}
                    />
                  }
                />
                <Route
                  path="/quick-check"
                  element={
                    <QuickCheckPage
                      walletAddress={walletAddress}
                      isWalletConnected={isWalletConnected}
                      connectWallet={handleConnectWalletClick}
                      disconnectWallet={disconnectWallet}
                      truncateAddress={truncateAddress}
                      isGuestMode={isGuestMode}
                    />
                  }
                />
                <Route path="/verified-claims" element={<VerifiedClaimsPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/about" element={<div>About Page</div>} />
                <Route path="/contact" element={<div>Contact Page</div>} />
              </Routes>
            </main>
            <Footer />
            <ConnectWallet
              isOpen={isWalletModalOpen}
              onClose={() => setIsWalletModalOpen(false)}
              connectWallet={connectWallet}
              setGuestMode={setIsGuestMode}
            />
          </div>
        </Router>
      </LanguageContext.Provider>
    </ClaimsProvider>
  );
};

export default App;