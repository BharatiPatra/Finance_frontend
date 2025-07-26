// app/components/ReportsHealth.tsx or app/reports/page.tsx (based on routing)
'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/card'; // adjust path based on your structure
import {SectionTitle} from '../../components/common/helper';

const ReportsHealth: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'pnl' | 'networth' | 'spending'>('pnl');

  return (
    <div className="p-6">
      <SectionTitle>Visual Reports & Health</SectionTitle>

      <div className="flex border-b border-gray-200 mb-6">
        {['pnl', 'networth', 'spending'].map((tab) => (
          <button
            key={tab}
            className={`py-2 px-4 text-sm font-medium ${
              activeTab === tab
                ? 'border-b-2 border-slate-900 text-slate-900'
                : 'text-gray-600 hover:text-gray-800'
            }`}
            onClick={() => setActiveTab(tab as 'pnl' | 'networth' | 'spending')}
          >
            {tab === 'pnl' && 'P&L Breakdowns'}
            {tab === 'networth' && 'Net Worth Tracker'}
            {tab === 'spending' && 'Spending Insights'}
          </button>
        ))}
      </div>

      {activeTab === 'pnl' && (
        <div>
          <Card className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Income vs. Expenses (Monthly)</h3>
            <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
              Bar Chart: Income vs. Expenses Placeholder
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4 text-gray-700">
              <div>Total Income: <span className="font-bold">₹1,50,000</span></div>
              <div>Total Expenses: <span className="font-bold">₹90,000</span></div>
              <div>Net Savings: <span className="font-bold text-green-600">₹60,000</span></div>
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold mb-3">Expense Categories</h3>
            <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
              Donut Chart: Expense Categories Placeholder
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'networth' && (
        <div>
          <Card className="mb-6">
            <h3 className="text-xl font-semibold mb-3">Net Worth Trend</h3>
            <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
              Line Chart: Net Worth over Time Placeholder
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold mb-3">Assets vs. Liabilities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
                Assets Breakdown Chart Placeholder
              </div>
              <div className="h-48 bg-gray-100 rounded-md flex items-center justify-center text-gray-500">
                Liabilities Breakdown Chart Placeholder
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === 'spending' && (
        <div>
          <Card className="mb-6">
            <h3 className="text-xl font-semibold mb-3">This Month's Spending Overview</h3>
            <p className="text-gray-700 mb-4">
              You spent <span className="font-bold">₹45,670</span> this month. Your top category was <span className="font-bold">Food</span>.
            </p>

            <div className="flex flex-col gap-3">
              <ProgressBar label="Food" value={15000} total={25000} />
              <ProgressBar label="Transport" value={8000} total={20000} />
            </div>
          </Card>

          <Card>
            <h3 className="text-xl font-semibold mb-3">Transaction List</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    {['Date', 'Description', 'Category', 'Amount'].map((head) => (
                      <th
                        key={head}
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        {head}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 text-sm">2025-07-20</td>
                    <td className="px-6 py-4 text-sm">Groceries</td>
                    <td className="px-6 py-4 text-sm">Food</td>
                    <td className="px-6 py-4 text-sm">₹1,200</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm">2025-07-19</td>
                    <td className="px-6 py-4 text-sm">Petrol</td>
                    <td className="px-6 py-4 text-sm">Transport</td>
                    <td className="px-6 py-4 text-sm">₹800</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 text-sm">2025-07-18</td>
                    <td className="px-6 py-4 text-sm">Electricity Bill</td>
                    <td className="px-6 py-4 text-sm">Utilities</td>
                    <td className="px-6 py-4 text-sm">₹2,500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};

export default ReportsHealth;

// Helper Component for ProgressBar
interface ProgressBarProps {
  label: string;
  value: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ label, value, total }) => {
  const percentage = Math.min((value / total) * 100, 100).toFixed(0);
  return (
    <div className="flex items-center">
      <span className="w-24 text-sm text-gray-600">{label}:</span>
      <div className="flex-1 bg-gray-200 rounded-full h-4">
        <div
          className="bg-blue-600 h-4 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="ml-2 text-sm text-gray-700">₹{value.toLocaleString()} / ₹{total.toLocaleString()}</span>
    </div>
  );
};
