import { Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";

export default function CountdownText() {
  const [countdown, setCountdown] = useState(9);
  const intervalRef = useRef<any>();
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCountdown((countdown) => countdown - 1);
    }, 1000);
    console.log(intervalRef.current);

    return () => {
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    if (countdown === 0) {
      clearInterval(intervalRef.current);
    }
  }, [countdown]);
  return (
    <>
      <Typography variant="h4" align="center">
        Coming soon ... {countdown}
      </Typography>
    </>
  );
}
