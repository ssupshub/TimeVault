import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useEffect, useState } from 'react';

function Header() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isActive = (path: string) => location.pathname === path ? 'active' : '';
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <header className={`main-header${scrolled ? ' header-scrolled' : ''}`}>
      <div className="header-inner">
        <Link to="/" className="logo-link" onClick={scrollTop}>
          <div className="logo-mark">
            <span className="logo-mark-inner">⏳</span>
          </div>
          <div className="logo-wordmark">
            <span className="logo-name">TimeVault</span>
            <span className="logo-tagline">Digital Time Capsules</span>
          </div>
        </Link>

        <nav className="main-nav">
          <Link to="/" className={`nav-link ${isActive('/')}`} onClick={scrollTop}>
            Home
          </Link>
          <Link to="/how-it-works" className={`nav-link ${isActive('/how-it-works')}`} onClick={scrollTop}>
            How It Works
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about')}`} onClick={scrollTop}>
            About
          </Link>
          <Link to="/create" className="nav-cta" onClick={scrollTop}>
            <span>Create Capsule</span>
            <span>→</span>
          </Link>
        </nav>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
          title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          {theme === 'light' ? '◑' : '○'}
        </button>
      </div>
    </header>
  );
}

export default Header;
