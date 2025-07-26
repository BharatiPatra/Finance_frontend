// components/dashboard/MetricCard.tsx
import { MetricCardProps } from "./types";

const OUTLINE =
  "border border-cyan-400/50    hover:border-cyan-300";

const MetricCard: React.FC<MetricCardProps> = ({
  id,
  title,
  value,
  icon,
  onClick,
}) => {
  return (
    <div
      className={`
        p-6
        bg-gray-800
        rounded-lg
        shadow-md
        cursor-pointer
        transition-all duration-200

        ${OUTLINE}
      `}
      onClick={() => onClick(id)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-lg font-medium" >{title}</p>
          <p className="text-3xl font-bold">{value}</p>
        </div>
        <div className="p-3 bg-gray-700 rounded-full">{icon}</div>
      </div>
    </div>
  );
};

export default MetricCard;
//  <input
//                         type="text"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//                         placeholder="Type your question..."
//                         className="flex-1 p-3 bg-gray-700/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                     // /
