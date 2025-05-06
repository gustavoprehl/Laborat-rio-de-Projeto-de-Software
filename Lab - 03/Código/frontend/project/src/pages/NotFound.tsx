import React from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E1EBF7] to-[#A3D9B1] flex flex-col justify-center items-center px-4">
      <div className="max-w-md w-full mx-auto text-center">
        <h1 className="text-9xl font-bold text-[#4B3F72]">404</h1>
        <h2 className="text-2xl font-semibold text-[#2E2E2E] mt-4">Page Not Found</h2>
        <p className="text-[#4B3F72] mt-2">
          The page you're looking for doesn't exist or has been moved.
        </p>
        
        <Link 
          to="/"
          className="mt-8 inline-flex items-center px-4 py-2 bg-[#4B3F72] text-white rounded-md shadow-sm font-medium hover:bg-[#2E2E2E] transition-colors"
        >
          <Home className="h-4 w-4 mr-2" />
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;