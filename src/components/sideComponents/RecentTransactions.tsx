'use client';

import React from 'react';
import { Card } from '@/components/ui/card'; // Adjust the import path as needed
interface Transaction {
  symbol: string;
  type: 'buy' | 'sell' | 'dividend';
  amount: number;
  date: string;
  change: string;
}

interface RecentTransactionsProps {
  transactions: Transaction[];
}

const RecentTransactions: React.FC<RecentTransactionsProps> = ({ transactions }) => {
  const getTransactionIcon = (type: string) => {
    switch (type) {
      case 'buy':
        return '↗';
      case 'sell':
        return '↘';
      default:
        return '$';
    }
  };

  const getTransactionStyle = (type: string) => {
    switch (type) {
      case 'buy':
        return 'bg-green-100 text-green-700';
      case 'sell':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-blue-100 text-blue-700';
    }
  };

  return (
    <Card className="p-4 m-2 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Recent Transactions</h3>
        <p className="text-sm text-gray-600">Latest portfolio activity</p>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-2 rounded-lg bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${getTransactionStyle(
                  transaction.type
                )}`}
              >
                {getTransactionIcon(transaction.type)}
              </div>
              <div>
                <p className="text-sm font-medium">{transaction.symbol}</p>
                <p className="text-xs text-gray-500">{transaction.date}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">
                ${transaction.amount.toLocaleString()}
              </p>
              <p className="text-xs text-green-600">{transaction.change}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default RecentTransactions;
