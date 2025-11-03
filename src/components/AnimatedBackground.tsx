import { useEffect, useState } from 'react';
import './AnimatedBackground.css';

declare global {
  interface Window {
    WavePrism?: {
      create: (container: HTMLElement) => void;
    };
  }
}

const AnimatedBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const [waveContainer, setWaveContainer] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (waveContainer && window.WavePrism) {
      try {
        window.WavePrism.create(waveContainer);
      } catch (error) {
        console.log('Wave Prism component loaded');
      }
    }
  }, [waveContainer]);

  return (
    <div className="animated-background">
      <div ref={setWaveContainer} className="wave-prism-container" />
      <div
        className="shape shape-1"
        style={{ transform: `translateY(${scrollY * 0.3}px) rotate(${scrollY * 0.1}deg)` }}
      />
      <div
        className="shape shape-2"
        style={{ transform: `translateY(${scrollY * 0.2}px) rotate(${-scrollY * 0.15}deg)` }}
      />
      <div
        className="shape shape-3"
        style={{ transform: `translateY(${scrollY * 0.4}px) rotate(${scrollY * 0.2}deg)` }}
      />
      <div
        className="orb orb-1"
        style={{ transform: `translate(${scrollY * 0.1}px, ${scrollY * 0.25}px)` }}
      />
      <div
        className="orb orb-2"
        style={{ transform: `translate(${-scrollY * 0.15}px, ${scrollY * 0.3}px)` }}
      />
      <div
        className="orb orb-3"
        style={{ transform: `translate(${scrollY * 0.2}px, ${scrollY * 0.2}px)` }}
      />
    </div>
  );
};

export default AnimatedBackground;
