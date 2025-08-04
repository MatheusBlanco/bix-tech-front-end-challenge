"use client";
import { themeColors } from "@/styles/theme";
import { ButtonProps, Button as MuiButton } from "@mui/material";
import styled from "styled-components";

export const Button = styled((props: ButtonProps) => <MuiButton {...props} />)`
  && {
    background-color: ${themeColors.primary};
    color: ${themeColors.text};
    text-transform: none;
    font-weight: 500;

    &:hover {
      background-color: ${themeColors.primaryLight};
    }
  }
`;
