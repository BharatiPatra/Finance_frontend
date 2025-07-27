"use client";

import React, { useState, useEffect } from "react";

interface MutualFundTransaction {
  isinNumber: string;
  folioId: string;
  externalOrderType: string;
  transactionDate: string;
  purchasePrice: {
    currencyCode: string;
    units: string;
    nanos?: number;
  };
  transactionAmount: {
    currencyCode: string;
    units: string;
    nanos?: number;
  };
  transactionUnits: number;
  transactionMode: string;
  schemeName: string;
}

interface MutualFundApiResponse {
  transactions: MutualFundTransaction[];
}

const MfCard: React.FC = () => {
  const [mutualFundData, setMutualFundData] = useState<MutualFundTransaction[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMutualFundData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/mutualfunds/raw`
        );

        if (!response.ok) {
          throw new Error(
            `Failed to fetch mutual fund data: ${response.status}`
          );
        }

        const data: MutualFundApiResponse = await response.json();
        setMutualFundData(data.transactions || []);
      } catch (err) {
        console.error("Error fetching mutual fund data:", err);
        setError(err instanceof Error ? err.message : "Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchMutualFundData();
  }, []);
  // Helper function to format currency
  const formatCurrency = (amount: { units: string; nanos?: number }) => {
    const units = parseFloat(amount.units);
    const nanos = amount.nanos || 0;
    const total = units + nanos / 1000000000;
    return `₹${total.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Loading mutual fund data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-400">
        <p>Error loading mutual fund data: {error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!mutualFundData || mutualFundData.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400">
        <p>No mutual fund transactions available</p>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-white mb-2">
          Mutual Fund Transactions ({mutualFundData.length})
        </h3>
        <p className="text-gray-400 text-sm">
          Complete transaction history for your mutual fund investments
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-gray-700 text-gray-300">
            <tr>
              <th scope="col" className="px-3 py-3">
                Date
              </th>
              <th scope="col" className="px-3 py-3">
                Scheme Name
              </th>
              <th scope="col" className="px-3 py-3">
                Type
              </th>
              <th scope="col" className="px-3 py-3">
                Units
              </th>
              <th scope="col" className="px-3 py-3">
                Price
              </th>
              <th scope="col" className="px-3 py-3">
                Amount
              </th>
              <th scope="col" className="px-3 py-3">
                Folio
              </th>
            </tr>
          </thead>
          <tbody>
            {mutualFundData.map(
              (transaction: MutualFundTransaction, index: number) => (
                <tr
                  key={`${transaction.folioId}-${index}`}
                  className="border-b border-gray-600 hover:bg-gray-700/50"
                >
                  <td className="px-3 py-4 text-gray-300">
                    {formatDate(transaction.transactionDate)}
                  </td>
                  <td className="px-3 py-4">
                    <div className="text-white font-medium">
                      {transaction.schemeName}
                    </div>
                    <div className="text-xs text-gray-400">
                      ISIN: {transaction.isinNumber}
                    </div>
                  </td>
                  <td className="px-3 py-4">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        transaction.externalOrderType === "BUY"
                          ? "bg-green-900 text-green-300"
                          : "bg-red-900 text-red-300"
                      }`}
                    >
                      {transaction.externalOrderType}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-gray-300">
                    {transaction.transactionUnits.toLocaleString("en-IN", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 4,
                    })}
                  </td>
                  <td className="px-3 py-4 text-gray-300">
                    {formatCurrency(transaction.purchasePrice)}
                  </td>
                  <td className="px-3 py-4 text-white font-medium">
                    {formatCurrency(transaction.transactionAmount)}
                  </td>
                  <td className="px-3 py-4 text-gray-400 text-xs">
                    {transaction.folioId}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      {/* Summary Section */}
      <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
        <h4 className="text-white font-medium mb-3">Transaction Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <p className="text-gray-400">Total Transactions</p>
            <p className="text-white font-medium">{mutualFundData.length}</p>
          </div>
          <div>
            <p className="text-gray-400">Total Investment</p>
            <p className="text-white font-medium">
              {formatCurrency({
                units: mutualFundData
                  .reduce((sum: number, t: MutualFundTransaction) => {
                    const units = parseFloat(t.transactionAmount.units);
                    const nanos = t.transactionAmount.nanos || 0;
                    return sum + units + nanos / 1000000000;
                  }, 0)
                  .toString(),
              })}
            </p>
          </div>
          <div>
            <p className="text-gray-400">Total Units</p>
            <p className="text-white font-medium">
              {mutualFundData
                .reduce(
                  (sum: number, t: MutualFundTransaction) =>
                    sum + t.transactionUnits,
                  0
                )
                .toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 4,
                })}
            </p>
          </div>
          <div>
            <p className="text-gray-400">Unique Schemes</p>
            <p className="text-white font-medium">
              {
                new Set(
                  mutualFundData.map((t: MutualFundTransaction) => t.schemeName)
                ).size
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MfCard;
