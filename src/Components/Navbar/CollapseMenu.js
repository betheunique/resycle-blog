import React from "react";
import styled from "styled-components";

import { useSpring, animated } from "react-spring";

const CollapseMenu = (props) => {
  const { open } = useSpring({ open: props.navbarState ? 0 : 1 });

  if (props.navbarState === true) {
    return (
      <CollapseWrapper
        style={{
          transform: open
            .interpolate({
              range: [0, 0.2, 0.3, 1],
              output: [0, -20, 0, -200],
            })
            .interpolate((openValue) => `translate3d(0, ${openValue}px, 0`),
        }}
      >
        <NavLinks>
          <li>
            <a href="/" onClick={props.handleNavbar}>
              Home
            </a>
          </li>
          <li>
            <a href="#/blog/" onClick={props.handleNavbar}>
              Blog
            </a>
          </li>
        </NavLinks>
      </CollapseWrapper>
    );
  }
  return null;
};

export default CollapseMenu;

const CollapseWrapper = styled(animated.div)`
  background-color: #286067;
  position: fixed;
  top: 8rem;
  left: 0;
  right: 0;
  z-index: 1;
  height: 9rem;
`;

const NavLinks = styled.ul`
  list-style-type: none;
  padding: 0rem 2rem 2rem 2rem;

  & li {
    transition: all 300ms linear 0s;
  }

  & a {
    font-size: 18px;
    font-family: "Share";
    line-height: 2;
    color: #eeeeee;
    text-decoration: none;
    cursor: pointer;

    &:hover {
      color: #286067;
      border-bottom: 1px solid #286067;
    }
  }
`;
