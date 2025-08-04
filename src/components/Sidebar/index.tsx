"use client";

import { Home, Logout } from "@mui/icons-material";
import { Sidebar, SidebarItem } from "../ui/Sidebar";

export default function SidebarC() {
  return (
    <Sidebar>
      <SidebarItem>
        <Home />
        <span>Home</span>
      </SidebarItem>
      <SidebarItem>
        <Logout />
        <span>Logout</span>
      </SidebarItem>
    </Sidebar>
  );
}
