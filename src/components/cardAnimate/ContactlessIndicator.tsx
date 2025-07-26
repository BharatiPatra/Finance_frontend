import { Wifi } from "lucide-react"

interface ContactlessIndicatorProps {
  textColor: string
  variant?: "icon" | "badge"
}

export default function ContactlessIndicator({ textColor, variant = "icon" }: ContactlessIndicatorProps) {
  if (variant === "badge") {
    return <div className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded">CONTACTLESS</div>
  }

  return <Wifi className={`w-6 h-6 rotate-90 ${textColor}`} />
}
