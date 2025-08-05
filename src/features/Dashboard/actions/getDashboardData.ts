"use server";

import {
  getCachedDashboardMetadata,
  getTransactions,
} from "@/lib/transactions";

export async function getDashboardData() {
  try {
    const [metadata, transactions] = await Promise.all([
      getCachedDashboardMetadata(),
      getTransactions(),
    ]);

    return {
      success: true,
      data: {
        transactions,
        ...metadata,
      },
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      success: false,
      error: "Failed to fetch dashboard data",
    };
  }
}
