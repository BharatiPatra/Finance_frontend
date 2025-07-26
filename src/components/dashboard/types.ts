export interface Liability {
  netWorthAttribute: string;
  value: {
    currencyCode: string;
    units: string;
  };
}
export interface AssetLiabilityChartProps {
  total_bank_balance: number;
  total_credit_spending: number;
  total_mutual_fund_value: number;
  total_epf: number;
  homeLoan: number;
  carLoan: number;
  otherLoan: number;
}
export interface MetricCardProps {
  id: string;
  title: string;
  value: string;
  icon: React.ReactNode;
  onClick: (id: string) => void;
}

export interface MutualFundTransaction {
  date: string
  schemeName: string
  schemeType: string
  type: string
  price: number
}

export interface Summary {
  total_current_balance: string;
  pension_balance: string;
  total_credit_spending: number;
  total_mutual_fund_value: number;
  mutual_fund_currency: string;
  total_net_worth: {
    currencyCode: string;
    units: string;
  };
  liabilities: Liability[];
  mutual_fund: MutualFundTransaction[];
}

