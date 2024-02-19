import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ accessToken, setAccessToken, username, role }) => {
  return (
    <>
      {accessToken ? (
        <Navbar
          setAccessToken={setAccessToken}
          username={username}
          role={role}
        />
      ) : null}
      <div style={{ minHeight: "100vh" }}>
        <Outlet />
      </div>

      {accessToken ? <Footer /> : null}
    </>
  );
};

export default Layout;
