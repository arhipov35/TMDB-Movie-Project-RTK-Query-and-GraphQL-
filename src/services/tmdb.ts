import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import configuration from "../configuration";

interface Configuration {
  images: {
    base_url: string;
  };
}
export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  popularity: number;
  backdrop_path?: string;
}
interface MoviesState {
  results: MovieDetails[];
  lastPage: number;
  hasMorePages: boolean;
}
export interface MoviesQuery {
  page: number;
  filters: MoviesFilters;
  selectors: MoviesFilters;
  companies: MoviesFilters;
}

export interface MoviesFilters {
  keywords?: number[];
  genres?: number[];
  companies?: number[];
}

export interface KeywordItem {
  id: number;
  name: string;
}
interface PageResponse<TResult> {
  page: number;
  results: TResult[];
  total_pages: number;
  genres: TResult[];
}
interface Genre {
  id: number;
  name: string;
}

interface Body {
  media_type: string;
  media_id: number;
  favorite: boolean;
}
export interface argFavorite {
  account_id: number;
  RAW_BODY: Body;
}
export const tmdbAPi = createApi({
  reducerPath: "tmdbAPi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${configuration.apiUrl}/3`,
    prepareHeaders(headers) {
      headers.set("Accept", "application/json");
      headers.set("Authorization", `Bearer ${configuration.apiToken}`);
    },
  }),
  endpoints: (builder) => ({
    getConfiguration: builder.query<Configuration, void>({
      query: () => "/configuration",
    }),
    getMovies: builder.query<MoviesState, MoviesQuery>({
      query(moviesQuery) {
        const params = new URLSearchParams({
          page: moviesQuery.page.toString(),
        });
        if (moviesQuery.filters.keywords?.length) {
          params.append("with_keywords", moviesQuery.filters.keywords.join("|"));
        }
        if (moviesQuery.selectors.genres?.length) {
          params.append("with_genres", moviesQuery.selectors.genres.join("|"));
        }
        if (moviesQuery.companies.companies?.length) {
          params.append("with_companies", moviesQuery.companies.companies.join("|"));
        }

        const query = params.toString();
        const path = `/discover/movie?${query}`;
        return path;
      },
      transformResponse(response: PageResponse<MovieDetails>, _, arg) {
        return {
          results: response.results,
          lastPage: response.page,
          hasMorePages: arg.page < response.total_pages,
        };
      },
      serializeQueryArgs({ endpointName }) {
        return endpointName;
      },
      merge(currentCacheData, responseData) {
        if (responseData.lastPage === 1) {
          currentCacheData.results = responseData.results;
        } else {
          currentCacheData.results.push(...responseData.results);
        }
        currentCacheData.lastPage = responseData.lastPage;
        currentCacheData.hasMorePages = responseData.hasMorePages;
      },
      // якщо попередній з поточним різні, то запит виконається
      forceRefetch({ currentArg, previousArg }) {
        return currentArg !== previousArg;
      },
    }),
    getKeywords: builder.query<KeywordItem[], string>({
      query: (queryText) => `/search/keyword?query=${queryText}`,
      transformResponse: (response: PageResponse<KeywordItem>) => response.results,
    }),
    getGenres: builder.query<Genre[], void>({
      query: () => `/genre/movie/list`,
      transformResponse: (response: { genres: Genre[] }) => response.genres,
    }),
    getCompany: builder.query<KeywordItem[], string>({
      query: (queryCompany) => `/search/company?query=${queryCompany}`,
      transformResponse: (response: PageResponse<KeywordItem>) => response.results,
    }),
    addFavorite: builder.mutation<void, argFavorite>({
      query: (queryArg) => ({
        url: `/account/${queryArg.account_id}/favorite`,
        method: "POST",
        body: queryArg.RAW_BODY,
      }),
    }),
  }),
});

export const {
  useGetConfigurationQuery,
  useGetGenresQuery,
  useGetKeywordsQuery,
  useGetMoviesQuery,
  useAddFavoriteMutation,
  useGetCompanyQuery,
} = tmdbAPi;
