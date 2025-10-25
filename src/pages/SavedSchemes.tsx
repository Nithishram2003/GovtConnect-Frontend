import { useState, useEffect } from 'react';
import { BookmarkCheck, Loader2, Trash2 } from 'lucide-react';
import { fetchUserSavedSchemes, deleteUserSavedScheme } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import { SchemeCard } from '../components/SchemeCard';

interface SavedSchemesProps {
  onNavigate: (page: string, id?: number) => void;
}

export const SavedSchemes = ({ onNavigate }: SavedSchemesProps) => {
  const [schemes, setSchemes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { isUserAuthenticated, userToken } = useAuth();

  useEffect(() => {
    if (!isUserAuthenticated) {
      onNavigate('home');
      return;
    }

    const loadSavedSchemes = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchUserSavedSchemes(userToken!);
        setSchemes(data);
      } catch (err) {
        setError('Failed to load saved schemes.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadSavedSchemes();
  }, [isUserAuthenticated, userToken, onNavigate]);

  const handleUnsave = async (schemeId: number) => {
    if (!window.confirm('Are you sure you want to remove this scheme from saved?')) {
      return;
    }

    try {
      await deleteUserSavedScheme(schemeId, userToken!);
      setSchemes(schemes.filter(scheme => scheme.id !== schemeId));
    } catch (err) {
      alert('Failed to remove scheme. Please try again.');
      console.error(err);
    }
  };

  if (!isUserAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 bg-white p-8 rounded-2xl shadow-xl border-t-4 border-green-600">
          <div className="flex items-center justify-center mb-4">
            <BookmarkCheck className="w-12 h-12 text-green-600 mr-3" />
            <h1 className="text-5xl font-extrabold text-green-800 tracking-tight">
              Saved Schemes
            </h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access all your bookmarked government schemes in one place
          </p>
        </div>

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
            <BookmarkCheck className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500 text-xl mb-4">
              You haven't saved any schemes yet
            </p>
            <button
              onClick={() => onNavigate('schemes')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              Browse Schemes
            </button>
          </div>
        )}

        {!loading && schemes.length > 0 && (
          <div className="mt-8">
            <div className="mb-6 text-gray-700 text-lg font-medium">
              You have <span className="font-extrabold text-green-600">{schemes.length}</span> saved schemes
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {schemes.map((scheme) => (
                <div key={scheme.id} className="relative">
                  <SchemeCard
                    scheme={scheme}
                    onClick={(id) => onNavigate('scheme-detail', id)}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleUnsave(scheme.id);
                    }}
                    className="absolute top-4 right-4 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition z-10"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
