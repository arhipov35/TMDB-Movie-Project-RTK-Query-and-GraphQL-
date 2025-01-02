const configuration = {
  apiUrl: process.env.REACT_APP_URL,
  apiToken: process.env.REACT_APP_TOKEN,
  auth0Domain: process.env.REACT_APP_AUTH0_DOMAIN,
  auth0ClientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  auth0RedirectUri: process.env.REACT_APP_AUTH0_CALLBACK_URL,
  protectedApiUrl: process.env.REACT_APP_AUTH0_PROTECTED_API_URL,
  audience: process.env.REACT_APP_AUTH0_AUDIENCE,
};
export default configuration;
