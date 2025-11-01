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
            <h2 className="narrative-title">The Art of Remembering</h2>
            <p className="narrative-text">
              We live in a world of constant motion, where moments slip through our fingers like sand.
              Today's triumphs become tomorrow's distant memories. The person you are now—with all your
              hopes, dreams, and uncertainties—will one day feel like a stranger.
            </p>
            <p className="narrative-text">
              But what if you could capture this moment? Not just as a photograph or a note, but as a
              complete snapshot of who you are, sealed away from time itself, waiting for the day when
              you need to remember.
            </p>
          </div>

          <div className="narrative-interlude">
            <div className="interlude-icon">⏳</div>
            <p className="interlude-text">
              Time is both our greatest gift and our deepest mystery
            </p>
          </div>

          <div className="narrative-chapter">
            <span className="chapter-number">II</span>
            <h2 className="narrative-title">Your Personal Time Machine</h2>
            <p className="narrative-text">
              TimeVault is more than a digital service—it's a bridge between who you are and who
              you'll become. A sacred space where you can speak freely to your future self, knowing
              these words will remain untouched, unread, and perfectly preserved until the moment
              you choose.
            </p>
            <div className="story-features">
              <div className="story-feature">
                <span className="feature-label">Write</span>
                <p className="feature-desc">Pour your heart into words that only your future self will read</p>
              </div>
              <div className="story-feature">
                <span className="feature-label">Preserve</span>
                <p className="feature-desc">Add photos, videos, voice memos—anything that captures this moment</p>
              </div>
              <div className="story-feature">
                <span className="feature-label">Seal</span>
                <p className="feature-desc">Lock it away from the world, even from yourself</p>
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
            <p className="narrative-text">
              Every capsule tells a story. A college graduate writing to themselves on their first day
              of retirement. A new parent capturing the overwhelming love and fear of bringing life into
              the world. A dreamer documenting their ambitions before the journey begins.
            </p>
            <div className="story-moments">
              <div className="moment-card">
                <div className="moment-icon">🎓</div>
                <h3 className="moment-title">The Graduate</h3>
                <p className="moment-story">
                  "Today I walked across that stage. I don't know where I'll be in ten years, but I hope
                  you remember this feeling—the fear, the excitement, the endless possibility."
                </p>
              </div>
              <div className="moment-card">
                <div className="moment-icon">💍</div>
                <h3 className="moment-title">The Promise</h3>
                <p className="moment-story">
                  "I'm writing this on our wedding day. Remember how it felt—this pure, overwhelming joy.
                  On our tenth anniversary, let's read this together."
                </p>
              </div>
              <div className="moment-card">
                <div className="moment-icon">🌱</div>
                <h3 className="moment-title">The Beginning</h3>
                <p className="moment-story">
                  "I'm starting something new today. I'm terrified. I hope when you read this, you're proud
                  of what we built together—you and me, past and future."
                </p>
              </div>
            </div>
          </div>

          <div className="narrative-interlude">
            <div className="interlude-icon">✦</div>
            <p className="interlude-text">
              The most profound conversations are often with ourselves
            </p>
          </div>

          <div className="narrative-chapter">
            <span className="chapter-number">IV</span>
            <h2 className="narrative-title">Your Story Begins Now</h2>
            <p className="narrative-text">
              What will you tell your future self? What truth do you need to preserve? What moment
              deserves to be frozen in time, waiting for the day when you need to remember who you were
              and what you felt?
            </p>
            <p className="narrative-text">
              The page is blank. The time is yours. Your story awaits.
            </p>
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
