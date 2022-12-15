import React, { useState, useEffect } from 'react';

import DisplayContext from './DisplayContext';

function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    height,
    width,
  };
}

const DisplayState = ({ children }) => {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () =>
      window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <DisplayContext.Provider
      value={{
        windowWidth: windowDimensions.width,
        windowHeight: windowDimensions.height,
      }}
    >
      {children}
    </DisplayContext.Provider>
  );
};

export default DisplayState;
