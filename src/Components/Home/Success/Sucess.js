import React from "react";
import styled from "styled-components";

import { IconContext } from "react-icons";
import { GoCheck } from "react-icons/go";

const StyledIcon = styled.div`
  margin: auto;
  padding: 0 1rem;
  align-items: "center";
  display: flex;
  align-items: center;
`;

const StyledText = styled.h1`
  color: #22bb33;
  font-size: 13pt;
  padding: 0 0.3em;
  font-weight: 700;
  font-family: "Share";
  text-align: center;
`;

export const Success = () => (
  <IconContext.Provider
    value={{
      style: {
        color: "#22bb33",
        fontSize: "18px",
        textAlign: "center",
        margin: "0 0 0 0.3em",
      },
    }}
  >
    <StyledIcon>
      <GoCheck />
      <StyledText>Thank you!</StyledText>
    </StyledIcon>
  </IconContext.Provider>
);
