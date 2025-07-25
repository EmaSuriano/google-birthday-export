import { useEffect, useState } from 'react';

export function ScrollIndicator() {
  const [showIndicator, setShowIndicator] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setShowIndicator(!scrolled);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showIndicator) return null;

  const scrollToFAQ = () => {
    window.scrollTo({
      top: window.innerHeight - 100,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToFAQ}
      className="fixed bottom-1 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors group"
      aria-label="Scroll to FAQ section"
    >
      <span className="text-xs mb-1 opacity-0 group-hover:opacity-100 transition-opacity">
        More info
      </span>
      <svg
        className="w-6 h-6 animate-bounce"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 14l-7 7m0 0l-7-7m7 7V3"
        />
      </svg>
    </button>
  );
}
