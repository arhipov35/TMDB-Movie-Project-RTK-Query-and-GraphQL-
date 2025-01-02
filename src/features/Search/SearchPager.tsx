import { Stack, Button } from "@mui/material";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
interface Props {
  current: number;
  onNext(): void;
  onPrev(): void;
}
function SearchPager({ current, onNext, onPrev }: Props) {
  return (
    <>
      <Stack direction="row" sx={{ mb: 3 }} spacing={2}>
        <Button
          variant="contained"
          startIcon={<SkipPreviousIcon />}
          onClick={onPrev}
          disabled={current === 1}
        >
          Previous
        </Button>
        <Button variant="outlined" disabled>
          {current}
        </Button>
        <Button variant="contained" endIcon={<SkipNextIcon />} onClick={onNext}>
          Next
        </Button>
      </Stack>
    </>
  );
}
export default SearchPager;
