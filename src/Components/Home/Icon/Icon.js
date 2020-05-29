import React from "react";
import styled from "styled-components";
import {
  FcIdea,
  FcEngineering,
  FcProcess,
  FcMindMap,
  FcMultipleInputs,
} from "react-icons/fc";

import { IconWrapper, IconDescription } from "./";

const IconCategory = styled.div`
  font-size: 50px;
`;

export const Icon = () => {
  return (
    <>
      <IconWrapper>
        <IconCategory>
          <FcIdea />
        </IconCategory>
        <IconDescription>Ideate</IconDescription>
      </IconWrapper>
      <IconWrapper>
        <IconCategory>
          <FcEngineering />
        </IconCategory>
        <IconDescription>Innovate</IconDescription>
      </IconWrapper>
      <IconWrapper>
        <IconCategory>
          <FcProcess />
        </IconCategory>
        <IconDescription>Adapt</IconDescription>
      </IconWrapper>
      <IconWrapper>
        <IconCategory>
          <FcMultipleInputs />
        </IconCategory>
        <IconDescription>Polymorphic Offset</IconDescription>
      </IconWrapper>
    </>
  );
};
