import { Box, Container, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { addPopupToMapWidget, createMapWidget } from "./mapWidget";
import { createPortal } from "react-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";

export default function MapView() {
  const containerRef = useRef<HTMLDivElement>(null);

  const mapRef = useRef<L.Map | null>(null); // уточнення, що це карта з Leaflet

  const [popupContainer, setPopupContainer] = useState<HTMLElement | null>(null);
  useEffect(() => {
    if (mapRef.current === null) {
      // containerRef.current - вказує на DOM елмент .current
      const map = createMapWidget(containerRef.current!);
      mapRef.current = map;
      // додавання спливаючого вікна (popup) до карти
      const popupDiv = addPopupToMapWidget(map);
      setPopupContainer(popupDiv);
    }
  }, []);
  /* 1. Це те що ми хочемо зарендерити
        2. Це куди ми хочемо зарендерити 
  */
  return (
    <>
      <Container ref={containerRef} sx={{ width: 800, height: 500, my: 2 }}>
        {popupContainer !== null && createPortal(<Greeting></Greeting>, popupContainer)}
      </Container>
    </>
  );
}

function Greeting() {
  return (
    <>
      <Box>
        <Typography>Greetings from Ukraine</Typography>
        <FavoriteIcon sx={{ color: "#005689" }}></FavoriteIcon>
        <FavoriteIcon sx={{ color: "#FFD800" }}></FavoriteIcon>
      </Box>
    </>
  );
}
