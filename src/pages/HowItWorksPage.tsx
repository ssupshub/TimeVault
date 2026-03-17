import { Link } from 'react-router-dom';

function HowItWorksPage() {
  const steps = [
    {
      n: '01',
      title: 'Craft Your Message',
      body: 'Write a message to your future self. Share your thoughts, goals, dreams, or memories you want to preserve. Optionally attach photos, videos, audio, or documents.',
    },
    {
      n: '02',
      title: 'Choose Your Unlock Time',
      body: 'Select the precise date and time you want your capsule delivered. It could be next year, a decade from now, or a milestone like a birthday or anniversary.',
    },
    {
      n: '03',
      title: 'Set Your Delivery Method',
      body: 'Choose how you want to receive your capsule when it unlocks — via email or SMS. Enter the address or number where it should arrive.',
    },
    {
      n: '04',
      title: 'Seal & Forget',
      body: 'Once sealed, your capsule is truly locked. No one — not even you — can view, edit, or delete it until the scheduled moment. Trust the process.',
    },
    {
      n: '05',
      title: 'Automatic Delivery',
      body: 'When your unlock date arrives, your time capsule is automatically delivered. Open it and rediscover the person you were.',
    },
  ];

  const security = [
    { icon: '🔐', title: 'Row-Level Security', body: 'All capsules are protected with PostgreSQL row-level security policies ensuring complete isolation.' },
    { icon: '🚫', title: 'Zero Access Until Due', body: 'Once sealed, not even system administrators can read the contents. The lock is absolute.' },
    { icon: '☁️', title: 'Encrypted Cloud Storage', body: 'All files are stored with enterprise-grade encryption in isolated cloud storage buckets.' },
    { icon: '🛡️', title: 'Private by Design', body: 'Your data is never analyzed, shared, or monetized. We have one job: keep your memories safe.' },
  ];

  return (
    <div className="how-it-works-page">
      <div className="page-eyebrow">
        <span className="page-eyebrow-line" />
        <span className="page-eyebrow-text">The Process</span>
      </div>
      <h1 className="page-title">How <em>TimeVault</em><br />Works</h1>
      <p className="page-intro">
        Creating a digital time capsule takes under two minutes. Sealed instantly,
        preserved indefinitely, delivered precisely.
      </p>

      <div className="steps-list">
        {steps.map(({ n, title, body }) => (
          <div key={n} className="step-item">
            <div className="step-badge">
              <div className="step-badge-inner">{n}</div>
            </div>
            <div className="step-content-box">
              <div className="step-title">{title}</div>
              <p className="step-body">{body}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginBottom: '2rem' }}>
        <div className="page-eyebrow">
          <span className="page-eyebrow-line" />
          <span className="page-eyebrow-text">Security</span>
        </div>
        <h2 className="page-title" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', marginBottom: '2rem' }}>
          Your Privacy <em>Guaranteed</em>
        </h2>
      </div>

      <div className="security-grid" style={{ marginBottom: '4rem' }}>
        {security.map(({ icon, title, body }) => (
          <div key={title} className="security-tile">
            <div className="security-tile-icon">{icon}</div>
            <div className="security-tile-title">{title}</div>
            <p className="security-tile-body">{body}</p>
          </div>
        ))}
      </div>

      <div className="cta-band">
        <h3 className="cta-band-title">Ready to begin?</h3>
        <p className="cta-band-body">
          Create your first time capsule in less than two minutes.
          Your future self is waiting.
        </p>
        <Link
          to="/create"
          className="btn-primary"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <span>✦</span>
          <span>Create a Time Capsule</span>
        </Link>
      </div>
    </div>
  );
}

export default HowItWorksPage;
