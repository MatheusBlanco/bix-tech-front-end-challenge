import { themeColors } from "@/styles/theme";
import { ArcElement, Chart, Legend, Tooltip } from "chart.js";
import { DollarSign, PieChart } from "lucide-react";
import { useMemo } from "react";
import { Pie } from "react-chartjs-2";
import styled from "styled-components";
import { FinancialData } from "../../types";
import { formatCurrency, formatCurrencyValue } from "../../utils/formatters";

Chart.register(ArcElement, Tooltip, Legend);

const PieChartContainer = styled.div`
  background: ${themeColors.surface};
  border-radius: 16px;
  padding: 16px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid ${themeColors.outline};
  margin-bottom: 24px;
  transition: all 0.2s ease-in-out;
  height: 300px;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 100%;
  overflow: hidden;

  @media (min-width: 768px) {
    padding: 24px;
  }

  @media (min-width: 1200px) {
    max-width: 400px;
    margin: 0 auto 24px 0;
  }

  &:hover {
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
    transform: translateY(-2px);
  }
`;

const ChartWrapper = styled.div`
  flex: 1;
  min-height: 0;
  position: relative;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
`;

const ChartTitle = styled.h3`
  color: ${themeColors.text};
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 16px 0;
  display: flex;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;

  @media (min-width: 768px) {
    font-size: 1.25rem;
    margin: 0 0 20px 0;
    gap: 12px;
  }
`;

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  text-align: center;
  color: ${themeColors.textSecondary};
`;

const EmptyStateIcon = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: ${themeColors.primaryContainer};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

  svg {
    width: 40px;
    height: 40px;
    color: ${themeColors.onPrimaryContainer};
  }
`;

const EmptyStateTitle = styled.h4`
  color: ${themeColors.text};
  font-size: 1.1rem;
  font-weight: 600;
  margin: 0 0 8px 0;
`;

const EmptyStateDescription = styled.p`
  color: ${themeColors.textSecondary};
  font-size: 0.95rem;
  margin: 0;
  line-height: 1.5;
`;

export function FinancialCurrencyPieChart({
  financialData,
}: {
  financialData: FinancialData[];
}) {
  const pieData = useMemo(() => {
    const currencyTotals: Record<string, number> = {};
    financialData.forEach((tx) => {
      const value = formatCurrencyValue(tx.amount);
      if (!currencyTotals[tx.currency]) currencyTotals[tx.currency] = 0;
      currencyTotals[tx.currency] +=
        tx.transaction_type === "deposit" ? value : -value;
    });
    const labels = Object.keys(currencyTotals);
    const data = labels.map((l) => Math.max(currencyTotals[l], 0));
    return {
      labels,
      datasets: [
        {
          label: "Balance by currency",
          data,
          backgroundColor: [
            themeColors.primary,
            themeColors.success,
            themeColors.warning,
            themeColors.error,
            themeColors.info,
            themeColors.primaryContainer,
            themeColors.successContainer,
            themeColors.warningContainer,
          ],
          borderWidth: 0,
          hoverBorderWidth: 3,
          hoverBorderColor: themeColors.onSurface,
        },
      ],
    };
  }, [financialData]);

  if (!financialData || financialData.length === 0) {
    return (
      <PieChartContainer>
        <ChartTitle>
          <DollarSign />
          Balance by Currency
        </ChartTitle>
        <EmptyStateContainer>
          <EmptyStateIcon>
            <PieChart />
          </EmptyStateIcon>
          <EmptyStateTitle>No Currency Data</EmptyStateTitle>
          <EmptyStateDescription>
            Add transactions to see your balance distribution across different
            currencies.
          </EmptyStateDescription>
        </EmptyStateContainer>
      </PieChartContainer>
    );
  }

  return (
    <PieChartContainer>
      <ChartTitle>
        <DollarSign />
        Balance by Currency
      </ChartTitle>
      <ChartWrapper>
        <Pie
          data={pieData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "bottom" as const,
                labels: {
                  color: themeColors.text,
                  font: {
                    size: 14,
                    weight: 500,
                  },
                  padding: 15,
                  usePointStyle: true,
                  pointStyle: "circle",
                },
              },
              tooltip: {
                backgroundColor: themeColors.surface,
                titleColor: themeColors.text,
                bodyColor: themeColors.text,
                borderColor: themeColors.outline,
                borderWidth: 1,
                cornerRadius: 12,
                padding: 12,
                callbacks: {
                  label: function (context) {
                    const label = context.label || "";
                    const value = formatCurrency(context.parsed);
                    return `${label}: ${value}`;
                  },
                },
              },
            },
          }}
        />
      </ChartWrapper>
    </PieChartContainer>
  );
}
