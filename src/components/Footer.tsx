import { Link } from 'react-router-dom';

function Footer() {
  const year = new Date().getFullYear();
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="main-footer">
      <div className="footer-container">
        <div className="footer-top">
          <div>
            <div className="footer-brand-name">TimeVault</div>
            <p className="footer-brand-desc">
              Preserve your memories, thoughts, and dreams — and have them delivered
              to your future self at the perfect moment.
            </p>
            <a href="mailto:subhamchauhan1310@gmail.com" className="footer-contact-link">
              <span>✉</span>
              <span>Get in touch</span>
            </a>
          </div>

          <div>
            <p className="footer-col-title">Navigation</p>
            <ul className="footer-links">
              <li><Link to="/" onClick={scrollTop}>Home</Link></li>
              <li><Link to="/create" onClick={scrollTop}>Create Capsule</Link></li>
              <li><Link to="/how-it-works" onClick={scrollTop}>How It Works</Link></li>
              <li><Link to="/about" onClick={scrollTop}>About</Link></li>
            </ul>
          </div>

          <div>
            <p className="footer-col-title">Product</p>
            <ul className="footer-links">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms of Service</a></li>
              <li><a href="#">Security</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>&copy; {year} TimeVault. All rights reserved.</span>
          <span className="footer-motto">"Time is the canvas; memory, the paint."</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
