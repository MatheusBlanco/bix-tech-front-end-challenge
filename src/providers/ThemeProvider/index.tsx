"use client";

import { muiTheme, themeColors } from "@/styles/theme";
import { CssBaseline } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { ReactNode } from "react";
import { ThemeProvider as StyledThemeProvider } from "styled-components";

interface Props {
  children: ReactNode;
}

export function ThemeProvider({ children }: Props) {
  return (
    <MuiThemeProvider theme={muiTheme}>
      <StyledThemeProvider theme={themeColors}>
        <CssBaseline />
        {children}
      </StyledThemeProvider>
    </MuiThemeProvider>
  );
}
