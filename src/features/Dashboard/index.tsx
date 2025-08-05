"use client";

import {
  DrawerEntry,
  ResponsiveDrawer,
} from "@/components/ui/ResponsiveDrawer";
import { SelectUI } from "@/components/ui/Select";
import {
  SkeletonCard,
  SkeletonChart,
  SkeletonStats,
  SkeletonText,
  SkeletonTitle,
} from "@/components/ui/Skeleton";
import { themeColors } from "@/styles/theme";
import { Home, Logout } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { deleteCookie } from "cookies-next/client";
import { Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { ContentContainer } from "./components/ContentContainer";
import { FinancialBarLineChart } from "./components/FinancialBarLineChart";
import { FinancialCurrencyPieChart } from "./components/FinancialCurrencyPieChart";
import { FinancialNetLineChart } from "./components/FinancialNetLineChart";
import { LayoutContainer } from "./components/LayoutContainer";
import { MainContent } from "./components/MainContent";
import { useDashboard } from "./hooks/useDashboard";

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

const FiltersTitle = styled.h3`
  color: ${themeColors.text};
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ChartsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
  max-height: 500px;

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 1fr;

    & > div:first-child {
      grid-column: 1 / -1;
    }
  }
`;

const StatsCard = styled.div`
  background: linear-gradient(
    135deg,
    ${themeColors.primary},
    ${themeColors.primaryContainer}
  );
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid ${themeColors.outline};
  margin-bottom: 32px;
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 100px;
    height: 100px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(30px, -30px);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const StatsTitle = styled.h2`
  color: ${themeColors.onPrimary};
  font-size: 1rem;
  font-weight: 500;
  margin: 0 0 8px 0;
  opacity: 0.9;
`;

const StatsValue = styled.h1`
  color: ${themeColors.onPrimary};
  font-size: 2.5rem;
  font-weight: 700;
  margin: 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

export default function Dashboard() {
  const isLarge = useMediaQuery("(min-width:900px)");
  const router = useRouter();
  const entries: DrawerEntry[] = [
    { icon: <Home />, name: "Home", action: () => router.push("/dashboard") },
    {
      icon: <Logout />,
      name: "Logout",
      action: () => {
        deleteCookie("token");
        router.push("/login");
      },
    },
  ];
  const {
    totalBalance,
    dates,
    accounts,
    industries,
    states: ufStates,
    filteredData,
    dateFilter,
    setDateFilter,
    accountFilter,
    setAccountFilter,
    industryFilter,
    setIndustryFilter,
    stateFilter,
    setStateFilter,
    loading,
  } = useDashboard();

  return (
    <LayoutContainer>
      <ResponsiveDrawer entries={entries} title="Dashboard" />
      <MainContent isLarge={isLarge}>
        <ContentContainer>
          {loading ? (
            <>
              <SkeletonCard>
                <SkeletonTitle />
                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>
                  <div style={{ minWidth: "150px" }}>
                    <SkeletonText height="12px" width="60px" />
                    <SkeletonText height="40px" />
                  </div>
                  <div style={{ minWidth: "150px" }}>
                    <SkeletonText height="12px" width="80px" />
                    <SkeletonText height="40px" />
                  </div>
                  <div style={{ minWidth: "150px" }}>
                    <SkeletonText height="12px" width="70px" />
                    <SkeletonText height="40px" />
                  </div>
                  <div style={{ minWidth: "150px" }}>
                    <SkeletonText height="12px" width="50px" />
                    <SkeletonText height="40px" />
                  </div>
                </div>
              </SkeletonCard>

              <SkeletonStats />

              <ChartsGrid>
                <SkeletonCard>
                  <SkeletonTitle width="180px" />
                  <SkeletonChart />
                </SkeletonCard>
                <SkeletonCard>
                  <SkeletonTitle width="160px" />
                  <SkeletonChart />
                </SkeletonCard>
                <SkeletonCard>
                  <SkeletonTitle width="140px" />
                  <SkeletonChart />
                </SkeletonCard>
              </ChartsGrid>
            </>
          ) : (
            <>
              <FiltersContainer>
                <div style={{ width: "100%" }}>
                  <FiltersTitle>
                    <Filter size={20} />
                    Filters
                  </FiltersTitle>

                  <div
                    style={{
                      display: "flex",
                      gap: "20px",
                      flexDirection: isLarge ? "row" : "column",
                    }}
                  >
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
                      onChange={(e) =>
                        setAccountFilter(e.target.value as string)
                      }
                      options={[
                        { value: "", label: "All accounts" },
                        ...accounts.map((a) => ({ value: a, label: a })),
                      ]}
                    />
                    <SelectUI
                      label="Industry"
                      value={industryFilter}
                      onChange={(e) =>
                        setIndustryFilter(e.target.value as string)
                      }
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
                  </div>
                </div>
              </FiltersContainer>

              <StatsCard>
                <StatsTitle>Total Balance</StatsTitle>
                <StatsValue>{totalBalance}</StatsValue>
              </StatsCard>

              <ChartsGrid>
                <FinancialBarLineChart financialData={filteredData} />
                <FinancialCurrencyPieChart financialData={filteredData} />
                <FinancialNetLineChart financialData={filteredData} />
              </ChartsGrid>
            </>
          )}
        </ContentContainer>
      </MainContent>
    </LayoutContainer>
  );
}
