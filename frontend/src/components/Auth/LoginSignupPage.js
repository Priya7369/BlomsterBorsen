import React from "react";
import TabsComponent from "./TabsComponent";
import { Box, Card, CardContent } from "@mui/material";
import styled from "styled-components";
import img from "./images/forest_landscape.jpg";

const Wrapper = styled(Box)`
  position: relative;
  height: 100vh;
`;

const ImageWrapper = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const ContentWrapper = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  width: 500px;
  margin: 0;

  & > div {
    margin: auto;
    background-color: rgba(255, 255, 255, 0.7);
    padding: 16px;
  }
`;

const GreenH2 = styled.h2`
  color: green;
`;

const LoginSignupPage = ({ setAccessToken, setRole, setUsername }) => {
  return (
    <>
      <Wrapper>
        <ImageWrapper>
          <img src={img} alt="Login" />
        </ImageWrapper>
        <ContentWrapper>
          <Card>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <GreenH2>Welcome to BlomsterBorsen !</GreenH2>
            </Box>
            <CardContent>
              <TabsComponent
                setAccessToken={setAccessToken}
                setRole={setRole}
                setUsername={setUsername}
              />
            </CardContent>
          </Card>
        </ContentWrapper>
      </Wrapper>
    </>
  );
};

export default LoginSignupPage;
