// app/dashboard/page.tsx
"use client";

import Sidebar from "@/components/Sidebar";
import { CardContent, Card as MuiCard, Typography } from "@mui/material";
import styled from "styled-components";

export default function DashboardPage() {
  return (
    <Container>
      <Sidebar />
      <MainContent>
        <Title>Dashboard</Title>
        <CardsContainer>
          <SummaryCard>
            <CardContent>
              <Label>Receitas</Label>
              <Amount>R$ 12.340,00</Amount>
            </CardContent>
          </SummaryCard>
          {/* Repita para Despesas, Pendentes, Saldo */}
        </CardsContainer>
      </MainContent>
    </Container>
  );
}

// Styled Components
const Container = styled.div`
  display: flex;
  min-height: 100vh;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 2rem;
`;

const Title = styled.h1`
  margin-bottom: 1rem;
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
`;

const SummaryCard = styled(MuiCard)`
  background-color: #f7fafc;
  border-left: 6px solid #1976d2;
`;

const Label = styled(Typography)`
  font-size: 1rem;
  color: #666;
`;

const Amount = styled(Typography)`
  font-size: 1.4rem;
  font-weight: bold;
`;
