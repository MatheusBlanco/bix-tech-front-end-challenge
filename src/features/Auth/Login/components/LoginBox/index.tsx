import { themeColors } from "@/styles/theme";
import { Box as MuiBox } from "@mui/material";
import { styled } from "styled-components";

export const LoginBox = styled(MuiBox)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  background-color: ${themeColors.surface};
  color: ${themeColors.text};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  max-width: 400px;
  width: 400px;
  margin: auto;
  align-items: center;
`;
