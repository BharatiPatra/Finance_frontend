import { creditCards } from "./cardData"
import CardStack from "./CardStack"

export default function CreditCardCollection() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">

        <div className="flex justify-center">
          <CardStack cards={creditCards} />
        </div>

        
      </div>
    </div>
  )
}
