import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface EPFEstablishment {
  est_name: string;
  member_id: string;
  office: string;
  doj_epf: string;
  doe_epf: string;
  doe_eps: string;
  pf_balance: {
    net_balance: string;
    employee_share: {
      credit: string;
      balance?: string;
    };
    employer_share: {
      credit: string;
      balance?: string;
    };
  };
}

interface EPFData {
  uanAccounts: Array<{
    phoneNumber: any;
    rawDetails: {
      est_details: EPFEstablishment[];
      overall_pf_balance: {
        pension_balance: string;
        current_pf_balance: string;
        employee_share_total: {
          credit: string;
          balance: string;
        };
      };
    };
  }>;
}

const EpfBalanceTable: React.FC = () => {
  const [epfData, setEpfData] = useState<EPFData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Use sample data for now
    const sampleEPFData: EPFData = {
      uanAccounts: [
        {
          phoneNumber: {},
          rawDetails: {
            est_details: [
              {
                est_name: "KARZA TECHNOLOGIES PRIVATE LIMITED",
                member_id: "MHBANXXXXXXXXXXXXXXXXX",
                office: "(RO)BANDRA(MUMBAI-I)",
                doj_epf: "24-03-2021",
                doe_epf: "02-01-2022",
                doe_eps: "02-01-2022",
                pf_balance: {
                  net_balance: "200000",
                  employee_share: {
                    credit: "100000",
                    balance: "100000",
                  },
                  employer_share: {
                    credit: "100000",
                    balance: "100000",
                  },
                },
              },
              {
                est_name: "TSS CONSULTANCY PRIVATE LIMITED",
                member_id: "MHBAN*****************",
                office: "(RO)BANDRA(MUMBAI-I)",
                doj_epf: "07-08-2018",
                doe_epf: "02-01-2022",
                doe_eps: "02-01-2022",
                pf_balance: {
                  net_balance: "11111",
                  employee_share: {
                    credit: "5000",
                  },
                  employer_share: {
                    credit: "5000",
                  },
                },
              },
            ],
            overall_pf_balance: {
              pension_balance: "1000000",
              current_pf_balance: "211111",
              employee_share_total: {
                credit: "1111",
                balance: "11111",
              },
            },
          },
        },
      ],
    };

    // Simulate loading
    setTimeout(() => {
      setEpfData(sampleEPFData);
      setLoading(false);
    }, 500);
  }, []);

  const formatCurrency = (amount: string) => {
    return `₹${parseFloat(amount).toLocaleString("en-IN")}`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="text-white">Loading EPF data...</div>
      </div>
    );
  }

  if (!epfData || !epfData.uanAccounts || epfData.uanAccounts.length === 0) {
    return (
      <div className="p-4 text-center text-gray-400">
        <p>No EPF data available</p>
      </div>
    );
  }

  const uanAccount = epfData.uanAccounts[0];
  const { est_details, overall_pf_balance } = uanAccount.rawDetails;

  return (
    <div className="w-full space-y-6">
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-white mb-2">
          EPF Account Details
        </h3>
        <p className="text-gray-400">
          Complete overview of your Provident Fund
        </p>
      </div>

      {/* Overall PF Balance Summary */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h4 className="text-lg font-semibold text-white mb-4">
          Overall PF Balance
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <p className="text-gray-400 text-sm mb-1">Pension Balance</p>
            <p className="text-2xl font-bold text-blue-400">
              {formatCurrency(overall_pf_balance.pension_balance)}
            </p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <p className="text-gray-400 text-sm mb-1">Current PF Balance</p>
            <p className="text-2xl font-bold text-green-400">
              {formatCurrency(overall_pf_balance.current_pf_balance)}
            </p>
          </div>
          <div className="bg-gray-700/50 rounded-lg p-4 text-center">
            <p className="text-gray-400 text-sm mb-1">Employee Share Total</p>
            <p className="text-2xl font-bold text-yellow-400">
              {formatCurrency(overall_pf_balance.employee_share_total.balance)}
            </p>
          </div>
        </div>
      </div>

      {/* Establishment Details */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h4 className="text-lg font-semibold text-white mb-4">
          Establishment Details
        </h4>
        <div className="space-y-6">
          {est_details.map((establishment, index) => (
            <div
              key={index}
              className="bg-gray-700/30 rounded-lg p-5 border border-gray-600"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Company Information */}
                <div>
                  <h5 className="text-white font-medium mb-3">
                    {establishment.est_name}
                  </h5>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Member ID:</span>
                      <span className="text-gray-300">
                        {establishment.member_id}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Office:</span>
                      <span className="text-gray-300">
                        {establishment.office}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">DOJ EPF:</span>
                      <span className="text-gray-300">
                        {establishment.doj_epf}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">DOE EPF:</span>
                      <span className="text-gray-300">
                        {establishment.doe_epf}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">DOE EPS:</span>
                      <span className="text-gray-300">
                        {establishment.doe_eps}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Balance Information */}
                <div>
                  <h6 className="text-white font-medium mb-3">
                    PF Balance Details
                  </h6>
                  <div className="space-y-3">
                    <div className="bg-gray-600/50 rounded p-3">
                      <p className="text-gray-400 text-xs mb-1">Net Balance</p>
                      <p className="text-white font-medium">
                        {formatCurrency(establishment.pf_balance.net_balance)}
                      </p>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-green-900/20 rounded p-3 border border-green-700/30">
                        <p className="text-green-400 text-xs mb-1">
                          Employee Share
                        </p>
                        <p className="text-white text-sm font-medium">
                          {formatCurrency(
                            establishment.pf_balance.employee_share.credit
                          )}
                        </p>
                        {establishment.pf_balance.employee_share.balance && (
                          <p className="text-green-300 text-xs">
                            Balance:{" "}
                            {formatCurrency(
                              establishment.pf_balance.employee_share.balance
                            )}
                          </p>
                        )}
                      </div>
                      <div className="bg-blue-900/20 rounded p-3 border border-blue-700/30">
                        <p className="text-blue-400 text-xs mb-1">
                          Employer Share
                        </p>
                        <p className="text-white text-sm font-medium">
                          {formatCurrency(
                            establishment.pf_balance.employer_share.credit
                          )}
                        </p>
                        {establishment.pf_balance.employer_share.balance && (
                          <p className="text-blue-300 text-xs">
                            Balance:{" "}
                            {formatCurrency(
                              establishment.pf_balance.employer_share.balance
                            )}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Summary Table */}
      <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
        <h4 className="text-lg font-semibold text-white mb-4">Summary</h4>
        <Table>
          <TableHeader>
            <TableRow className="border-gray-600">
              <TableHead className="text-gray-200">Type</TableHead>
              <TableHead className="text-gray-200">Amount (INR)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-gray-600">
              <TableCell className="text-gray-300">Pension Balance</TableCell>
              <TableCell className="text-white font-medium">
                {formatCurrency(overall_pf_balance.pension_balance)}
              </TableCell>
            </TableRow>
            <TableRow className="border-gray-600">
              <TableCell className="text-gray-300">
                Current PF Balance
              </TableCell>
              <TableCell className="text-white font-medium">
                {formatCurrency(overall_pf_balance.current_pf_balance)}
              </TableCell>
            </TableRow>
            <TableRow className="border-gray-600">
              <TableCell className="text-gray-300">
                Employee Share Total Credit
              </TableCell>
              <TableCell className="text-white font-medium">
                {formatCurrency(overall_pf_balance.employee_share_total.credit)}
              </TableCell>
            </TableRow>
            <TableRow className="border-gray-600">
              <TableCell className="text-gray-300">
                Employee Share Total Balance
              </TableCell>
              <TableCell className="text-white font-medium">
                {formatCurrency(
                  overall_pf_balance.employee_share_total.balance
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default EpfBalanceTable;
