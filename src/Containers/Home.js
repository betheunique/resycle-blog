import React, { useState } from "react";

import { Header } from "../Components/Header";
import { Heading } from "../Components/Home";
import { HomeContainer } from "../Components/Home";
import { Input } from "../Components/Home/Input";
import { VideoContainer } from "../Components/Home/Video";
import { Button } from "../Components/Home/Button/Button";
import { Form } from "../Components/Home/Form";
import { Success } from "../Components/Home/Success";
import { config } from "../../src/config";
import emailjs from "emailjs-com";

const onSubmit = async (email, setEmail, setSuccess, setDisable) => {
  setDisable(true);
  const params = {
    to_email: email,
  };

  emailjs
    .send(
      config.email.serviceId,
      config.email.templateId,
      params,
      config.email.userId
    )
    .then(
      (response) => {
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

const Home = () => {
  const [email, setEmail] = useState("");
  const [disable, setDisable] = useState(false);
  const [success, setSuccess] = useState(false);

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
              onSubmit(email, setEmail, setSuccess, setDisable);
            }}
          >
            Subscribe
          </Button>
          {success ? <Success /> : null}
        </Form>
      </HomeContainer>
    </>
  );
};

export default Home;
