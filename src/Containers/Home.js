import React from "react";

import { Header } from "../Components/Header";
import { HomeContainer } from "../Components/Home";
import { Icon } from "../Components/Home/Icon";

const Home = () => {
  return (
    <>
      <Header />
      <HomeContainer>
        <Icon></Icon>
      </HomeContainer>
    </>
  );
};

export default Home;
