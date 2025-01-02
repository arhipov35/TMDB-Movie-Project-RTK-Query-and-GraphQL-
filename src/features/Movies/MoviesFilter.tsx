import { FilterAltOutlined } from "@mui/icons-material";
import dataMain from "../../JSON/dataYear.json";
import {
  Autocomplete,
  Button,
  Checkbox,
  Container,
  debounce,
  FormControl,
  FormControlLabel,
  Paper,
  Skeleton,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useMemo, useState } from "react";
import {
  KeywordItem,
  useGetCompanyQuery,
  useGetGenresQuery,
  useGetKeywordsQuery,
} from "../../services/tmdb";

export interface Filters {
  keywords: KeywordItem[];
}

interface MoviesFilterProps {
  onApply(filters: CombinedFilters): void;
}
export type CombinedFilters = {
  keywords: KeywordItem[];
  genres: KeywordItem[];
  data: number[];
  companies: KeywordItem[];
};

function MoviesFilter({ onApply }: MoviesFilterProps) {
  const [keywordsQuery, setkeywordsQuery] = useState<string>("");
  const [companyQuery, setcompanyQuery] = useState<string>("");
  const { data: keywordsOptions = [], isLoading: keywordsLoading } = useGetKeywordsQuery(
    keywordsQuery,
    // skip булевий індикатор, який вказує пропускати запит чи ні (якщо не визанчений keywordsQuery, то не робимо запит)
    { skip: !keywordsQuery }
  );
  const { data: companyOptions = [], isLoading: companyLoading } = useGetCompanyQuery(
    companyQuery,
    {
      skip: !companyQuery,
    }
  );

  const { data: genres = [], isLoading: genresLoading } = useGetGenresQuery();

  const { handleSubmit, control } = useForm<CombinedFilters>({
    defaultValues: {
      keywords: [],
      genres: [],
      data: [],
      companies: [],
    },
  });

  const fetchKeywords = useMemo(
    () =>
      debounce((query: string) => {
        setkeywordsQuery(query);
      }, 1000),
    []
  );

  const fetchCompanies = useMemo(
    () =>
      debounce((query: string) => {
        setcompanyQuery(query);
      }, 1000),
    []
  );

  return (
    <>
      <Paper sx={{ m: 2, p: 0.5 }}>
        <form onSubmit={handleSubmit(onApply)}>
          <FormControl component="fieldset" variant="standard" sx={{ m: 2, display: "block" }}>
            {/* Запитати чому ми обгортаємо в Controller */}
            <Controller
              name="keywords"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  disablePortal
                  loading={keywordsLoading}
                  options={keywordsOptions}
                  filterOptions={(x) => x}
                  onChange={(e, value) => onChange(value)}
                  getOptionLabel={(option) => option.name}
                  value={value}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => <TextField {...params} label="Keywords" />}
                  onInputChange={(e, value) => fetchKeywords(value)}
                />
              )}
            />
          </FormControl>
          <FormControl component="fieldset" variant="standard" sx={{ m: 2, display: "block" }}>
            {/* Запитати чому ми обгортаємо в Controller */}
            <Controller
              name="companies"
              control={control}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  multiple
                  disablePortal
                  loading={companyLoading}
                  options={companyOptions}
                  filterOptions={(x) => x}
                  onChange={(e, value) => onChange(value)}
                  getOptionLabel={(option) => option.name}
                  value={value}
                  isOptionEqualToValue={(option, value) => option.id === value.id}
                  renderInput={(params) => <TextField {...params} label="companies" />}
                  onInputChange={(e, value) => fetchCompanies(value)}
                />
              )}
            />
          </FormControl>
          <FormControl component="fieldset" variant="standard" sx={{ m: 2, display: "block" }}>
            {genresLoading ? (
              <Skeleton width={300} height={480}></Skeleton>
            ) : (
              <>
                <Controller
                  name="genres"
                  control={control}
                  render={({ field: { onChange, value = [] } }) => (
                    <>
                      <Container
                        sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}
                      >
                        {genres.map((item) => (
                          <FormControlLabel
                            onChange={(event, checked) => {
                              // Якщо жанр вибрано, додаємо його до масиву
                              if (checked) {
                                onChange([...value, item]);
                              } else {
                                // Якщо жанр знято, видаляємо його з масиву
                                onChange(value.filter((genre) => genre.id !== item.id));
                              }
                            }}
                            //  використовує поточний стан масиву value, щоб визначити,
                            //  чи повинні чекбокси бути відмічені чи ні.
                            // {value.includes(item.id)} ще такий метод простйший
                            checked={value.some((genre) => genre.id === item.id)}
                            key={item.id}
                            control={<Checkbox />}
                            label={`${item.name}`}
                          />
                        ))}
                      </Container>
                    </>
                  )}
                />
              </>
            )}
          </FormControl>

          <Button type="submit" variant="contained" startIcon={<FilterAltOutlined />} sx={{ m: 2 }}>
            Apply Filter
          </Button>
        </form>
      </Paper>
    </>
  );
}

export default MoviesFilter;
