interface CardBrandProps {
  type: "visa" | "mastercard" | "amex"
  textColor: string
}

export default function CardBrand({ type, textColor }: CardBrandProps) {
  if (type === "visa") {
    return <div className={`font-bold text-xl ${textColor}`}>VISA</div>
  }

  if (type === "mastercard") {
    return (
      <div className="flex items-center space-x-2">
        <div className="flex space-x-1">
          <div className="w-8 h-8 bg-red-500 rounded-full opacity-80"></div>
          <div className="w-8 h-8 bg-yellow-400 rounded-full opacity-80 -ml-3"></div>
        </div>
        <div className={`font-bold text-lg ${textColor}`}>mastercard</div>
      </div>
    )
  }

  if (type === "amex") {
    return <div className={`font-bold text-lg ${textColor}`}>AMEX</div>
  }

  return null
}
