"use client";

import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardValue } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import {
  DrawerEntry,
  ResponsiveDrawer,
} from "@/components/ui/ResponsiveDrawer";
import { Home, Logout } from "@mui/icons-material";
import { useMediaQuery } from "@mui/material";
import { deleteCookie } from "cookies-next/client";
import { useRouter } from "next/navigation";
import { ContentContainer } from "./components/ContentContainer";
import { LayoutContainer } from "./components/LayoutContainer";
import { MainContent } from "./components/MainContent";

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
