import MovieCard from "./MovieCard";
import { lazy, Suspense, useCallback, useContext, useState } from "react";

import { Grid, Container, LinearProgress, Typography } from "@mui/material";
import { useIntersectionObserver } from "../../hooks/useIntersectionObserver";

import {
  argFavorite,
  MoviesFilters,
  MoviesQuery,
  useAddFavoriteMutation,
  useGetConfigurationQuery,
  useGetMoviesQuery,
} from "../../services/tmdb";
import { useAuth0 } from "@auth0/auth0-react";

const initialQuery: MoviesQuery = {
  page: 1,
  filters: {},
  selectors: {},
  companies: {},
};

const MoviesFilter = lazy(() => import("./MoviesFilter"));
function Movies() {
  const [query, setQuery] = useState<MoviesQuery>(initialQuery);

  const { data: configuration } = useGetConfigurationQuery();
  const { data, isFetching } = useGetMoviesQuery(query);
  // сформувати запит через state
  const [AddFavorite] = useAddFavoriteMutation();

  const movies = data?.results ?? [];
  const hasMorePages = data?.hasMorePages;
  const { isAuthenticated, user } = useAuth0();
  const onIntersect = useCallback(() => {
    if (hasMorePages) {
      setQuery((q) => ({ ...q, page: q.page + 1 }));
    }
  }, [hasMorePages]);
  // кастомний хук
  const [targetRef] = useIntersectionObserver({ onIntersect });

  const handlerAddFavorite = useCallback(
    (id: number) => {
      AddFavorite({
        account_id: 21547798,
        RAW_BODY: { media_type: "movie", media_id: id, favorite: true },
      });
      alert("Успішно додано до списку улюблених");
    },
    [user?.name]
  );

  function formatImageUrl(path?: string) {
    return path && configuration ? `${configuration?.images.base_url}w780${path}` : undefined;
  }
  return (
    <>
      <Grid container spacing={2} sx={{ flexWrap: "nowrap" }}>
        <Grid item xs="auto">
          <Suspense fallback={<span>Loading filter...</span>}>
            <MoviesFilter
              onApply={(filters) => {
                const moviesFilters: MoviesFilters = {
                  keywords: filters.keywords.map((k) => k.id),
                  genres: filters.genres.map((g) => g.id),
                  companies: filters.companies.map((c) => c.id),
                };
                setQuery({
                  page: 1,
                  filters: moviesFilters,
                  selectors: moviesFilters,
                  companies: moviesFilters,
                });
              }}
            ></MoviesFilter>
          </Suspense>
        </Grid>
        <Grid item xs={12}>
          <Container sx={{ py: 8 }} maxWidth="lg">
            {!isFetching && !movies.length && (
              <Typography variant="h6">No movies were found that match yout query.</Typography>
            )}
            <Grid container spacing={4}>
              {movies.map((m, i) => (
                <Grid item key={`${m.id}-${i}`} xs={12} sm={6} md={4}>
                  <MovieCard
                    key={m.id}
                    id={m.id}
                    title={m.title}
                    overview={m.overview}
                    popularity={m.popularity}
                    image={formatImageUrl(m.backdrop_path)}
                    enableuserActions={isAuthenticated}
                    onAddFavorite={handlerAddFavorite}
                  />
                </Grid>
              ))}
            </Grid>
            <div ref={targetRef}>
              {isFetching && <LinearProgress color="secondary" sx={{ mt: 3 }} />}
            </div>
          </Container>
        </Grid>
      </Grid>
    </>
  );
}

// const mapStateToProps = (state: RootState) => ({
//   movies: state.movies.top,
//   loading: state.movies.loading,
//   hasMorePages: state.movies.hasMorePages,
// });

// const connector = connect(mapStateToProps);

export default Movies;

