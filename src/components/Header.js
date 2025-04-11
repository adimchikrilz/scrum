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