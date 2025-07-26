import { CreditCardIcon } from "lucide-react"
import type { CreditCardData } from "./cardData"
import CardChip from "./CardChip"
import CardBrand from "./CardBrand"
import ContactlessIndicator from "./ContactlessIndicator"

interface CreditCardProps {
  card: CreditCardData
}

export default function CreditCard({ card }: CreditCardProps) {
  const getChipVariant = () => {
    if (card.id === "1") return "detailed"
    if (card.id === "4") return "minimal"
    return "standard"
  }

  const getContactlessVariant = () => {
    if (card.id === "4") return "badge"
    return "icon"
  }

  const renderTopSection = () => (
    <div className="flex justify-between items-start">
      <CardChip chipColor={card.theme.chipColor} variant={getChipVariant()} />

      <div className="flex items-center space-x-2">
        {card.hasContactless && (
          <ContactlessIndicator textColor={card.theme.textColor} variant={getContactlessVariant()} />
        )}
        {card.tier && <div className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded font-semibold">{card.tier}</div>}
        {card.type === "amex" && <CreditCardIcon className={`w-8 h-8 ${card.theme.textColor}`} />}
      </div>
    </div>
  )

  const renderCardNumber = () => (
    <div
      className={`font-mono text-lg tracking-widest ${card.theme.textColor === "text-gray-800" ? "text-gray-700" : card.theme.textColor}`}
    >
      {card.number}
    </div>
  )

  const renderCardDetails = () => (
    <div className="flex justify-between items-end">
      <div>
        <div className={`text-xs ${card.theme.textColor === "text-gray-800" ? "text-gray-500" : "opacity-70"}`}>
          {card.type === "amex" ? "MEMBER SINCE" : "CARDHOLDER NAME"}
        </div>
        <div className="font-semibold">
          {card.type === "amex" && card.memberSince ? card.memberSince : card.holderName}
        </div>
      </div>

      <div>
        <div className={`text-xs ${card.theme.textColor === "text-gray-800" ? "text-gray-500" : "opacity-70"}`}>
          {card.type === "mastercard" ? "VALID THRU" : "EXPIRES"}
        </div>
        <div className="font-semibold">{card.expiryDate}</div>
      </div>

      <div className="text-right">
        <CardBrand type={card.type} textColor={card.theme.textColor} />
      </div>
    </div>
  )

  const renderAmexLayout = () => (
    <div className="space-y-4">
      {renderCardNumber()}
      {renderCardDetails()}
      <div className={`text-sm font-semibold ${card.theme.textColor}`}>{card.holderName}</div>
    </div>
  )

  const renderStandardLayout = () => (
    <div className="space-y-4">
      {renderCardNumber()}
      {renderCardDetails()}
    </div>
  )

  return (
    <div
      className={`relative w-80 h-48 rounded-xl ${card.theme.background} shadow-2xl transform hover:scale-105 transition-transform duration-300 ${card.theme.name === "Minimalist White" ? "border border-gray-300" : ""}`}
    >
      {card.theme.overlay && <div className={`absolute inset-0 ${card.theme.overlay} rounded-xl`}></div>}

      <div className={`relative p-6 h-full flex flex-col justify-between ${card.theme.textColor}`}>
        {renderTopSection()}
        {card.type === "amex" ? renderAmexLayout() : renderStandardLayout()}
      </div>
    </div>
  )
}
