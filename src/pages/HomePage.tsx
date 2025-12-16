import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="home-page">
      <section className="story-hero">
        <div className="story-hero-content">
          <h1 className="story-title">
            A Letter to
            <br />
            <span className="story-title-highlight">Your Future Self</span>
          </h1>
          <div className="story-divider">✦</div>
          <p className="story-opening">
            Imagine discovering a message from yourself—written years ago, when your dreams were different,
            your fears unnamed, and your path uncertain. What would you tell that future version of you?
            What hopes would you preserve? What moments would you seal in time?
          </p>
        </div>
      </section>

      <section className="story-narrative">
        <div className="narrative-content">
          <div className="narrative-chapter">
            <span className="chapter-number">I</span>
            <h2 className="narrative-title">Preserve Your Story</h2>
            <p className="narrative-text">
              We live in a world of constant motion where moments slip through our fingers. What if you could capture who you are now—your hopes, dreams, and uncertainties—and send it to your future self?
            </p>
          </div>

          <div className="narrative-chapter">
            <span className="chapter-number">II</span>
            <h2 className="narrative-title">How It Works</h2>
            <div className="story-features">
              <div className="story-feature">
                <span className="feature-label">Write</span>
                <p className="feature-desc">Pour your heart into words for your future self</p>
              </div>
              <div className="story-feature">
                <span className="feature-label">Preserve</span>
                <p className="feature-desc">Add photos, videos, and memories</p>
              </div>
              <div className="story-feature">
                <span className="feature-label">Seal</span>
                <p className="feature-desc">Lock it away until you choose to open it</p>
              </div>
              <div className="story-feature">
                <span className="feature-label">Receive</span>
                <p className="feature-desc">Rediscover yourself when the time is right</p>
              </div>
            </div>
          </div>

          <div className="narrative-chapter">
            <span className="chapter-number">III</span>
            <h2 className="narrative-title">Stories Worth Preserving</h2>
            <div className="story-moments">
              <div className="moment-card">
                <div className="moment-icon">🎓</div>
                <h3 className="moment-title">The Graduate</h3>
                <p className="moment-story">
                  "Today I walked across that stage. I hope you remember this feeling—the fear, the excitement, the endless possibility."
                </p>
              </div>
              <div className="moment-card">
                <div className="moment-icon">💍</div>
                <h3 className="moment-title">The Promise</h3>
                <p className="moment-story">
                  "Our wedding day—pure, overwhelming joy. On our anniversary, let's read this together."
                </p>
              </div>
              <div className="moment-card">
                <div className="moment-icon">🌱</div>
                <h3 className="moment-title">The Beginning</h3>
                <p className="moment-story">
                  "I'm starting something new today. I hope you're proud of what we built together—you and me, past and future."
                </p>
              </div>
            </div>
          </div>

          <div className="narrative-chapter">
            <div className="story-cta">
              <Link to="/create" className="story-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                Begin Your Story
              </Link>
              <p className="story-cta-note">
                Create your first time capsule in moments
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="story-epilogue">
        <div className="epilogue-content">
          <p className="epilogue-quote">
            "Time is a gift, and what we do with it is our story to write."
          </p>
          <Link to="/about" className="epilogue-link" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            Learn more about our mission →
          </Link>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
