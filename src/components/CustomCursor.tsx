import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const springConfig = { damping: 25, stiffness: 200 };
  const cursorX = useSpring(0, springConfig);
  const cursorY = useSpring(0, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovered(
        target.tagName === 'A' || 
        target.tagName === 'BUTTON' || 
        target.closest('button') !== null ||
        target.closest('a') !== null ||
        target.classList.contains('cursor-pointer')
      );
    };

    window.addEventListener('mousemove', moveMouse);
    window.addEventListener('mouseover', handleHover);

    return () => {
      window.removeEventListener('mousemove', moveMouse);
      window.removeEventListener('mouseover', handleHover);
    };
  }, [cursorX, cursorY]);

  return (
    <>
      <motion.div
        style={{
          translateX: cursorX,
          translateY: cursorY,
        }}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-amber-500 pointer-events-none z-[9999] hidden md:block"
        animate={{
          scale: isHovered ? 2 : 1,
          backgroundColor: isHovered ? 'rgba(245, 158, 11, 0.1)' : 'rgba(245, 158, 11, 0)',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300, mass: 0.5 }}
      />
      <motion.div
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHovered ? 0 : 1,
        }}
        transition={{ type: 'spring', damping: 30, stiffness: 500, mass: 0.2 }}
        className="fixed top-0 left-0 w-2 h-2 bg-amber-500 rounded-full pointer-events-none z-[9999] hidden md:block"
      />
    </>
  );
};

export default CustomCursor;
