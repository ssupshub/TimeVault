import { Link } from 'react-router-dom';

function HomePage() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <div className="home-page">

      {/* ─── HERO ─── */}
      <section className="story-hero">
        <div className="hero-noise" />
        <div className="hero-orb hero-orb-1" />
        <div className="hero-orb hero-orb-2" />
        <div className="hero-orb hero-orb-3" />

        <div className="story-hero-content">
          <div className="hero-eyebrow">
            <span className="eyebrow-line" />
            <span className="eyebrow-text">Digital Time Capsules</span>
            <span className="eyebrow-line" />
          </div>

          <h1 className="story-title">
            <em>A Letter to</em>
            <span className="title-accent">Your Future Self</span>
          </h1>

          <div className="hero-rule">
            <span className="hero-rule-line" />
            <span className="hero-rule-diamond" />
            <span className="hero-rule-line" />
          </div>

          <p className="story-opening">
            Imagine discovering a message from yourself — written years ago, when your dreams
            were different, your fears unnamed, and your path uncertain. What would you tell
            that future version of you?
          </p>

          <div className="hero-actions">
            <Link to="/create" className="btn-primary" onClick={scrollTop}>
              <span>✦</span>
              <span>Create Your Capsule</span>
            </Link>
            <Link to="/how-it-works" className="btn-ghost" onClick={scrollTop}>
              <span>See how it works</span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>

        <div className="scroll-hint">
          <span className="scroll-hint-text">Scroll</span>
          <span className="scroll-hint-track" />
        </div>
      </section>

      {/* ─── NARRATIVE ─── */}
      <section className="story-narrative">
        <div className="narrative-section">

          {/* Stats */}
          <div className="stats-row">
            {[
              { n: '∞', l: 'Stories Preserved' },
              { n: '100%', l: 'Private & Encrypted' },
              { n: '0', l: 'Ads or Tracking' },
              { n: 'Free', l: 'Forever' },
            ].map(({ n, l }) => (
              <div key={l} className="stat-cell">
                <div className="stat-number">{n}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>

          {/* Chapter I */}
          <div className="chapter-grid">
            <div>
              <div className="chapter-meta">
                <span className="chapter-num">Chapter I</span>
                <span className="chapter-divider" />
              </div>
              <h2 className="chapter-title">Preserve <em>What Matters</em></h2>
              <p className="chapter-body">
                We live in a world of constant motion where moments slip through our fingers.
                TimeVault lets you capture who you are right now — your hopes, fears, and
                certainties — and seal them safely until the right moment arrives.
              </p>
              <Link to="/about" className="chapter-link" onClick={scrollTop}>
                Our story <span>→</span>
              </Link>
            </div>
            <div className="feature-mosaic">
              {[
                { icon: '✍️', title: 'Write', body: 'Pour your heart into words meant only for future eyes.', cls: '' },
                { icon: '🖼️', title: 'Preserve', body: 'Attach photos, videos, and audio memories.', cls: '' },
                { icon: '🔐', title: 'Seal', body: 'Lock it away until you choose to open it.', cls: '' },
                { icon: '📬', title: 'Receive', body: 'Rediscover yourself at the perfect moment.', cls: '' },
              ].map(({ icon, title, body, cls }) => (
                <div key={title} className={`feature-tile${cls ? ' '+cls : ''}`}>
                  <div className="tile-icon">{icon}</div>
                  <div className="tile-title">{title}</div>
                  <p className="tile-body">{body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Chapter II — moments */}
          <div>
            <div className="chapter-meta">
              <span className="chapter-num">Chapter II</span>
              <span className="chapter-divider" />
            </div>
            <h2 className="chapter-title">Stories Worth <em>Remembering</em></h2>
            <div className="moments-strip">
              {[
                {
                  emoji: '🎓',
                  title: 'The Graduate',
                  story: '"Today I walked across that stage. I hope you remember this feeling — the fear, the excitement, the endless possibility standing before you."',
                },
                {
                  emoji: '💍',
                  title: 'The Promise',
                  story: '"Our wedding day was pure, overwhelming joy. On our anniversary, let\'s read this together and remember why we chose each other."',
                },
                {
                  emoji: '🌱',
                  title: 'The Beginning',
                  story: '"I\'m starting something new today. I hope you\'re proud of what we built together — you and me, past and future, dreaming the same dream."',
                },
              ].map(({ emoji, title, story }) => (
                <div key={title} className="moment-card">
                  <span className="moment-emoji">{emoji}</span>
                  <h3 className="moment-title">{title}</h3>
                  <p className="moment-story">{story}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── EPILOGUE ─── */}
      <section className="epilogue">
        <p className="epilogue-quote">
          "Time is a gift, and what we do with it is our story to write."
        </p>
        <div className="epilogue-attr">
          <span>Begin your chapter</span>
        </div>
        <div className="hero-actions">
          <Link to="/create" className="btn-primary" onClick={scrollTop}>
            <span>✦</span>
            <span>Create Your First Capsule</span>
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
