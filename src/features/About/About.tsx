import { Container, Typography } from "@mui/material";
import CountdownText from "./CountdownText";
import { CountdownVideo } from "./CountdownVideo";
import MapView from "./MapView";
import { Profiler, useState } from "react";

function About() {
  const handleRender = (
    id: string, 
    phase: "mount" | "update" | "nested-update", // Оновлено: додано "nested-update"
    actualDuration: number, 
    baseDuration: number, 
    startTime: number, 
    commitTime: number
  ) => {
    console.log(`Profiler data for ${id}:`);
    console.log("Phase:", phase);
    console.log("Actual Duration:", actualDuration);
    console.log("Base Duration:", baseDuration);
    console.log("Start Time:", startTime);
    console.log("Commit Time:", commitTime);
  };
  return (
    <>
      <Profiler id="About" onRender={handleRender}>
        <Container sx={{ py: 8 }} maxWidth="md">
          <CountdownText></CountdownText>
          <CountdownVideo />
          <MapView></MapView>
        </Container>
      </Profiler>
    </>
  );
}

export default About;

