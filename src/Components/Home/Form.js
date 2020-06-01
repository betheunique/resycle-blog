import styled from "styled-components";

export const Form = styled.div`
  display: flex;

  @media screen and (max-width: 480px) {
    margin: 1.25em 0 0 0;
    flex-direction: column;
    justify-content: space-between;
  }
`;
