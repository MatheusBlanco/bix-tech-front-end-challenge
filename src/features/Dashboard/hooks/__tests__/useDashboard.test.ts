import { useSnackbar } from "@/providers/SnackbarProvider";
import { act, renderHook } from "@testing-library/react";
import { useDashboard } from "../useDashboard";

jest.mock("@/providers/SnackbarProvider");

const mockUseSnackbar = useSnackbar as jest.MockedFunction<typeof useSnackbar>;

const mockShowSnackbar = jest.fn();

const mockFinancialData = [
  {
    id: "1",
    date: 1705276800000,
    account: "Account 1",
    industry: "Technology",
    state: "SP",
    amount: "123456",
    transaction_type: "deposit",
    currency: "BRL",
  },
  {
    id: "2",
    date: 1705363200000,
    account: "Account 2",
    industry: "Finance",
    state: "RJ",
    amount: "789012",
    transaction_type: "withdraw",
    currency: "BRL",
  },
];

const mockDashboardResponse = {
  success: true,
  data: {
    transactions: mockFinancialData,
    totalBalance: "R$ 1.234,56",
    revenues: "R$ 1.234,56",
    expenses: "R$ 789,01",
    pendingTransactions: "R$ 445,55",
    pendingTransactionsCount: 2,
    dates: ["01/15/2024", "01/16/2024"],
    accounts: ["Account 1", "Account 2"],
    industries: ["Technology", "Finance"],
    states: ["SP", "RJ"],
  },
};

global.fetch = jest.fn();

describe("useDashboard", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUseSnackbar.mockReturnValue({ showSnackbar: mockShowSnackbar });

    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: jest.fn(),
        setItem: jest.fn(),
      },
      writable: true,
    });

    (global.fetch as jest.Mock).mockClear();
  });

  it("initializes with default values", () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockDashboardResponse,
    });

    const { result } = renderHook(() => useDashboard());

    expect(result.current.financialData).toEqual([]);
    expect(result.current.totalBalance).toBe("R$ 0,00");
    expect(result.current.loading).toBe(true);
    expect(result.current.dateFilter).toBe("");
    expect(result.current.accountFilter).toBe("");
    expect(result.current.industryFilter).toBe("");
    expect(result.current.stateFilter).toBe("");
  });

  it("loads dashboard data successfully", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockDashboardResponse,
    });

    const { result } = renderHook(() => useDashboard());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.financialData).toEqual(mockFinancialData);
    expect(result.current.totalBalance).toBe("R$ 1.234,56");
    expect(result.current.revenues).toBe("R$ 1.234,56");
    expect(result.current.expenses).toBe("R$ 789,01");
    expect(result.current.pendingTransactions).toBe("R$ 445,55");
    expect(result.current.pendingTransactionsCount).toBe(2);
    expect(result.current.dates).toEqual(["01/15/2024", "01/16/2024"]);
    expect(result.current.accounts).toEqual(["Account 1", "Account 2"]);
    expect(result.current.industries).toEqual(["Technology", "Finance"]);
    expect(result.current.states).toEqual(["SP", "RJ"]);
    expect(result.current.loading).toBe(false);
  });

  it("handles dashboard data loading error", async () => {
    const errorResponse = {
      success: false,
      error: "Failed to load data",
    };
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => errorResponse,
    });

    const { result } = renderHook(() => useDashboard());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(mockShowSnackbar).toHaveBeenCalledWith(
      "Failed to load data",
      "error"
    );
    expect(result.current.loading).toBe(false);
  });

  it("handles dashboard data loading exception", async () => {
    (global.fetch as jest.Mock).mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useDashboard());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(mockShowSnackbar).toHaveBeenCalledWith(
      "Failed to load dashboard data. Please check your connection and try again.",
      "error"
    );
    expect(result.current.loading).toBe(false);
  });

  it("handles HTTP error response", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 500,
    });

    const { result } = renderHook(() => useDashboard());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(mockShowSnackbar).toHaveBeenCalledWith(
      "Failed to load dashboard data. Please check your connection and try again.",
      "error"
    );
    expect(result.current.loading).toBe(false);
  });

  it("filters data based on date filter", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockDashboardResponse,
    });

    const { result } = renderHook(() => useDashboard());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.setDateFilter("01/15/2024");
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].date).toBe(1705363200000);
  });

  it("filters data based on account filter", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockDashboardResponse,
    });

    const { result } = renderHook(() => useDashboard());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.setAccountFilter("Account 1");
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].account).toBe("Account 1");
  });

  it("filters data based on industry filter", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockDashboardResponse,
    });

    const { result } = renderHook(() => useDashboard());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.setIndustryFilter("Technology");
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].industry).toBe("Technology");
  });

  it("filters data based on state filter", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockDashboardResponse,
    });

    const { result } = renderHook(() => useDashboard());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.setStateFilter("SP");
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0].state).toBe("SP");
  });

  it("applies multiple filters", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockDashboardResponse,
    });

    const { result } = renderHook(() => useDashboard());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.setDateFilter("01/14/2024");
      result.current.setAccountFilter("Account 1");
      result.current.setIndustryFilter("Technology");
      result.current.setStateFilter("SP");
    });

    expect(result.current.filteredData).toHaveLength(1);
    expect(result.current.filteredData[0]).toEqual(mockFinancialData[0]);
  });

  it("returns all data when no filters are applied", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockDashboardResponse,
    });

    const { result } = renderHook(() => useDashboard());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(result.current.filteredData).toEqual(mockFinancialData);
  });

  it("saves filters to localStorage", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockDashboardResponse,
    });

    const { result } = renderHook(() => useDashboard());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    act(() => {
      result.current.setDateFilter("01/15/2024");
    });

    expect(localStorage.setItem).toHaveBeenCalledWith(
      "dateFilter",
      "01/15/2024"
    );
  });

  it("calls the correct API endpoint", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: async () => mockDashboardResponse,
    });

    renderHook(() => useDashboard());

    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(global.fetch).toHaveBeenCalledWith("/api/dashboard");
  });
});
