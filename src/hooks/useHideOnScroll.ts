import { useEffect, useRef, useState } from "react";

export const useHideOnScroll = (offset: number = 80) => {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);
  const ticking = useRef(false);

  useEffect(() => {
    const update = () => {
      const currentScrollY = window.scrollY;

      if (Math.abs(currentScrollY - lastScrollY.current) < 5) {
        ticking.current = false;
        return;
      }

      if (currentScrollY > lastScrollY.current && currentScrollY > offset) {
        setShow(false); // scrolling down
      } else {
        setShow(true); // scrolling up
      }

      lastScrollY.current = currentScrollY;
      ticking.current = false;
    };

    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(update);
        ticking.current = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return show;
};
