import { styled } from "styled-components";

export const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 1fr;

    & > div:first-child {
      grid-column: 1 / -1;
    }
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 1fr;

    & > div:first-child {
      grid-column: 1 / -1;
    }
  }
`;
