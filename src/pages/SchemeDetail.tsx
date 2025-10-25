import { useEffect, useState } from 'react';
import { ArrowLeft, Building2, MapPin, Users, Calendar, Award, CheckCircle, Bookmark, BookmarkCheck } from 'lucide-react';
import { fetchSchemeById, saveUserScheme, deleteUserSavedScheme } from '../services/api';
import { Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from '../components/AuthModal';

interface SchemeDetailProps {
  schemeId: number;
  onNavigate: (page: string) => void;
}

export const SchemeDetail = ({ schemeId, onNavigate }: SchemeDetailProps) => {
  const [scheme, setScheme] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authAction, setAuthAction] = useState<'apply' | 'save'>('apply');
  const [isSaved, setIsSaved] = useState(false);
  const [savingScheme, setSavingScheme] = useState(false);
  const { isUserAuthenticated, userToken } = useAuth();

  useEffect(() => {
    const loadScheme = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await fetchSchemeById(schemeId.toString());
        setScheme(data);
      } catch (err) {
        setError('Failed to load scheme details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadScheme();
  }, [schemeId]);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (error || !scheme) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => onNavigate('schemes')}
            className="flex items-center text-blue-600 hover:text-blue-700 mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Schemes
          </button>
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            {error || 'Scheme not found'}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => onNavigate('schemes')}
          className="flex items-center text-blue-600 hover:text-blue-700 mb-6 font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Schemes
        </button>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{scheme.name}</h1>
            <div className="flex flex-wrap gap-4 text-blue-100">
              <div className="flex items-center">
                <Building2 className="w-5 h-5 mr-2" />
                <span>{scheme.ministry}</span>
              </div>
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{scheme.state}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>Launched in {scheme.launch_year}</span>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                <Award className="w-6 h-6 mr-2 text-blue-600" />
                Description
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">{scheme.description}</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-2 text-blue-600" />
                  Eligibility
                </h3>
                <p className="text-gray-700">{scheme.eligibility}</p>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-3 flex items-center">
                  <Users className="w-6 h-6 mr-2 text-green-600" />
                  Target Group
                </h3>
                <p className="text-gray-700">{scheme.target_group}</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-amber-50 to-amber-100 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-3">Benefits</h3>
              <p className="text-gray-700 text-lg">{scheme.benefits}</p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => {
                  if (!isUserAuthenticated) {
                    setAuthAction('apply');
                    setShowAuthModal(true);
                    return;
                  }
                  if (scheme.apply_link) {
                    window.open(scheme.apply_link, '_blank');
                  } else {
                    alert('Apply link not available for this scheme.');
                  }
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
              >
                Apply Now
              </button>

              <button
                onClick={async () => {
                  if (!isUserAuthenticated) {
                    setAuthAction('save');
                    setShowAuthModal(true);
                    return;
                  }
                  setSavingScheme(true);
                  try {
                    if (isSaved) {
                      await deleteUserSavedScheme(schemeId, userToken!);
                      setIsSaved(false);
                    } else {
                      await saveUserScheme(schemeId, userToken!);
                      setIsSaved(true);
                    }
                  } catch (err) {
                    alert('Failed to save/unsave scheme. Please try again.');
                    console.error(err);
                  } finally {
                    setSavingScheme(false);
                  }
                }}
                disabled={savingScheme}
                className={`flex-1 font-bold py-3 px-6 rounded-lg transition flex items-center justify-center disabled:opacity-50 ${
                  isSaved
                    ? 'bg-green-600 hover:bg-green-700 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                {savingScheme ? (
                  <Loader2 className="w-5 h-5 animate-spin mr-2" />
                ) : isSaved ? (
                  <BookmarkCheck className="w-5 h-5 mr-2" />
                ) : (
                  <Bookmark className="w-5 h-5 mr-2" />
                )}
                {isSaved ? 'Saved' : 'Save Scheme'}
              </button>
            </div>

            <AuthModal
              isOpen={showAuthModal}
              onClose={() => setShowAuthModal(false)}
              onSuccess={() => {
                if (authAction === 'apply' && scheme.apply_link) {
                  window.open(scheme.apply_link, '_blank');
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
