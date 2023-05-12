import { useState, useEffect } from 'react';

/** 
 * *
 * Windows Dimensions
 * @description 
    - Stores window dimensions for use in components
    - Updates window dimensions on each window resize
    - Includes debounce for window dimension updates
 * @listens ReportFormPopover
 * @param {number} debounceTime
 * @returns {object} windowDimensions
 */
function useWindowDimensions(debounceTime = 20) {
  // State
  const [windowDimensions, setWindowDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  /** 
   * *
   * Windows Dimensions useEffect hook
   * @description 
      - Declares a timeoutId variable that will have a 
        timeout assigned and cleared repeatedly by 
        handleResize
      - Adds handleResize to the window resize event 
        listener
      - Removes the event listener when the component is 
        unmounted
      - debounceTime is not a dependency since it is a 
        tuning parameter and therefore remains constant
  */
  useEffect(() => {
    let timeoutId;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowDimensions({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }, debounceTime);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return windowDimensions;
}

export default useWindowDimensions;
