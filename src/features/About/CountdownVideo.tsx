import { Card, CardActions, CardMedia, IconButton } from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import { useRef, useState } from "react";
export function CountdownVideo() {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  function tooglePlaying() {
    const nextPlaying = !isPlaying;

    if (nextPlaying) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }
  return (
    <>
      <Card>
        <CardMedia>
          <video
            src="https://www.pexels.com/download/video/3843433"
            height="500"
            ref={videoRef}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
          ></video>
        </CardMedia>
        <CardActions>
          <IconButton onClick={tooglePlaying}>
            {isPlaying ? (
              <PauseIcon sx={{ height: 38, width: 38 }}></PauseIcon>
            ) : (
              <PlayArrowIcon sx={{ height: 38, width: 38 }}></PlayArrowIcon>
            )}
          </IconButton>
        </CardActions>
      </Card>
    </>
  );
}
