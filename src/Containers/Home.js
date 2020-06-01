import React, { useState } from "react";

import { Header } from "../Components/Header";
import { Heading } from "../Components/Home";
import { HomeContainer } from "../Components/Home";
import { Input } from "../Components/Home/Input";
import { VideoContainer } from "../Components/Home/Video";
import { Button } from "../Components/Home/Button/Button";
import { Form } from "../Components/Home/Form";
import { Success } from "../Components/Home/Success";
import { Failure } from "../Components/Home/Failure";
import { config } from "../../src/config";

// TODO: use reducer instead
const onSubmit = async (
  email,
  setEmail,
  setSuccess,
  setDisable,
  setFailure
) => {
  setDisable(true);

  if (!validateEmail(email)) {
    setEmail("");
    setFailure(true);
    setTimeout(() => {
      setFailure(false);
    }, 2200);
    setDisable(false);
    return;
  }

  // Endpoint (GET instead POST) nasty workaround (never ever on real system)
  const url = new URL(config.email.url);
  url.searchParams.append("to", email);

  await fetch(url).then(
    (response) => {
      setEmail("");
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
      }, 2200);
    },
    (err) => {
      setEmail("");
    }
  );
  setDisable(false);
};

const validateEmail = (email) => {
  // eslint-disable-next-line
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const Home = () => {
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(false);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);

  return (
    <>
      <Header />
      <VideoContainer />
      <HomeContainer>
        <Heading />
        <Form>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            placeholder="Email"
          />
          <Button
            disabled={disable}
            onClick={() => {
              onSubmit(email, setEmail, setSuccess, setDisable, setFailure);
            }}
          >
            Subscribe
          </Button>
          {success ? <Success /> : null}
          {failure ? <Failure /> : null}
        </Form>
      </HomeContainer>
    </>
  );
};

export default Home;
