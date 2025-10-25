import { Menu, X, FileText, MessageCircle, LogIn, LogOut, BookmarkCheck, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navbar = ({ currentPage, onNavigate }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAdminAuthenticated, isUserAuthenticated, admin, user, logoutAdmin, logoutUser } = useAuth();

  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsOpen(false);
  };

  const handleAdminLogout = () => {
    logoutAdmin();
    onNavigate('home');
  };

  const handleUserLogout = () => {
    logoutUser();
    onNavigate('home');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center cursor-pointer" onClick={() => handleNavigation('home')}>
            <FileText className="w-8 h-8 mr-2" />
            <span className="font-bold text-xl">GovConnect</span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation('home')}
              className={`hover:text-blue-200 transition ${currentPage === 'home' ? 'text-blue-200 font-semibold' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation('schemes')}
              className={`hover:text-blue-200 transition ${currentPage === 'schemes' ? 'text-blue-200 font-semibold' : ''}`}
            >
              Schemes
            </button>
            <button
              onClick={() => handleNavigation('chatbot')}
              className={`flex items-center hover:text-blue-200 transition ${currentPage === 'chatbot' ? 'text-blue-200 font-semibold' : ''}`}
            >
              <MessageCircle className="w-4 h-4 mr-1" />
              AI Assistant
            </button>
            {isUserAuthenticated && (
              <button
                onClick={() => handleNavigation('saved-schemes')}
                className={`flex items-center hover:text-blue-200 transition ${currentPage === 'saved-schemes' ? 'text-blue-200 font-semibold' : ''}`}
              >
                <BookmarkCheck className="w-4 h-4 mr-1" />
                Saved
              </button>
            )}
            {isAdminAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavigation('admin')}
                  className={`hover:text-blue-200 transition ${currentPage === 'admin' ? 'text-blue-200 font-semibold' : ''}`}
                >
                  Dashboard
                </button>
                <button
                  onClick={handleAdminLogout}
                  className="flex items-center bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Admin Logout
                </button>
              </>
            ) : isUserAuthenticated ? (
              <>
                <div className="flex items-center text-blue-200">
                  <User className="w-4 h-4 mr-1" />
                  {user?.name}
                </div>
                <button
                  onClick={handleUserLogout}
                  className="flex items-center bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-lg transition"
                >
                  <LogOut className="w-4 h-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigation('admin-login')}
                className="flex items-center bg-blue-800 hover:bg-blue-900 px-4 py-2 rounded-lg transition"
              >
                <LogIn className="w-4 h-4 mr-1" />
                Admin
              </button>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-blue-700">
          <div className="px-4 pt-2 pb-4 space-y-2">
            <button
              onClick={() => handleNavigation('home')}
              className={`block w-full text-left px-4 py-2 rounded hover:bg-blue-800 transition ${currentPage === 'home' ? 'bg-blue-800' : ''}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation('schemes')}
              className={`block w-full text-left px-4 py-2 rounded hover:bg-blue-800 transition ${currentPage === 'schemes' ? 'bg-blue-800' : ''}`}
            >
              Schemes
            </button>
            <button
              onClick={() => handleNavigation('chatbot')}
              className={`block w-full text-left px-4 py-2 rounded hover:bg-blue-800 transition ${currentPage === 'chatbot' ? 'bg-blue-800' : ''}`}
            >
              AI Assistant
            </button>
            {isUserAuthenticated && (
              <button
                onClick={() => handleNavigation('saved-schemes')}
                className={`block w-full text-left px-4 py-2 rounded hover:bg-blue-800 transition ${currentPage === 'saved-schemes' ? 'bg-blue-800' : ''}`}
              >
                Saved Schemes
              </button>
            )}
            {isAdminAuthenticated ? (
              <>
                <button
                  onClick={() => handleNavigation('admin')}
                  className={`block w-full text-left px-4 py-2 rounded hover:bg-blue-800 transition ${currentPage === 'admin' ? 'bg-blue-800' : ''}`}
                >
                  Dashboard
                </button>
                <button
                  onClick={handleAdminLogout}
                  className="block w-full text-left px-4 py-2 rounded bg-blue-800 hover:bg-blue-900 transition"
                >
                  Admin Logout
                </button>
              </>
            ) : isUserAuthenticated ? (
              <>
                <div className="px-4 py-2 text-blue-200">
                  Welcome, {user?.name}
                </div>
                <button
                  onClick={handleUserLogout}
                  className="block w-full text-left px-4 py-2 rounded bg-blue-800 hover:bg-blue-900 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={() => handleNavigation('admin-login')}
                className="block w-full text-left px-4 py-2 rounded bg-blue-800 hover:bg-blue-900 transition"
              >
                Admin Login
              </button>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};
