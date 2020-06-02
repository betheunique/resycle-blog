import React, { useState } from "react";

import { Header } from "../Components/Header";
import { Heading } from "../Components/Home";
import { HomeContainer } from "../Components/Home";
import { Input } from "../Components/Home/Input";
import { VideoContainer } from "../Components/Home/Video";
import { Button } from "../Components/Home/Button/Button";
import { Form } from "../Components/Home/Form";
import { Success } from "../Components/Home/Success";
import { Subscribed } from "../Components/Home/Success";
import { Failure } from "../Components/Home/Failure";
import { config } from "../../src/config";

// TODO: use reducer instead
const onSubmit = async (
  email,
  setEmail,
  setSuccess,
  setDisable,
  setFailure,
  setSubscribed
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
  const url = new URL(config.api.url);
  url.searchParams.append("email", email);

  await fetch(url).then(
    (response) => {
      response.json().then((body) => {
        console.log(body.result);
        if (body.result === "exsists") {
          setSubscribed(true);
          setSubscribed(true);
          setTimeout(() => {
            setSubscribed(false);
          }, 2200);
        } else {
          setSuccess(true);
          setTimeout(() => {
            setSuccess(false);
          }, 2200);
        }
      });
      setEmail("");
    },
    (err) => {
      console.log(err);
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
  const [subscribed, setSubscribed] = useState(false);

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
              onSubmit(
                email,
                setEmail,
                setSuccess,
                setDisable,
                setFailure,
                setSubscribed
              );
            }}
          >
            Subscribe
          </Button>
          {success ? <Success msg="Thank you!" /> : null}
          {subscribed ? <Subscribed msg="You already Subscribed!" /> : null}
          {failure ? <Failure /> : null}
        </Form>
      </HomeContainer>
    </>
  );
};

export default Home;
