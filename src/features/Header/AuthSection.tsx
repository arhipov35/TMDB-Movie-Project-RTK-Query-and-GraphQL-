import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "@mui/material";
import { UserSettingMenu } from "./UserSettingMenu";
import { useNavigate } from "react-router-dom";

export function AuthSection() {
  const { loginWithRedirect, isAuthenticated, user, logout } = useAuth0();
  const navigate = useNavigate();
  const onLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/",
      },
    });
  };
  const onLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return isAuthenticated && user ? (
    <UserSettingMenu user={user} onLogout={onLogout} onOpenProfile={() => navigate("/profile")} />
  ) : (
    <>
      <Button color="inherit" variant="outlined" onClick={onLogin}>
        onLogin
      </Button>
    </>
  );
}
