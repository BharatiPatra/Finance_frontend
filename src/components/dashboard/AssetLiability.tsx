// components/dashboard/AssetLiabilityPieChart.tsx
import React from "react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from "recharts";
import { AssetLiabilityChartProps } from "./types";
import { Card } from "@/components/ui/card"; // Adjust the import path as necessary

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28FD0"];

// Custom label component with better positioning
const CustomLabel = (props: any) => {
  const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props;
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  // Only show percentage if significant
  if (percent * 100 < 5) return null;

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="12"
      fontWeight="bold"
    >
      {`${(percent * 100).toFixed(1)}%`}
    </text>
  );
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
  ].filter((item) => item.value > 0); // Filter out zero values

  const liabilitiesData = [
    { name: "Credit Cards", value: total_credit_spending },
    { name: "Home Loan", value: homeLoan },
    { name: "Car Loan", value: carLoan },
    { name: "Other Loan", value: otherLoan },
  ].filter((item) => item.value > 0); // Filter out zero values

  return (
    <div className="flex justify-center items-start gap-16 py-6">
      <Card
        className="w-64  bg-gray-800 border border-cyan-400/50
        rounded-lg
        shadow-md"
      >
        <h5 className="text-xl font-semibold  text-center text-gray-200">
          Assets
        </h5>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={assetsData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={CustomLabel}
              paddingAngle={4}
            >
              {assetsData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v: number) => [`₹${v.toLocaleString()}`, "Value"]}
              labelFormatter={(label) => `${label}`}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </Card>

      <Card
        className="w-72 bg-gray-800 border border-cyan-400/50
        rounded-lg
        shadow-md"
      >
        <h5 className="text-xl font-semibold text-center text-gray-200">
          Liabilities
        </h5>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie
              data={liabilitiesData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label={CustomLabel}
              paddingAngle={4}
            >
              {liabilitiesData.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(v: number) => [`₹${v.toLocaleString()}`, "Value"]}
              labelFormatter={(label) => `${label}`}
            />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
};

export default AssetLiabilityPieChart;
