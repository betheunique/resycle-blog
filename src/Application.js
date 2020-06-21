import React from "react";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/react-hooks";
import { HeadProvider, Title, Meta } from "react-head";

import { config } from "./config";
import { client } from "./Utils/apollo";
import Router from "./Router";
import GithubCallback from "./Containers/GithubCallback";
import { theme } from "./Components/Common/theme";

const Application = () => {
  const urlParams = new URLSearchParams(window.location.search);

  if (urlParams.get("code")) {
    return <GithubCallback />;
  }

  return (
    <ThemeProvider theme={theme}>
      <>
        <HeadProvider>
          <Title>{config.title}</Title>
          <Meta charSet="utf-8" />
          <Meta
            name="image"
            property="og:image"
            content="https://user-images.githubusercontent.com/17061879/85234684-fe736400-b406-11ea-9245-d6ed4e6f1236.png"
          />
          <Meta
            name="description"
            property="og:description"
            content={config.description}
          />
          <Meta name="title" property="og:title" content={config.title} />
          <Meta name="theme-color" content={config.header.backgroundColor} />
          <Meta name="author" content="Abhishekkumar Rai" />
        </HeadProvider>
        <ApolloProvider client={client}>
          <Router />
        </ApolloProvider>
      </>
    </ThemeProvider>
  );
};

export default Application;
