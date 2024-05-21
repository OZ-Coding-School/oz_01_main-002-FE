import React, { useEffect } from 'react';

export function useScrollEvent(ref: React.MutableRefObject<HTMLElement | null>, result?: string, result2?: string) {

  const handleScroll = () => {
    const scrollY = window.scrollY;
    if (ref.current === null) return;
    if (window.scrollY >= 36.5) {
      ref.current.style.marginTop = result ? result : '0px';
    } else {
      ref.current.style.marginTop = result2 ? result2 : '0px';
    }
  };


  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
    }, 100);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [])

  return ref;
}
