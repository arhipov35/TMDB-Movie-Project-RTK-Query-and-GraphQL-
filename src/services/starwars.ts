
export interface getFilmsQuery {
  allFilms: {
    films: Films[];
  };
}
interface Films {
  title: string;
  director: string;
  releaseDate: string;
  speciesConnection: { species: Species[] };
}
interface Species {
  name: string;
  classification: string;
  homeworld: { name: string };
}

// export const GET_FILMS = gql`
//   query getFilms {
//     allFilms {
//       films {
//         title
//         director
//         releaseDate
//         speciesConnection {
//           species {
//             name
//             classification
//             homeworld {
//               name
//             }
//           }
//         }
//       }
//     }
//   }
// `;
