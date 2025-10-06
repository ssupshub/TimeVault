import { Link } from 'react-router-dom';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <div className="logo-icon">⏳</div>
              <span className="logo-text">TimeVault</span>
            </div>
            <p className="footer-tagline">
              Preserve your memories, unlock your future
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/create">Create Capsule</Link></li>
              <li><Link to="/how-it-works">How It Works</Link></li>
              <li><Link to="/about">About Us</Link></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Resources</h4>
            <ul className="footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Service</a></li>
              <li><a href="#security">Security</a></li>
              <li><a href="#support">Support</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <p className="footer-description">
              Questions or feedback? We'd love to hear from you.
            </p>
            <a href="mailto:hello@timevault.app" className="footer-email">
              hello@timevault.app
            </a>
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
