import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  const handleNavClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section footer-branding">
            <div className="footer-logo">
              <div className="logo-icon">⏳</div>
              <span className="logo-text">TimeVault</span>
            </div>
            <p className="footer-tagline">
              Preserve your memories, unlock your future
            </p>
            <p className="footer-description">
              Questions or feedback? We'd love to hear from you.
            </p>
            <a href="mailto:subhamchauhan1310@gmail.com" className="footer-email">
              Email Us!
            </a>
          </div>

          <div className="footer-section footer-links-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/" onClick={handleNavClick}>Home</Link></li>
              <li><Link to="/create" onClick={handleNavClick}>Create Capsule</Link></li>
              <li><Link to="/how-it-works" onClick={handleNavClick}>How It Works</Link></li>
              <li><Link to="/about" onClick={handleNavClick}>About Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} TimeVault. All rights reserved.</p>
          <p className="footer-note">
            Built with care for your future self
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
