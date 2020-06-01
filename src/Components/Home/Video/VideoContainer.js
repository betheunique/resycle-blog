import React from "react";
import styled from "styled-components";

const Video = styled.video`
  position: fixed;
  z-index: -1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (min-aspect-ratio: 16/9) {
    width: 100%;
    height: auto;
  }

  @media (max-aspect-ratio: 16/9) {
    width: auto;
    height: 105%;
  }
`;

export const VideoContainer = () => {
  return (
    <>
      <Video
        autoPlay
        muted
        loop
        src={require("../../../assets/img/background_video.mp4")}
      />
    </>
  );
};
