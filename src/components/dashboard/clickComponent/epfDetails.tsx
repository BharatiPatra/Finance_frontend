import React from "react";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

interface EpfBalanceTableProps {
  pension_balance: string;
  current_pf_balance: string;
}

const EpfBalanceTable: React.FC<EpfBalanceTableProps> = ({
  pension_balance,
  current_pf_balance,
}) => {
  return (
    <>
      <h1 className="text-gray-200 font-bold text-center mb-4">Overall PF Balance</h1>
      <Table>
        <TableHeader>
          <TableRow className="border-t-0">
            <TableHead className="text-gray-200">Type</TableHead>
            <TableHead className=" text-gray-200">Amount (INR)</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Pension Balance</TableCell>
            <TableCell>{pension_balance}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Current PF Balance</TableCell>
            <TableCell>{current_pf_balance}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default EpfBalanceTable;
