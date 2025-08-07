import { useSnackbar } from "@/providers/SnackbarProvider";
import { useCallback, useEffect, useState } from "react";
import { FinancialData } from "../types";
import { formatDateToMMDDYYYY } from "../utils/formatters";

export const useDashboard = () => {
  const { showSnackbar } = useSnackbar();
  const [dateFilter, setDateFilter] = useState("");
  const [accountFilter, setAccountFilter] = useState("");
  const [industryFilter, setIndustryFilter] = useState("");
  const [stateFilter, setStateFilter] = useState("");
  const [financialData, setFinancialData] = useState<FinancialData[]>([]);
  const [totalBalance, setTotalBalance] = useState<string>("R$ 0,00");
  const [revenues, setRevenues] = useState<string>("R$ 0,00");
  const [expenses, setExpenses] = useState<string>("R$ 0,00");
  const [pendingTransactions, setPendingTransactions] =
    useState<string>("R$ 0,00");
  const [pendingTransactionsCount, setPendingTransactionsCount] =
    useState<number>(0);
  const [accounts, setAccounts] = useState<string[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const [industries, setIndustries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const handleFinancialData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/dashboard");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

      if (result.success && result.data) {
        const {
          transactions,
          totalBalance,
          revenues,
          expenses,
          pendingTransactions,
          pendingTransactionsCount,
          dates,
          accounts,
          industries,
          states,
        } = result.data;
        setFinancialData(transactions);
        setTotalBalance(totalBalance);
        setRevenues(revenues);
        setExpenses(expenses);
        setPendingTransactions(pendingTransactions);
        setPendingTransactionsCount(pendingTransactionsCount);
        setDates(dates);
        setAccounts(accounts);
        setIndustries(industries);
        setStates(states);
      } else {
        console.error("Dashboard data error:", result.error);
        showSnackbar(result.error || "Failed to load dashboard data", "error");
      }
    } catch (err) {
      console.error("Error loading dashboard data:", err);
      showSnackbar(
        "Failed to load dashboard data. Please check your connection and try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  }, [showSnackbar]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDateFilter(localStorage.getItem("dateFilter") || "");
      setAccountFilter(localStorage.getItem("accountFilter") || "");
      setIndustryFilter(localStorage.getItem("industryFilter") || "");
      setStateFilter(localStorage.getItem("stateFilter") || "");
    }
  }, []);

  useEffect(() => {
    handleFinancialData();
  }, [handleFinancialData]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dateFilter", dateFilter);
    }
  }, [dateFilter]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("accountFilter", accountFilter);
    }
  }, [accountFilter]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("industryFilter", industryFilter);
    }
  }, [industryFilter]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("stateFilter", stateFilter);
    }
  }, [stateFilter]);

  const filteredData = financialData.filter(
    (tx) =>
      (!dateFilter || formatDateToMMDDYYYY(tx.date) === dateFilter) &&
      (!accountFilter || tx.account === accountFilter) &&
      (!industryFilter || tx.industry === industryFilter) &&
      (!stateFilter || tx.state === stateFilter)
  );

  return {
    financialData,
    totalBalance,
    revenues,
    expenses,
    pendingTransactions,
    pendingTransactionsCount,
    dates,
    accounts,
    industries,
    states,
    filteredData,
    dateFilter,
    setDateFilter,
    accountFilter,
    setAccountFilter,
    industryFilter,
    setIndustryFilter,
    stateFilter,
    setStateFilter,
    loading,
  };
};
