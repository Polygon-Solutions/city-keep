import { useState, useEffect } from 'react';

export default function useWindowDimensions() {
  const [example, setExample] = useState('example');

  useEffect(() => {
    // Do something probably
  }, []);

  return example; // Maybe
}
