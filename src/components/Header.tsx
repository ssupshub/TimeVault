import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

function Header() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="main-header">
      <div className="header-container">
        <Link to="/" className="logo-link">
          <div className="logo-icon">⏳</div>
          <span className="logo-text">TimeVault</span>
        </Link>

        <nav className="main-nav">
          <Link to="/" className={`nav-link ${isActive('/')}`}>
            Home
          </Link>
          <Link to="/how-it-works" className={`nav-link ${isActive('/how-it-works')}`}>
            How It Works
          </Link>
          <Link to="/about" className={`nav-link ${isActive('/about')}`}>
            About
          </Link>
          <Link to="/create" className="nav-link-cta">
            Create Capsule
          </Link>
        </nav>

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
}

export default Header;
