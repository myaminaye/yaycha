import { useState, createContext, useContext, useMemo, useEffect } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { deepPurple, grey } from "@mui/material/colors";
import Template from "./Template";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Comments from "./pages/Comments";
import Likes from "./pages/Likes";
import { QueryClient, QueryClientProvider } from "react-query";
import { fetchVerify } from "./libs/fetcher";

const AppContext = createContext();

export const queryClient = new QueryClient();

export function useApp() {
  return useContext(AppContext);
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Template />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/profile/:id",
        element: <Profile />,
      },
      {
        path: "/comments/:id",
        element: <Comments />,
      },
      {
        path: "/likes/:id",
        element: <Likes />,
      },
    ],
  },
]);

export default function ThemedApp() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [globalMsg, setGlobalMsg] = useState(null);
  const [auth, setAuth] = useState(null);
  const [mode, setMode] = useState("dark");
  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        primary: deepPurple,
        banner: mode === "dark" ? grey[800] : grey[200],
        text: { fade: grey[500] },
      },
    });
  }, [mode]);

  useEffect(() => {
    fetchVerify().then((user) => {
      if (user) setAuth(user);
    });
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          showDrawer,
          setShowDrawer,
          showForm,
          setShowForm,
          globalMsg,
          setGlobalMsg,
          auth,
          setAuth,
          mode,
          setMode,
        }}
      >
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
        </QueryClientProvider>
        <CssBaseline />
      </AppContext.Provider>
    </ThemeProvider>
  );
}
