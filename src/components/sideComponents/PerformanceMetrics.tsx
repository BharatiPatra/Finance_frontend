'use client';

import React from 'react';
import { Card } from '@/components/ui/card'; 
import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
} from 'recharts';
import { TrendingUp } from 'lucide-react';

interface PerformanceGraphData {
  period: string;
  portfolio: number;
  market: number;
  benchmark: number;
}

interface PerformanceData {
  period: string;
  value: number;
}

interface PerformanceMetricsProps {
  graphData: PerformanceGraphData[];
  performanceData: PerformanceData[];
}

const PerformanceMetrics: React.FC<PerformanceMetricsProps> = ({
  graphData,
  performanceData,
}) => {
  return (
    <Card className="p-4 m-2 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-800">Performance</h3>
        <p className="text-sm text-gray-600">
          Portfolio performance vs market
        </p>
      </div>

      <div className="h-[200px] mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={graphData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis dataKey="period" stroke="#666" />
            <YAxis stroke="#666" tickFormatter={(value) => `${value}%`} />
            <Tooltip
              formatter={(value: number, name: string) => [
                `${value}%`,
                name === 'portfolio'
                  ? 'Your Portfolio'
                  : name === 'market'
                  ? 'Market Average'
                  : 'Benchmark',
              ]}
              labelFormatter={(label) => `Period: ${label}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="portfolio"
              stroke="#3B82F6"
              strokeWidth={2}
              name="Your Portfolio"
              dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
            />
            <Line
              type="monotone"
              dataKey="market"
              stroke="#10B981"
              strokeWidth={2}
              name="Market Average"
              strokeDasharray="5 5"
            />
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke="#EF4444"
              strokeWidth={2}
              name="Benchmark"
              strokeDasharray="3 3"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        {performanceData.map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm text-gray-500">{item.period}</span>
            <div className="flex items-center">
              <span className="text-sm font-medium text-green-600">
                +{item.value}%
              </span>
              <TrendingUp className="w-3 h-3 ml-1 text-green-600" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default PerformanceMetrics;
