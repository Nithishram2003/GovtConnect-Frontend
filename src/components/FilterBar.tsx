import { Search, Filter } from 'lucide-react';
import { useState } from 'react';

interface FilterBarProps {
  onFilter: (filters: { q?: string; state?: string; ministry?: string }) => void;
}

export const FilterBar = ({ onFilter }: FilterBarProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [state, setState] = useState('');
  const [ministry, setMinistry] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const handleSearch = () => {
    const filters: any = {};
    if (searchQuery) filters.q = searchQuery;
    if (state) filters.state = state;
    if (ministry) filters.ministry = ministry;
    onFilter(filters);
  };

  const handleClear = () => {
    setSearchQuery('');
    setState('');
    setMinistry('');
    onFilter({});
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-8">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search schemes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center justify-center px-6 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
          >
            <Filter className="w-5 h-5 mr-2" />
            Filters
          </button>
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition"
          >
            Search
          </button>
        </div>

        {showFilters && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <input
                type="text"
                placeholder="e.g., Tamil Nadu"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Ministry</label>
              <input
                type="text"
                placeholder="e.g., Education"
                value={ministry}
                onChange={(e) => setMinistry(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                onClick={handleClear}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                Clear all filters
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
