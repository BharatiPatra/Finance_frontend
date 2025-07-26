export interface CreditCardData {
  id: string
  type: "visa" | "mastercard" | "amex"
  number: string
  holderName: string
  expiryDate: string
  memberSince?: string
  theme: CardTheme
  hasContactless?: boolean
  tier?: string
}

export interface CardTheme {
  name: string
  background: string
  overlay?: string
  textColor: string
  chipColor: string
  accentColor?: string
}

export const cardThemes: Record<string, CardTheme> = {
  premiumBlack: {
    name: "Premium Black",
    background: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
    overlay: "bg-gradient-to-br from-transparent via-transparent to-gray-700 opacity-30",
    textColor: "text-white",
    chipColor: "bg-gradient-to-r from-yellow-400 to-yellow-600",
  },
  blueGradient: {
    name: "Blue Gradient",
    background: "bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800",
    overlay: "bg-gradient-to-br from-transparent via-blue-500 to-transparent opacity-20",
    textColor: "text-white",
    chipColor: "bg-gradient-to-r from-yellow-400 to-yellow-600",
  },
  roseGold: {
    name: "Rose Gold",
    background: "bg-gradient-to-br from-pink-400 via-rose-500 to-orange-400",
    overlay: "bg-gradient-to-br from-white via-transparent to-transparent opacity-10",
    textColor: "text-white",
    chipColor: "bg-gradient-to-r from-yellow-300 to-yellow-500",
  },
  greenTech: {
    name: "Green Tech",
    background: "bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800",
    overlay: "bg-gradient-to-br from-transparent via-green-400 to-transparent opacity-20",
    textColor: "text-white",
    chipColor: "bg-gradient-to-r from-yellow-400 to-yellow-600",
  },
  purplePremium: {
    name: "Purple Premium",
    background: "bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800",
    overlay: "bg-gradient-to-br from-white via-transparent to-transparent opacity-5",
    textColor: "text-white",
    chipColor: "bg-gradient-to-r from-yellow-400 to-yellow-600",
  },
  minimalistWhite: {
    name: "Minimalist White",
    background: "bg-gradient-to-br from-gray-50 to-gray-200",
    overlay: "bg-gradient-to-br from-transparent via-gray-100 to-transparent opacity-50",
    textColor: "text-gray-800",
    chipColor: "bg-gradient-to-r from-gray-700 to-gray-900",
  },
}

export const creditCards: CreditCardData[] = [
  {
    id: "1",
    type: "visa",
    number: "4532 1234 5678 9012",
    holderName: "JOHN SMITH",
    expiryDate: "12/28",
    theme: cardThemes.premiumBlack,
    hasContactless: true,
  },
  {
    id: "2",
    type: "mastercard",
    number: "5412 7534 8901 2345",
    holderName: "SARAH JOHNSON",
    expiryDate: "09/27",
    theme: cardThemes.blueGradient,
    hasContactless: true,
  },
  {
    id: "3",
    type: "amex",
    number: "3782 822463 10005",
    holderName: "ALEX CHEN",
    expiryDate: "03/29",
    memberSince: "2019",
    theme: cardThemes.roseGold,
    hasContactless: false,
  },
  {
    id: "4",
    type: "visa",
    number: "4111 1111 1111 1111",
    holderName: "MARIA GARCIA",
    expiryDate: "11/26",
    theme: cardThemes.greenTech,
    hasContactless: true,
  },
  {
    id: "5",
    type: "mastercard",
    number: "5555 4444 3333 2222",
    holderName: "DAVID WILSON",
    expiryDate: "07/30",
    theme: cardThemes.purplePremium,
    hasContactless: true,
    tier: "PLATINUM",
  },
  {
    id: "6",
    type: "visa",
    number: "4000 0000 0000 0002",
    holderName: "EMMA BROWN",
    expiryDate: "05/28",
    theme: cardThemes.minimalistWhite,
    hasContactless: true,
  },
]
