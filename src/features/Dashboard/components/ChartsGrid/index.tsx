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
    grid-template-columns: 3fr 1fr;

    & > div:first-child {
      grid-column: 1 / -1;
    }

    /* Pie chart gets smaller width */
    & > div:nth-child(2) {
      grid-column: 1 / 2;
    }

    /* Line chart gets more width */
    & > div:nth-child(3) {
      grid-column: 2 / 3;
    }
  }
`;
