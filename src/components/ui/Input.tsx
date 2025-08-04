"use client";
import { themeColors } from "@/styles/theme";
import { TextField, TextFieldProps } from "@mui/material";
import styled from "styled-components";

export const Input = styled((props: TextFieldProps) => (
  <TextField variant="outlined" {...props} />
))`
  width: 100%;
  max-width: 400px;

  && {
    input {
      color: ${themeColors.text};
    }

    label {
      color: ${themeColors.muted};
    }

    .MuiOutlinedInput-root {
      fieldset {
        border-color: ${themeColors.primaryLight};
      }
      &:hover fieldset {
        border-color: ${themeColors.primary};
      }
      &.Mui-focused fieldset {
        border-color: ${themeColors.accent};
      }
    }
  }
`;
