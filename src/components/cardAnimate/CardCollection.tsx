import {
  creditCards,
  convertAccountsToCards,
  type CreditCardAccount,
} from "./cardData";
import CardStack from "./CardStack";

interface CreditCardCollectionProps {
  credit_card_accounts?: CreditCardAccount[];
}

export default function CreditCardCollection({
  credit_card_accounts,
}: CreditCardCollectionProps) {
  // Convert real account data to visual card data, or use default cards
  const cards =
    credit_card_accounts && credit_card_accounts.length > 0
      ? convertAccountsToCards(credit_card_accounts)
      : creditCards;

  // Helper function to format currency
  const formatCurrency = (amount: string) => {
    const num = parseFloat(amount);
    return `₹${num.toLocaleString("en-IN")}`;
  };

  // Helper function to format date
  const formatDate = (dateString: string) => {
    if (dateString.length === 8) {
      const year = dateString.substring(0, 4);
      const month = dateString.substring(4, 6);
      const day = dateString.substring(6, 8);
      return `${day}/${month}/${year}`;
    }
    return dateString;
  };

  // Helper function to get account status description
  const getAccountStatus = (status: string) => {
    const statusMap: Record<string, { label: string; color: string }> = {
      "11": { label: "Active", color: "bg-green-900 text-green-300" },
      "71": { label: "Closed", color: "bg-red-900 text-red-300" },
      "78": { label: "Settled", color: "bg-yellow-900 text-yellow-300" },
      "82": { label: "Restructured", color: "bg-blue-900 text-blue-300" },
      "83": { label: "Closed by Consumer", color: "bg-gray-900 text-gray-300" },
    };
    return (
      statusMap[status] || { label: status, color: "bg-gray-900 text-gray-300" }
    );
  };

  // Helper function to get payment rating description
  const getPaymentRating = (rating: string) => {
    const ratingMap: Record<string, { label: string; color: string }> = {
      "0": { label: "Current", color: "bg-green-900 text-green-300" },
      "1": { label: "30 Days", color: "bg-yellow-900 text-yellow-300" },
      "2": { label: "60 Days", color: "bg-orange-900 text-orange-300" },
      "3": { label: "90 Days", color: "bg-red-900 text-red-300" },
      "4": { label: "120 Days", color: "bg-red-900 text-red-300" },
      "5": { label: "150+ Days", color: "bg-red-900 text-red-300" },
    };
    return (
      ratingMap[rating] || { label: rating, color: "bg-gray-900 text-gray-300" }
    );
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-4">
            Your Credit Cards
          </h2>
          <p className="text-gray-400">
            {credit_card_accounts && credit_card_accounts.length > 0
              ? `Showing ${credit_card_accounts.length} active credit card accounts`
              : "Sample credit card display"}
          </p>
        </div>

        <div className="flex justify-center">
          <CardStack cards={cards} />
        </div>

        {/* Detailed Account Table */}
        {credit_card_accounts && credit_card_accounts.length > 0 && (
          <div className="mt-8 bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-6">
              Detailed Account Information
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="text-xs uppercase bg-gray-700 text-gray-300">
                  <tr>
                    <th scope="col" className="px-3 py-3">
                      Bank/Lender
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Account Type
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Open Date
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Credit Limit
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Current Balance
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Past Due
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Payment Rating
                    </th>
                    <th scope="col" className="px-3 py-3">
                      Interest Rate
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {credit_card_accounts.map((account, index) => {
                    const accountStatus = getAccountStatus(
                      account.accountStatus
                    );
                    const paymentRating = getPaymentRating(
                      account.paymentRating
                    );

                    return (
                      <tr
                        key={index}
                        className="border-b border-gray-600 hover:bg-gray-700/50"
                      >
                        <td className="px-3 py-4">
                          <div className="text-white font-medium">
                            {account.subscriberName}
                          </div>
                          <div className="text-xs text-gray-400">
                            Portfolio: {account.portfolioType}
                          </div>
                        </td>
                        <td className="px-3 py-4 text-gray-300">
                          {account.accountType}
                        </td>
                        <td className="px-3 py-4 text-gray-300">
                          {formatDate(account.openDate)}
                        </td>
                        <td className="px-3 py-4 text-white font-medium">
                          {formatCurrency(
                            account.creditLimitAmount ||
                              account.highestCreditOrOriginalLoanAmount
                          )}
                        </td>
                        <td className="px-3 py-4 text-white font-medium">
                          {formatCurrency(account.currentBalance)}
                        </td>
                        <td className="px-3 py-4">
                          <span
                            className={`font-medium ${
                              parseFloat(account.amountPastDue) > 0
                                ? "text-red-400"
                                : "text-green-400"
                            }`}
                          >
                            {formatCurrency(account.amountPastDue)}
                          </span>
                        </td>
                        <td className="px-3 py-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${accountStatus.color}`}
                          >
                            {accountStatus.label}
                          </span>
                        </td>
                        <td className="px-3 py-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${paymentRating.color}`}
                          >
                            {paymentRating.label}
                          </span>
                        </td>
                        <td className="px-3 py-4 text-gray-300">
                          {account.rateOfInterest
                            ? `${account.rateOfInterest}%`
                            : "N/A"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Account Summary - Moved to Bottom */}
        {credit_card_accounts && credit_card_accounts.length > 0 && (
          <div className="mt-8 bg-gray-800 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-white mb-6">
              Account Summary
            </h3>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">Total Credit Limit</p>
                <p className="text-2xl font-bold text-white">
                  ₹
                  {credit_card_accounts
                    .reduce(
                      (sum, acc) =>
                        sum +
                        parseFloat(
                          acc.creditLimitAmount ||
                            acc.highestCreditOrOriginalLoanAmount
                        ),
                      0
                    )
                    .toLocaleString("en-IN")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">Total Outstanding</p>
                <p className="text-2xl font-bold text-white">
                  ₹
                  {credit_card_accounts
                    .reduce(
                      (sum, acc) => sum + parseFloat(acc.currentBalance),
                      0
                    )
                    .toLocaleString("en-IN")}
                </p>
              </div>
              <div className="text-center">
                <p className="text-gray-400 text-sm mb-2">Total Past Due</p>
                <p
                  className={`text-2xl font-bold ${
                    credit_card_accounts.reduce(
                      (sum, acc) => sum + parseFloat(acc.amountPastDue),
                      0
                    ) > 0
                      ? "text-red-400"
                      : "text-green-400"
                  }`}
                >
                  ₹
                  {credit_card_accounts
                    .reduce(
                      (sum, acc) => sum + parseFloat(acc.amountPastDue),
                      0
                    )
                    .toLocaleString("en-IN")}
                </p>
              </div>
            </div>

            {/* Credit Utilization Progress Bar */}
            <div className="bg-gray-700/50 rounded-lg p-6">
              <div className="flex justify-between items-center mb-4">
                <h4 className="text-lg font-semibold text-white">
                  Credit Utilization
                </h4>
                <span className="text-white text-lg font-bold">
                  {(() => {
                    const totalLimit = credit_card_accounts.reduce(
                      (sum, acc) =>
                        sum +
                        parseFloat(
                          acc.creditLimitAmount ||
                            acc.highestCreditOrOriginalLoanAmount
                        ),
                      0
                    );
                    const totalBalance = credit_card_accounts.reduce(
                      (sum, acc) => sum + parseFloat(acc.currentBalance),
                      0
                    );
                    return totalLimit > 0
                      ? ((totalBalance / totalLimit) * 100).toFixed(1)
                      : 0;
                  })()}
                  %
                </span>
              </div>

              <div className="w-full bg-gray-600 rounded-full h-4 mb-4">
                <div
                  className={`h-4 rounded-full transition-all duration-500 ${(() => {
                    const totalLimit = credit_card_accounts.reduce(
                      (sum, acc) =>
                        sum +
                        parseFloat(
                          acc.creditLimitAmount ||
                            acc.highestCreditOrOriginalLoanAmount
                        ),
                      0
                    );
                    const totalBalance = credit_card_accounts.reduce(
                      (sum, acc) => sum + parseFloat(acc.currentBalance),
                      0
                    );
                    const utilization =
                      totalLimit > 0 ? (totalBalance / totalLimit) * 100 : 0;

                    if (utilization > 80) return "bg-red-500";
                    if (utilization > 60) return "bg-yellow-500";
                    if (utilization > 30) return "bg-blue-500";
                    return "bg-green-500";
                  })()}`}
                  style={{
                    width: `${Math.min(
                      (() => {
                        const totalLimit = credit_card_accounts.reduce(
                          (sum, acc) =>
                            sum +
                            parseFloat(
                              acc.creditLimitAmount ||
                                acc.highestCreditOrOriginalLoanAmount
                            ),
                          0
                        );
                        const totalBalance = credit_card_accounts.reduce(
                          (sum, acc) => sum + parseFloat(acc.currentBalance),
                          0
                        );
                        return totalLimit > 0
                          ? (totalBalance / totalLimit) * 100
                          : 0;
                      })(),
                      100
                    )}%`,
                  }}
                ></div>
              </div>

              {/* Utilization Guidelines */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-gray-300">Excellent (0-30%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-gray-300">Good (30-60%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="text-gray-300">Fair (60-80%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-gray-300">Poor (80%+)</span>
                </div>
              </div>

              {/* Additional Insights */}
              <div className="mt-6 pt-4 border-t border-gray-600">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 mb-1">Available Credit</p>
                    <p className="text-white font-medium">
                      ₹
                      {(() => {
                        const totalLimit = credit_card_accounts.reduce(
                          (sum, acc) =>
                            sum +
                            parseFloat(
                              acc.creditLimitAmount ||
                                acc.highestCreditOrOriginalLoanAmount
                            ),
                          0
                        );
                        const totalBalance = credit_card_accounts.reduce(
                          (sum, acc) => sum + parseFloat(acc.currentBalance),
                          0
                        );
                        return (totalLimit - totalBalance).toLocaleString(
                          "en-IN"
                        );
                      })()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-1">Active Accounts</p>
                    <p className="text-white font-medium">
                      {
                        credit_card_accounts.filter(
                          (acc) => acc.accountStatus === "11"
                        ).length
                      }{" "}
                      of {credit_card_accounts.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
