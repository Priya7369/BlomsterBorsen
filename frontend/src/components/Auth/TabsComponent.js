import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import LoginPage from "./LoginPage/LoginPage";
import SignUpPage from "./SignUpPage/SignUpPage";

const TabsComponent = ({ setAccessToken, setRole, setUsername }) => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Tabs value={tabValue} onChange={handleTabChange}>
        <Tab label="Login" />
        <Tab label="Sign Up" />
      </Tabs>
      <TabPanel value={tabValue} index={0}>
        <LoginPage
          setAccessToken={setAccessToken}
          setRole={setRole}
          setUsername={setUsername}
        />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <SignUpPage />
      </TabPanel>
    </>
  );
};

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tabpanel-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 4 }}>{children}</Box>}
    </div>
  );
};

export default TabsComponent;
