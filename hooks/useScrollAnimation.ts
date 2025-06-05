// hooks/useScrollAnimation.ts
import { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollAnimationOptions {
  threshold?: number | number[];
  triggerOnce?: boolean;
  rootMargin?: string;
  delay?: number; // in ms
  animationClass?: string; // specific class to apply, e.g., 'scroll-animate-slide-up'
}

type ElementRef = React.RefObject<HTMLElement | null>;

const useScrollAnimation = (options?: ScrollAnimationOptions) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLElement | null>(null);

  const setRef = useCallback((node: HTMLElement | null) => {
    if (node) {
      elementRef.current = node;
       // Add base scroll-animate class directly if an animation is intended
      if (options?.animationClass) {
        node.classList.add('scroll-animate');
        if(options.animationClass !== 'scroll-animate-fade-in') { // fade-in usually doesn't need a directional class
           node.classList.add(...options.animationClass.split(' '));
        }
      }
    }
  }, [options?.animationClass]);


  useEffect(() => {
    const currentElement = elementRef.current;
    if (!currentElement) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (options?.delay) {
            setTimeout(() => {
              setIsVisible(true);
              currentElement.classList.add('is-visible');
              if (options?.triggerOnce) {
                observer.unobserve(currentElement);
              }
            }, options.delay);
          } else {
            setIsVisible(true);
            currentElement.classList.add('is-visible');
            if (options?.triggerOnce) {
              observer.unobserve(currentElement);
            }
          }
        } else {
          if (!options?.triggerOnce) {
            // Optional: remove 'is-visible' to re-animate on scroll away and back
            // setIsVisible(false);
            // currentElement.classList.remove('is-visible');
          }
        }
      },
      {
        threshold: options?.threshold || 0.1,
        rootMargin: options?.rootMargin || '0px',
      }
    );

    observer.observe(currentElement);

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options, elementRef.current]); // Add elementRef.current to dependencies

  return setRef; // Return the ref callback
};

export default useScrollAnimation;
