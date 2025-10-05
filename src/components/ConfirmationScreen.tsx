import { useState, useEffect } from 'react';

interface ConfirmationScreenProps {
  unlockDate: string;
  deliveryMethod: string;
}

function ConfirmationScreen({ unlockDate, deliveryMethod }: ConfirmationScreenProps) {
  const [timeRemaining, setTimeRemaining] = useState({
    years: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeRemaining = () => {
      const now = new Date().getTime();
      const unlock = new Date(unlockDate).getTime();
      const difference = unlock - now;

      if (difference > 0) {
        const seconds = Math.floor((difference / 1000) % 60);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const years = Math.floor(days / 365);
        const remainingDays = days % 365;

        setTimeRemaining({
          years,
          days: remainingDays,
          hours,
          minutes,
          seconds,
        });
      }
    };

    calculateTimeRemaining();
    const interval = setInterval(calculateTimeRemaining, 1000);

    return () => clearInterval(interval);
  }, [unlockDate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="confirmation-container">
      <div className="confirmation-content">
        <div className="success-icon">🔒</div>
        <h1>Time Capsule Sealed!</h1>
        <p className="success-message">
          Your time capsule has been successfully created and locked.
        </p>

        <div className="info-box">
          <div className="info-item">
            <span className="info-label">Unlock Date:</span>
            <span className="info-value">{formatDate(unlockDate)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Delivery Method:</span>
            <span className="info-value">
              {deliveryMethod === 'email' ? 'Email' : 'SMS'}
            </span>
          </div>
        </div>

        <div className="countdown-box">
          <h2>Time Until Unlock</h2>
          <div className="countdown-grid">
            <div className="countdown-item">
              <div className="countdown-value">{timeRemaining.years}</div>
              <div className="countdown-label">Years</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-value">{timeRemaining.days}</div>
              <div className="countdown-label">Days</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-value">{timeRemaining.hours}</div>
              <div className="countdown-label">Hours</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-value">{timeRemaining.minutes}</div>
              <div className="countdown-label">Minutes</div>
            </div>
            <div className="countdown-item">
              <div className="countdown-value">{timeRemaining.seconds}</div>
              <div className="countdown-label">Seconds</div>
            </div>
          </div>
        </div>

        <div className="warning-box">
          <p>
            <strong>Important:</strong> You can no longer view, edit, or delete
            this capsule. It will be automatically delivered to you on the
            scheduled date.
          </p>
        </div>
      </div>
    </div>
  );
}

export default ConfirmationScreen;
