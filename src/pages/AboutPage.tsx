import { Link } from 'react-router-dom';

function AboutPage() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const differences = [
    { icon: '🔒', title: 'Truly Locked', body: 'Once sealed, not even you can access the capsule. It\'s genuinely preserved in time.' },
    { icon: '⚡', title: 'Instant & Simple', body: 'No account creation, no complicated setup. Create a capsule in under two minutes.' },
    { icon: '🎯', title: 'Purpose-Built', body: 'We do one thing exceptionally well: preserve memories and deliver them at the perfect moment.' },
    { icon: '💝', title: 'Personal & Intimate', body: 'Every capsule is a deeply personal journey. We respect the weight of what you share.' },
    { icon: '🌐', title: 'Accessible Always', body: 'Accessible from any device, anywhere. Your memories travel with you.' },
    { icon: '🎁', title: 'Forever Free', body: 'No hidden fees, no premium tiers, no ads. Pure memory preservation.' },
  ];

  const useCases = [
    { emoji: '📝', text: 'Setting and tracking long-term goals' },
    { emoji: '💭', text: 'Capturing your current thoughts and feelings' },
    { emoji: '🎓', text: 'Graduation messages to your future self' },
    { emoji: '💑', text: 'Relationship milestones and anniversaries' },
    { emoji: '🎂', text: 'Birthday messages for future celebrations' },
    { emoji: '🌱', text: 'Personal growth and self-reflection' },
    { emoji: '👶', text: 'Messages to your children as they grow' },
    { emoji: '🎯', text: 'New Year\'s resolution accountability' },
  ];

  return (
    <div className="about-page">
      <div className="page-eyebrow">
        <span className="page-eyebrow-line" />
        <span className="page-eyebrow-text">Our Story</span>
      </div>
      <h1 className="page-title">About <em>TimeVault</em></h1>
      <p className="page-intro">
        A simple idea: help people preserve who they are right now,
        and deliver it to who they'll become.
      </p>

      <div className="about-section">
        <h2 className="about-section-title">Our Mission</h2>
        <p className="about-section-body">
          TimeVault was created with a simple yet powerful idea: to help people preserve meaningful
          moments, thoughts, and memories for their future selves. In our fast-paced world, we often
          forget to pause and reflect on who we are and what matters to us. TimeVault bridges that gap.
        </p>
        <p className="about-section-body">
          By creating a time capsule, you're not just storing memories — you're creating a conversation
          with your future self. It's a way to track your growth, remember your dreams, and reconnect
          with the person you were at a specific moment in time.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">Why We Built This</h2>
        <p className="about-section-body">
          The inspiration came from a simple question: <em>"What would I tell my future self?"</em>
          We realized everyone has moments they want to capture — goals they're setting, relationships
          they're cherishing, or simply thoughts they want to preserve.
        </p>
        <p className="about-section-body">
          Traditional time capsules are physical and require effort to maintain. We wanted to make it
          digital, secure, and effortless. With TimeVault, you can create a capsule in minutes, and
          we handle everything else — from secure storage to automatic delivery.
        </p>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">What Makes Us Different</h2>
        <div className="diff-grid">
          {differences.map(({ icon, title, body }) => (
            <div key={title} className="diff-tile">
              <div className="diff-tile-icon">{icon}</div>
              <div className="diff-tile-title">{title}</div>
              <p className="diff-tile-body">{body}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">Perfect For</h2>
        <div className="use-cases-grid">
          {useCases.map(({ emoji, text }) => (
            <div key={text} className="use-case-item">
              <span className="use-case-emoji">{emoji}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="about-section">
        <h2 className="about-section-title">Your Privacy Matters</h2>
        <p className="about-section-body">
          We take your privacy seriously. Your capsules are stored with enterprise-grade security,
          and we never read, analyze, or use your personal content for any purpose. Our model is
          simple: provide a service people trust.
        </p>
        <p className="about-section-body">
          We don't sell data, we don't show ads, and we have no hidden agendas. Your memories are
          yours, and yours alone.
        </p>
      </div>

      <div className="cta-band">
        <h3 className="cta-band-title">Ready to start your journey?</h3>
        <p className="cta-band-body">
          Create your first time capsule and begin a conversation with your future self.
        </p>
        <Link to="/create" className="btn-primary" onClick={scrollTop}>
          <span>✦</span>
          <span>Create Time Capsule</span>
        </Link>
      </div>
    </div>
  );
}

export default AboutPage;
