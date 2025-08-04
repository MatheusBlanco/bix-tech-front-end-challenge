"use client";
import { themeColors } from "@/styles/theme";
import { Card as MuiCard, Typography } from "@mui/material";
import styled from "styled-components";

export const Card = styled(MuiCard)`
  background-color: ${themeColors.surface};
  color: ${themeColors.text};
  border-left: 4px solid ${themeColors.primary};
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
`;

export const CardTitle = styled(Typography)`
  font-size: 1rem;
  color: ${themeColors.muted};
`;

export const CardValue = styled(Typography)`
  font-size: 1.4rem;
  font-weight: bold;
  color: ${themeColors.text};
`;
