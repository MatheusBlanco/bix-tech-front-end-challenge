import { createTheme } from "@mui/material/styles";

export const themeColors = {
  primary: "#0D47A1",
  primaryLight: "#5472d3",
  primaryDark: "#002171",
  background: "#0a192f",
  surface: "#112240",
  text: "#ffffff",
  muted: "#a8b2d1",
  accent: "#64ffda",
  danger: "#ff1744",
};

export const muiTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: themeColors.primary,
      light: themeColors.primaryLight,
      dark: themeColors.primaryDark,
    },
    background: {
      default: themeColors.background,
      paper: themeColors.surface,
    },
    text: {
      primary: themeColors.text,
      secondary: themeColors.muted,
    },
    error: {
      main: themeColors.danger,
    },
  },
  typography: {
    fontFamily: "Roboto, sans-serif",
  },
});
