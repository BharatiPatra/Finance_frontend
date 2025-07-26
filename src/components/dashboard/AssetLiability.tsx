import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";

import { AssetLiabilityChartProps } from "./types";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28FD0"];

// Helper function to show percent labels
const renderCustomLabel = (entry: any, index: number, data: any[]) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const percent = ((entry.value / total) * 100).toFixed(1);
  return `${percent}%`;
};

export const AssetLiabilityPieChart: React.FC<AssetLiabilityChartProps> = ({
  total_bank_balance,
  total_credit_spending,
  total_mutual_fund_value,
  total_epf,
  homeLoan,
  carLoan,
  otherLoan,
}) => {
  const assetsData = [
    { name: "Bank Balance", value: total_bank_balance },
    { name: "Mutual Funds", value: total_mutual_fund_value },
    { name: "EPF", value: total_epf },
  ];

  const liabilitiesData = [
    { name: "Credit Cards", value: total_credit_spending },
    { name: "Home Loan", value: homeLoan },
    { name: "Car Loan", value: carLoan },
    { name: "Other Loan", value: otherLoan },
  ];

  return (
    <div className="flex justify-center items-center gap-16 py-6">
      {/* Assets */}
      <div className="flex flex-col items-center">
        <h5 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Assets Breakdown
        </h5>
        <ResponsiveContainer width={250} height={250}>
          <PieChart>
            <Pie
              data={assetsData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={(entry) => renderCustomLabel(entry, 0, assetsData)}
              paddingAngle={5}
            >
              {assetsData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v: any) => v.toLocaleString()} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Liabilities */}
      <div className="flex flex-col items-center">
        <h5 className="text-xl font-semibold text-gray-800 mb-4 text-center">
          Liabilities Breakdown
        </h5>
        <ResponsiveContainer width={250} height={250}>
          <PieChart>
            <Pie
              data={liabilitiesData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={90}
              label={(entry) => renderCustomLabel(entry, 0, liabilitiesData)}
              paddingAngle={5}
            >
              {liabilitiesData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(v: any) => v.toLocaleString()} />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AssetLiabilityPieChart;
