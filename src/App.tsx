import { lazy, Suspense, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router";
import { CssBaseline, ThemeProvider } from "@mui/material";
import Layout from "./components/Layout/Layout";
import RequireAuth from "./components/RequireAuth";
import { AuthProvider } from "./context/AuthContext";
import theme from "./theme";
import { RecoilRoot } from "recoil";

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const Login = lazy(() => import("./pages/Login/Login"));
const Partner = lazy(() => import("./pages/Partner/Partner"));
const Add = lazy(() => import("./pages/Partner/components/Add"));
const Detail = lazy(() => import("./pages/Partner/components/Detail"));

const App = () => {
  const [token, setToken] = useState<boolean>();

useEffect(() => {
  if (localStorage.getItem("token") === null) {
    setToken(false);
  } else {
    setToken(true);
  }
}, []);
  const renderRoutes = () => {
    return (
      <>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<RequireAuth children={token ? <HomePage/>: <Navigate to="/login" />} />} />
            <Route
              path="/partner"
              element={<RequireAuth children={token ? <Partner/>: <Navigate to="/login" />} />}
            />
            <Route
              path="/partner/add"
              element={<RequireAuth children={token ? <Add/>: <Navigate to="/login" />} />}
            />
            <Route
              path="/partner/edit/:id"
              element={<RequireAuth children={token ? <Detail/>: <Navigate to="/login" />} />}
            />
          </Route>
        </Routes>
      </>
    );
  };

  return (
    <ThemeProvider theme={theme}>
      <RecoilRoot>
        <CssBaseline />
        <AuthProvider>
          <Suspense fallback={<p>Loading...</p>}>{renderRoutes()}</Suspense>
        </AuthProvider>
      </RecoilRoot>
    </ThemeProvider>
  );
};

export default App;
