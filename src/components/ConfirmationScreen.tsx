import { useState, useEffect } from 'react';

interface Props {
  unlockDate: string;
  deliveryMethod: string;
}

function ConfirmationScreen({ unlockDate, deliveryMethod }: Props) {
  const [time, setTime] = useState({ years: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const diff = new Date(unlockDate).getTime() - Date.now();
      if (diff > 0) {
        const s = Math.floor((diff / 1000) % 60);
        const m = Math.floor((diff / 60000) % 60);
        const h = Math.floor((diff / 3600000) % 24);
        const d = Math.floor(diff / 86400000);
        setTime({ years: Math.floor(d / 365), days: d % 365, hours: h, minutes: m, seconds: s });
      }
    };
    calc();
    const id = setInterval(calc, 1000);
    return () => clearInterval(id);
  }, [unlockDate]);

  const fmtDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <div className="confirmation-wrapper">
      <div className="confirmation-card">
        <div className="confirmation-hero">
          <span className="seal-icon">🔒</span>
          <h1 className="confirmation-title">Capsule Sealed</h1>
          <p className="confirmation-subtitle">
            Your memories are locked away, waiting patiently for their moment.
          </p>
        </div>

        <div className="confirmation-body">
          <div className="info-cells">
            <div className="info-cell">
              <div className="info-cell-label">Unlocks On</div>
              <div className="info-cell-value">{fmtDate(unlockDate)}</div>
            </div>
            <div className="info-cell">
              <div className="info-cell-label">Delivered Via</div>
              <div className="info-cell-value">{deliveryMethod === 'email' ? '✉ Email' : '💬 SMS'}</div>
            </div>
          </div>

          <div className="countdown-section">
            <div className="countdown-label">Time Until Delivery</div>
            <div className="countdown-grid">
              {[
                { n: time.years,   u: 'Years' },
                { n: time.days,    u: 'Days' },
                { n: time.hours,   u: 'Hours' },
                { n: time.minutes, u: 'Mins' },
                { n: time.seconds, u: 'Secs' },
              ].map(({ n, u }) => (
                <div key={u} className="countdown-cell">
                  <div className="countdown-num">{String(n).padStart(2, '0')}</div>
                  <div className="countdown-unit">{u}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="notice-box">
            <span className="notice-icon">⚠</span>
            <p className="notice-text">
              <strong>Permanently sealed.</strong> This capsule cannot be viewed, edited,
              or deleted by anyone — including you — until the scheduled date.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationScreen;
