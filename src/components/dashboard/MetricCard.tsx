// components/dashboard/MetricCard.tsx
import {MetricCardProps} from "./types"


const MetricCard: React.FC<MetricCardProps> = ({ id, title, value, icon, onClick }) => {
  return (
    <div
      className="bg-white p-6 rounded-lg shadow-md flex flex-col justify-between cursor-pointer transform transition-transform duration-200 hover:scale-105"
      onClick={() => onClick(id)}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-lg font-medium text-gray-500">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
        </div>
        <div className="p-3 bg-gray-100 rounded-full">{icon}</div>
      </div>
    </div>
  );
};

export default MetricCard;
