import { themeColors } from "@/styles/theme";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select as MuiSelect,
  SelectProps as MuiSelectProps,
} from "@mui/material";
import styled from "styled-components";

const StyledFormControl = styled(FormControl)`
  min-width: 160px;
  margin: 0;
  .MuiInputLabel-root {
    color: ${themeColors.muted};
    font-weight: 500;
  }
`;

const StyledSelect = styled(MuiSelect)`
  &.MuiInputBase-root {
    background: ${themeColors.surface};
    color: ${themeColors.text};
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
    font-weight: 500;
    .MuiSelect-icon {
      color: ${themeColors.primary};
    }
  }
`;

const StyledMenuItem = styled(MenuItem)`
  &.MuiMenuItem-root {
    color: ${themeColors.text};
    font-weight: 500;
    padding: 12px 16px;
    margin: 4px 8px;
    border-radius: 8px;
    transition: all 0.2s ease-in-out;

    &:hover {
      background: ${themeColors.primaryContainer};
      color: ${themeColors.onPrimaryContainer};
      transform: translateX(4px);
    }

    &.Mui-selected {
      background: ${themeColors.primary};
      color: ${themeColors.onPrimary};

      &:hover {
        background: ${themeColors.primary};
        color: ${themeColors.onPrimary};
      }
    }
  }
`;

export type Option = { value: string; label: string };
export interface SelectUIProps
  extends Omit<MuiSelectProps, "children" | "multiple"> {
  label?: string;
  options: Option[];
  value?: string;
  onChange?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | (Event & { target: { value: unknown; name: string } }),
    child?: React.ReactNode
  ) => void;
}

export const SelectUI = ({ label, options, ...props }: SelectUIProps) => (
  <StyledFormControl fullWidth>
    {label && <InputLabel>{label}</InputLabel>}
    <StyledSelect label={label} {...props}>
      {options.map((opt) => (
        <StyledMenuItem key={opt.value} value={opt.value}>
          {opt.label}
        </StyledMenuItem>
      ))}
    </StyledSelect>
  </StyledFormControl>
);
