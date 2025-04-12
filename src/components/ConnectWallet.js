import React from 'react';
import './ConnectWallet.css';

// Import the images from src/assets
import metamaskIcon from '../assets/metamask.jpg';
import trustIcon from '../assets/trust.jpg';
import walletconnectIcon from '../assets/walletconnect.jpg';
import torusIcon from '../assets/torus.jpg';
import ledgerIcon from '../assets/ledger.jpg';
import exodusIcon from '../assets/exodus.jpg';

const ConnectWallet = ({ isOpen, onClose, connectWallet, setGuestMode }) => {
  if (!isOpen) return null;

  const handleWalletSelect = (wallet) => {
    if (wallet === 'guest') {
      setGuestMode(true);
      onClose();
    } else {
      connectWallet(wallet);
      onClose();
    }
  };

  return (
    <div className="connect-wallet-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h2>Connect Wallet</h2>
          <button onClick={() => handleWalletSelect('guest')} className="guest-mode-button">
            Guest Mode
          </button>
        </div>
        <div className="wallet-options">
          <button className="wallet-option" onClick={() => handleWalletSelect('metamask')}>
            <img src={metamaskIcon} alt="MetaMask" />
            MetaMask Wallet
          </button>
          <button className="wallet-option" onClick={() => handleWalletSelect('trust')}>
            <img src={trustIcon} alt="Trust Wallet" />
            Trust Wallet
          </button>
          <button className="wallet-option" onClick={() => handleWalletSelect('walletconnect')}>
            <img src={walletconnectIcon} alt="Wallet Connect" />
            Wallet Connect
          </button>
          <button className="wallet-option" onClick={() => handleWalletSelect('torus')}>
            <img src={torusIcon} alt="Torus Wallet" />
            Torus Wallet
          </button>
          <button className="wallet-option" onClick={() => handleWalletSelect('ledger')}>
            <img src={ledgerIcon} alt="Ledger Wallet" />
            Ledger Wallet
          </button>
          <button className="wallet-option" onClick={() => handleWalletSelect('exodus')}>
            <img src={exodusIcon} alt="Exodus Wallet" />
            Exodus Wallet
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;