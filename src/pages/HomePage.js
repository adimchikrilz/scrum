import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import LanguageContext from '../contexts/LanguageContext';
import translations from '../utils/translations';
import './HomePage.css';

const HomePage = ({ walletAddress, isWalletConnected, connectWallet, disconnectWallet, truncateAddress }) => {
  const { language } = useContext(LanguageContext);
  const t = translations[language] || translations['en'];

  return (
    <>
      {/* Removed Header from here since it's already in App.js */}
      <main className="home-page p-4 pb-10 min-h-[100vh] flex items-center justify-center container max-w-screen-lg mx-auto">
        <div className="py-20">
          {/* Hero Section */}
          <section className="hero flex flex-col items-center mb-20">
            <h1 className="text-2xl md:text-6xl font-semibold md:font-bold tracking-tighter mb-6 text-zinc-100 text-center">
              TruthCheck <br />
              <span className="text-zinc-300 inline-block">Your shield against lies.</span>
            </h1>
            <p className="text-zinc-300 text-base mb-6 text-center">
              Verify news and claims instantly with secure blockchain tech.
            </p>
            <button onClick={connectWallet} className="cta-button">
              Connect Wallet
            </button>
            {/* Uncomment if you want to add decorative images back */}
            {/* <div className="hero-decorations">
              <img src="/assets/laptop.png" alt="Laptop" className="decoration laptop" />
              <img src="/assets/news.png" alt="News" className="decoration news" />
              <img src="/assets/social-media.png" alt="Social Media" className="decoration social-media" />
              <img src="/assets/megaphone.png" alt="Megaphone" className="decoration megaphone" />
            </div> */}
          </section>

          {/* Resources Section */}
          <Resources />
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-links">
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </div>
          <p className="footer-tagline">
            Fighting Misinformation in Nigeria with Blockchain © TruthCheck 2025
          </p>
        </div>
      </footer>
    </>
  );
};

// Resources Section
const Resources = () => {
  return (
    <div className="grid gap-4 lg:grid-cols-3 justify-center">
      <ArticleCard
        title="Blockchain Basics"
        href="https://www.blockchain.com/learning-center"
        description="Learn the fundamentals of blockchain technology."
      />
      <ArticleCard
        title="How to Use MetaMask"
        href="https://metamask.io/faqs/"
        description="A guide to setting up and using MetaMask for wallet connections."
      />
      <ArticleCard
        title="TruthCheck Blog"
        href="/blog"
        description="Read our latest articles on fighting misinformation."
      />
    </div>
  );
};

// ArticleCard Component
const ArticleCard = ({ title, href, description }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col border border-zinc-800 p-4 rounded-lg hover:bg-zinc-900 transition-colors hover:border-zinc-700"
    >
      <article>
        <h2 className="text-lg font-semibold mb-2 text-zinc-100">{title}</h2>
        <p className="text-sm text-zinc-400">{description}</p>
      </article>
    </a>
  );
};

export default HomePage;