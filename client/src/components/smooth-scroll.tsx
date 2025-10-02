"use client";

import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    let isScrolling = false;
    let scrollTimeout: NodeJS.Timeout;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      
      if (isScrolling) return;
      
      const sections = document.querySelectorAll('.scroll-section');
      const currentSection = getCurrentSection(sections);
      
      if (e.deltaY > 0) {
        // Scrolling down
        const nextSection = sections[currentSection + 1];
        if (nextSection) {
          scrollToSection(nextSection as HTMLElement);
        }
      } else {
        // Scrolling up
        const prevSection = sections[currentSection - 1];
        if (prevSection) {
          scrollToSection(prevSection as HTMLElement);
        }
      }
    };

    const getCurrentSection = (sections: NodeListOf<Element>) => {
      const scrollTop = window.pageYOffset;
      const windowHeight = window.innerHeight;
      
      for (let i = 0; i < sections.length; i++) {
        const section = sections[i] as HTMLElement;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        
        if (scrollTop >= sectionTop - windowHeight / 2 && 
            scrollTop < sectionTop + sectionHeight - windowHeight / 2) {
          return i;
        }
      }
      return 0;
    };

    const scrollToSection = (section: HTMLElement) => {
      isScrolling = true;
      
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Reset scrolling flag after animation (slower)
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 1500);
    };

    // Add wheel event listener
    window.addEventListener('wheel', handleWheel, { passive: false });
    
    // Handle touch events for mobile
    let touchStartY = 0;
    let touchEndY = 0;
    
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.changedTouches[0].screenY;
    };
    
    const handleTouchEnd = (e: TouchEvent) => {
      touchEndY = e.changedTouches[0].screenY;
      handleSwipe();
    };
    
    const handleSwipe = () => {
      if (isScrolling) return;
      
      const sections = document.querySelectorAll('.scroll-section');
      const currentSection = getCurrentSection(sections);
      const swipeThreshold = 50;
      
      if (touchStartY - touchEndY > swipeThreshold) {
        // Swiped up (scroll down)
        const nextSection = sections[currentSection + 1];
        if (nextSection) {
          scrollToSection(nextSection as HTMLElement);
        }
      } else if (touchEndY - touchStartY > swipeThreshold) {
        // Swiped down (scroll up)
        const prevSection = sections[currentSection - 1];
        if (prevSection) {
          scrollToSection(prevSection as HTMLElement);
        }
      }
    };
    
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    // Cleanup
    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      clearTimeout(scrollTimeout);
    };
  }, []);

  return null;
}
