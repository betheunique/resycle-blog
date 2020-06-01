import React from "react";
import styled from "styled-components";

const StyledDescription = styled.p`
  color: #eeeeee;
  font-size: 1em;
  position: relative;
  line-height: 1.65em;
  margin: 0 0 1.5em 0;
  font-family: "Share";
`;

const StyledHeading = styled.h1`
  color: #eeeeee;
  font-size: 2em;
  margin: 0 0 0.55em 0;
  font-weight: 700;
  font-family: "Share";
`;

export const Heading = () => (
  <>
    <StyledHeading>Coming Soon</StyledHeading>
    <StyledDescription>Track, Offset and Minimize.</StyledDescription>
  </>
);
