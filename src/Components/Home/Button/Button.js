import styled from "styled-components";

export const Button = styled.button`
  font-size: 13pt;
  cursor: pointer;
  margin: 0 0 0 1em;
  transition: background-color 0.2s ease-in-out, color 0.2s ease-in-out,
    opacity 0.2s ease-in-out;
  background-color: #286067;
  border-radius: 6px;
  border: 0;
  color: #eeeeee !important;
  cursor: pointer;
  display: inline-block;
  font-family: "Share";
  height: 2.75em;
  line-height: 2.75em;
  padding: 0 1.125em;
  text-align: center;
  text-decoration: none;
  white-space: nowrap;
  outline: 0;

  :active {
    background: olive;
    outline: none;
    border: none;
    box-shadow: none;
  }

  @media screen and (max-width: 480px) {
    margin: 1.25em 0 0 0;
    width: 18.8em;
  }
`;
