import { themeColors } from "@/styles/theme";
import styled from "styled-components";

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
  margin-bottom: 32px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const StatsCard = styled.div<{
  variant?: "primary" | "success" | "warning" | "info";
}>`
  background: linear-gradient(
    135deg,
    ${(props) => {
      switch (props.variant) {
        case "success":
          return `${themeColors.primary}, ${themeColors.primaryContainer}`;
        case "warning":
          return "#ff9800, #ffb74d";
        case "info":
          return "#2196f3, #64b5f6";
        default:
          return `${themeColors.primary}, ${themeColors.primaryContainer}`;
      }
    }}
  );
  border-radius: 20px;
  padding: 24px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  border: 1px solid ${themeColors.outline};
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;

  &:before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    width: 80px;
    height: 80px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
    transform: translate(20px, -20px);
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const StatsTitle = styled.h3`
  color: ${themeColors.onPrimary};
  font-size: 0.875rem;
  font-weight: 500;
  margin: 0 0 8px 0;
  opacity: 0.9;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatsValue = styled.h2`
  color: ${themeColors.onPrimary};
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 4px 0;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const StatsSubtitle = styled.p`
  color: ${themeColors.onPrimary};
  font-size: 0.75rem;
  margin: 0;
  opacity: 0.8;
`;

interface StatsProps {
  totalBalance: string;
  revenues: string;
  expenses: string;
  pendingTransactions: string;
  pendingTransactionsCount: number;
}

export const Stats = ({
  totalBalance,
  revenues,
  expenses,
  pendingTransactions,
  pendingTransactionsCount,
}: StatsProps) => {
  return (
    <StatsGrid>
      <StatsCard variant="primary">
        <StatsTitle>Total Balance</StatsTitle>
        <StatsValue>{totalBalance}</StatsValue>
        <StatsSubtitle>Current account balance</StatsSubtitle>
      </StatsCard>

      <StatsCard variant="success">
        <StatsTitle>Revenues</StatsTitle>
        <StatsValue>{revenues}</StatsValue>
        <StatsSubtitle>Total deposits received</StatsSubtitle>
      </StatsCard>

      <StatsCard variant="warning">
        <StatsTitle>Expenses</StatsTitle>
        <StatsValue>{expenses}</StatsValue>
        <StatsSubtitle>Total withdrawals made</StatsSubtitle>
      </StatsCard>

      <StatsCard variant="info">
        <StatsTitle>Pending Transactions</StatsTitle>
        <StatsValue>{pendingTransactions}</StatsValue>
        <StatsSubtitle>
          {pendingTransactionsCount} transactions in last 24h
        </StatsSubtitle>
      </StatsCard>
    </StatsGrid>
  );
};
