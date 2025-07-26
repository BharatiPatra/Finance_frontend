'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { PortfolioItem } from './types';

interface PortfolioAllocationProps {
  data: PortfolioItem[];
}

const PortfolioAllocation: React.FC<PortfolioAllocationProps> = ({ data }) => {
  return (
    <Card className="p-4 m-2 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Portfolio Allocation</h3>
        <p className="text-sm text-gray-600">Asset distribution</p>
      </div>

      <div className="h-[250px] mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => [
                `$${value.toLocaleString()}`,
                'Value',
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm">{item.name}</span>
            </div>
            <span className="text-sm font-medium">
              ${item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PortfolioAllocation;
