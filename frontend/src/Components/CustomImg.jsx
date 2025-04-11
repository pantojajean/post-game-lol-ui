import { useState, useEffect } from 'react';

const CustomImg = ({ src, alt = '' }) => {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    if (!src) {
      setIsValid(false);
      return;
    }

    const img = new window.Image();
    img.onload = () => setIsValid(true);
    img.onerror = () => setIsValid(false);
    img.src = src;
  }, [src]);

  if (!isValid) return null;

  return <img src={src} alt={alt} />;
};

export default CustomImg;