'use client'

import { useState, useMemo } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar } from 'recharts'
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, ArrowUpRight, ArrowDownRight, Eye, MessageCircle, Heart, Share } from 'lucide-react'

// Mock data for charts
const monthlyData = [
  { month: 'Jan', value: 42000, income: 5200, expenses: 3800 },
  { month: 'Feb', value: 45000, income: 5500, expenses: 4000 },
  { month: 'Mar', value: 44000, income: 5300, expenses: 4200 },
  { month: 'Apr', value: 48000, income: 6000, expenses: 4100 },
  { month: 'May', value: 49000, income: 6200, expenses: 4300 },
  { month: 'Jun', value: 50000, income: 6500, expenses: 4200 }
]

const portfolioData = [
  { name: 'Stocks', value: 20000, color: '#3B82F6' },
  { name: 'Bonds', value: 15000, color: '#10B981' },
  { name: 'Real Estate', value: 10000, color: '#F59E0B' },
  { name: 'Cash', value: 5000, color: '#EF4444' }
]

const expenseData = [
  { category: 'Housing', amount: 1500, color: '#8B5CF6' },
  { category: 'Food', amount: 800, color: '#06B6D4' },
  { category: 'Transportation', amount: 600, color: '#84CC16' },
  { category: 'Entertainment', amount: 400, color: '#F97316' },
  { category: 'Healthcare', amount: 300, color: '#EC4899' },
  { category: 'Other', value: 400, color: '#6B7280' }
]

const performanceData = [
  { period: '1W', value: 2.5 },
  { period: '1M', value: 8.2 },
  { period: '3M', value: 15.6 },
  { period: '6M', value: 23.4 },
  { period: '1Y', value: 35.8 }
]

const userProfiles = [
  { name: 'Sarah Johnson', role: 'Portfolio Manager', avatar: '/api/placeholder/40/40', status: 'online', netWorth: '$1.2M' },
  { name: 'Mike Chen', role: 'Financial Advisor', avatar: '/api/placeholder/40/40', status: 'away', netWorth: '$890K' },
  { name: 'Emily Davis', role: 'Investment Analyst', avatar: '/api/placeholder/40/40', status: 'online', netWorth: '$750K' },
  { name: 'David Wilson', role: 'Risk Manager', avatar: '/api/placeholder/40/40', status: 'offline', netWorth: '$950K' }
]

const recentTransactions = [
  { id: 1, type: 'buy', symbol: 'AAPL', amount: 2500, date: '2025-06-15', change: '+2.3%' },
  { id: 2, type: 'sell', symbol: 'GOOGL', amount: 1800, date: '2025-06-14', change: '+1.8%' },
  { id: 3, type: 'buy', symbol: 'TSLA', amount: 3200, date: '2025-06-13', change: '+4.2%' },
  { id: 4, type: 'dividend', symbol: 'MSFT', amount: 450, date: '2025-06-12', change: '+0.8%' }
]

export default function Home() {
  const [selectedMetric, setSelectedMetric] = useState('networth')
  
  const totalPortfolioValue = portfolioData.reduce((sum, item) => sum + item.value, 0)
  const netWorth = 50000
  const monthlyChange = 8.2
  const yearlyGrowth = 23.4

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-border rounded-lg shadow-lg">
          <p className="text-sm font-medium">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.dataKey}: ${entry.value?.toLocaleString()}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Welcome to PI MCF</h1>
              <p className="text-sm text-muted-foreground">Financial Management Dashboard</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Net Worth</p>
                <p className="text-2xl font-bold text-foreground">${netWorth.toLocaleString()}.00</p>
              </div>
              <Avatar className="h-10 w-10">
                <AvatarImage src="/api/placeholder/40/40" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column - Main Charts */}
          <div className="lg:col-span-8 space-y-6">
            {/* Key Metrics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Balance</p>
                    <p className="text-2xl font-bold">${netWorth.toLocaleString()}</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +{monthlyChange}%
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-500" />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Income</p>
                    <p className="text-2xl font-bold">$6,500</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +12.5%
                    </p>
                  </div>
                  <Activity className="w-8 h-8 text-green-500" />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Expenses</p>
                    <p className="text-2xl font-bold">$4,200</p>
                    <p className="text-xs text-red-600 flex items-center">
                      <TrendingDown className="w-3 h-3 mr-1" />
                      -3.2%
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-orange-500" />
                </div>
              </Card>

              <Card className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Savings Rate</p>
                    <p className="text-2xl font-bold">35.4%</p>
                    <p className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +2.1%
                    </p>
                  </div>
                  <ArrowUpRight className="w-8 h-8 text-purple-500" />
                </div>
              </Card>
            </div>

            {/* Net Worth Trend Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Net Worth Trend</CardTitle>
                <CardDescription>Your financial journey over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={monthlyData}>
                      <defs>
                        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#666" />
                      <YAxis stroke="#666" tickFormatter={(value) => `$${value/1000}K`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#3B82F6"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorValue)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Income vs Expenses */}
            <Card>
              <CardHeader>
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>Monthly cash flow analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="month" stroke="#666" />
                      <YAxis stroke="#666" tickFormatter={(value) => `$${value/1000}K`} />
                      <Tooltip content={<CustomTooltip />} />
                      <Legend />
                      <Bar dataKey="income" fill="#10B981" name="Income" />
                      <Bar dataKey="expenses" fill="#EF4444" name="Expenses" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            {/* Portfolio Allocation */}
            <Card>
              <CardHeader>
                <CardTitle>Portfolio Allocation</CardTitle>
                <CardDescription>Asset distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[250px] mb-4">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={portfolioData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {portfolioData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => [`$${value.toLocaleString()}`, 'Value']}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-2">
                  {portfolioData.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: item.color }}
                        />
                        <span className="text-sm">{item.name}</span>
                      </div>
                      <span className="text-sm font-medium">${item.value.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Performance Metrics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance</CardTitle>
                <CardDescription>Growth across different periods</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {performanceData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{item.period}</span>
                    <div className="flex items-center">
                      <span className="text-sm font-medium text-green-600">+{item.value}%</span>
                      <TrendingUp className="w-3 h-3 ml-1 text-green-600" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Team Members */}
            <Card>
              <CardHeader>
                <CardTitle>Team Members</CardTitle>
                <CardDescription>Financial advisory team</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {userProfiles.map((user, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>{user.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        user.status === 'online' ? 'bg-green-500' : 
                        user.status === 'away' ? 'bg-yellow-500' : 'bg-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">{user.name}</p>
                      <p className="text-xs text-muted-foreground">{user.role}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {user.netWorth}
                    </Badge>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Transactions</CardTitle>
                <CardDescription>Latest portfolio activity</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentTransactions.map((transaction, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                    <div className="flex items-center space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${
                        transaction.type === 'buy' ? 'bg-green-100 text-green-700' :
                        transaction.type === 'sell' ? 'bg-red-100 text-red-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        {transaction.type === 'buy' ? '↗' : 
                         transaction.type === 'sell' ? '↘' : '$'}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{transaction.symbol}</p>
                        <p className="text-xs text-muted-foreground">{transaction.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">${transaction.amount.toLocaleString()}</p>
                      <p className="text-xs text-green-600">{transaction.change}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom Section - Additional Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Expense Breakdown</CardTitle>
              <CardDescription>Monthly spending categories</CardDescription>
            </CardHeader>
            <CardContent>
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
                      label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, 'Amount']} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Goals Progress</CardTitle>
              <CardDescription>Financial objectives tracking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Emergency Fund</span>
                  <span className="text-sm text-muted-foreground">80% ($8,000/$10,000)</span>
                </div>
                <Progress value={80} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Retirement Savings</span>
                  <span className="text-sm text-muted-foreground">65% ($65,000/$100,000)</span>
                </div>
                <Progress value={65} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">House Down Payment</span>
                  <span className="text-sm text-muted-foreground">45% ($22,500/$50,000)</span>
                </div>
                <Progress value={45} className="h-2" />
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Investment Portfolio</span>
                  <span className="text-sm text-muted-foreground">92% ($46,000/$50,000)</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>