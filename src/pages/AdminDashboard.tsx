import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Loader2, X, ExternalLink } from 'lucide-react';
import {
  adminFetchSchemes,
  adminDeleteScheme,
  adminAddScheme,
  adminUpdateScheme
} from '../services/api';
import { useAuth } from '../contexts/AuthContext';

interface AdminDashboardProps {
  onNavigate: (page: string) => void;
}

interface Scheme {
  id: number;
  name: string;
  ministry: string;
  description: string;
  eligibility: string;
  target_group: string;
  state: string;
  benefits: string;
  launch_year: number;
  apply_link: string; // ✅ new column
  is_active: boolean;
}

export const AdminDashboard = ({ onNavigate }: AdminDashboardProps) => {
  const { adminToken, isAdminAuthenticated } = useAuth();
  const [schemes, setSchemes] = useState<Scheme[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingScheme, setEditingScheme] = useState<Scheme | null>(null);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    ministry: '',
    description: '',
    eligibility: '',
    target_group: '',
    state: '',
    benefits: '',
    launch_year: new Date().getFullYear(),
    apply_link: '' // ✅ added
  });

  useEffect(() => {
    if (!isAdminAuthenticated) {
      onNavigate('admin-login');
      return;
    }
    loadSchemes();
  }, [isAdminAuthenticated]);

  const loadSchemes = async () => {
    if (!adminToken) return;
    setLoading(true);
    try {
      const data = await adminFetchSchemes(adminToken!);
      setSchemes(data);
    } catch (err) {
      setError('Failed to load schemes');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!adminToken || !confirm('Are you sure you want to delete this scheme?')) return;
    try {
      await adminDeleteScheme(id.toString(), adminToken!);
      setSchemes(schemes.filter((s) => s.id !== id));
    } catch (err) {
      alert('Failed to delete scheme');
    }
  };

  const handleEdit = (scheme: Scheme) => {
    setEditingScheme(scheme);
    setFormData({
      name: scheme.name,
      ministry: scheme.ministry,
      description: scheme.description,
      eligibility: scheme.eligibility,
      target_group: scheme.target_group,
      state: scheme.state,
      benefits: scheme.benefits,
      launch_year: scheme.launch_year,
      apply_link: scheme.apply_link || ''
    });
    setShowModal(true);
  };

  const handleAdd = () => {
    setEditingScheme(null);
    setFormData({
      name: '',
      ministry: '',
      description: '',
      eligibility: '',
      target_group: '',
      state: '',
      benefits: '',
      launch_year: new Date().getFullYear(),
      apply_link: ''
    });
    setShowModal(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminToken) return;
    try {
      if (editingScheme) {
        await adminUpdateScheme(editingScheme.id.toString(), formData, adminToken!);
      } else {
        await adminAddScheme(formData, adminToken!);
      }
      setShowModal(false);
      loadSchemes();
    } catch (err) {
      alert('Failed to save scheme');
    }
  };

if (!isAdminAuthenticated) {
  return null;
}


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage government schemes</p>
          </div>
          <button
            onClick={handleAdd}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Scheme
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-12 h-12 text-blue-600 animate-spin" />
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Ministry</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">State</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Target Group</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Apply Link</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {schemes.map((scheme) => (
                    <tr key={scheme.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-800">{scheme.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{scheme.ministry}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{scheme.state}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{scheme.target_group}</td>
                      <td className="px-6 py-4 text-sm">
                        {scheme.apply_link ? (
                          <a
                            href={scheme.apply_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline flex items-center gap-1"
                          >
                            Apply <ExternalLink className="w-4 h-4" />
                          </a>
                        ) : (
                          <span className="text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(scheme)}
                            className="text-blue-600 hover:text-blue-700 p-2 hover:bg-blue-50 rounded"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(scheme.id)}
                            className="text-red-600 hover:text-red-700 p-2 hover:bg-red-50 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* ======= Modal ======= */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingScheme ? 'Edit Scheme' : 'Add New Scheme'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Ministry</label>
                  <input
                    type="text"
                    value={formData.ministry}
                    onChange={(e) => setFormData({ ...formData, ministry: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Eligibility</label>
                <textarea
                  value={formData.eligibility}
                  onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                  required
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Target Group</label>
                  <input
                    type="text"
                    value={formData.target_group}
                    onChange={(e) => setFormData({ ...formData, target_group: e.target.value })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Launch Year</label>
                  <input
                    type="number"
                    value={formData.launch_year}
                    onChange={(e) => setFormData({ ...formData, launch_year: parseInt(e.target.value) })}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Benefits</label>
                <textarea
                  value={formData.benefits}
                  onChange={(e) => setFormData({ ...formData, benefits: e.target.value })}
                  required
                  rows={2}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* ✅ Apply Link Field */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Apply Link</label>
                <input
                  type="url"
                  placeholder="https://official-website.gov.in/apply"
                  value={formData.apply_link}
                  onChange={(e) => setFormData({ ...formData, apply_link: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  type="submit"
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition"
                >
                  {editingScheme ? 'Update Scheme' : 'Add Scheme'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-6 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
