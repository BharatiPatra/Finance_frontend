import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { MutualFundTransaction } from "./types";

// Truncate the name after the second space
function truncateAfterSecondSpace(name: string): string {
  const parts = name.split(" ");
  if (parts.length <= 2) return name;
  return parts.slice(0, 2).join(" ") + "...";
}

export default function MutualFundTable({
  data,
}: {
  data: MutualFundTransaction[];
}) {
  // Prepare data for bar chart
  const chartData =
    data?.map((transaction, index) => ({
      name: truncateAfterSecondSpace(transaction.schemeName),
      fullName: transaction.schemeName,
      price: transaction.price,
      type: transaction.type,
      schemeType: transaction.schemeType,
      date: transaction.date,
      index: index,
    })) || [];

  // Color scheme for different transaction types
  const getBarColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "buy":
        return "#10B981"; // Green
      case "sell":
        return "#EF4444"; // Red
      case "dividend":
        return "#3B82F6"; // Blue
      default:
        return "#8B5CF6"; // Purple
    }
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-900 border border-gray-600 rounded-lg p-3 shadow-lg">
          <p className="text-white font-medium mb-2">{data.fullName}</p>
          <p className="text-gray-300 text-sm">
            Price: ₹{data.price.toFixed(2)}
          </p>
          <p className="text-gray-300 text-sm">Type: {data.type}</p>
          <p className="text-gray-300 text-sm">
            Scheme Type: {data.schemeType}
          </p>
          <p className="text-gray-300 text-sm">Date: {data.date}</p>
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <div className="mt-10 container mx-auto p-6 bg-gray-800 border border-cyan-400/50 rounded-lg shadow-md">
        <div className="text-center text-gray-400">
          <p>No mutual fund transactions available</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 container mx-auto p-6 bg-gray-800 border border-cyan-400/50 rounded-lg shadow-md">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-white mb-2">
          Mutual Fund Transactions
        </h3>
        <p className="text-gray-400 text-sm">
          Price comparison across your mutual fund portfolio
        </p>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#374151"
            strokeOpacity={0.3}
          />
          <XAxis
            dataKey="name"
            stroke="#9CA3AF"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={80}
          />
          <YAxis
            stroke="#9CA3AF"
            fontSize={12}
            tickFormatter={(value) => `₹${value}`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar dataKey="price" radius={[4, 4, 0, 0]}>
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(entry.type)}
                className="hover:opacity-80 transition-opacity duration-200"
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: "#10B981" }}
          ></div>
          <span className="text-gray-300 text-sm">Buy</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: "#EF4444" }}
          ></div>
          <span className="text-gray-300 text-sm">Sell</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: "#3B82F6" }}
          ></div>
          <span className="text-gray-300 text-sm">Dividend</span>
        </div>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded"
            style={{ backgroundColor: "#8B5CF6" }}
          ></div>
          <span className="text-gray-300 text-sm">Other</span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm mb-1">Total Transactions</p>
          <p className="text-white font-medium">{chartData.length}</p>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm mb-1">Average Price</p>
          <p className="text-white font-medium">
            ₹
            {chartData.length > 0
              ? (
                  chartData.reduce((sum, item) => sum + item.price, 0) /
                  chartData.length
                ).toFixed(2)
              : "0.00"}
          </p>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm mb-1">Highest Price</p>
          <p className="text-white font-medium">
            ₹
            {chartData.length > 0
              ? Math.max(...chartData.map((item) => item.price)).toFixed(2)
              : "0.00"}
          </p>
        </div>
      </div>
    </div>
  );
}
