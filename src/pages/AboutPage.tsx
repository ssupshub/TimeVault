import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <h1>About TimeVault</h1>
        <p className="about-subtitle">
          Connecting your present self with your future self through the power of time
        </p>
      </div>

      <div className="about-content">
        <section className="about-section">
          <h2>Our Mission</h2>
          <p>
            TimeVault was created with a simple yet powerful idea: to help people preserve meaningful moments,
            thoughts, and memories for their future selves. In our fast-paced world, we often forget to pause
            and reflect on who we are and what matters to us. TimeVault bridges that gap.
          </p>
          <p>
            By creating a time capsule, you're not just storing memories—you're creating a conversation with
            your future self. It's a way to track your growth, remember your dreams, and reconnect with the
            person you were at a specific moment in time.
          </p>
        </section>

        <section className="about-section">
          <h2>Why We Built This</h2>
          <p>
            The inspiration came from a simple question: "What would I tell my future self?" We realized that
            everyone has moments they want to capture—goals they're setting, relationships they're cherishing,
            or simply thoughts they want to preserve.
          </p>
          <p>
            Traditional time capsules are physical and require effort to maintain. We wanted to make it digital,
            secure, and effortless. With TimeVault, you can create a capsule in minutes, and we handle everything
            else—from secure storage to automatic delivery at just the right moment.
          </p>
        </section>

        <section className="about-section">
          <h2>What Makes Us Different</h2>
          <div className="difference-grid">
            <div className="difference-item">
              <h3>🔒 True Security</h3>
              <p>Once sealed, your capsule is genuinely locked. We don't have access, you don't have access—it's truly preserved in time.</p>
            </div>
            <div className="difference-item">
              <h3>⚡ Simple & Fast</h3>
              <p>No complicated setup, no account creation. Just create your capsule and we handle the rest.</p>
            </div>
            <div className="difference-item">
              <h3>🎯 Focused Purpose</h3>
              <p>We do one thing really well: preserve your memories and deliver them at the perfect time.</p>
            </div>
            <div className="difference-item">
              <h3>💝 Personal Touch</h3>
              <p>Every capsule is a personal journey. We respect the intimacy and importance of your messages.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Perfect For</h2>
          <ul className="use-cases-list">
            <li>📝 Setting and tracking long-term goals</li>
            <li>💭 Capturing your current thoughts and feelings</li>
            <li>🎓 Graduation messages to your future self</li>
            <li>💑 Relationship milestones and anniversaries</li>
            <li>🎂 Birthday messages for future celebrations</li>
            <li>🌱 Personal growth and self-reflection journeys</li>
            <li>👶 Messages to your children as they grow up</li>
            <li>🎯 New Year's resolutions accountability</li>
          </ul>
        </section>

        <section className="about-section privacy-section">
          <h2>Your Privacy Matters</h2>
          <p>
            We take your privacy seriously. Your capsules are stored with enterprise-grade security, and we
            never read, analyze, or use your personal content for any purpose. Our business model is simple:
            provide a valuable service that people trust.
          </p>
          <p>
            We don't sell data, we don't show ads, and we don't have hidden agendas. Your memories are yours,
            and yours alone.
          </p>
        </section>

        <div className="about-cta">
          <h3>Ready to Start Your Journey?</h3>
          <p>Create your first time capsule and begin a conversation with your future self</p>
          <Link to="/create" className="btn btn-primary">
            Create Time Capsule
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
