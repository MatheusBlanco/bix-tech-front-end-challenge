"use client";

import {
  DrawerEntry,
  ResponsiveDrawer,
} from "@/components/ui/ResponsiveDrawer";
import { Home, Logout } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { deleteCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { ChartsGrid } from "./components/ChartsGrid";
import { ContentContainer } from "./components/ContentContainer";
import { FilterC } from "./components/Filters";
import { FinancialBarLineChart } from "./components/FinancialBarLineChart/index";
import { FinancialCurrencyPieChart } from "./components/FinancialCurrencyPieChart/index";
import { FinancialNetLineChart } from "./components/FinancialNetLineChart/index.tsx";
import { LayoutContainer } from "./components/LayoutContainer";
import { MainContent } from "./components/MainContent";
import { Skeletons } from "./components/Skeletons";
import { Stats } from "./components/Stats";
import { useDashboard } from "./hooks/useDashboard";

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
            <Skeletons />
          ) : (
            <>
              <FilterC
                dateFilter={dateFilter}
                setDateFilter={setDateFilter}
                accountFilter={accountFilter}
                setAccountFilter={setAccountFilter}
                industryFilter={industryFilter}
                setIndustryFilter={setIndustryFilter}
                stateFilter={stateFilter}
                setStateFilter={setStateFilter}
                dates={dates}
                accounts={accounts}
                industries={industries}
                ufStates={ufStates}
              />

              <Stats totalBalance={totalBalance} />

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
