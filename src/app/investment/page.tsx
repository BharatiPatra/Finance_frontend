"use client";
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from "@/components/ui/button"




interface PortfolioItem {
  name: string;
  type: string;
  units: number;
  buyPrice: number;
  currentPrice: number;
  pnl: string;
  pnlPct: string;
  dayChange: string;
}

interface FundItem {
  name: string;
  category: string;
  expenseRatio: string;
  aum: string;
  y1: string;
  y3: string;
  y5: string;
  risk: string;
  exitLoad: string;
}

interface LeaderboardItem {
  rank: number;
  name: string;
  category: string;
  return: string;
}

const InvestmentIntelligence = () => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'comparisons' | 'leaderboards'>('portfolio');

  const dummyPortfolio: PortfolioItem[] = [
    { name: 'Reliance Industries', type: 'Stock', units: 100, buyPrice: 2400, currentPrice: 2550, pnl: '+15,000', pnlPct: '+6.25%', dayChange: '+0.5%' },
    { name: 'Axis Bluechip Fund', type: 'MF', units: 500, buyPrice: 45, currentPrice: 48, pnl: '+1,500', pnlPct: '+6.67%', dayChange: '+0.1%' },
    { name: 'Infosys', type: 'Stock', units: 50, buyPrice: 1500, currentPrice: 1450, pnl: '-2,500', pnlPct: '-3.33%', dayChange: '-1.2%' },
  ];

  const dummyFunds: FundItem[] = [
    { name: 'Axis Bluechip Fund', category: 'Large Cap', expenseRatio: '0.5%', aum: '₹35K Cr', y1: '20%', y3: '15%', y5: '12%', risk: 'Moderate', exitLoad: '1%' },
    { name: 'Parag Parikh Flexi Cap', category: 'Flexi Cap', expenseRatio: '0.7%', aum: '₹40K Cr', y1: '25%', y3: '18%', y5: '14%', risk: 'High', exitLoad: '0.5%' },
    { name: 'SBI Nifty 50 Index Fund', category: 'Index', expenseRatio: '0.2%', aum: '₹50K Cr', y1: '18%', y3: '14%', y5: '11%', risk: 'Low', exitLoad: '0%' },
  ];

  const dummyLeaderboard: LeaderboardItem[] = [
    { rank: 1, name: 'Stock X', category: 'Tech', return: '+85%' },
    { rank: 2, name: 'MF Y', category: 'Small Cap', return: '+72%' },
    { rank: 3, name: 'Stock A', category: 'Finance', return: '+60%' },
  ];

  return (
     <div className="p-6">
            <div className="flex border-b border-gray-200 mb-6">
                <button
                    className={`py-2 px-4 text-sm font-medium ${activeTab === 'portfolio' ? 'border-b-2 border-slate-900 text-slate-900' : 'text-gray-600 hover:text-gray-800'}`}
                    onClick={() => setActiveTab('portfolio')}
                >
                    My Portfolio
                </button>
                <button
                    className={`py-2 px-4 text-sm font-medium ${activeTab === 'comparisons' ? 'border-b-2 border-slate-900 text-slate-900' : 'text-gray-600 hover:text-gray-800'}`}
                    onClick={() => setActiveTab('comparisons')}
                >
                    Mutual Fund Comparisons
                </button>
                <button
                    className={`py-2 px-4 text-sm font-medium ${activeTab === 'leaderboards' ? 'border-b-2 border-slate-900 text-slate-900' : 'text-gray-600 hover:text-gray-800'}`}
                    onClick={() => setActiveTab('leaderboards')}
                >
                    Leaderboards
                </button>
            </div>

            {activeTab === 'portfolio' && (
                <div>
                    <Card className="mb-6">
                        <h3 className="text-xl font-semibold mb-3">Overall Portfolio</h3>
                        <div className="grid grid-cols-2 gap-4 text-gray-700">
                            <div>Total Invested: <span className="font-bold">₹10,00,000</span></div>
                            <div>Current Value: <span className="font-bold">₹11,25,000</span></div>
                            <div>P&L: <span className="font-bold text-green-600">+₹1,25,000 (+12.5%)</span></div>
                            <div>Today's Gain/Loss: <span className="font-bold text-green-600">+₹1,500 (+0.13%)</span></div>
                        </div>
                        <div className="h-48 bg-gray-100 rounded-md mt-4 flex items-center justify-center text-gray-500">
                            Portfolio Value Trend Chart Placeholder
                        </div>
                        <p className="text-gray-600 text-sm mt-4">
                            <span className="font-medium">Commentary:</span> Your portfolio has shown consistent growth this quarter, largely driven by strong performance in your Equity Mutual Funds.
                        </p>
                    </Card>

                    <h3 className="text-xl font-semibold mb-3">Your Holdings</h3>
                    <Card>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Units/Qty</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Current Value</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P&L (%)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day's Change (%)</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {dummyPortfolio.map((asset, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{asset.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.type}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{asset.units}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{(asset.units * asset.currentPrice).toLocaleString('en-IN')}</td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${asset.pnl.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{asset.pnlPct}</td>
                                        <td className={`px-6 py-4 whitespace-nowrap text-sm ${asset.dayChange.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>{asset.dayChange}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Button variant="outline" className="text-xs py-1 px-2">View</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </div>
            )}

            {activeTab === 'comparisons' && (
                <div>
                    <Card className="mb-6">
                        <h3 className="text-xl font-semibold mb-3">Compare Mutual Funds</h3>
                        <div className="flex items-center gap-2 mb-4">
                            <input
                                type="text"
                                placeholder="Search & add funds to compare..."
                                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                            <Button variant="secondary"><Plus size={16} /> Add Fund</Button>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center">Axis Bluechip Fund <button className="ml-1 text-blue-600">x</button></span>
                            <span className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full flex items-center">Parag Parikh Flexi Cap <button className="ml-1 text-blue-600">x</button></span>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Metric</th>
                                    {dummyFunds.map((fund, index) => (
                                        <th key={index} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">{fund.name}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Category</td>
                                    {dummyFunds.map((fund, index) => <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fund.category}</td>)}
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Expense Ratio</td>
                                    {dummyFunds.map((fund, index) => <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fund.expenseRatio}</td>)}
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">AUM</td>
                                    {dummyFunds.map((fund, index) => <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fund.aum}</td>)}
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">1-Year Return</td>
                                    {dummyFunds.map((fund, index) => <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{fund.y1}</td>)}
                                </tr>
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Risk Level</td>
                                    {dummyFunds.map((fund, index) => <td key={index} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{fund.risk}</td>)}
                                </tr>
                            </tbody>
                        </table>
                        <div className="h-48 bg-gray-100 rounded-md mt-4 flex items-center justify-center text-gray-500">
                            Performance Comparison Chart Placeholder
                        </div>
                    </Card>
                </div>
            )}

            {activeTab === 'leaderboards' && (
                <div>
                    <h3 className="text-xl font-semibold mb-3">Top Performers (Overall)</h3>
                    <Card>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rank</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asset/Fund Name</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Return (%)</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {dummyLeaderboard.map((item, index) => (
                                    <tr key={index}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.rank}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.category}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-semibold">{item.return}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </Card>
                </div>
            )}
        </div>
  );
};

export default InvestmentIntelligence;
