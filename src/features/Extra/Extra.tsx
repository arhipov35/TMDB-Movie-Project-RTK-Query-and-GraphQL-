import { useState } from "react";
import { EpisodesQuery, useGetEpisodesQuery } from "../../services/rickandmorty";
import { Container, Grid } from "@mui/material";
import Pager from "./Pager";
import { EpisodeCard } from "./EpisodeCard";
const defaultQuery = { page: 1 };
export function Extra() {
  const [query, setQuery] = useState<EpisodesQuery>(defaultQuery);
  const { data } = useGetEpisodesQuery(query);
  // console.log(data);
  return (
    <>
      <Container sx={{ py: 3 }} maxWidth="xl">
        <Pager
          current={query.page}
          onNext={() => setQuery((q) => ({ ...q, page: q.page + 1 }))}
          onPrev={() => setQuery((q) => ({ ...q, page: q.page - 1 }))}
        ></Pager>
      </Container>
      <Grid container spacing={2}>
        {data?.results.map((e) => (
          <>
            <Grid item key={e.episode} xs={12} sm={6} md={4} lg={3}>
              <EpisodeCard
                name={e.name}
                episode={e.episode}
                airDate={e.air_date}
                characters={e.characters}
              />
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
}
