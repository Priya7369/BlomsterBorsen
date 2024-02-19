import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import LoginSignupPage from "./components/Auth/LoginSignupPage";
import HomeComponent from "./components/HomeComponent";
import Tender from "./components/Tender/Tender";
import DelayResposne from "./components/DelayResponse/DelayResposne";

const App = () => {
  const [accessToken, setAccessToken] = useState(null);
  const [role, setRole] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("access_token");
    const storedRole = localStorage.getItem("role");
    const storedUsername = localStorage.getItem("username");
    setRole(storedRole);
    setAccessToken(storedAccessToken);
    setUsername(storedUsername);
  }, []);

  const PrivateHomeRoute = () => {
    return accessToken && role ? (
      <HomeComponent role={role} />
    ) : (
      <LoginSignupPage
        setAccessToken={setAccessToken}
        setRole={setRole}
        setUsername={setUsername}
      />
    );
  };

  const PrivateRoute = ({ element }) => {
    return localStorage.getItem("access_token") &&
      localStorage.getItem("role") ? (
      element
    ) : (
      <Navigate to="/" />
    );
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout
              accessToken={accessToken}
              setAccessToken={setAccessToken}
              username={username}
              role={role}
            />
          }
        >
          <Route index element={<PrivateHomeRoute />} />

          <Route
            path="tender"
            element={<PrivateRoute element={<Tender role={role} />} />}
          />
          <Route
            path="delayResponse"
            element={<PrivateRoute element={<DelayResposne />} />}
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
