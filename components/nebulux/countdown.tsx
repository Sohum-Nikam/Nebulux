import React, { useState, useEffect } from 'react';

// Set your target date here (year, month (0-indexed), day, hour, minute, second)
const TARGET_DATE = new Date('2025-12-31T00:00:00').getTime();

export const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = TARGET_DATE - now;

      if (distance < 0) {
        clearInterval(timer);
        return;
      }

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="flex gap-2 md:gap-4">
      <FlipCard value={formatNumber(timeLeft.days)} label="Days" />
      <FlipCard value={formatNumber(timeLeft.hours)} label="Hours" />
      <FlipCard value={formatNumber(timeLeft.minutes)} label="Minutes" />
      <FlipCard value={formatNumber(timeLeft.seconds)} label="Seconds" />
    </div>
  );
};

function FlipCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative w-14 h-12 md:w-16 md:h-14 perspective-600">
        {/* Single display for the value */}
        <div className="absolute inset-0 bg-black/80 border border-white/20 rounded-lg flex items-center justify-center overflow-hidden">
          <span className="text-xl md:text-2xl font-bold text-white font-press-start">
            {value}
          </span>
        </div>
      </div>
      <span className="mt-2 text-xs md:text-sm text-white font-press-start tracking-widest bg-black/90 px-2 py-1 rounded-lg border border-white/40 shadow-2xl font-bold" style={{ 
        textShadow: '0 0 8px rgba(255,255,255,0.7), 0 0 16px rgba(255,255,255,0.5)',
        zIndex: 10
      }}>
        {label}
      </span>
    </div>
  );
}