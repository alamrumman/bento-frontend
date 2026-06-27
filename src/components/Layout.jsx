import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname]);

  return (
    <>
      <Header />
      <main id="main">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
