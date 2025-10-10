import { Link } from 'react-router-dom';

function HowItWorksPage() {
  return (
    <div className="how-it-works-page">
      <div className="page-header">
        <h1>How TimeVault Works</h1>
        <p className="page-subtitle">Creating a time capsule is simple and secure</p>
      </div>

      <div className="steps-container">
        <div className="step-card">
          <div className="step-number">1</div>
          <div className="step-content">
            <h3>Create Your Capsule</h3>
            <p>Write a message to your future self and optionally upload photos, videos, audio, or documents. Share your thoughts, goals, dreams, or memories you want to preserve.</p>
          </div>
        </div>

        <div className="step-arrow">↓</div>

        <div className="step-card">
          <div className="step-number">2</div>
          <div className="step-content">
            <h3>Choose Your Unlock Time</h3>
            <p>Select when you want to receive your capsule. Use quick presets like 1, 5, or 10 years, or pick a custom date and time that's meaningful to you.</p>
          </div>
        </div>

        <div className="step-arrow">↓</div>

        <div className="step-card">
          <div className="step-number">3</div>
          <div className="step-content">
            <h3>Set Delivery Method</h3>
            <p>Choose how you want to receive your capsule when it unlocks. We support delivery via email or SMS to ensure you get your message at the right moment.</p>
          </div>
        </div>

        <div className="step-arrow">↓</div>

        <div className="step-card">
          <div className="step-number">4</div>
          <div className="step-content">
            <h3>Seal & Forget</h3>
            <p>Once sealed, your capsule is locked and cannot be viewed, edited, or deleted by anyone. Watch the countdown timer and wait for the magic moment!</p>
          </div>
        </div>

        <div className="step-arrow">↓</div>

        <div className="step-card highlight">
          <div className="step-number">5</div>
          <div className="step-content">
            <h3>Automatic Delivery</h3>
            <p>When your unlock date arrives, we'll automatically deliver your time capsule to you. Open it and rediscover your past thoughts and memories!</p>
          </div>
        </div>
      </div>

      <div className="security-section">
        <h2>Your Privacy & Security</h2>
        <div className="security-grid">
          <div className="security-item">
            <div className="security-icon">🔐</div>
            <h4>End-to-End Protection</h4>
            <p>All capsules are secured with row-level security policies ensuring complete privacy.</p>
          </div>
          <div className="security-item">
            <div className="security-icon">🚫</div>
            <h4>Truly Locked</h4>
            <p>Once sealed, not even you can access the capsule until the unlock date. No backdoors, no exceptions.</p>
          </div>
          <div className="security-item">
            <div className="security-icon">🛡️</div>
            <h4>Secure Storage</h4>
            <p>Files are stored in encrypted cloud storage with enterprise-grade security standards.</p>
          </div>
          <div className="security-item">
            <div className="security-icon">🔒</div>
            <h4>Private by Design</h4>
            <p>Your data is never shared with third parties. Only you can access your capsules when they unlock.</p>
          </div>
        </div>
      </div>

      <div className="cta-box">
        <h3>Ready to Start?</h3>
        <p>Create your first time capsule in less than 2 minutes</p>
        <Link to="/create" className="btn btn-primary">
          Create Time Capsule
        </Link>
      </div>
    </div>
  );
}

export default HowItWorksPage;
