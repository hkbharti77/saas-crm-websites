import React, { useEffect, useState } from 'react';
import './Meteors.css';

export default function Meteors({
  number = 16,
  minDelay = 0.2,
  maxDelay = 1.2,
  minDuration = 3,
  maxDuration = 8,
  angle = 215,
  className = ''
}) {
  const [meteorStyles, setMeteorStyles] = useState([]);

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      '--angle': `${-angle}deg`,
      top: '-5%',
      left: `calc(${Math.floor(Math.random() * 100)}%)`,
      animationDelay: `${(Math.random() * (maxDelay - minDelay) + minDelay).toFixed(2)}s`,
      animationDuration: `${(Math.random() * (maxDuration - minDuration) + minDuration).toFixed(2)}s`
    }));
    setMeteorStyles(styles);
  }, [number, minDelay, maxDelay, minDuration, maxDuration, angle]);

  return (
    <div className={`meteors-container ${className}`} aria-hidden="true">
      {meteorStyles.map((style, idx) => (
        <span
          key={idx}
          style={style}
          className="meteor-item"
        >
          <div className="meteor-tail" />
        </span>
      ))}
    </div>
  );
}
