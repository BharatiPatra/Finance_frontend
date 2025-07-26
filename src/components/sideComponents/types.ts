export interface PortfolioItem {
  name: string;
  value: number;
  color: string;
}

export interface PerformanceGraphData {
  period: string;
  portfolio: number;
  market: number;
  benchmark: number;
}

export interface PerformanceData {
  period: string;
  value: number;
}

export interface UserProfile {
  name: string;
  role: string;
  avatar: string;
  status: "online" | "away" | "offline";
  netWorth: string;
}

export interface Transaction {
  symbol: string;
  type: "buy" | "sell" | "dividend";
  amount: number;
  date: string;
  change: string;
}

export interface ExpenseData {
  category: string;
  amount: number;
  color: string;
}

export interface Goal {
  label: string;
  value: number;
  current: number;
  total: number;
}
