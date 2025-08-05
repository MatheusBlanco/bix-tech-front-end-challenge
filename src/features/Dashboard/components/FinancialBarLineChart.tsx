import { themeColors } from "@/styles/theme";
import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
} from "chart.js";
import { BarChart3, TrendingUp } from "lucide-react";
import { useMemo } from "react";
import { Chart as ChartJS } from "react-chartjs-2";
import styled from "styled-components";
import { FinancialData } from "../types";
import {
  formatCurrency,
  formatCurrencyValue,
  formatDateToMonthYear,
} from "../utils/formatters";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const ChartContainer = styled.div`
  background: ${themeColors.surface};
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  border: 1px solid ${themeColors.outline};
  margin-bottom: 24px;
  transition: all 0.2s ease-in-out;
  height: 300px;
  display: flex;
  flex-direction: column;

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
`;

const ChartTitle = styled.h3`
  color: ${themeColors.text};
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 20px 0;
  display: flex;
  align-items: center;
  gap: 12px;
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

export function FinancialBarLineChart({
  financialData,
}: {
  financialData: FinancialData[];
}) {
  // Group by month/year
  const chartData = useMemo(() => {
    const grouped: Record<string, { deposit: number; withdraw: number }> = {};
    financialData.forEach((tx) => {
      const key = formatDateToMonthYear(tx.date);
      const value = formatCurrencyValue(tx.amount);
      if (!grouped[key]) grouped[key] = { deposit: 0, withdraw: 0 };
      if (tx.transaction_type === "deposit") grouped[key].deposit += value;
      else grouped[key].withdraw += value;
    });
    const labels = Object.keys(grouped).sort();
    const deposits = labels.map((l) => grouped[l].deposit);
    const withdraws = labels.map((l) => grouped[l].withdraw);

    return {
      labels,
      datasets: [
        {
          type: "bar" as const,
          label: "Income",
          data: deposits,
          backgroundColor: themeColors.success,
          borderRadius: 8,
          borderSkipped: false,
        },
        {
          type: "bar" as const,
          label: "Expenses",
          data: withdraws,
          backgroundColor: themeColors.error,
          borderRadius: 8,
          borderSkipped: false,
        },
      ],
    };
  }, [financialData]);

  if (!financialData || financialData.length === 0) {
    return (
      <ChartContainer>
        <ChartTitle>
          <TrendingUp />
          Income vs Expenses
        </ChartTitle>
        <EmptyStateContainer>
          <EmptyStateIcon>
            <BarChart3 />
          </EmptyStateIcon>
          <EmptyStateTitle>No Financial Data</EmptyStateTitle>
          <EmptyStateDescription>
            Start adding transactions to see your income and expenses breakdown
            by month.
          </EmptyStateDescription>
        </EmptyStateContainer>
      </ChartContainer>
    );
  }

  return (
    <ChartContainer>
      <ChartTitle>
        <TrendingUp />
        Income vs Expenses
      </ChartTitle>
      <ChartWrapper>
        <ChartJS
          type="bar"
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
    </ChartContainer>
  );
}
