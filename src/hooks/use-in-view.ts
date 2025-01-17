import { RefObject, useEffect, useState } from "react";

export const useInView = (
  target: RefObject<HTMLElement | null>,
  options: IntersectionObserverInit & { triggerOnce?: boolean }
) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  // const [hasTriggered, setHasTriggered] = useState(false); // State to track if the event has been triggered

  useEffect(() => {
    // if (!target.current || (options.triggerOnce && hasTriggered)) return;
    if (!target.current) return;

    const callback: IntersectionObserverCallback = (entries, observer) => {
      if (entries[0]) {
        const isNowIntersecting = entries[0].isIntersecting;
        setIsIntersecting(isNowIntersecting);

        // If triggerOnce is enabled and the element is intersecting, update hasTriggered
        if (options.triggerOnce && isNowIntersecting) {
          // setHasTriggered(true);
          observer.disconnect()
        }
      }
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(target.current);

    return () => {
      observer.disconnect();
    };
    // // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, options]);

  return isIntersecting;
};
