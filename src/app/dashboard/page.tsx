"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardValue } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  DrawerEntry,
  ResponsiveDrawer,
} from "@/components/ui/ResponsiveDrawer";
import { themeColors } from "@/styles/theme";
import { Home, Logout } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { deleteCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import styled from "styled-components";

const LayoutContainer = styled.div`
  display: flex;
  min-height: 100vh;
  width: 100%;
  overflow-x: hidden;
`;

const MainContent = styled.main<{ isLarge: boolean }>`
  flex-grow: 1;
  padding: 16px;
  margin-left: ${(props) => (props.isLarge ? "240px" : "0")};
  background: ${themeColors.background};
  min-height: 100vh;
  width: ${(props) => (props.isLarge ? "calc(100vw - 240px)" : "100vw")};
  box-sizing: border-box;

  @media (max-width: 899px) {
    padding: 16px 12px;
    width: 100vw;
    margin-left: 0;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 64px;
`;

export default function DashboardPage() {
  const isLarge = useMediaQuery("(min-width:900px)");
  const router = useRouter();
  const entries: DrawerEntry[] = [
    { icon: <Home />, name: "Home", action: () => alert("Home") },
    {
      icon: <Logout />,
      name: "Logout",
      action: () => {
        deleteCookie("token");
        router.push("/login");
      },
    },
  ];
  return (
    <LayoutContainer>
      <ResponsiveDrawer entries={entries} title="Dashboard" />
      <MainContent isLarge={isLarge}>
        <ContentContainer>
          <Card>
            <CardTitle>Balance</CardTitle>
            <CardValue>R$ 12.340,00</CardValue>
          </Card>
          <Input label="Search" />
          <Button>Submit</Button>
        </ContentContainer>
      </MainContent>
    </LayoutContainer>
  );
}
