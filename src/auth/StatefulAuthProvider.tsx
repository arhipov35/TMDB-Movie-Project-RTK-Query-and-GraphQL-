import { AppState, Auth0Provider } from "@auth0/auth0-react";
import { AuthProvider } from "oidc-react";
import configuration from "../configuration";
import { useNavigate } from "react-router-dom";

interface StatefulAuthProviderProps {
  children: React.ReactNode;
}
const authConfig = {
  domain: configuration.auth0Domain!,
  clientId: configuration.auth0ClientId!,
  authorizationParams: {
    redirect_uri: configuration.auth0RedirectUri,
    audience: configuration.audience,
  },
};

export function StatefulAuthProvider({ children }: StatefulAuthProviderProps) {
  const navigate = useNavigate();
  const onRedirectCallbackMain = (appState?: AppState) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  return (
    <Auth0Provider
      {...authConfig}
      cacheLocation="localstorage"
      onRedirectCallback={onRedirectCallbackMain}
    >
      {children}
    </Auth0Provider>
  );
}
