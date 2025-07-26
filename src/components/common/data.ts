// Mock data for charts
import {Home,Utensils,Car,ShoppingCart,  Gamepad2,
  CreditCard,
} from "lucide-react"
const monthlyData = [
  { month: "Jan", value: 42000, income: 5200, expenses: 3800 },
  { month: "Feb", value: 45000, income: 5500, expenses: 4000 },
  { month: "Mar", value: 44000, income: 5300, expenses: 4200 },
  { month: "Apr", value: 48000, income: 6000, expenses: 4100 },
  { month: "May", value: 49000, income: 6200, expenses: 4300 },
  { month: "Jun", value: 50000, income: 6500, expenses: 4200 },
];

const portfolioData = [
  { name: "Stocks", value: 20000, color: "#3B82F6" },
  { name: "Bonds", value: 15000, color: "#10B981" },
  { name: "Real Estate", value: 10000, color: "#F59E0B" },
  { name: "Cash", value: 5000, color: "#EF4444" },
];

const expenseData = [
  { category: "Housing", amount: 1500, color: "#8B5CF6" },
  { category: "Food", amount: 800, color: "#06B6D4" },
  { category: "Transportation", amount: 600, color: "#84CC16" },
  { category: "Entertainment", amount: 400, color: "#F97316" },
  { category: "Healthcare", amount: 300, color: "#EC4899" },
  { category: "Other", amount: 400, color: "#6B7280" },
];

const performanceData = [
  { period: "1W", value: 2.5 },
  { period: "1M", value: 8.2 },
  { period: "3M", value: 15.6 },
  { period: "6M", value: 23.4 },
  { period: "1Y", value: 35.8 },
];

// New performance graph data
const performanceGraphData = [
  { period: "Jan", portfolio: 5.2, market: 4.1, benchmark: 3.8 },
  { period: "Feb", portfolio: 8.5, market: 6.2, benchmark: 5.1 },
  { period: "Mar", portfolio: 12.8, market: 9.8, benchmark: 8.5 },
  { period: "Apr", portfolio: 18.2, market: 14.5, benchmark: 12.2 },
  { period: "May", portfolio: 25.6, market: 19.8, benchmark: 17.1 },
  { period: "Jun", portfolio: 35.8, market: 26.4, benchmark: 23.1 },
];

// Community posts data
const communityPosts = [
  {
    id: 1,
    author: "Sarah Mitchell",
    avatar: "/api/placeholder/40/40",
    title: "Best ETFs for Long-term Investment in 2025",
    content:
      "After analyzing market trends, I recommend VTI, SCHB, and SPDW for diversified exposure...",
    likes: 24,
    comments: 8,
    time: "2 hours ago",
    category: "Investment",
  },
  {
    id: 2,
    author: "Mike Thompson",
    avatar: "/api/placeholder/40/40",
    title: "Emergency Fund: How Much is Enough?",
    content:
      "Financial experts suggest 6-8 months of expenses, but in volatile times, consider 12 months...",
    likes: 18,
    comments: 12,
    time: "4 hours ago",
    category: "Savings",
  },
  {
    id: 3,
    author: "Emily Chen",
    avatar: "/api/placeholder/40/40",
    title: "Tax Optimization Strategies for 2025",
    content:
      "Maximize your 401k, consider Roth conversions, and don't forget about HSA contributions...",
    likes: 31,
    comments: 15,
    time: "6 hours ago",
    category: "Tax Planning",
  },
  {
    id: 4,
    author: "David Rodriguez",
    avatar: "/api/placeholder/40/40",
    title: "Real Estate vs Stock Market: 2025 Analysis",
    content:
      "With current interest rates and market conditions, here's my analysis of both investment options...",
    likes: 42,
    comments: 23,
    time: "8 hours ago",
    category: "Analysis",
  },
];

// Financial news/tips
const financialTips = [
  {
    title: "Market Update: Tech Stocks Rally",
    description: "Major tech indices up 3.2% this week",
    time: "1 hour ago",
    type: "news",
  },
  {
    title: "Tip: Automate Your Investments",
    description:
      "Set up recurring investments to benefit from dollar-cost averaging",
    time: "3 hours ago",
    type: "tip",
  },
];


const userProfiles = [
  {
    name: "Sarah Johnson",
    role: "Portfolio Manager",
    avatar: "/api/placeholder/40/40",
    status: "online",
    netWorth: "$1.2M",
  },
  {
    name: "Mike Chen",
    role: "Financial Advisor",
    avatar: "/api/placeholder/40/40",
    status: "away",
    netWorth: "$890K",
  },
  {
    name: "Emily Davis",
    role: "Investment Analyst",
    avatar: "/api/placeholder/40/40",
    status: "online",
    netWorth: "$750K",
  },
  {
    name: "David Wilson",
    role: "Risk Manager",
    avatar: "/api/placeholder/40/40",
    status: "offline",
    netWorth: "$950K",
  },
];

const recentTransactions = [
  {
    id: 1,
    type: "buy",
    symbol: "AAPL",
    amount: 2500,
    date: "2025-06-15",
    change: "+2.3%",
  },
  {
    id: 2,
    type: "sell",
    symbol: "GOOGL",
    amount: 1800,
    date: "2025-06-14",
    change: "+1.8%",
  },
  {
    id: 3,
    type: "buy",
    symbol: "TSLA",
    amount: 3200,
    date: "2025-06-13",
    change: "+4.2%",
  },
  {
    id: 4,
    type: "dividend",
    symbol: "MSFT",
    amount: 450,
    date: "2025-06-12",
    change: "+0.8%",
  },
];
const categories = [
  {
    name: "Housing",
    icon: Home,
    spent: 2400,
    budget: 2500,
    percentage: 96,
    trend: "up",
    trendValue: 5.2,
    color: "bg-blue-500",
  },
  {
    name: "Food & Dining",
    icon: Utensils,
    spent: 890,
    budget: 800,
    percentage: 111,
    trend: "up",
    trendValue: 12.3,
    color: "bg-green-500",
  },
  {
    name: "Transportation",
    icon: Car,
    spent: 650,
    budget: 700,
    percentage: 93,
    trend: "down",
    trendValue: 8.1,
    color: "bg-yellow-500",
  },
  {
    name: "Shopping",
    icon: ShoppingCart,
    spent: 420,
    budget: 300,
    percentage: 140,
    trend: "up",
    trendValue: 25.6,
    color: "bg-purple-500",
  },
  {
    name: "Entertainment",
    icon: Gamepad2,
    spent: 280,
    budget: 250,
    percentage: 112,
    trend: "up",
    trendValue: 15.4,
    color: "bg-pink-500",
  },
  {
    name: "Utilities",
    icon: CreditCard,
    spent: 180,
    budget: 200,
    percentage: 90,
    trend: "down",
    trendValue: 3.2,
    color: "bg-orange-500",
  },
]
export {
  monthlyData,
  portfolioData,
  expenseData,
  performanceData,
  performanceGraphData,
  communityPosts,
  financialTips,
  userProfiles,
  recentTransactions,
  categories
};  