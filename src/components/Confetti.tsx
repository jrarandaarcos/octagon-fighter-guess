
import React, { useEffect, useState } from 'react';

const Confetti: React.FC = () => {
  const [confetti, setConfetti] = useState<JSX.Element[]>([]);

  useEffect(() => {
    // Create confetti pieces
    const colors = ['#ea384c', '#ffffff', '#000000', '#ffcc00', '#3366ff'];
    const pieces: JSX.Element[] = [];
    
    for (let i = 0; i < 100; i++) {
      // Random properties for each piece
      const color = colors[Math.floor(Math.random() * colors.length)];
      const left = `${Math.random() * 100}%`;
      const size = `${Math.random() * 0.8 + 0.2}rem`;
      const delay = `${Math.random() * 3}s`;
      const duration = `${Math.random() * 2 + 1}s`;
      
      pieces.push(
        <div
          key={i}
          className="fixed animate-confetti"
          style={{
            left,
            top: '-10px',
            width: size,
            height: size,
            backgroundColor: color,
            animationDelay: delay,
            animationDuration: duration,
            zIndex: 50,
          }}
        />
      );
    }
    
    setConfetti(pieces);
    
    // Clean up confetti after animation completes
    const timer = setTimeout(() => {
      setConfetti([]);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  return <>{confetti}</>;
};

export default Confetti;
