'use client';

import React from 'react';
import { Card } from '@/components/ui/card'; // Adjust the import path as needed
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import {
  portfolioData,
  expenseData,
  performanceGraphData,
  performanceData,
  userProfiles,
  recentTransactions,
} from '../common/data';

import TeamMembers from './TeamMembers';
import RecentTransactions from './RecentTransactions';
import PerformanceMetrics from './PerformanceMetrics';
import PortfolioAllocation from './PortfolioAllocation';
import GoalsProgress from './GoalsProgress';

const SideComponent: React.FC = () => {
  return (
    <>
      {/* Portfolio Allocation */}
      <PortfolioAllocation data={portfolioData} />

      {/* Performance Metrics */}
      <PerformanceMetrics
        graphData={performanceGraphData}
        performanceData={performanceData}
      />

      {/* Team Members and Recent Transactions side-by-side */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Team Members */}
        <TeamMembers members={userProfiles} />

        {/* Recent Transactions */}
        <RecentTransactions transactions={recentTransactions} />
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6 ">
        {/* Expense Breakdown */}
        <Card>
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-800">
              Expense Breakdown
            </h3>
            <p className="text-sm text-gray-600">
              Monthly spending categories
            </p>
          </div>
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={expenseData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="amount"
                  label={({ name, percent }) =>
                    `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                  }
                >
                  {expenseData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString()}`,
                    'Amount',
                  ]}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Goals Progress */}
        <GoalsProgress
          goals={[
            { label: 'Emergency Fund', value: 80, current: 8000, total: 10000 },
            {
              label: 'Retirement Savings',
              value: 65,
              current: 65000,
              total: 100000,
            },
            {
              label: 'House Down Payment',
              value: 45,
              current: 22500,
              total: 50000,
            },
            {
              label: 'Investment Portfolio',
              value: 92,
              current: 46000,
              total: 50000,
            },
          ]}
        />
      </div>
    </>
  );
};

export default SideComponent;
