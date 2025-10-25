import { Search, Target, Shield, Sparkles, Home as HomeIcon, GraduationCap, Factory, HandCoins, HeartHandshake, Leaf } from 'lucide-react';

interface HomeProps {
  onNavigate: (page: string) => void;
}

export const Home = ({ onNavigate }: HomeProps) => {
  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      
      {/* ========================================================
        NEW HERO SECTION: Enhanced Visual Appeal & Call to Action
        ========================================================
      */}
      <div className="bg-gradient-to-br from-blue-700 via-blue-800 to-indigo-900 text-white shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="text-center">
            
            {/* Main Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight animate-fade-in drop-shadow-lg">
              Unlock Your Government Benefits
            </h1>
            
            {/* Sub-Headline */}
            <p className="text-xl md:text-2xl mb-12 text-blue-200 max-w-4xl mx-auto font-light">
              Your definitive guide to **150+ verified Central and State Government Schemes**. Find the support you deserve with our smart, personalized search.
            </p>

            {/* Call-to-Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button
                onClick={() => onNavigate('schemes')}
                className="bg-amber-400 text-gray-900 font-extrabold px-10 py-4 rounded-full text-lg hover:bg-amber-300 transition transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2"
              >
                <Search className="w-5 h-5" />
                <span>Explore All Schemes</span>
              </button>
              <button
                onClick={() => onNavigate('chatbot')}
                className="bg-blue-900 text-white font-bold px-10 py-4 rounded-full text-lg hover:bg-blue-950 transition transform hover:scale-105 shadow-xl border-2 border-amber-400 flex items-center justify-center space-x-2"
              >
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Ask AI Assistant Now</span>
              </button>
            </div>
            
          </div>
        </div>
      </div>

      {/* ========================================================
        SIX SCHEME CATEGORIES GRID (NEW SECTION)
        ========================================================
      */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-12">Schemes By Focus Area</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                
                {/* 1. Housing/Urban Development */}
                <div className="flex flex-col items-center p-4 bg-blue-50 hover:bg-blue-100 rounded-xl transition shadow-md">
                    <HomeIcon className="w-8 h-8 text-blue-600 mb-2" />
                    <h3 className="text-md font-bold text-gray-900 text-center">Housing & Shelter</h3>
                    <p className="text-xs text-gray-500 text-center mt-1">PMAY, Rental Assistance, Urban Planning</p>
                </div>

                {/* 2. Education/Skill Development */}
                <div className="flex flex-col items-center p-4 bg-purple-50 hover:bg-purple-100 rounded-xl transition shadow-md">
                    <GraduationCap className="w-8 h-8 text-purple-600 mb-2" />
                    <h3 className="text-md font-bold text-gray-900 text-center">Education & Skilling</h3>
                    <p className="text-xs text-gray-500 text-center mt-1">Scholarships, PMKVY, Digital Literacy</p>
                </div>

                {/* 3. Industry/Business */}
                <div className="flex flex-col items-center p-4 bg-amber-50 hover:bg-amber-100 rounded-xl transition shadow-md">
                    <Factory className="w-8 h-8 text-amber-600 mb-2" />
                    <h3 className="text-md font-bold text-gray-900 text-center">MSME & Startups</h3>
                    <p className="text-xs text-gray-500 text-center mt-1">Mudra Loans, Startup India, Credit Guarantee</p>
                </div>
                
                {/* 4. Financial Inclusion/Pension */}
                <div className="flex flex-col items-center p-4 bg-green-50 hover:bg-green-100 rounded-xl transition shadow-md">
                    <HandCoins className="w-8 h-8 text-green-600 mb-2" />
                    <h3 className="text-md font-bold text-gray-900 text-center">Finance & Pension</h3>
                    <p className="text-xs text-gray-500 text-center mt-1">Jan Dhan, APY, Insurance Schemes</p>
                </div>
                
                {/* 5. Health & Welfare */}
                <div className="flex flex-col items-center p-4 bg-red-50 hover:bg-red-100 rounded-xl transition shadow-md">
                    <HeartHandshake className="w-8 h-8 text-red-600 mb-2" />
                    <h3 className="text-md font-bold text-gray-900 text-center">Health & Welfare</h3>
                    <p className="text-xs text-gray-500 text-center mt-1">Ayushman Bharat, Maternity Benefits</p>
                </div>
                
                {/* 6. Agriculture & Environment */}
                <div className="flex flex-col items-center p-4 bg-cyan-50 hover:bg-cyan-100 rounded-xl transition shadow-md">
                    <Leaf className="w-8 h-8 text-cyan-600 mb-2" />
                    <h3 className="text-md font-bold text-gray-900 text-center">Farming & Environment</h3>
                    <p className="text-xs text-gray-500 text-center mt-1">PM-KISAN, Crop Insurance, Water Missions</p>
                </div>
            </div>
            
        </div>
      </div>
      
      {/* ========================================================
        TRUST BADGE/CLOSING SECTION
        ========================================================
      */}
      <div className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center border-t-4 border-blue-500">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              Your Trusted Source for Government Schemes
            </h3>
            <p className="text-gray-600 text-lg">
              We eliminate the complexity of government websites. Every detail—from benefits to application links—is curated and **regularly updated** by our dedicated team to save you time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};