import { createApi } from "@reduxjs/toolkit/query/react";
import { graphqlRequestBaseQuery } from "@rtk-query/graphql-request-base-query";
import { gql } from "graphql-request";

export interface EpisodesState {
  results: Episode[];
}
export interface EpisodesQuery {
  page: number;
}
export interface CharacterQuery {
  id: number;
}
interface EpisodesResponse {
  episodes: {
    results: Episode[];
  };
}

interface CharacterResponse {
  character: Character;
}
export interface Episode {
  name: string;
  air_date: string;
  episode: string;
  characters: Character[];
}
export interface Character {
  id: string;
  name: string;
  image: string;
}
const characterFragment = gql`
  fragment characterData on Character {
    name
    image
  }
`;

export const rickandmortyApi = createApi({
  reducerPath: "rickandmortyApi",
  baseQuery: graphqlRequestBaseQuery({
    url: "https://rickandmortyapi.com/graphql",
  }),
  endpoints: (builder) => ({
    getEpisodes: builder.query<EpisodesState, EpisodesQuery>({
      query({ page }) {
        return {
          document: gql`
            query GetEpisodesPage($page: Int) {
              episodes(page: $page) {
                results {
                  name
                  air_date
                  episode
                  characters {
                    id
                    name
                    image
                  }
                }
              }
            }
          `,
          variables: {
            page,
          },
        };
      },
      transformResponse(response: EpisodesResponse) {
        return { results: response.episodes.results };
      },
    }),
    getCharacters: builder.query<CharacterResponse, CharacterQuery>({
      query({ id }) {
        return {
          document: gql`
            query getCharacter($characterId: ID!) {
              character(id: $characterId) {
                ...characterData
              }
            }
            ${characterFragment}
          `,
          variables: {
            // GraphQL запит вимагає параметр characterId, як показано в схемі
            characterId: id,
          },
        };
      },
      // transformResponse(response: CharacterResponse) {
      //   return response.character;
      // },
    }),
  }),
});

export const { useGetEpisodesQuery, useGetCharactersQuery } = rickandmortyApi;
// Ми передаємо значення змінної id з вашого компонента в GraphQL як characterId (назва змінної в запиті),
// тому що запит на сервері вимагає саме таку назву параметра.