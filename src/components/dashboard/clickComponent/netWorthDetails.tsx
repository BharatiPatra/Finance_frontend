"use client";

import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { useUserSession } from "../../../contexts/UserSessionContext";

interface AssetItem {
  netWorthAttribute: string;
  value: {
    currencyCode: string;
    units: string;
  };
}

interface LiabilityItem {
  netWorthAttribute: string;
  value: {
    currencyCode: string;
    units: string;
  };
}

interface NetWorthData {
  assets: AssetItem[];
  liabilities: LiabilityItem[];
}

const NetWorthDetails: React.FC = () => {
  const [assets, setAssets] = useState<AssetItem[]>([]);
  const [liabilities, setLiabilities] = useState<LiabilityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNetWorthData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch assets and liabilities concurrently
        const [assetsResponse, liabilitiesResponse] = await Promise.all([
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/networth/assets`),
          fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/networth/liabilities`),
        ]);

        if (!assetsResponse.ok) {
          throw new Error(`Failed to fetch assets: ${assetsResponse.status}`);
        }

        if (!liabilitiesResponse.ok) {
          throw new Error(
            `Failed to fetch liabilities: ${liabilitiesResponse.status}`
          );
        }

        const assetsData = await assetsResponse.json();
        const liabilitiesData = await liabilitiesResponse.json();

        setAssets(assetsData.assets || []);
        setLiabilities(liabilitiesData.liabilities || []);
      } catch (err) {
        console.error("Error fetching net worth data:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchNetWorthData();
  }, []);

  // Helper function to format currency
  const formatCurrency = (amount: string | number) => {
    const num = typeof amount === "string" ? parseFloat(amount) : amount;
    return `₹${num.toLocaleString("en-IN")}`;
  };

  // Helper function to format attribute names
  const formatAttributeName = (attribute: string) => {
    return attribute
      .replace(/ASSET_TYPE_|LIABILITY_TYPE_/g, "")
      .replace(/_/g, " ")
      .toLowerCase()
      .replace(/\b\w/g, (l) => l.toUpperCase());
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Loading net worth data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-400">
        <p>Error loading net worth data: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  // Calculate totals
  const totalAssets = assets.reduce(
    (sum: number, asset: AssetItem) => sum + parseFloat(asset.value.units),
    0
  );

  const totalLiabilities = liabilities.reduce(
    (sum: number, liability: LiabilityItem) =>
      sum + parseFloat(liability.value.units),
    0
  );

  const netWorth = totalAssets - totalLiabilities;

  // Prepare data for charts
  const chartData = [
    {
      category: "Assets",
      amount: totalAssets,
      color: "#10B981",
      hoverColor: "#059669",
      description: "Total value of all your assets",
    },
    {
      category: "Liabilities",
      amount: totalLiabilities,
      color: "#EF4444",
      hoverColor: "#DC2626",
      description: "Total amount of all your debts",
    },
    {
      category: "Net Worth",
      amount: netWorth,
      color: netWorth >= 0 ? "#3B82F6" : "#EF4444",
      hoverColor: netWorth >= 0 ? "#2563EB" : "#DC2626",
      description: "Assets minus Liabilities",
    },
  ];

  // Custom bar component with hover effects
  const CustomBar = (props: any) => {
    const { fill, payload, ...rest } = props;
    return (
      <rect
        {...rest}
        fill={fill}
        className="transition-all duration-200 hover:opacity-80"
        style={{
          filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))",
        }}
      />
    );
  };

  // Prepare detailed breakdown data
  const assetBreakdown = assets.map((asset: AssetItem) => ({
    name: formatAttributeName(asset.netWorthAttribute),
    value: parseFloat(asset.value.units),
    type: "asset",
  }));

  const liabilityBreakdown = liabilities.map((liability: LiabilityItem) => ({
    name: formatAttributeName(liability.netWorthAttribute),
    value: parseFloat(liability.value.units),
    type: "liability",
  }));

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#A28FD0",
    "#8884D8",
  ];

  return (
    <div className="w-full space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          Net Worth Overview
        </h3>
        <p className="text-gray-400">
          Complete breakdown of your assets and liabilities
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm mb-1">Total Assets</p>
          <p className="text-2xl font-bold text-green-400">
            {formatCurrency(totalAssets)}
          </p>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm mb-1">Total Liabilities</p>
          <p className="text-2xl font-bold text-red-400">
            {formatCurrency(totalLiabilities)}
          </p>
        </div>
        <div className="bg-gray-700/50 rounded-lg p-4 text-center">
          <p className="text-gray-400 text-sm mb-1">Net Worth</p>
          <p
            className={`text-2xl font-bold ${
              netWorth >= 0 ? "text-blue-400" : "text-red-400"
            }`}
          >
            {formatCurrency(netWorth)}
          </p>
        </div>
      </div>

      {/* Enhanced Bar Chart */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h4 className="text-lg font-semibold text-white mb-4">
          Financial Overview
        </h4>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <defs>
              <linearGradient id="assetsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient
                id="liabilitiesGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="0%" stopColor="#EF4444" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#DC2626" stopOpacity={0.6} />
              </linearGradient>
              <linearGradient id="netWorthGradient" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="0%"
                  stopColor={netWorth >= 0 ? "#3B82F6" : "#EF4444"}
                  stopOpacity={0.8}
                />
                <stop
                  offset="100%"
                  stopColor={netWorth >= 0 ? "#2563EB" : "#DC2626"}
                  stopOpacity={0.6}
                />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#374151"
              strokeOpacity={0.3}
            />
            <XAxis
              dataKey="category"
              stroke="#9CA3AF"
              fontSize={12}
              fontWeight="500"
            />
            <YAxis
              stroke="#9CA3AF"
              fontSize={12}
              tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}K`}
            />
            <Tooltip
              formatter={(value: number, name: string, props: any) => [
                formatCurrency(value),
                "Amount",
              ]}
              labelFormatter={(label) => `${label}`}
              contentStyle={{
                backgroundColor: "#111827",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#F9FAFB",
                boxShadow:
                  "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
              }}
              cursor={{ fill: "rgba(55, 65, 81, 0.1)" }}
            />
            <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  className="hover:opacity-80 transition-opacity duration-200"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>

        {/* Chart Legend */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
          {chartData.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-3 bg-gray-700/50 rounded-lg hover:bg-gray-700/70 transition-colors"
            >
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: item.color }}
              ></div>
              <div>
                <p className="text-white font-medium text-sm">
                  {item.category}
                </p>
                <p className="text-gray-400 text-xs">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Assets Breakdown */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-4">
            Assets Breakdown
          </h4>
          <div className="space-y-3">
            {assetBreakdown.map((asset, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-700/50 rounded"
              >
                <span className="text-gray-300">{asset.name}</span>
                <span className="text-green-400 font-medium">
                  {formatCurrency(asset.value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Liabilities Breakdown */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-4">
            Liabilities Breakdown
          </h4>
          <div className="space-y-3">
            {liabilityBreakdown.map((liability, index) => (
              <div
                key={index}
                className="flex justify-between items-center p-3 bg-gray-700/50 rounded"
              >
                <span className="text-gray-300">{liability.name}</span>
                <span className="text-red-400 font-medium">
                  {formatCurrency(liability.value)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Asset Distribution Pie Chart */}
      {assetBreakdown.length > 0 && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-white mb-4">
            Asset Distribution
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={assetBreakdown}
                cx="50%"
                cy="50%"
                outerRadius={100}
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) =>
                  `${name}: ${((percent ?? 0) * 100).toFixed(1)}%`
                }
              >
                {assetBreakdown.map((_, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => [formatCurrency(value), "Value"]}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};

export default NetWorthDetails;
