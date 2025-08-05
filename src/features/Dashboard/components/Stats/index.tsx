import { themeColors } from "@/styles/theme";
import styled from "styled-components";

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

interface Props {
  totalBalance: string;
}

export const Stats = ({ totalBalance }: Props) => {
  return (
    <StatsCard>
      <StatsTitle>Total Balance</StatsTitle>
      <StatsValue>{totalBalance}</StatsValue>
    </StatsCard>
  );
};
