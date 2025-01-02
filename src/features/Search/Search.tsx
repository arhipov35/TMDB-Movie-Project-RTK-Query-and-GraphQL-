import { Avatar, Card, CardContent, Container, Typography } from "@mui/material";
import { useState } from "react";
import { CharacterQuery, useGetCharactersQuery } from "../../services/rickandmorty";
import SearchPager from "./SearchPager";
const defaultQuery = { id: 1 };
function Search() {
  const [query, setQuery] = useState<CharacterQuery>(defaultQuery);
  const { data } = useGetCharactersQuery(query);
  // console.log(data?.character);
  
  return (
    <>
      <Container sx={{ py: 3 }} maxWidth="xl">
        <SearchPager
          current={query.id}
          onNext={() => setQuery((q) => ({ ...q, id: q.id + 1 }))}
          onPrev={() => setQuery((q) => ({ ...q, id: q.id - 1 }))}
        ></SearchPager>
        <Card sx={{ maxHeight: 500 }}>
          <CardContent>
            <Typography variant="h1" mt={1}>
              Character
            </Typography>
            <Avatar
              alt={data?.character.name}
              src={data?.character.image}
              sx={{ width: 96, height: 96 }}
            />
            <Typography variant="h4" mt={1}>
              {data?.character.name}
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </>
  );
}
export default Search;
