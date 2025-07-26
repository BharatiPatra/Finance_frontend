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
    <div className="container mx-auto py-10">
      <Table>
        <TableCaption>A list of your recent mutual fund transactions.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[120px]">Date</TableHead>
            <TableHead>Scheme Name</TableHead>
            <TableHead>Scheme Type</TableHead>
            <TableHead>Type</TableHead>
            <TableHead className="text-right">Price</TableHead>
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
