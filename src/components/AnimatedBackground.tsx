import { useEffect, useState, useRef } from 'react';
import './AnimatedBackground.css';

declare global {
  interface Window {
    FramerWavePrism?: any;
  }
  namespace JSX {
    interface IntrinsicElements {
      'framer-wave-prism': any;
    }
  }
}

const AnimatedBackground = () => {
  const [scrollY, setScrollY] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://framer.com/m/WavePrism-prod-knue.js';
    script.async = true;
    script.onload = () => {
      if (containerRef.current && window.FramerWavePrism) {
        const canvas = document.createElement('canvas');
        canvas.className = 'wave-prism-canvas';
        if (containerRef.current.firstChild) {
          containerRef.current.replaceChild(canvas, containerRef.current.firstChild);
        } else {
          containerRef.current.appendChild(canvas);
        }
      }
    };
    document.head.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="animated-background">
      <div ref={containerRef} className="wave-prism-container">
        <canvas className="wave-prism-canvas" />
      </div>
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
