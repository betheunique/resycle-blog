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
  color: #f0ad4e;
  font-size: 13pt;
  padding: 0 0.3em;
  font-weight: 600;
  font-family: "Share";
  text-align: center;
`;

export const Subscribed = ({ msg }) => (
  <IconContext.Provider
    value={{
      style: {
        color: "#f0ad4e",
        fontSize: "18px",
        textAlign: "center",
        margin: "0 0 0 0.3em",
      },
    }}
  >
    <StyledIcon>
      <GoCheck />
      <StyledText>{msg}</StyledText>
    </StyledIcon>
  </IconContext.Provider>
);
