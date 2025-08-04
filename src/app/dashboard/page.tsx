"use client";

import SidebarC from "@/components/Sidebar";
import { Button } from "@/components/ui/Button";
import { Card, CardTitle, CardValue } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";

export default function DashboardPage() {
  return (
    <div style={{ display: "flex" }}>
      <SidebarC />

      <main style={{ padding: "2rem", flex: 1 }}>
        <Card>
          <CardTitle>Balance</CardTitle>
          <CardValue>R$ 12.340,00</CardValue>
        </Card>
        <Input label="Search" />
        <Button>Submit</Button>
      </main>
    </div>
  );
}
