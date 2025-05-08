import React from 'react';
import { Link } from 'react-router-dom';
import { Wallet, ShoppingCart, History, Award } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockTransactions } from '../../data/mockData';
import { formatDate } from '../../utils/helpers';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();

  const recentTransactions = mockTransactions
    .filter(t => t.toId === user?.id && t.type === 'award')
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-[#2E2E2E]">Student Dashboard</h1>
        <p className="text-[#4B3F72]">Welcome back, {user?.name}</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#A3D9B1]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#4B3F72]">Total Balance</p>
              <p className="text-2xl font-bold text-[#2E2E2E]">{user?.coins} coins</p>
            </div>
            <div className="bg-[#4B3F72] p-3 rounded-full">
              <Wallet className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#4B3F72]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#4B3F72]">Marketplace</p>
              <p className="text-lg font-semibold text-[#2E2E2E]">Browse Benefits</p>
            </div>
            <Link to="/student/marketplace" className="bg-[#4B3F72] p-3 rounded-full hover:bg-[#2E2E2E] transition-colors">
              <ShoppingCart className="h-6 w-6 text-white" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#A3D9B1]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#4B3F72]">Transaction History</p>
              <p className="text-lg font-semibold text-[#2E2E2E]">View All Transactions</p>
            </div>
            <Link to="/student/transactions" className="bg-[#4B3F72] p-3 rounded-full hover:bg-[#2E2E2E] transition-colors">
              <History className="h-6 w-6 text-white" />
            </Link>
          </div>
        </div>
      </div>

      {/* Recent Awards */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="border-b border-[#A3D9B1] px-6 py-4">
          <h2 className="text-lg font-semibold text-[#2E2E2E]">Recent Recognitions</h2>
        </div>
        <div className="divide-y divide-[#A3D9B1]">
          {recentTransactions.length > 0 ? (
            recentTransactions.map((transaction) => (
              <div key={transaction.id} className="px-6 py-4 flex items-start space-x-4">
                <div className="bg-[#4B3F72] p-2 rounded-full flex-shrink-0">
                  <Award className="h-5 w-5 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[#2E2E2E] truncate">
                    Received {transaction.amount} coins
                  </p>
                  <p className="text-sm text-[#4B3F72] truncate">
                    {transaction.message}
                  </p>
                  <p className="text-xs text-[#A3D9B1] mt-1">
                    {formatDate(transaction.createdAt)}
                  </p>
                </div>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#4B3F72] text-white">
                  +{transaction.amount}
                </span>
              </div>
            ))
          ) : (
            <div className="px-6 py-8 text-center">
              <p className="text-[#4B3F72]">No recognitions yet</p>
            </div>
          )}
        </div>

        <div className="bg-[#E1EBF7] px-6 py-3">
          <Link
            to="/student/transactions"
            className="text-sm font-medium text-[#4B3F72] hover:text-[#2E2E2E]"
          >
            View all transactions
          </Link>
        </div>
      </div>

      {/* Features Highlight */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#A3D9B1] to-[#4B3F72] rounded-xl shadow-md p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">Exchange Your Coins</h2>
          <p className="mb-6">Browse the marketplace and exchange your earned coins for exciting benefits from our partners.</p>
          <Link
            to="/student/marketplace"
            className="inline-flex items-center px-4 py-2 bg-white text-[#4B3F72] rounded-md shadow-sm font-medium hover:bg-[#A3D9B1] transition-colors"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Go to Marketplace
          </Link>
        </div>

        <div className="bg-gradient-to-br from-[#4B3F72] to-[#2E2E2E] rounded-xl shadow-md p-6 text-white">
          <h2 className="text-xl font-semibold mb-4">Your Academic Journey</h2>
          <p className="mb-6">Keep track of your achievements and recognitions throughout your academic journey.</p>
          <Link
            to="/student/transactions"
            className="inline-flex items-center px-4 py-2 bg-white text-[#2E2E2E] rounded-md shadow-sm font-medium hover:bg-[#4B3F72] transition-colors"
          >
            <History className="h-4 w-4 mr-2" />
            View History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;