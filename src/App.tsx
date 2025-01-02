import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Link as RouterLink, Outlet } from "react-router-dom";
import { teal } from "@mui/material/colors";
import AppHeader from "./features/Header/AppHeader";
import { anonymosUser, AuthContext, AuthInfo } from "./AuthContext";
import { useState } from "react";

const defaultTheme = createTheme({
  palette: {
    primary: teal,
    secondary: {
      main: "#96000f",
    },
  },
});
const fakeAuth: AuthInfo = {
  user: {
    name: "Diana",
  },
};
function App() {
  const [auth, setAuth] = useState<AuthInfo>({ user: anonymosUser });

  return (
    <ThemeProvider theme={defaultTheme}>
      <CssBaseline />
      <AuthContext.Provider value={auth} >
        <AppHeader
          onLogin={() => setAuth(fakeAuth)}
          onLogout={() => setAuth({ user: anonymosUser })}
        ></AppHeader>
        <main>
          <Outlet />
        </main>
      </AuthContext.Provider>
    </ThemeProvider>
  );
}

export default App;

