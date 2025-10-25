import { Calendar, MapPin, Building2, Users } from 'lucide-react';

interface Scheme {
  id: number;
  name: string;
  ministry: string;
  description: string;
  target_group: string;
  state: string;
  launch_year: number;
}

interface SchemeCardProps {
  scheme: Scheme;
  onClick: (id: number) => void;
}

export const SchemeCard = ({ scheme, onClick }: SchemeCardProps) => {
  return (
    <div
      onClick={() => onClick(scheme.id)}
      className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 p-6 cursor-pointer border border-gray-100 hover:border-blue-300"
    >
      <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">{scheme.name}</h3>
      <p className="text-gray-600 mb-4 line-clamp-3">{scheme.description}</p>

      <div className="space-y-2 text-sm">
        <div className="flex items-center text-gray-700">
          <Building2 className="w-4 h-4 mr-2 text-blue-600" />
          <span className="font-medium">{scheme.ministry}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <MapPin className="w-4 h-4 mr-2 text-blue-600" />
          <span>{scheme.state}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <Users className="w-4 h-4 mr-2 text-blue-600" />
          <span>{scheme.target_group}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <Calendar className="w-4 h-4 mr-2 text-blue-600" />
          <span>Launched in {scheme.launch_year}</span>
        </div>
      </div>

      <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition">
        View Details
      </button>
    </div>
  );
};
