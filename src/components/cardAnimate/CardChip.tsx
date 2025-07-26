interface CardChipProps {
  chipColor: string
  variant?: "standard" | "detailed" | "minimal"
}

export default function CardChip({ chipColor, variant = "standard" }: CardChipProps) {
  if (variant === "detailed") {
    return (
      <div className={`w-12 h-8 ${chipColor} rounded-md flex items-center justify-center`}>
        <div className="w-8 h-6 bg-gradient-to-r from-yellow-300 to-yellow-500 rounded-sm"></div>
      </div>
    )
  }

  if (variant === "minimal") {
    return (
      <div className={`w-12 h-8 ${chipColor} rounded-md flex items-center justify-center`}>
        <div className="w-2 h-2 bg-yellow-200 rounded-full"></div>
      </div>
    )
  }

  return <div className={`w-12 h-8 ${chipColor} rounded-md`}></div>
}
