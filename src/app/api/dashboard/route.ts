import { FinancialData } from "@/features/Dashboard/types";
import {
  formatCurrency,
  formatCurrencyValue,
  formatDateToMMDDYYYY,
} from "@/features/Dashboard/utils/formatters";
import { NextRequest, NextResponse } from "next/server";

async function getTransactionsFromFile(): Promise<FinancialData[]> {
  try {
    // Use relative URL for development, absolute for production
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : "";

    const url = baseUrl ? `${baseUrl}/transactions.json` : "/transactions.json";

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch transactions: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error reading transactions file:", error);
    throw new Error("Failed to read transaction data");
  }
}

export async function GET(req: NextRequest) {
  try {
    const transactions = await getTransactionsFromFile();

    const totalBalanceValue = transactions.reduce(
      (acc: number, tx: { amount: string; transaction_type: string }) => {
        const value = formatCurrencyValue(tx.amount);
        return tx.transaction_type === "deposit" ? acc + value : acc - value;
      },
      0
    );

    const revenuesValue = transactions.reduce(
      (acc: number, tx: { amount: string; transaction_type: string }) => {
        if (tx.transaction_type === "deposit") {
          return acc + formatCurrencyValue(tx.amount);
        }
        return acc;
      },
      0
    );

    const expensesValue = transactions.reduce(
      (acc: number, tx: { amount: string; transaction_type: string }) => {
        if (tx.transaction_type === "withdraw") {
          return acc + formatCurrencyValue(tx.amount);
        }
        return acc;
      },
      0
    );

    const now = Date.now();
    const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;

    const pendingTransactions = transactions.filter(
      (tx: FinancialData) => tx.date >= twentyFourHoursAgo
    );

    const pendingTransactionsValue = pendingTransactions.reduce(
      (acc: number, tx: { amount: string; transaction_type: string }) => {
        const value = formatCurrencyValue(tx.amount);
        return tx.transaction_type === "deposit" ? acc + value : acc - value;
      },
      0
    );

    const datesSet = new Set<string>();
    const accountsSet = new Set<string>();
    const industriesSet = new Set<string>();
    const statesSet = new Set<string>();

    transactions.forEach((tx: FinancialData) => {
      datesSet.add(formatDateToMMDDYYYY(tx.date));
      accountsSet.add(tx.account);
      industriesSet.add(tx.industry);
      statesSet.add(tx.state);
    });

    const metadata = {
      totalBalance: formatCurrency(totalBalanceValue),
      revenues: formatCurrency(revenuesValue),
      expenses: formatCurrency(expensesValue),
      pendingTransactions: formatCurrency(pendingTransactionsValue),
      pendingTransactionsCount: pendingTransactions.length,
      dates: Array.from(datesSet).sort(),
      accounts: Array.from(accountsSet).sort(),
      industries: Array.from(industriesSet).sort(),
      states: Array.from(statesSet).sort(),
    };

    return NextResponse.json({
      success: true,
      data: {
        transactions,
        ...metadata,
      },
    });
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json(
      {
        success: false,
        error:
          "Failed to fetch dashboard data. Please check your connection and try again.",
      },
      { status: 500 }
    );
  }
}
