"use client"

import { useState } from "react"
import type { CreditCardData } from "./cardData"
import StackedCreditCard from "./StackedCreditCard"

interface CardStackProps {
  cards: CreditCardData[]
}

export default function CardStack({ cards }: CardStackProps) {
  const [currentCards, setCurrentCards] = useState(cards)
  const [slidingCardId, setSlidingCardId] = useState<string | null>(null)
  const [slideDirection, setSlideDirection] = useState<'left' | 'right'>('right'); // New state for slide direction

  const handleCardClick = () => {
    if (currentCards.length <= 1) return

    const topCard = currentCards[0]
    setSlidingCardId(topCard.id)

    // Toggle slide direction for the next animation
    setSlideDirection((prev) => (prev === 'right' ? 'left' : 'right'));

    // After animation completes, move the card to the back
    setTimeout(() => {
      setCurrentCards((prev) => [...prev.slice(1), prev[0]])
      setSlidingCardId(null)
    }, 500)
  }


  return (
    <div className="flex flex-col items-center space-y-8">
      {/* Card Stack Container */}
      <div className="relative w-80 h-48" style={{ marginTop: "60px", marginBottom: "60px" }}>
        {currentCards.map((card, index) => (
          <StackedCreditCard
            key={`${card.id}-${index}`}
            card={card}
            index={index}
            isSliding={slidingCardId === card.id}
            onClick={index === 0 ? handleCardClick : () => {}}
            totalCards={currentCards.length}
            slideDirection={slideDirection} // Pass the slide direction
          />
        ))}
      </div>
    </div>
  )
}