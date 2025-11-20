// src/hooks/useDevice.ts
import { useEffect, useState } from "react";

export const useDevice = () => {
  const [size, setSize] = useState({
    width: 0,
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const update = () => {
      const width = window.innerWidth;

      setSize({
        width,
        isMobile: width < 640,
        isTablet: width >= 640 && width < 1024,
        isDesktop: width >= 1024,
      });
    };

    update(); // set initial value
    window.addEventListener("resize", update);

    return () => window.removeEventListener("resize", update);
  }, []);

  return size;
};
