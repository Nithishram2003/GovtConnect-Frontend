import { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Schemes } from './pages/Schemes';
import { SchemeDetail } from './pages/SchemeDetail';
import { Chatbot } from './pages/Chatbot';
import { AdminLogin } from './pages/AdminLogin';
import { AdminDashboard } from './pages/AdminDashboard';
import { SavedSchemes } from './pages/SavedSchemes';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedSchemeId, setSelectedSchemeId] = useState<number | null>(null);

  const handleNavigate = (page: string, schemeId?: number) => {
    setCurrentPage(page);
    if (schemeId) {
      setSelectedSchemeId(schemeId);
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} />;
      case 'schemes':
        return <Schemes onNavigate={handleNavigate} />;
      case 'scheme-detail':
        return selectedSchemeId ? (
          <SchemeDetail schemeId={selectedSchemeId} onNavigate={handleNavigate} />
        ) : (
          <Schemes onNavigate={handleNavigate} />
        );
      case 'saved-schemes':
        return <SavedSchemes onNavigate={handleNavigate} />;
      case 'chatbot':
        return <Chatbot />;
      case 'admin-login':
        return <AdminLogin onNavigate={handleNavigate} />;
      case 'admin':
        return <AdminDashboard onNavigate={handleNavigate} />;
      default:
        return <Home onNavigate={handleNavigate} />;
    }
  };

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} />
        <main className="flex-1">{renderPage()}</main>
        <Footer />
      </div>
    </AuthProvider>
  );
}

export default App;
