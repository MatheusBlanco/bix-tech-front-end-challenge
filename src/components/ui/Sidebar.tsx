"use client";
import { themeColors } from "@/styles/theme";
import styled from "styled-components";

export const Sidebar = styled.aside`
  width: 220px;
  height: 100vh;
  background-color: ${themeColors.primaryDark};
  color: ${themeColors.text};
  display: flex;
  flex-direction: column;
  padding: 2rem 1rem;
  gap: 1.5rem;
`;

export const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 6px;

  &:hover {
    background-color: ${themeColors.primary};
  }

  span {
    font-weight: 500;
  }
`;
