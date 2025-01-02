import { Button, Container } from "@mui/material";
import useTime from "../../hooks/useTime";

function Time() {
  const [number, Start, Stop] = useTime(20);
  return (
    <>
      <Container>
        <div style={{ textAlign: "center", marginTop: "10px" }}>Timer {number}</div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={Start}>Start</Button>
          <Button onClick={Stop} sx={{ color: "red" }}>
            Stop
          </Button>
        </div>
      </Container>

    </>
  );
}

export default Time;
