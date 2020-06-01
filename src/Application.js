import React from "react";
import { ThemeProvider } from "styled-components";
import { ApolloProvider } from "@apollo/react-hooks";
import { Helmet } from "react-helmet";

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
        <Helmet>
          <title>{config.title}</title>
          <meta charSet="utf-8" />
          <meta name="description" content={config.description} />
          <meta name="theme-color" content={config.header.backgroundColor} />
          <meta
            property="og:image"
            content={require("../src/assets/img/linkedin_banner_image.png")}
          />
        </Helmet>
        <ApolloProvider client={client}>
          <Router />
        </ApolloProvider>
      </>
    </ThemeProvider>
  );
};

export default Application;
