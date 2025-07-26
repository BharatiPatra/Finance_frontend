"use client";

import { CreditCardIcon } from "lucide-react";
import type { CreditCardData } from "./cardData";
import CardChip from "./CardChip";
import CardBrand from "./CardBrand";
import ContactlessIndicator from "./ContactlessIndicator";

interface StackedCreditCardProps {
  card: CreditCardData;
  index: number;
  isSliding: boolean;
  onClick: () => void;
  totalCards: number;
  slideDirection: "left" | "right";
}

export default function StackedCreditCard({
  card,
  index,
  isSliding,
  onClick,
  totalCards,
  slideDirection,
}: StackedCreditCardProps) {
  const getChipVariant = () => {
    if (card.id === "1") return "detailed";
    if (card.id === "4") return "minimal";
    return "standard";
  };

  const getContactlessVariant = () => {
    if (card.id === "4") return "badge";
    return "icon";
  };

  const renderTopSection = () => (
    <div className="flex justify-between items-start">
      <CardChip chipColor={card.theme.chipColor} variant={getChipVariant()} />

      <div className="flex items-center space-x-2">
        {card.hasContactless && (
          <ContactlessIndicator
            textColor={card.theme.textColor}
            variant={getContactlessVariant()}
          />
        )}
        {card.tier && (
          <div className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded font-semibold">
            {card.tier}
          </div>
        )}
        {card.type === "amex" && (
          <CreditCardIcon className={`w-8 h-8 ${card.theme.textColor}`} />
        )}
      </div>
    </div>
  );

  const renderCardNumber = () => (
    <div
      className={`font-mono text-lg tracking-widest ${
        card.theme.textColor === "text-gray-800"
          ? "text-gray-700"
          : card.theme.textColor
      }`}
    >
      {card.number}
    </div>
  );

  const renderCardDetails = () => (
    <div className="flex justify-between items-end">
      <div>
        <div
          className={`text-xs ${
            card.theme.textColor === "text-gray-800"
              ? "text-gray-500"
              : "opacity-70"
          }`}
        >
          {card.type === "amex" ? "MEMBER SINCE" : "CARDHOLDER NAME"}
        </div>
        <div className="font-semibold">
          {card.type === "amex" && card.memberSince
            ? card.memberSince
            : card.holderName}
        </div>
      </div>

      <div>
        <div
          className={`text-xs ${
            card.theme.textColor === "text-gray-800"
              ? "text-gray-500"
              : "opacity-70"
          }`}
        >
          {card.type === "mastercard" ? "VALID THRU" : "EXPIRES"}
        </div>
        <div className="font-semibold">{card.expiryDate}</div>
      </div>

      <div className="text-right">
        <CardBrand type={card.type} textColor={card.theme.textColor} />
      </div>
    </div>
  );

  const renderAmexLayout = () => (
    <div className="space-y-4">
      {renderCardNumber()}
      {renderCardDetails()}
      <div className={`text-sm font-semibold ${card.theme.textColor}`}>
        {card.holderName}
      </div>
    </div>
  );

  const renderStandardLayout = () => (
    <div className="space-y-4">
      {renderCardNumber()}
      {renderCardDetails()}
    </div>
  );

  // Calculate positioning for stacked effect - MODIFIED FOR BOTTOM-UP STACK
  const zIndex = totalCards - index; // This still works for ensuring the top card is interactive
  const reversedIndex = totalCards - 1 - index; // Calculate a reversed index
  const translateY = reversedIndex * 8; // Offset for each card (moving upwards)
  const translateX = reversedIndex * 4; // Horizontal offset

  const scale = 1 - reversedIndex * 0.02; // Slight scale reduction for depth

  // Determine slide transform based on slideDirection
  const slideTransform =
    slideDirection === "right"
      ? "translateX(400px) scale(0.8)"
      : "translateX(-400px) scale(0.8)";

  return (
    <div
      className={`absolute w-80 h-48 rounded-xl ${
        card.theme.background
      } shadow-2xl cursor-pointer transition-all duration-500 ease-in-out ${
        card.theme.name === "Minimalist White" ? "border border-gray-300" : ""
      } ${isSliding ? "opacity-0" : ""}`}
      style={{
        zIndex,
        transform: isSliding
          ? slideTransform
          : `translateY(${translateY}px) scale(${scale})`,
      }}
      onClick={onClick}
    >
      {card.theme.overlay && (
        <div
          className={`absolute inset-0 ${card.theme.overlay} rounded-xl`}
        ></div>
      )}

      <div
        className={`relative p-6 h-full flex flex-col justify-between ${card.theme.textColor}`}
      >
        {renderTopSection()}
        {card.type === "amex" ? renderAmexLayout() : renderStandardLayout()}
      </div>

      {/* Click indicator for top card */}
      {index === 0 && (
        <div className="absolute top-4 right-4 bg-white bg-opacity-20 rounded-full p-2 animate-pulse">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      )}
    </div>
  );
}
