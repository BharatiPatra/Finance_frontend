"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { Users, DollarSign, Activity, ArrowUpRight } from "lucide-react";
import MetricCard from "@/components/dashboard/MetricCard";
import Modal from "@/components/common/Modal"; // Import the Modal component
import CreditCardCollection from "../cardAnimate/CardCollection";
import MutualFundTable from "./MutualfundTable";
import { Summary } from "./types";
import AssetLiabilityPieChart from "./AssetLiability";
import { useApiWithSession } from "../../hooks/useApiWithSession";
import { useUserSession } from "../../contexts/UserSessionContext";
import EpfBalanceTable from "./clickComponent/epfDetails";
import MfCard from "./clickComponent/mfCard";

// You would create these components as needed for other cards
const TotalBalanceDetails: React.FC = () => (
  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
    <h4 className="text-lg font-semibold text-blue-800 mb-3">
      Total Balance Overview
    </h4>
    <p className="text-blue-700">
      This modal shows a detailed breakdown of your total balance across all
      accounts.
    </p>
    <ul className="list-disc list-inside mt-4 text-blue-600">
      <li>Checking Account: $15,000</li>
      <li>Savings Account: $30,000</li>
      <li>Investments: $5,000</li>
    </ul>
  </div>
);

const MonthlyIncomeDetails: React.FC = () => (
  <div className="p-4 bg-green-50 rounded-lg border border-green-200">
    <h4 className="text-lg font-semibold text-green-800 mb-3">
      Monthly Income Sources
    </h4>
    <p className="text-green-700">
      Here's a detailed look at where your monthly income comes from.
    </p>
    <ul className="list-disc list-inside mt-4 text-green-600">
      <li>Salary: $5,000</li>
      <li>Freelance Work: $1,000</li>
      <li>Dividends: $500</li>
    </ul>
  </div>
);

const ExpensesDetails: React.FC = () => (
  <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
    <h4 className="text-lg font-semibold text-orange-800 mb-3">
      Monthly Expense Breakdown
    </h4>
    <p className="text-orange-700">
      Understand where your money is going each month.
    </p>
    <ul className="list-disc list-inside mt-4 text-orange-600">
      <li>Rent: $1,500</li>
      <li>Groceries: $500</li>
      <li>Utilities: $200</li>
      <li>Entertainment: $300</li>
    </ul>
  </div>
);

const Dashboard: React.FC = () => {
  const [summary, setSummary] = useState<Summary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMetricId, setActiveMetricId] = useState<string | null>(null);
  const [modalTitle, setModalTitle] = useState<string>("");
  const { userSession } = useUserSession();

  useEffect(() => {
    // Only fetch if we have session data
    if (!userSession.sessionId) {
      return;
    }
    // const urlWithParams = new URL("http://127.0.0.1:8000/common/summary");
    // urlWithParams.searchParams.append("userId", userSession.userId);
    // urlWithParams.searchParams.append("sessionId", userSession.sessionId);
    // urlWithParams.searchParams.append("mcpSessionId", userSession.mcpSessionId);
    fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/common/summary?userId=${userSession.userId}&sessionId=${userSession.sessionId}&mcpSessionId=${userSession.mcpSessionId}`
    )
      .then((res) => {
        if (!res.ok) throw new Error("Network response was not OK");
        return res.json();
      })
      .then((data: Summary) => setSummary(data))
      .catch((err) => console.error("Failed to load summary:", err));
  }, [userSession]);

  const openMetricModal = (id: string, title: string) => {
    setActiveMetricId(id);
    setModalTitle(title);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setActiveMetricId(null);
    setModalTitle("");
  };

  // Sample mutual fund data (you can replace this with actual data from API)
  const sampleMutualFundData = [
    {
      isinNumber: "INF760K01FC4",
      folioId: "55557777",
      externalOrderType: "BUY",
      transactionDate: "2022-12-31T18:30:00Z",
      purchasePrice: {
        currencyCode: "INR",
        units: "66",
        nanos: 554600000,
      },
      transactionAmount: {
        currencyCode: "INR",
        units: "6655",
        nanos: 460000000,
      },
      transactionUnits: 100,
      transactionMode: "N",
      schemeName: "Canara Robeco Gilt Fund - Regular Plan",
    },
    {
      isinNumber: "INF789FB1S71",
      folioId: "7777711111",
      externalOrderType: "BUY",
      transactionDate: "2022-05-14T18:30:00Z",
      purchasePrice: {
        currencyCode: "INR",
        units: "2923",
        nanos: 506800000,
      },
      transactionAmount: {
        currencyCode: "INR",
        units: "29235",
        nanos: 68000000,
      },
      transactionUnits: 10,
      transactionMode: "N",
      schemeName: "UTI Overnight - Direct Plan",
    },
    {
      isinNumber: "INF109K012B0",
      folioId: "222221111",
      externalOrderType: "BUY",
      transactionDate: "2022-05-10T18:30:00Z",
      purchasePrice: {
        currencyCode: "INR",
        units: "52",
        nanos: 720000000,
      },
      transactionAmount: {
        currencyCode: "INR",
        units: "2636",
      },
      transactionUnits: 50,
      transactionMode: "N",
      schemeName: "ICICI Prudential Balanced Advantage - Direct Plan",
    },
    {
      isinNumber: "INF109K012M7",
      folioId: "1234567",
      externalOrderType: "BUY",
      transactionDate: "2022-03-08T18:30:00Z",
      purchasePrice: {
        currencyCode: "INR",
        units: "165",
        nanos: 718700000,
      },
      transactionAmount: {
        currencyCode: "INR",
        units: "10027",
      },
      transactionUnits: 60.5063,
      transactionMode: "N",
      schemeName: "ICICI Prudential Nifty 50 Index Fund - Direct Plan Growth",
    },
  ];

  // Sample credit card data
  const sampleCreditCardData = [
    {
      subscriberName: "HDFC Bank",
      portfolioType: "I",
      accountType: "01",
      openDate: "20060110",
      highestCreditOrOriginalLoanAmount: "50000",
      accountStatus: "83",
      paymentRating: "5",
      paymentHistoryProfile: "00??????????????????????????????????",
      currentBalance: "5000",
      amountPastDue: "1000",
      dateReported: "20201228",
      occupationCode: "S",
      rateOfInterest: "11.5",
      repaymentTenure: "0",
      dateOfAddition: "20201028",
      currencyCode: "INR",
      accountHolderTypeCode: "1",
    },
    {
      subscriberName: "ICICI Bank",
      portfolioType: "I",
      accountType: "03",
      openDate: "20060122",
      highestCreditOrOriginalLoanAmount: "110000",
      accountStatus: "11",
      paymentRating: "0",
      paymentHistoryProfile: "44??????????????????????????????????",
      currentBalance: "17000",
      amountPastDue: "13000",
      dateReported: "20201228",
      occupationCode: "S",
      rateOfInterest: "8.24",
      repaymentTenure: "0",
      dateOfAddition: "20201028",
      currencyCode: "INR",
      accountHolderTypeCode: "1",
    },
    {
      subscriberName: "Aditya Brila Finance Limited",
      portfolioType: "I",
      accountType: "53",
      openDate: "20060119",
      highestCreditOrOriginalLoanAmount: "95000",
      accountStatus: "78",
      paymentRating: "2",
      paymentHistoryProfile: "33??????????????????????????????????",
      currentBalance: "14000",
      amountPastDue: "10000",
      dateReported: "20201228",
      occupationCode: "N",
      rateOfInterest: "14",
      repaymentTenure: "0",
      dateOfAddition: "20201028",
      currencyCode: "INR",
      accountHolderTypeCode: "1",
    },
    {
      subscriberName: "Bajaj Finance",
      portfolioType: "I",
      accountType: "04",
      openDate: "20060113",
      highestCreditOrOriginalLoanAmount: "65000",
      accountStatus: "11",
      paymentRating: "0",
      paymentHistoryProfile: "11??????????????????????????????????",
      currentBalance: "8000",
      amountPastDue: "0",
      dateReported: "20201228",
      occupationCode: "N",
      repaymentTenure: "0",
      dateOfAddition: "20201028",
      currencyCode: "INR",
      accountHolderTypeCode: "1",
    },
    {
      subscriberName: "Epifi Capital",
      portfolioType: "R",
      accountType: "10",
      openDate: "20060116",
      creditLimitAmount: "500000",
      highestCreditOrOriginalLoanAmount: "80000",
      accountStatus: "82",
      paymentRating: "4",
      paymentHistoryProfile: "22??????????????????????????????????",
      currentBalance: "11000",
      amountPastDue: "7000",
      dateReported: "20201228",
      occupationCode: "N",
      repaymentTenure: "0",
      dateOfAddition: "20201028",
      currencyCode: "INR",
      accountHolderTypeCode: "1",
    },
    {
      subscriberName: "Mannapuram Finance",
      portfolioType: "I",
      accountType: "06",
      openDate: "20060125",
      highestCreditOrOriginalLoanAmount: "125000",
      accountStatus: "71",
      paymentRating: "1",
      paymentHistoryProfile: "55??????????????????????????????????",
      currentBalance: "20000",
      amountPastDue: "16000",
      dateReported: "20201228",
      occupationCode: "N",
      repaymentTenure: "0",
      dateOfAddition: "20201028",
      currencyCode: "INR",
      accountHolderTypeCode: "1",
    },
  ];

  // Function to render the correct component based on activeMetricId
  const renderMetricComponent = () => {
    switch (activeMetricId) {
      case "totalBalance":
        return <TotalBalanceDetails />;
      case "MutualFund":
        return <MfCard transactions={sampleMutualFundData} />;
      case "EPF":
        return <EpfBalanceTable />;
      case "creditCardSpending":
        return (
          <CreditCardCollection credit_card_accounts={sampleCreditCardData} />
        );
      default:
        return (
          <p className="text-gray-600">
            No specific details available for this metric.
          </p>
        );
    }
  };

  // Data for your metric cards
  const metricData = [
    {
      id: "totalBalance",
      title: "Total Net Worth",
      // prefer the aggregated net_worth, if available
      value: summary
        ? `₹${Number(summary.total_net_worth.units).toLocaleString()}`
        : "Loading...",
      icon: <DollarSign className="w-8 h-8 text-blue-500" />,
    },
    {
      id: "MutualFund",
      title: "Mutual Fund",
      value: summary
        ? `₹${summary.total_mutual_fund_value.toLocaleString()}`
        : "Loading...",
      icon: <Activity className="w-8 h-8 text-green-500" />,
    },
    {
      id: "EPF",
      title: "EPF",
      value: summary
        ? `₹${Number(summary.pension_balance).toLocaleString()}`
        : "Loading...",
      icon: <Users className="w-8 h-8 text-orange-500" />,
    },
    {
      id: "creditCardSpending",
      title: "Credit Card Spending",
      value: summary
        ? `₹${Number(summary.total_credit_spending).toLocaleString()}`
        : "Loading...",
      icon: <ArrowUpRight className="w-8 h-8 text-purple-500" />,
    },
  ];

  return (
    <>
      <h2 className="text-3xl font-bold mb-6 p-4 pl-4">Dashboard Overview</h2>
      {/* Grid for metric cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricData.map((m) => (
          <MetricCard
            key={m.id}
            id={m.id}
            title={m.title}
            value={m.value}
            // omit change/changeType if you don't have deltas
            icon={m.icon}
            onClick={(id) => openMetricModal(id, m.title)}
          />
        ))}
      </div>
      {/* Grid for charts and tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className=" p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold  mb-4">
            Assets and Liabilities Breakdown
          </h1>
          <AssetLiabilityPieChart
            total_bank_balance={Number(summary?.total_current_balance) ?? 0}
            total_credit_spending={Number(summary?.total_credit_spending ?? 0)}
            total_mutual_fund_value={Number(
              summary?.total_mutual_fund_value ?? 0
            )}
            total_epf={Number(summary?.pension_balance ?? 0)}
            homeLoan={
              Number(
                summary?.liabilities.find(
                  (l) => l.netWorthAttribute === "LIABILITY_TYPE_HOME_LOAN"
                )?.value.units
              ) || 0
            }
            carLoan={
              Number(
                summary?.liabilities.find(
                  (l) => l.netWorthAttribute === "LIABILITY_TYPE_VEHICLE_LOAN"
                )?.value.units
              ) || 0
            }
            otherLoan={
              Number(
                summary?.liabilities.find(
                  (l) => l.netWorthAttribute === "LIABILITY_TYPE_OTHER_LOAN"
                )?.value.units
              ) || 0
            }
          />
        </div>
        <div className=" p-6 rounded-lg shadow-md">
          <h1 className="text-2xl font-bold mb-4">Mutual Fund Transactions</h1>
          <MutualFundTable data={summary?.mutual_fund || []} />
        </div>
      </div>
      {/* The Modal Component */}
      <Modal isOpen={isModalOpen} onClose={closeModal} title={modalTitle}>
        {renderMetricComponent()} {/* Render the specific component here */}
      </Modal>
    </>
  );
};

export default Dashboard;
