import { themeColors } from "@/styles/theme";
import { styled } from "styled-components";

export const MainContent = styled.main<{ isLarge: boolean }>`
  flex-grow: 1;
  padding: 16px;
  margin-left: ${(props) => (props.isLarge ? "240px" : "0")};
  background: ${themeColors.background};
  min-height: 100vh;
  width: ${(props) => (props.isLarge ? "calc(100vw - 240px)" : "100vw")};
  box-sizing: border-box;

  @media (max-width: 899px) {
    padding: 16px 12px;
    width: 100vw;
    margin-left: 0;
  }
`;
