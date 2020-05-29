import React, { useState } from "react";

import { HeaderContainer, HeaderWrapper } from "./";
import Navbar from "../Navbar/Navbar";

export const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const handleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };

  return (
    <HeaderContainer>
      <HeaderWrapper>
        <Navbar navbarState={navbarOpen} handleNavbar={handleNavbar} />
      </HeaderWrapper>
    </HeaderContainer>
  );
};
