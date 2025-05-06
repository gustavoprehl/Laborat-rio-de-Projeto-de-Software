import React, { useState } from 'react';
import { Coins, ShoppingBag } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockTransactions } from '../../data/mockData';
import { formatDate } from '../../utils/helpers';

const StudentTransactions: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'all' | 'received' | 'redeemed'>('all');

  const studentTransactions = mockTransactions.filter(t => {
    if (t.type === 'award') {
      return t.toId === user?.id;
    } else if (t.type === 'redemption') {
      return t.fromId === user?.id;
    }
    return false;
  });

  const filteredTransactions = studentTransactions.filter(t => {
    if (activeTab === 'all') return true;
    if (activeTab === 'received') return t.type === 'award';
    if (activeTab === 'redeemed') return t.type === 'redemption';
    return true;
  });

  const sortedTransactions = [...filteredTransactions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-[#2E2E2E]">Transaction History</h1>
        <p className="text-[#4B3F72]">View your coin transactions</p>
      </header>

      {/* Filter Tabs */}
      <div className="border-b border-[#A3D9B1]">
        <div className="flex -mb-px">
          {['all', 'received', 'redeemed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`py-4 px-6 font-medium text-sm border-b-2 ${activeTab === tab
                  ? 'border-[#4B3F72] text-[#4B3F72]'
                  : 'border-transparent text-[#A3D9B1] hover:text-[#2E2E2E] hover:border-[#E1EBF7]'
                }`}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {sortedTransactions.length === 0 ? (
          <div className="p-8 text-center">
            <div className="flex justify-center mb-4">
              {activeTab === 'received' ? (
                <Coins className="h-12 w-12 text-[#A3D9B1]" />
              ) : (
                <ShoppingBag className="h-12 w-12 text-[#A3D9B1]" />
              )}
            </div>
            <h3 className="text-lg font-medium text-[#2E2E2E] mb-1">No transactions found</h3>
            <p className="text-[#4B3F72]">
              {activeTab === 'received'
                ? "You haven't received any coins yet"
                : activeTab === 'redeemed'
                  ? "You haven't redeemed any benefits yet"
                  : "No transaction history to display"}
            </p>
          </div>
        ) : (
          <div className="flow-root">
            <ul className="divide-y divide-[#E1EBF7]">
              {sortedTransactions.map((transaction) => (
                <li key={transaction.id} className="p-6">
                  <div className="flex items-start space-x-4">
                    <div
                      className={`flex-shrink-0 rounded-full p-2 ${transaction.type === 'award'
                          ? 'bg-[#E0FAF3]'
                          : 'bg-[#FDECEA]'
                        }`}
                    >
                      {transaction.type === 'award' ? (
                        <Coins className="h-5 w-5 text-[#09EB7E]" />
                      ) : (
                        <ShoppingBag className="h-5 w-5 text-[#F44336]" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#2E2E2E]">
                        {transaction.type === 'award'
                          ? `Received ${transaction.amount} coins`
                          : `Redeemed ${transaction.amount} coins for a benefit`}
                      </p>
                      <p className="text-sm text-[#4B3F72] mt-1">
                        {transaction.type === 'award'
                          ? transaction.message
                          : `Redemption code: ${transaction.code}`}
                      </p>
                      <p className="text-xs text-[#A3D9B1] mt-1">
                        {formatDate(transaction.createdAt)}
                      </p>
                    </div>
                    <div
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-opacity-80 ${transaction.type === 'award'
                          ? 'bg-[#E0FAF3] text-[#09EB7E]'
                          : 'bg-[#FDECEA] text-[#F44336]'
                        }`}
                    >
                      {transaction.type === 'award' ? '+' : '-'}
                      {transaction.amount}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentTransactions;