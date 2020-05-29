import styled from "styled-components";

export const BackButton = styled.button`
  outline: none;
  border: 1px solid;
  font-size: 18px;
  font-family: "Inconsolata", monospace;
  border-radius: 5px;
  padding: 4px 20px 5px 30px;
  cursor: pointer;
  position: relative;

  :hover {
    background-color: black;
    color: #ececda;
  }

  :before {
    content: "\\27A4";
    color: #ff304f;
    position: absolute;
    transform: translateY(-50%) rotate(180deg);
    left: 10px;
    font-size: 16px;
    top: 54%;
  }
`;
