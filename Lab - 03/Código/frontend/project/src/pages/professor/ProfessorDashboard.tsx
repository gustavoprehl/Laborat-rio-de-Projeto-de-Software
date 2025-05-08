import React, { useState } from 'react';
import { Coins, Send, Users, X, ArrowRight } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { mockUsers } from '../../data/mockData';
import { sendEmail } from '../../utils/helpers';

const ProfessorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    studentId: '',
    amount: 10,
    message: '',
  });
  const [isSending, setIsSending] = useState(false);

  const students = mockUsers.filter(u => u.role === 'student');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'amount' ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.studentId || formData.amount <= 0 || !formData.message) {
      showToast('Please fill in all fields correctly', 'error');
      return;
    }

    if ((user?.coins || 0) < formData.amount) {
      showToast('You do not have enough coins to send', 'error');
      return;
    }

    setIsSending(true);

    try {
      const selectedStudent = students.find(s => s.id === formData.studentId);

      if (!selectedStudent) {
        throw new Error('Student not found');
      }

      if (user) {
        user.coins = (user.coins || 0) - formData.amount;
      }

      await sendEmail(
        selectedStudent.email,
        `You've received ${formData.amount} coins!`,
        `Professor ${user?.name} has awarded you ${formData.amount} coins for: ${formData.message}`
      );

      showToast('Coins sent successfully!', 'success');
      closeModal();
    } catch (error) {
      console.error('Error sending coins:', error);
      showToast('Failed to send coins', 'error');
    } finally {
      setIsSending(false);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
    setFormData({
      studentId: '',
      amount: 10,
      message: '',
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-[#2E2E2E]">Professor Dashboard</h1>
        <p className="text-[#4B3F72]">Welcome back, {user?.name}</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-[#A3D9B1]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-[#4B3F72]">Coin Balance</p>
              <p className="text-2xl font-bold text-[#2E2E2E]">{user?.coins} coins</p>
              <p className="text-xs text-[#4B3F72] mt-1">Refreshed each semester</p>
            </div>
            <div className="bg-[#E0FAF3] p-3 rounded-full">
              <Coins className="h-6 w-6 text-[#09EB7E]" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex flex-col h-full justify-between">
            <div>
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">Award Merit Coins</h3>
              <p className="text-[#4B3F72] text-sm">Recognize your students' achievements by sending them merit coins.</p>
            </div>
            <button
              onClick={openModal}
              className="mt-4 inline-flex items-center px-4 py-2 bg-[#09EB7E] text-white rounded-md shadow-sm font-medium hover:bg-[#4B3F72] transition-colors"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Coins
            </button>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#A3D9B1] to-[#4B3F72] rounded-xl shadow-md p-6 text-white">
          <div className="flex flex-col h-full">
            <h2 className="text-xl font-semibold mb-4">Recognize Excellence</h2>
            <p className="mb-6">
              Award coins to students who demonstrate excellence in academics, participation, or behavior.
              Each coin represents recognition of their hard work and commitment.
            </p>
            <button
              onClick={openModal}
              className="mt-auto inline-flex items-center px-4 py-2 bg-white text-[#4B3F72] rounded-md shadow-sm font-medium hover:bg-[#E1EBF7] transition-colors"
            >
              <Send className="h-4 w-4 mr-2" />
              Send Recognition
            </button>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <h2 className="text-xl font-semibold text-[#2E2E2E] mb-4">How It Works</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-[#E0FAF3] rounded-full p-1 mr-3 mt-0.5">
                <span className="flex items-center justify-center h-5 w-5 text-[#09EB7E] font-semibold">1</span>
              </div>
              <p className="text-[#4B3F72]">You receive 1,000 coins each semester to award to students</p>
            </li>
            <li className="flex items-start">
              <div className="bg-[#E0FAF3] rounded-full p-1 mr-3 mt-0.5">
                <span className="flex items-center justify-center h-5 w-5 text-[#09EB7E] font-semibold">2</span>
              </div>
              <p className="text-[#4B3F72]">Send coins to recognize student achievements</p>
            </li>
            <li className="flex items-start">
              <div className="bg-[#E0FAF3] rounded-full p-1 mr-3 mt-0.5">
                <span className="flex items-center justify-center h-5 w-5 text-[#09EB7E] font-semibold">3</span>
              </div>
              <p className="text-[#4B3F72]">Students receive a notification and can use coins for benefits</p>
            </li>
            <li className="flex items-start">
              <div className="bg-[#E0FAF3] rounded-full p-1 mr-3 mt-0.5">
                <span className="flex items-center justify-center h-5 w-5 text-[#09EB7E] font-semibold">4</span>
              </div>
              <p className="text-[#4B3F72]">Unused coins accumulate for the next semester</p>
            </li>
          </ul>
        </div>
      </div>

      {/* Send Coins Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-[#A3D9B1] p-4">
              <h3 className="text-lg font-semibold text-[#2E2E2E]">Send Recognition Coins</h3>
              <button onClick={closeModal} className="text-[#4B3F72] hover:text-[#2E2E2E]">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6">
              <div className="space-y-4">
                <div>
                  <label htmlFor="studentId" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                    Student
                  </label>
                  <select
                    id="studentId"
                    name="studentId"
                    value={formData.studentId}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-[#A3D9B1] rounded-md shadow-sm focus:outline-none focus:ring-[#4B3F72] focus:border-[#4B3F72]"
                    required
                  >
                    <option value="">Select a student</option>
                    {students.map((student) => (
                      <option key={student.id} value={student.id}>
                        {student.name} - {student.course}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="amount" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                    Amount of Coins
                  </label>
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    min="1"
                    max={user?.coins || 0}
                    value={formData.amount}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 border border-[#A3D9B1] rounded-md shadow-sm focus:outline-none focus:ring-[#4B3F72] focus:border-[#4B3F72]"
                    required
                  />
                  <p className="mt-1 text-xs text-[#4B3F72]">
                    Your balance: {user?.coins} coins
                  </p>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                    Recognition Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Why are you recognizing this student?"
                    className="block w-full px-3 py-2 border border-[#A3D9B1] rounded-md shadow-sm focus:outline-none focus:ring-[#4B3F72] focus:border-[#4B3F72]"
                    required
                  />
                </div>
              </div>

              {/* Modal Footer */}
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 border border-[#A3D9B1] text-[#4B3F72] rounded-md hover:bg-[#E1EBF7]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSending || !formData.studentId || formData.amount <= 0 || !formData.message || (user?.coins || 0) < formData.amount}
                  className="px-4 py-2 bg-[#09EB7E] text-white rounded-md hover:bg-[#4B3F72] transition-colors disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSending ? 'Sending...' : 'Send Coins'}
                  {!isSending && <ArrowRight size={16} />}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessorDashboard;