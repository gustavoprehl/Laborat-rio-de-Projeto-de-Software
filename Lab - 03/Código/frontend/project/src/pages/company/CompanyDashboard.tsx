import React from 'react';
import { Link } from 'react-router-dom';
import { Package, PlusCircle, Gift, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockBenefits, mockTransactions } from '../../data/mockData';

const CompanyDashboard: React.FC = () => {
  const { user } = useAuth();

  // Filter benefits for this company
  const companyBenefits = mockBenefits.filter(b => b.companyId === user?.id);

  // Count redemptions
  const redemptions = mockTransactions.filter(t =>
    t.type === 'redemption' &&
    companyBenefits.some(b => b.id === t.benefitId)
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-[#2E2E2E]">Company Dashboard</h1>
        <p className="text-[#4B3F72]">Welcome back, {user?.name}</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#A3D9B1]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#4B3F72]">Total Benefits</p>
              <p className="text-2xl font-bold text-[#2E2E2E]">{companyBenefits.length}</p>
            </div>
            <div className="bg-[#E0FAF3] p-3 rounded-full">
              <Gift className="h-6 w-6 text-[#09EB7E]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#09EB7E]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#4B3F72]">Total Redemptions</p>
              <p className="text-2xl font-bold text-[#2E2E2E]">{redemptions.length}</p>
            </div>
            <div className="bg-[#E0FAF3] p-3 rounded-full">
              <ShoppingBag className="h-6 w-6 text-[#09EB7E]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#4B3F72]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#4B3F72]">Active Benefits</p>
              <p className="text-2xl font-bold text-[#2E2E2E]">
                {companyBenefits.filter(b => b.active).length}
              </p>
            </div>
            <div className="bg-[#E1EBF7] p-3 rounded-full">
              <Package className="h-6 w-6 text-[#4B3F72]" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-md p-6">
        <h2 className="text-lg font-semibold text-[#2E2E2E] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/company/benefits"
            className="flex items-center p-4 border border-[#E1EBF7] rounded-lg hover:bg-[#E1EBF7] transition-colors"
          >
            <div className="bg-[#E0FAF3] p-3 rounded-full mr-4">
              <Gift className="h-6 w-6 text-[#09EB7E]" />
            </div>
            <div>
              <h3 className="font-medium text-[#2E2E2E]">Manage Benefits</h3>
              <p className="text-sm text-[#4B3F72]">View and edit your offered benefits</p>
            </div>
          </Link>

          <Link
            to="/company/benefits"
            className="flex items-center p-4 border border-[#E1EBF7] rounded-lg hover:bg-[#E1EBF7] transition-colors"
          >
            <div className="bg-[#E0FAF3] p-3 rounded-full mr-4">
              <PlusCircle className="h-6 w-6 text-[#09EB7E]" />
            </div>
            <div>
              <h3 className="font-medium text-[#2E2E2E]">Add New Benefit</h3>
              <p className="text-sm text-[#4B3F72]">Create a new benefit for students</p>
            </div>
          </Link>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="border-b border-[#E1EBF7] px-6 py-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-[#2E2E2E]">Your Benefits</h2>
          <Link
            to="/company/benefits"
            className="text-sm font-medium text-[#4B3F72] hover:text-[#2E2E2E]"
          >
            View all
          </Link>
        </div>

        {companyBenefits.length === 0 ? (
          <div className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <Gift className="h-12 w-12 text-[#A3D9B1]" />
            </div>
            <h3 className="text-lg font-medium text-[#2E2E2E] mb-1">No benefits yet</h3>
            <p className="text-[#4B3F72] mb-4">
              Start creating benefits to attract students to your offerings
            </p>
            <Link
              to="/company/benefits"
              className="inline-flex items-center px-4 py-2 bg-[#09EB7E] text-white rounded-md shadow-sm font-medium hover:bg-[#4B3F72] transition-colors"
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              Add New Benefit
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {companyBenefits.slice(0, 4).map((benefit) => (
              <div key={benefit.id} className="border border-[#E1EBF7] rounded-lg overflow-hidden flex flex-col">
                <div className="h-40 overflow-hidden">
                  <img
                    src={benefit.imageUrl}
                    alt={benefit.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex-1">
                  <h3 className="font-medium text-[#2E2E2E] mb-1">{benefit.title}</h3>
                  <p className="text-sm text-[#4B3F72] mb-2">{benefit.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-[#09EB7E] font-semibold">{benefit.price} coins</span>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${benefit.active ? 'bg-[#E0FAF3] text-[#09EB7E]' : 'bg-gray-100 text-gray-800'
                      }`}>
                      {benefit.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {companyBenefits.length > 0 && (
          <div className="bg-[#E1EBF7] px-6 py-3">
            <Link
              to="/company/benefits"
              className="text-sm font-medium text-[#4B3F72] hover:text-[#2E2E2E]"
            >
              Manage all benefits
            </Link>
          </div>
        )}
      </div>

      {/* Info Section */}
      <div className="bg-gradient-to-br from-[#A3D9B1] to-[#4B3F72] rounded-xl shadow-md p-6 text-white">
        <h2 className="text-xl font-semibold mb-4">Partnership Program</h2>
        <p className="mb-6">
          By participating in our academic merit program, you're helping to motivate and reward students while promoting your products or services to a dedicated audience of future professionals.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h3 className="font-medium mb-2">Increased Visibility</h3>
            <p className="text-sm opacity-90">
              Showcase your products to students across multiple institutions
            </p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h3 className="font-medium mb-2">Customer Loyalty</h3>
            <p className="text-sm opacity-90">
              Build relationships with students before they enter the workforce
            </p>
          </div>
          <div className="bg-white bg-opacity-10 rounded-lg p-4">
            <h3 className="font-medium mb-2">Community Engagement</h3>
            <p className="text-sm opacity-90">
              Support education while building your brand's reputation
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDashboard;