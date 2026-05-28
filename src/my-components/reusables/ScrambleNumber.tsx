import { useEffect, useState } from 'react';

type numProps = {
  value: number;
};

export const ScrambleNumber = ({ value }: numProps) => {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;

    const interval = setInterval(() => {
      frame++;
      setDisplay(Math.floor(Math.random() * value * 1.5));
      if (frame > 15) {
        clearInterval(interval);
        setDisplay(value);
      }
    }, 40);

    return () => clearInterval(interval);
  }, [value]);

  return <div>{display}</div>;
};
