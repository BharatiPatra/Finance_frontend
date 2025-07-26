export interface CreditCardData {
  id: string;
  type: "visa" | "mastercard" | "amex";
  number: string;
  holderName: string;
  expiryDate: string;
  memberSince?: string;
  theme: CardTheme;
  hasContactless?: boolean;
  tier?: string;
  // Additional real account data
  bankName?: string;
  currentBalance?: number;
  creditLimit?: number;
  pastDue?: number;
  accountStatus?: string;
  paymentRating?: string;
  interestRate?: string;
}

export interface CardTheme {
  name: string;
  background: string;
  overlay?: string;
  textColor: string;
  chipColor: string;
  accentColor?: string;
}

export const cardThemes: Record<string, CardTheme> = {
  premiumBlack: {
    name: "Premium Black",
    background: "bg-gradient-to-br from-gray-900 via-gray-800 to-black",
    overlay:
      "bg-gradient-to-br from-transparent via-transparent to-gray-700 opacity-30",
    textColor: "text-white",
    chipColor: "bg-gradient-to-r from-yellow-400 to-yellow-600",
  },
  blueGradient: {
    name: "Blue Gradient",
    background: "bg-gradient-to-br from-blue-600 via-blue-700 to-purple-800",
    overlay:
      "bg-gradient-to-br from-transparent via-blue-500 to-transparent opacity-20",
    textColor: "text-white",
    chipColor: "bg-gradient-to-r from-yellow-400 to-yellow-600",
  },
  roseGold: {
    name: "Rose Gold",
    background: "bg-gradient-to-br from-pink-400 via-rose-500 to-orange-400",
    overlay:
      "bg-gradient-to-br from-white via-transparent to-transparent opacity-10",
    textColor: "text-white",
    chipColor: "bg-gradient-to-r from-yellow-300 to-yellow-500",
  },
  greenTech: {
    name: "Green Tech",
    background: "bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800",
    overlay:
      "bg-gradient-to-br from-transparent via-green-400 to-transparent opacity-20",
    textColor: "text-white",
    chipColor: "bg-gradient-to-r from-yellow-400 to-yellow-600",
  },
  purplePremium: {
    name: "Purple Premium",
    background: "bg-gradient-to-br from-purple-600 via-indigo-700 to-blue-800",
    overlay:
      "bg-gradient-to-br from-white via-transparent to-transparent opacity-5",
    textColor: "text-white",
    chipColor: "bg-gradient-to-r from-yellow-400 to-yellow-600",
  },
  minimalistWhite: {
    name: "Minimalist White",
    background: "bg-gradient-to-br from-gray-50 to-gray-200",
    overlay:
      "bg-gradient-to-br from-transparent via-gray-100 to-transparent opacity-50",
    textColor: "text-gray-800",
    chipColor: "bg-gradient-to-r from-gray-700 to-gray-900",
  },
};

// Interface for real credit card account data
export interface CreditCardAccount {
  subscriberName: string;
  portfolioType: string;
  accountType: string;
  openDate: string;
  highestCreditOrOriginalLoanAmount: string;
  creditLimitAmount?: string;
  accountStatus: string;
  paymentRating: string;
  paymentHistoryProfile: string;
  currentBalance: string;
  amountPastDue: string;
  dateReported: string;
  occupationCode: string;
  rateOfInterest?: string;
  repaymentTenure: string;
  dateOfAddition: string;
  currencyCode: string;
  accountHolderTypeCode: string;
}

// Function to convert real credit card account data to visual card data
export function convertAccountsToCards(
  accounts: CreditCardAccount[]
): CreditCardData[] {
  const themes = Object.values(cardThemes);

  return accounts.map((account, index) => {
    // Determine card type based on bank name
    let cardType: "visa" | "mastercard" | "amex" = "visa";
    const bankName = account.subscriberName.toLowerCase();

    if (bankName.includes("hdfc") || bankName.includes("icici")) {
      cardType = "visa";
    } else if (bankName.includes("bajaj") || bankName.includes("aditya")) {
      cardType = "mastercard";
    } else if (bankName.includes("epifi")) {
      cardType = "amex";
    }

    // Generate a masked card number based on account type and bank
    const generateCardNumber = (type: string, bank: string) => {
      const lastFour = Math.floor(1000 + Math.random() * 9000).toString();
      if (type === "visa") return `4*** **** **** ${lastFour}`;
      if (type === "mastercard") return `5*** **** **** ${lastFour}`;
      if (type === "amex") return `3*** ****** ${lastFour}`;
      return `**** **** **** ${lastFour}`;
    };

    // Format date from YYYYMMDD to MM/YY
    const formatExpiryDate = (openDate: string) => {
      const year = parseInt(openDate.substring(0, 4));
      const month = Math.floor(Math.random() * 12) + 1;
      const expiryYear = year + 5; // Add 5 years to open date
      return `${month.toString().padStart(2, "0")}/${expiryYear
        .toString()
        .substring(2)}`;
    };

    // Get account holder name (simplified)
    const getHolderName = (bank: string) => {
      const names = [
        "JOHN SMITH",
        "SARAH JOHNSON",
        "ALEX CHEN",
        "MARIA GARCIA",
        "DAVID WILSON",
        "EMMA BROWN",
      ];
      return names[index % names.length];
    };

    // Determine tier based on credit limit
    const getTier = (creditLimit: string) => {
      const limit = parseFloat(creditLimit);
      if (limit >= 500000) return "PLATINUM";
      if (limit >= 100000) return "GOLD";
      return undefined;
    };

    return {
      id: (index + 1).toString(),
      type: cardType,
      number: generateCardNumber(cardType, account.subscriberName),
      holderName: getHolderName(account.subscriberName),
      expiryDate: formatExpiryDate(account.openDate),
      theme: themes[index % themes.length],
      hasContactless: Math.random() > 0.3, // 70% chance of contactless
      tier: getTier(
        account.creditLimitAmount || account.highestCreditOrOriginalLoanAmount
      ),
      // Add real account data for reference
      bankName: account.subscriberName,
      currentBalance: parseFloat(account.currentBalance),
      creditLimit: parseFloat(
        account.creditLimitAmount || account.highestCreditOrOriginalLoanAmount
      ),
      pastDue: parseFloat(account.amountPastDue),
      accountStatus: account.accountStatus,
      paymentRating: account.paymentRating,
      interestRate: account.rateOfInterest,
    };
  });
}

// Default dummy cards for fallback
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
];
