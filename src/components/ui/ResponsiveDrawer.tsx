"use client";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  CssBaseline,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import styled, { createGlobalStyle } from "styled-components";
import { themeColors } from "../../styles/theme";

const GlobalStyle = createGlobalStyle`
  html, body {
    overflow-x: hidden;
    max-width: 100vw;
  }
  * {
    box-sizing: border-box;
  }
`;

const drawerWidth = 240;

const StyledBox = styled(Box)`
  display: flex;
  width: 100%;
  overflow-x: hidden;
`;

const StyledAppBar = styled(AppBar)`
  background: ${themeColors.primary} !important;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1) !important;
  z-index: 1300;
`;

const StyledIconButton = styled(IconButton)`
  margin-right: 16px;

  @media (min-width: 900px) {
    display: none;
  }
`;

const StyledTypography = styled(Typography)`
  color: ${themeColors.onPrimary};
`;

const StyledDrawer = styled(Drawer).withConfig({
  shouldForwardProp: (prop) => !["isOpen", "isLarge"].includes(prop),
})<{ isOpen: boolean; isLarge: boolean }>`
  & .MuiDrawer-paper {
    width: ${drawerWidth}px;
    max-width: 100vw;
    box-sizing: border-box;
    background: ${themeColors.surface};
    border-right: 1px solid ${themeColors.primary};
  }

  @media (max-width: 899px) {
    display: ${(props) => (props.isOpen ? "block" : "none")};

    & .MuiDrawer-paper {
      width: min(280px, 80vw);
    }
  }

  @media (min-width: 900px) {
    display: block;
  }
`;

const StyledListItem = styled(ListItem)`
  color: ${themeColors.text};
  margin: 4px 8px;
  border-radius: 8px;
  transition: all 0.2s ease;
  width: calc(100% - 16px);
  box-sizing: border-box;
  cursor: pointer;

  &:hover {
    background-color: ${themeColors.primaryLight};
    transform: translateX(4px);
  }

  .MuiListItemIcon-root {
    color: ${themeColors.accent};
    min-width: 40px;
  }

  .MuiListItemText-primary {
    color: ${themeColors.text};
  }
`;

export type DrawerEntry = {
  icon: React.ReactNode;
  name: string;
  action: () => void;
};

type ResponsiveDrawerProps = {
  entries: DrawerEntry[];
  title?: string;
};

export const ResponsiveDrawer: React.FC<ResponsiveDrawerProps> = ({
  entries,
  title = "Dashboard",
}) => {
  const isLarge = useMediaQuery("(min-width:900px)");
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => setOpen((prev) => !prev);

  return (
    <StyledBox>
      <GlobalStyle />
      <CssBaseline />

      <StyledAppBar position="fixed">
        <Toolbar>
          <StyledIconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerToggle}
            edge="start"
          >
            <MenuIcon />
          </StyledIconButton>
          <StyledTypography variant="h6" noWrap>
            {title}
          </StyledTypography>
        </Toolbar>
      </StyledAppBar>

      <StyledDrawer
        variant={isLarge ? "permanent" : "temporary"}
        open={isLarge ? true : open}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        isOpen={open}
        isLarge={isLarge}
      >
        <Toolbar />
        <List>
          {entries.map((entry) => (
            <StyledListItem key={entry.name} onClick={entry.action}>
              <ListItemIcon>{entry.icon}</ListItemIcon>
              <ListItemText primary={entry.name} />
            </StyledListItem>
          ))}
        </List>
      </StyledDrawer>
    </StyledBox>
  );
};
