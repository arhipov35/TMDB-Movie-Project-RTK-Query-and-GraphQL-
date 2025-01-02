import { screen } from "@testing-library/react";
import { renderWithProviders } from "../../utils/test-uitlis";
import { Extra } from "./Extra";
import { setupServer } from "msw/node";
import { graphql, HttpResponse } from "msw";
import { Episode } from "../../services/rickandmorty";
// перевіряє чи дані завантажуються з правильного API на цю сторінку
describe("Extra", () => {
  // const responsePages: Record<string, Episode[]> = {
  //   "1": [
  //     {
  //       name: "Pilot",
  //       air_date: "December 2, 2013",
  //       episode: "S01E01",
  //       characters: [
  //         {
  //           id: "1",
  //           name: "Rick Sanchez",
  //           image: "/avatar/1.jpeg",
  //         },
  //         {
  //           id: "2",
  //           name: "Morty Smith",
  //           image: "/avatar/2.jpeg",
  //         },
  //       ],
  //     },
  //     {
  //       name: "Lawnmower Dog",
  //       air_date: "December 9, 2013",
  //       episode: "S01E02",
  //       characters: [
  //         {
  //           id: "1",
  //           name: "Rick Sanchez",
  //           image: "/avatar/1.jpeg",
  //         },
  //         {
  //           id: "2",
  //           name: "Morty Smith",
  //           image: "/avatar/2.jpeg",
  //         },
  //         {
  //           id: "38",
  //           name: "Beth Smith",
  //           image: "/avatar/38.jpeg",
  //         },
  //       ],
  //     },
  //   ],
  //   "2": [
  //     {
  //       name: "Anatomy Park",
  //       air_date: "December 16, 2013",
  //       episode: "S01E03",
  //       characters: [
  //         {
  //           id: "1",
  //           name: "Rick Sanchez",
  //           image: "/avatar/1.jpeg",
  //         },
  //         {
  //           id: "2",
  //           name: "Morty Smith",
  //           image: "/avatar/2.jpeg",
  //         },
  //         {
  //           id: "12",
  //           name: "Alexander",
  //           image: "/avatar/12.jpeg",
  //         },
  //       ],
  //     },
  //   ],
  // };
  // const handlers = [
  //   graphql.query("GetEpisodesPage", ({ query, variables }) => {
  //     const { page } = variables;
  //     const index = page as string;

  //     return HttpResponse.json({
  //       data: {
  //         episodes: {
  //           results: responsePages[index],
  //         },
  //       },
  //     });
  //   }),
  // ];
  // const server = setupServer(...handlers);
  // beforeAll(() => server.listen());
  // afterEach(() => server.resetHandlers());
  // afterAll(() => server.close());

  it("should render", async () => {
    renderWithProviders(<Extra />);
    // він пройшов тому що API є відкритим
    expect(await screen.findByText("Pilot")).toBeInTheDocument();
  });
});
