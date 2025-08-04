// app/dashboard/Sidebar.tsx
"use client";

import { Home, Logout } from "@mui/icons-material";
import styled from "styled-components";

export default function Sidebar() {
  return (
    <Aside>
      <NavItem>
        <Home />
        <span>Home</span>
      </NavItem>
      <NavItem>
        <Logout />
        <span>Logout</span>
      </NavItem>
    </Aside>
  );
}

const Aside = styled.aside`
  width: 200px;
  background-color: #0d47a1;
  color: white;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const NavItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;

  &:hover {
    opacity: 0.8;
  }
`;
