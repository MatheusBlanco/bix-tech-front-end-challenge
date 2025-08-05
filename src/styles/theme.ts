import { createTheme } from "@mui/material/styles";

export const themeColors = {
  primary: "#0D47A1",
  primaryLight: "#5472d3",
  primaryDark: "#002171",
  primaryContainer: "#1565C0",
  onPrimaryContainer: "#ffffff",
  background: "#0a192f",
  surface: "#112240",
  onSurface: "#ffffff",
  text: "#ffffff",
  textSecondary: "#a8b2d1",
  muted: "#a8b2d1",
  accent: "#64ffda",
  danger: "#ff1744",
  error: "#ff1744",
  success: "#4caf50",
  successContainer: "#2e7d32",
  warning: "#ffc107",
  warningContainer: "#f57c00",
  info: "#2196f3",
  outline: "#334155",
  onPrimary: "#ffffff",
  onAccent: "#000000",
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
