import styled from "styled-components";

export const Input = styled.input`
  width: 18em;
  height: 2.75em;
  transition: border-color 0.2s ease, background-color 0.2s ease;
  border-radius: 6px;
  background-color: transparent;
  border: solid 2px rgba(255, 255, 255, 0.35);
  display: block;
  padding: 0 1em;
  text-decoration: none;
  letter-spacing: -0.01em;
  line-height: 1.65em;
  cursor: text;
  color: #ffffff;
  font-size: 12pt;
  font-weight: 400;
  font-family: "Share";
  -webkit-appearance: none;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #eeeeee;
    opacity: 1; /* Firefox */
    font-size: 12pt;
    font-weight: 400;
    font-family: "Share";
  }

  :focus {
    outline: none !important;
    border: 2px solid #286067;
    box-shadow: 0 0 10px #286067;
  }
`;
