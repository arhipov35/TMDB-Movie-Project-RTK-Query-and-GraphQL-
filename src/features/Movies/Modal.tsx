import { Typography, Button } from "@mui/material";
import styles from "./Modal.module.scss";
import { Link as RouterLink } from "react-router-dom";
interface ModalProps {
  id: number;
  onClose: () => void;
}
function Modal({ id, onClose }: ModalProps) {
  return (
    <>
      <section className={styles.section}>
        <article className={styles.article}>
          <Typography>Choose one</Typography>
          <Button component={RouterLink} to={`/movies/${id}`} color="secondary">
            Next
          </Button>
          <Button onClick={onClose}>Close</Button>
        </article>
      </section>
    </>
  );
}

export default Modal;


