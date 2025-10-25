import { Heart } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-gray-300 py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm">© 2025 GovtConnect. All rights reserved.</p>
          </div>
          <div className="flex items-center">
            <span className="text-sm">Made with</span>
            <Heart className="w-4 h-4 mx-1 text-red-500 fill-current" />
            <span className="text-sm">for the people</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
