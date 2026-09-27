import React, { useState, useEffect } from 'react';

/**
 * AnimatedCounter component with smooth easing
 * @param {number} target - The final numeric target value
 * @param {number} duration - Animation duration in ms (default 2000ms)
 * @param {number} decimals - Number of decimal places (default 0)
 * @param {string} prefix - Optional prefix (e.g. '< ')
 * @param {string} suffix - Optional suffix (e.g. '+', '%', ' Min')
 * @param {boolean} useLocale - Whether to format integers with commas (e.g. 1,500)
 */
export default function AnimatedCounter({
  target,
  duration = 2200,
  decimals = 0,
  prefix = '',
  suffix = '',
  useLocale = true
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp = null;
    let animationFrameId;

    const easeOutExpo = (x) => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };

    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      
      const currentVal = easedProgress * target;
      setCount(currentVal);

      if (progress < 1) {
        animationFrameId = window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        window.cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, duration]);

  const formattedNumber = () => {
    if (decimals > 0) {
      return count.toFixed(decimals);
    }
    const intVal = Math.floor(count);
    return useLocale ? intVal.toLocaleString('en-IN') : intVal.toString();
  };

  return (
    <span>
      {prefix}
      {formattedNumber()}
      {suffix}
    </span>
  );
}
