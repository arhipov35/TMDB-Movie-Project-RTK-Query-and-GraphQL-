import { useState, useRef, useEffect } from "react";

// Визначаємо тип Time, де Start не приймає аргументів
type Time = [number, () => void, () => void];

function useTime(initialValue: number = 10): Time {
  const [number, setNumber] = useState<number>(initialValue);
  const stop = useRef<any>();

  function Start() {
    clearInterval(stop.current);
    setNumber(initialValue);

    stop.current = setInterval(() => {
      setNumber((prev) => prev - 1);
    }, 1000);
  }

  useEffect(() => {
    if (number <= 0) {
      clearInterval(stop.current);
    }
  }, [number]);

  function Stop() {
    clearInterval(stop.current);
  }

  return [number, Start, Stop];
}

export default useTime;
