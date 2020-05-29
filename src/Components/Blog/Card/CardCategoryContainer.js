import styled from "styled-components";

export const CardCategoryContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;

  @media screen and (max-width: 300px) {
    flex-flow: column wrap;
    justify-content: space-between;
  }
`;
