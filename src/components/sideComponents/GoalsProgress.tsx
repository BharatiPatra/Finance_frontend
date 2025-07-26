'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress'; // Assuming you have a Progress component

export interface Goal {
  label: string;
  value: number;
  current: number;
  total: number;
}

interface GoalsProgressProps {
  goals: Goal[];
}

const GoalsProgress: React.FC<GoalsProgressProps> = ({ goals }) => (
  <Card className="p-4 m-2 bg-white shadow-md rounded-lg hover:shadow-lg transition-shadow duration-200">
    <div className="mb-4">
      <h3 className="text-xl font-semibold text-gray-800">Goals Progress</h3>
      <p className="text-sm text-gray-600">Financial objectives tracking</p>
    </div>
    <div className="space-y-6">
      {goals.map((goal, idx) => {
        const progress = Math.round((goal.current / goal.total) * 100);
        return (
          <div key={idx}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">{goal.label}</span>
              <span className="text-sm text-gray-500">
                {progress}% (${goal.current.toLocaleString()}/{goal.total.toLocaleString()})
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        );
      })}
    </div>
  </Card>
);

export default GoalsProgress;
