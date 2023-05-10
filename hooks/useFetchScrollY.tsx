import { useState, useEffect } from "react";

/**
 * A custom hook that returns the current Window Y value based on the scroll position
 *
 * @returns Y scroll position of the window
 */
export default function useFetchScrollY() {
  // Defining variables for updating state
  const [scrollY, setScrollY] = useState<number>(0.0);

  useEffect(() => {
    const abortCont = new AbortController();

    /**
     * Function that handles setting the scroll value based on the window's scroll Y value
     */
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    handleScroll();

    // Adds a listener that will update the scrollY variable if there is a scroll update
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      abortCont.abort();
    };
  }, []);

  return scrollY;
}