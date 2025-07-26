'use client';

import React, { useState } from 'react';
import { DollarSign, CreditCard, TrendingUp, Bell } from 'lucide-react';
import { SectionTitle } from '../../components/common/helper';
import { Button } from "@/components/ui/button"
import { Card } from '@/components/ui/card';


type AlertType = 'SIP' | 'Tax' | 'Investment' | 'Bill';

type Alert = {
  id: number;
  type: AlertType;
  title: string;
  details: string;
  status: 'Upcoming' | 'Active' | 'Dismissed';
};

const SmartAlert: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history' | 'settings'>('upcoming');

  const dummyAlerts: Alert[] = [
    { id: 1, type: 'SIP', title: 'SIP Due: Axis Bluechip Fund', details: '₹5,000 on July 25, 2025', status: 'Upcoming' },
    { id: 2, type: 'Tax', title: 'Income Tax Filing Deadline Approaching', details: 'Deadline: August 31, 2025', status: 'Upcoming' },
    { id: 3, type: 'Investment', title: 'Investment Price Drop Alert', details: 'Reliance Industries shares dropped by 3% today.', status: 'Active' },
    { id: 4, type: 'Bill', title: 'Credit Card Bill Due', details: '₹12,500 on September 5, 2025', status: 'Upcoming' },
  ];

  return (
    <div className="p-6">
      <SectionTitle>Smart Alerts</SectionTitle>

      <div className="flex border-b border-gray-200 mb-6">
        {['upcoming', 'history', 'settings'].map(tab => (
          <button
            key={tab}
            className={`py-2 px-4 text-sm font-medium ${activeTab === tab ? 'border-b-2 border-slate-900 text-slate-900' : 'text-gray-600 hover:text-gray-800'}`}
            onClick={() => setActiveTab(tab as typeof activeTab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'upcoming' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dummyAlerts
            .filter(alert => alert.status === 'Upcoming' || alert.status === 'Active')
            .map(alert => (
              <Card key={alert.id}>
                <div className="flex items-center mb-2">
                  {alert.type === 'SIP' && <DollarSign size={20} className="text-blue-600 mr-2" />}
                  {alert.type === 'Tax' && <CreditCard size={20} className="text-green-600 mr-2" />}
                  {alert.type === 'Investment' && <TrendingUp size={20} className="text-red-600 mr-2" />}
                  {alert.type === 'Bill' && <Bell size={20} className="text-purple-600 mr-2" />}
                  <h3 className="font-semibold text-gray-800">{alert.title}</h3>
                </div>
                <p className="text-sm text-gray-600 mb-3">{alert.details}</p>
                <div className="flex gap-2">
                  <Button variant="outline" className="text-xs py-1 px-2">Action</Button>
                  <Button variant="secondary" className="text-xs py-1 px-2">Dismiss</Button>
                </div>
              </Card>
            ))}
        </div>
      )}

      {activeTab === 'settings' && (
        <Card>
          <h3 className="text-xl font-semibold mb-4">Notification Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label htmlFor="email-alerts" className="text-gray-700">Email Alerts</label>
              <input type="checkbox" id="email-alerts" className="toggle toggle-primary" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <label htmlFor="inapp-alerts" className="text-gray-700">In-App Notifications</label>
              <input type="checkbox" id="inapp-alerts" className="toggle toggle-primary" defaultChecked />
            </div>

            <h4 className="font-semibold mt-6 mb-3">Alert Customization</h4>
            <div className="space-y-3">
              <div>
                <label htmlFor="sip-reminders" className="text-gray-700 block mb-1">SIP Reminders</label>
                <select id="sip-reminders" className="p-2 border rounded-lg w-full">
                  <option>7 days before</option>
                  <option>3 days before</option>
                  <option>On due date</option>
                </select>
              </div>
              <div>
                <label htmlFor="price-drop" className="text-gray-700 block mb-1">Investment Price Drop Alert (%)</label>
                <input type="number" id="price-drop" defaultValue={3} className="p-2 border rounded-lg w-full" />
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default SmartAlert;
