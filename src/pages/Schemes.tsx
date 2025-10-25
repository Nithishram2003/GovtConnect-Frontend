import { useState, useEffect, useCallback } from 'react';
import { FilterBar } from '../components/FilterBar';
import { SchemeCard } from '../components/SchemeCard';
import { fetchSchemes } from '../services/api';
import { Loader2, Zap, LayoutList, Factory, GraduationCap, HandCoins, HeartHandshake, Leaf, XCircle } from 'lucide-react';

// Define the expected structure for a scheme and the component props
interface Scheme {
  id: number;
  name: string;
  ministry: string;
  // ... other scheme properties
}

interface SchemesProps {
  onNavigate: (page: string, id?: number) => void;
}

// Curated list of top ministries for quick-access filters
const TOP_CATEGORIES = [
  { name: 'Finance', icon: HandCoins, ministryFilter: 'Ministry of Finance', color: 'text-green-600', bg: 'bg-green-100', hoverBg: 'hover:bg-green-200' },
  { name: 'Health', icon: HeartHandshake, ministryFilter: 'Ministry of Health & Family Welfare', color: 'text-red-600', bg: 'bg-red-100', hoverBg: 'hover:bg-red-200' },
  { name: 'Agriculture', icon: Leaf, ministryFilter: 'Ministry of Agriculture & Farmers Welfare', color: 'text-lime-600', bg: 'bg-lime-100', hoverBg: 'hover:bg-lime-200' },
  { name: 'MSME/Industry', icon: Factory, ministryFilter: 'Ministry of MSME', color: 'text-amber-600', bg: 'bg-amber-100', hoverBg: 'hover:bg-amber-200' },
  { name: 'Education', icon: GraduationCap, ministryFilter: 'Ministry of Education', color: 'text-purple-600', bg: 'bg-purple-100', hoverBg: 'hover:bg-purple-200' },
];

export const Schemes = ({ onNavigate }: SchemesProps) => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [ministries, setMinistries] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeFilter, setActiveFilter] = useState<string>('');

  const loadSchemes = useCallback(async (filters: { ministry?: string, search?: string } = {}) => {
    setLoading(true);
    setError('');
    try {
      const data: Scheme[] = await fetchSchemes(filters);
      
      if (!filters.ministry && !filters.search) {
          const uniqueMinistries = [...new Set(data.map(s => s.ministry))].sort();
          setMinistries(uniqueMinistries);
      }
      
      setSchemes(data);
    } catch (err) {
      setError('Failed to load schemes. Please check your backend connection.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSchemes({});
  }, [loadSchemes]);

  const handleCategoryFilter = (ministry: string) => {
    // If the same button is clicked, reset the filter
    if (activeFilter === ministry) {
      setActiveFilter('');
      loadSchemes({});
    } else {
      setActiveFilter(ministry);
      loadSchemes({ ministry });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Attractive Header */}
        <div className="text-center mb-10 bg-white p-8 rounded-2xl shadow-xl border-t-4 border-blue-600">
          <h1 className="text-5xl font-extrabold text-blue-800 mb-2 tracking-tight">
            Scheme Navigator
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the right government scheme tailored for your needs—by keyword or quick category filter.
          </p>
        </div>

        {/* --- Primary Search and Ministry Dropdown --- */}
        <div className="mb-8">
            <FilterBar 
                onFilter={loadSchemes} 
                ministries={ministries}
            />
        </div>

        {/* --- Visual Category Filter (List-Type) --- */}
        <div className="mb-12 p-6 bg-white rounded-2xl shadow-xl">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                <LayoutList className="w-6 h-6 mr-2 text-blue-600" /> Quick Filter by Top Ministry
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                
                {TOP_CATEGORIES.map((category) => {
                    const isActive = activeFilter === category.ministryFilter;
                    return (
                        <button
                            key={category.name}
                            onClick={() => handleCategoryFilter(category.ministryFilter)}
                            className={`flex flex-col items-center justify-center p-4 h-24 rounded-xl transition border-2 
                                ${isActive 
                                    ? 'bg-blue-600 text-white border-blue-800 shadow-lg'
                                    : `${category.bg} ${category.hoverBg} text-gray-800 border-gray-200`
                                }`}
                        >
                            <category.icon className={`w-7 h-7 mb-1 ${isActive ? 'text-white' : category.color}`} />
                            <span className={`font-semibold text-sm text-center ${isActive ? 'text-white' : 'text-gray-800'}`}>{category.name}</span>
                        </button>
                    );
                })}
                 {/* Button to clear all quick filters */}
                <button
                    onClick={() => handleCategoryFilter('')}
                    className={`flex flex-col items-center justify-center p-4 h-24 rounded-xl transition border-2 
                        ${activeFilter === '' 
                            ? 'bg-blue-500 text-white border-blue-700 shadow-lg'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-200'
                        }`}
                >
                    <XCircle className="w-7 h-7 mb-1 text-white" />
                    <span className="font-semibold text-sm text-center">Clear Filters</span>
                </button>
            </div>
        </div>
        {/* --- End Visual Filter --- */}


        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg my-6 shadow-md">
            {error}
          </div>
        )}

        {!loading && !error && schemes.length === 0 && (
          <div className="text-center py-20 bg-white rounded-lg shadow-md">
            <p className="text-gray-500 text-xl">
              😥 No schemes found matching your selected criteria. Try broadening your search.
            </p>
          </div>
        )}

        {!loading && schemes.length > 0 && (
          <div className="mt-8">
            <div className="mb-6 text-gray-700 text-lg font-medium">
              Showing <span className="font-extrabold text-blue-600">{schemes.length}</span> schemes
              {activeFilter && 
                <span className="ml-3 px-3 py-1 text-sm bg-blue-100 text-blue-800 rounded-full font-semibold border border-blue-300 shadow-sm">
                    Filtered by: {TOP_CATEGORIES.find(c => c.ministryFilter === activeFilter)?.name || activeFilter}
                </span>
              }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {schemes.map((scheme) => (
                <SchemeCard
                  key={scheme.id}
                  scheme={scheme}
                  onClick={(id) => onNavigate('scheme-detail', id)}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};