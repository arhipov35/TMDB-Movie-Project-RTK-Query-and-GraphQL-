import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";
import Home from "./features/Home/Home";

import { ErrorBoundary } from "react-error-boundary";
import ErrorBoundarylib from "./ErrorBoundarylib";
import Time from "./features/Time/Time";
import { LinearProgress } from "@mui/material";
import { Extra } from "./features/Extra/Extra";

import Search from "./features/Search/Search";
import { StatefulAuthProvider } from "./auth/StatefulAuthProvider";
import { AuthCallback } from "./auth/AuthCallback";
import { Profile } from "./features/Profile/Profile";
import { AuthenticationGuard } from "./auth/AuthenticationGuard";
import { Protected } from "./features/Protected/Protected";

const Movies = lazy(() => import("./features/Movies/Movies"));
const About = lazy(() => import("./features/About/About"));

// const client = new ApolloClient({
//   uri: "https://swapi-graphql.netlify.app/.netlify/functions/index",
//   cache: new InMemoryCache(),
// });

function AppEntrypoint() {
  return (
    <StatefulAuthProvider>
      <Provider store={store}>
        <ErrorBoundary fallbackRender={ErrorBoundarylib}>
          <App />
        </ErrorBoundary>
      </Provider>
    </StatefulAuthProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppEntrypoint />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "movies",
        element: (
          <Suspense fallback={<LinearProgress sx={{ mt: 1 }}></LinearProgress>}>
            <Movies />
          </Suspense>
        ),
      },
      {
        path: "about",
        element: (
          <Suspense fallback={<LinearProgress sx={{ mt: 1 }}></LinearProgress>}>
            <About />
          </Suspense>
        ),
      },
      {
        path: "extra",
        element: <Extra />,
      },
      {
        path: "time",
        element: <Time />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "profile",
        element: <AuthenticationGuard component={Profile} />,
      },
      {
        path: "callback",
        element: <AuthCallback />,
      },
      {
        path: "protected",
        element: <AuthenticationGuard component={Protected} />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


reportWebVitals();

