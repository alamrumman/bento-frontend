import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";

const About = lazy(() => import("./pages/About.jsx"));
const Privacy = lazy(() => import("./pages/Privacy.jsx"));
const Terms = lazy(() => import("./pages/Terms.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route
          path="about"
          element={
            <Suspense fallback={null}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="privacy"
          element={
            <Suspense fallback={null}>
              <Privacy />
            </Suspense>
          }
        />
        <Route
          path="terms"
          element={
            <Suspense fallback={null}>
              <Terms />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={null}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
