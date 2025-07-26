import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tooltip, TooltipTrigger, TooltipContent } from "@/components/ui/tooltip"
import {MutualFundTransaction} from "./types"

// Truncate the name after the second space
function truncateAfterSecondSpace(name: string): string {
  const parts = name.split(' ')
  if (parts.length <= 2) return name
  return parts.slice(0, 2).join(' ') + '...'
}

export default function MutualFundTable({ data }: { data: MutualFundTransaction[] }) {
  return (
    <div className="mt-10 container mx-auto p-2 bg-gray-800 border border-cyan-400/50
        rounded-lg
        shadow-md">
      <Table>
        <TableCaption>A list of your recent mutual fund transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px] text-gray-200">Date</TableHead>
            <TableHead className="text-gray-200">Scheme Name</TableHead>
            <TableHead className="text-gray-200">Scheme Type</TableHead>
            <TableHead className="text-gray-200">Type</TableHead>
            <TableHead className="text-right text-gray-200">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((transaction, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{transaction.date}</TableCell>
              <TableCell>
                {/* Use a styled Tooltip instead of default title to avoid the help cursor */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span className="cursor-pointer">
                      {truncateAfterSecondSpace(transaction.schemeName)}
                    </span>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="break-all">{transaction.schemeName}</p>
                  </TooltipContent>
                </Tooltip>
              </TableCell>
              <TableCell>{transaction.schemeType}</TableCell>
              <TableCell>{transaction.type}</TableCell>
              <TableCell className="text-right">
                {transaction.price.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
