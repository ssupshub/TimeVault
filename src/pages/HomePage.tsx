import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <div className="hero-icon">⏳</div>
          <h1 className="hero-title">
            Preserve Your Memories,
            <br />
            Unlock Your Future
          </h1>
          <p className="hero-subtitle">
            Create digital time capsules that securely store your messages, photos, and memories.
            <br />
            Receive them at the perfect moment in the future.
          </p>
          <div className="hero-buttons">
            <Link to="/create" className="btn btn-primary">
              Create Your First Capsule
            </Link>
            <Link to="/how-it-works" className="btn btn-secondary">
              How It Works
            </Link>
          </div>
        </div>
      </section>

      <section className="features-section">
        <h2 className="section-title">Why Choose TimeVault?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <h3>Secure & Private</h3>
            <p>Your capsules are encrypted and locked. Nobody can access them until the unlock date, not even you.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3>Flexible Scheduling</h3>
            <p>Choose preset time periods or set a custom date and time for when you want to receive your capsule.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📱</div>
            <h3>Multi-Format Support</h3>
            <p>Store text messages, images, videos, audio recordings, and documents in your time capsules.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✉️</div>
            <h3>Smart Delivery</h3>
            <p>Receive your capsules via email or SMS exactly when you scheduled them to unlock.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>No Account Required</h3>
            <p>Create capsules instantly without signing up. Just provide your delivery details and you're done.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⏰</div>
            <h3>Live Countdown</h3>
            <p>Track exactly how much time remains until your capsule unlocks with a real-time countdown timer.</p>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2>Ready to Create Your First Time Capsule?</h2>
          <p>Start preserving your memories and messages for the future today.</p>
          <Link to="/create" className="btn btn-primary btn-large">
            Get Started Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
