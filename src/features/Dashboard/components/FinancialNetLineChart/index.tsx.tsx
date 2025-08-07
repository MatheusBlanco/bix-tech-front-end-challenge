import { themeColors } from "@/styles/theme";
import {
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { Activity, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { Line } from "react-chartjs-2";
import styled from "styled-components";
import { FinancialData } from "../../types";
import {
  formatCurrency,
  formatCurrencyValue,
  formatDateToMonthYear,
} from "../../utils/formatters";

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const LineChartContainer = styled.div`
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
    min-width: 1200px;
    flex: 1;
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

export function FinancialNetLineChart({
  financialData,
}: {
  financialData: FinancialData[];
}) {
  const chartData = useMemo(() => {
    const grouped: Record<string, number> = {};
    financialData.forEach((tx) => {
      const key = formatDateToMonthYear(tx.date);
      const value = formatCurrencyValue(tx.amount);
      if (!grouped[key]) grouped[key] = 0;
      grouped[key] += tx.transaction_type === "deposit" ? value : -value;
    });
    const labels = Object.keys(grouped).sort();
    let acc = 0;
    const accumulatedBalance = labels.map((l) => (acc += grouped[l]));
    return {
      labels,
      datasets: [
        {
          label: "Net Balance",
          data: accumulatedBalance,
          borderColor: themeColors.primary,
          backgroundColor: themeColors.primary + "20",
          fill: true,
          tension: 0.4,
          borderWidth: 3,
          pointBackgroundColor: themeColors.primary,
          pointBorderColor: themeColors.surface,
          pointBorderWidth: 2,
          pointRadius: 6,
          pointHoverRadius: 8,
        },
      ],
    };
  }, [financialData]);

  if (!financialData || financialData.length === 0) {
    return (
      <LineChartContainer>
        <ChartTitle>
          <Activity />
          Net Balance Trend
        </ChartTitle>
        <EmptyStateContainer>
          <EmptyStateIcon>
            <TrendingUp />
          </EmptyStateIcon>
          <EmptyStateTitle>No Balance Data</EmptyStateTitle>
          <EmptyStateDescription>
            Add transactions to track your net balance trend over time.
          </EmptyStateDescription>
        </EmptyStateContainer>
      </LineChartContainer>
    );
  }

  return (
    <LineChartContainer>
      <ChartTitle>
        <Activity />
        Net Balance Trend
      </ChartTitle>
      <ChartWrapper>
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                position: "top" as const,
                labels: {
                  color: themeColors.text,
                  font: {
                    size: 14,
                    weight: 500,
                  },
                  padding: 20,
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
                    const label = context.dataset.label || "";
                    const value = formatCurrency(context.parsed.y);
                    return `${label}: ${value}`;
                  },
                },
              },
            },
            scales: {
              x: {
                grid: {
                  display: false,
                },
                ticks: {
                  color: themeColors.textSecondary,
                  font: {
                    size: 12,
                  },
                },
              },
              y: {
                grid: {
                  color: themeColors.outline + "40",
                },
                ticks: {
                  color: themeColors.textSecondary,
                  font: {
                    size: 12,
                  },
                  callback: function (value) {
                    return formatCurrency(Number(value));
                  },
                },
              },
            },
          }}
        />
      </ChartWrapper>
    </LineChartContainer>
  );
}
