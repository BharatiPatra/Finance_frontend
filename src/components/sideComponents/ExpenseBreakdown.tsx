'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

interface ExpenseBreakdownProps {
  data: Array<{ category: string; amount: number; color: string }>;
}

const ExpenseBreakdown: React.FC<ExpenseBreakdownProps> = ({ data }) => (
  <Card className="p-4 m-2 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
    <div className="mb-2">
      <h3 className="text-xl font-semibold text-gray-800">Expense Breakdown</h3>
      <p className="text-sm text-gray-600">Monthly spending categories</p>
    </div>
    <div className="h-[250px]">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={80}
            paddingAngle={5}
            dataKey="amount"
            nameKey="category"
            label={({ category, percent }) =>
              `${category} ${((percent ?? 0) * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value: number) => [`$${value.toLocaleString()}`, 'Amount']}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  </Card>
);

export default ExpenseBreakdown;
