import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
// import styles from "./MovieCard.module.scss";
// import styles from "./Modal.module.scss";
// import { Link as RouterLink } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { createPortal } from "react-dom";
import { memo, useRef, useState } from "react";
import Modal from "./Modal";

interface Props {
  id: number;
  title: string;
  popularity: number;
  overview: string;
  image?: string;
  enableuserActions?: boolean;
  onAddFavorite?(id: number): void;
}
export function MovieCard({
  id,
  title,
  overview,
  popularity,
  image = "/movie-thumb.png",
  enableuserActions,
  onAddFavorite,
}: Props) {
  const [modal, setModal] = useState<boolean>(false);
  const refCard = useRef<HTMLDivElement>(null);
  console.count("MovieCard");
  return (
    <>
      <Card ref={refCard} sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
        <CardMedia component="div" image={image} sx={{ pt: "56.25%" }}></CardMedia>
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography variant="h5" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {overview}
          </Typography>
          <Typography variant="button" display="block" mt={2}>
            {popularity}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            color="secondary"
            onClick={() => {
              setModal(true);
            }}
          >
            Details
          </Button>
          {enableuserActions && (
            <Tooltip title="Add to favorites">
              <IconButton onClick={() => onAddFavorite?.(id)}>
                <FavoriteIcon></FavoriteIcon>
              </IconButton>
            </Tooltip>
          )}
        </CardActions>
        {modal && createPortal(<Modal id={id} onClose={() => setModal(false)} />, document.body)}
      </Card>
    </>
  );
}

export default memo(MovieCard);

