import { useAuth0 } from "@auth0/auth0-react";
import { Avatar, Box, Container, Stack, Typography } from "@mui/material";

export function Profile() {
  const { user } = useAuth0();
  return (
    <>
      <Container>
        <Stack>
          <Box>
            <Avatar src={user?.picture} />
            <Box>
              <Typography variant="h5">{user?.name}</Typography>
              <Typography variant="h5">{user?.email}</Typography>
            </Box>
          </Box>
          <Box>
            {/* на цьому місці могла бути форма для редагування інформації */}
            <pre>
              <code>{JSON.stringify(user, null, 2)}</code>
            </pre>
          </Box>
        </Stack>
      </Container>
    </>
  );
}
