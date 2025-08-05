import { SelectUI } from "@/components/ui/Select";
import { themeColors } from "@/styles/theme";
import { useMediaQuery } from "@mui/material";
import { Filter } from "lucide-react";
import styled from "styled-components";

const FiltersRow = styled.div<{ isLarge: boolean }>`
  display: flex;
  gap: 20px;
  flex-direction: ${({ isLarge }) => (isLarge ? "row" : "column")};
`;

const FiltersTitle = styled.h3`
  color: ${themeColors.text};
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const FiltersContainer = styled.div`
  background: ${themeColors.surface};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid ${themeColors.outline};
  margin-bottom: 24px;
  display: flex;
  gap: 20px;
  flex-direction: row;
  align-items: end;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 16px;
  }
`;

interface Props {
  dateFilter: string;
  setDateFilter: (value: string) => void;
  accountFilter: string;
  setAccountFilter: (value: string) => void;
  industryFilter: string;
  setIndustryFilter: (value: string) => void;
  stateFilter: string;
  setStateFilter: (value: string) => void;
  dates: string[];
  accounts: string[];
  industries: string[];
  ufStates: string[];
}

export const FilterC = ({
  dateFilter,
  setDateFilter,
  accountFilter,
  setAccountFilter,
  industryFilter,
  setIndustryFilter,
  stateFilter,
  setStateFilter,
  dates,
  accounts,
  industries,
  ufStates,
}: Props) => {
  const isLarge = useMediaQuery("(min-width:900px)");

  return (
    <FiltersContainer>
      <div style={{ width: "100%" }}>
        <FiltersTitle>
          <Filter size={20} />
          Filters
        </FiltersTitle>

        <FiltersRow isLarge={isLarge}>
          <SelectUI
            label="Date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as string)}
            options={[
              { value: "", label: "All dates" },
              ...dates.map((d) => ({ value: d, label: d })),
            ]}
          />
          <SelectUI
            label="Account"
            value={accountFilter}
            onChange={(e) => setAccountFilter(e.target.value as string)}
            options={[
              { value: "", label: "All accounts" },
              ...accounts.map((a) => ({ value: a, label: a })),
            ]}
          />
          <SelectUI
            label="Industry"
            value={industryFilter}
            onChange={(e) => setIndustryFilter(e.target.value as string)}
            options={[
              { value: "", label: "All industries" },
              ...industries.map((i) => ({ value: i, label: i })),
            ]}
          />
          <SelectUI
            label="State"
            value={stateFilter}
            onChange={(e) => setStateFilter(e.target.value as string)}
            options={[
              { value: "", label: "All states" },
              ...ufStates.map((s) => ({ value: s, label: s })),
            ]}
          />
        </FiltersRow>
      </div>
    </FiltersContainer>
  );
};
