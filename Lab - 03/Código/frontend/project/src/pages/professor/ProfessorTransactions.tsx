import React from 'react';
import { Send } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { mockTransactions, mockUsers } from '../../data/mockData';
import { formatDate } from '../../utils/helpers';

const ProfessorTransactions: React.FC = () => {
  const { user } = useAuth();

  const professorTransactions = mockTransactions
    .filter(t => t.type === 'award' && t.fromId === user?.id)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const getStudentName = (id: string) => {
    const student = mockUsers.find(u => u.id === id);
    return student ? student.name : 'Unknown Student';
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-[#2E2E2E]">Transaction History</h1>
        <p className="text-[#4B3F72]">View your coin awards to students</p>
      </header>

      {/* Transactions List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="border-b border-[#A3D9B1] px-6 py-4">
          <h2 className="text-lg font-semibold text-[#2E2E2E]">
            Your Recognition History
          </h2>
        </div>

        {professorTransactions.length === 0 ? (
          <div className="p-8 text-center">
            <div className="flex justify-center mb-4">
              <Send className="h-12 w-12 text-[#A3D9B1]" />
            </div>
            <h3 className="text-lg font-medium text-[#2E2E2E] mb-1">No transactions yet</h3>
            <p className="text-[#4B3F72]">
              You haven't awarded any coins to students yet
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[#E1EBF7]">
            {professorTransactions.map((transaction) => (
              <li key={transaction.id} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 bg-[#E0FAF3] p-2 rounded-full">
                    <Send className="h-5 w-5 text-[#09EB7E]" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-[#2E2E2E]">
                      Sent {transaction.amount} coins to {getStudentName(transaction.toId)}
                    </p>
                    <p className="text-sm text-[#4B3F72] mt-1">
                      "{transaction.message}"
                    </p>
                    <p className="text-xs text-[#A3D9B1] mt-1">
                      {formatDate(transaction.createdAt)}
                    </p>
                  </div>
                  <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#E0FAF3] text-[#09EB7E]">
                    -{transaction.amount}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProfessorTransactions;