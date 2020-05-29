import React from "react";
import styled from "styled-components";
import { animated } from "react-spring";

import logo from "../../assets/img/logo_transparent.png";

const Brand = ({ style }) => {
  return <Image src={logo} alt="Oarraylabs" style={style} />;
};

export default Brand;

const Image = styled(animated.img)`
  height: 100%;
  margin: auto 0;
`;
