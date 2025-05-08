import React, { useState } from 'react';
import { ShoppingCart, X, ArrowRight, AlertCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { mockBenefits } from '../../data/mockData';
import { generateRedemptionCode, sendEmail } from '../../utils/helpers';

const StudentMarketplace: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  const [selectedBenefit, setSelectedBenefit] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [redemptionCode, setRedemptionCode] = useState('');

  const confirmPurchase = async () => {
    if (!selectedBenefit || !user) return;

    if ((user.coins || 0) < selectedBenefit.price) {
      showToast('Insufficient coins for this benefit', 'error');
      return;
    }

    setIsConfirming(true);

    try {
      const code = generateRedemptionCode();
      setRedemptionCode(code);

      await Promise.all([
        sendEmail(
          user.email,
          `Your MeritCoin Redemption Code: ${code}`,
          `You have successfully redeemed the benefit "${selectedBenefit.title}" for ${selectedBenefit.price} coins. Use the code ${code} to claim your benefit.`
        ),
        sendEmail(
          'company@example.com',
          `New Benefit Redemption: ${code}`,
          `A student has redeemed the benefit "${selectedBenefit.title}". The redemption code is ${code}.`
        )
      ]);

      user.coins = (user.coins || 0) - selectedBenefit.price;

      showToast('Benefit successfully redeemed!', 'success');
    } catch (error) {
      console.error('Error during redemption:', error);
      showToast('Failed to redeem benefit. Please try again.', 'error');
    } finally {
      setIsConfirming(false);
    }
  };

  const openModal = (benefit: any) => {
    setSelectedBenefit(benefit);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBenefit(null);
    setRedemptionCode('');
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-[#2E2E2E]">Marketplace</h1>
        <p className="text-[#4B3F72]">Exchange your coins for benefits</p>
      </header>

      {/* Coins Balance Card */}
      <div className="bg-white rounded-xl shadow-md p-6" style={{ borderLeft: '4px solid #A3D9B1' }}>
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm font-medium text-[#4B3F72]">Available Balance</p>
            <p className="text-2xl font-bold text-[#2E2E2E]">{user?.coins} coins</p>
          </div>
          <ShoppingCart className="h-8 w-8" style={{ color: '#4B3F72' }} />
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockBenefits.map((benefit) => (
          <div key={benefit.id} className="bg-white rounded-xl shadow-md overflow-hidden transition-transform duration-300 hover:transform hover:scale-105">
            <img
              src={benefit.imageUrl}
              alt={benefit.title}
              className="h-48 w-full object-cover"
            />
            <div className="p-6">
              <h3 className="text-lg font-semibold text-[#2E2E2E] mb-2">{benefit.title}</h3>
              <p className="text-[#4B3F72] text-sm mb-4">{benefit.description}</p>
              <div className="flex justify-between items-center">
                <span className="font-bold" style={{ color: '#09EB7E' }}>{benefit.price} coins</span>
                <button
                  onClick={() => openModal(benefit)}
                  disabled={(user?.coins || 0) < benefit.price}
                  className={`px-4 py-2 rounded-md text-sm font-medium 
                ${(user?.coins || 0) >= benefit.price
                      ? 'text-white hover:opacity-90'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                  style={{
                    backgroundColor: (user?.coins || 0) >= benefit.price ? '#09EB7E' : '#d1d5db'
                  }}
                >
                  Redeem
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Redemption Modal */}
      {isModalOpen && selectedBenefit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-[#A3D9B1] p-4">
              <h3 className="text-lg font-semibold text-[#2E2E2E]">Confirm Redemption</h3>
              <button onClick={closeModal} className="text-[#4B3F72] hover:text-[#2E2E2E]">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {!redemptionCode ? (
                <>
                  <div className="flex items-center gap-4 mb-6">
                    <img
                      src={selectedBenefit.imageUrl}
                      alt={selectedBenefit.title}
                      className="h-16 w-16 object-cover rounded-md"
                    />
                    <div>
                      <h4 className="font-medium text-[#2E2E2E]">{selectedBenefit.title}</h4>
                      <p className="text-sm text-[#4B3F72]">{selectedBenefit.description}</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center p-3 rounded-md mb-6" style={{ backgroundColor: '#E0FAF3' }}>
                    <span className="text-[#2E2E2E]">Cost:</span>
                    <span className="font-semibold" style={{ color: '#09EB7E' }}>{selectedBenefit.price} coins</span>
                  </div>

                  <div className="flex justify-between items-center p-3 bg-[#E1EBF7] rounded-md">
                    <span className="text-[#2E2E2E]">Balance after redemption:</span>
                    <span className="font-semibold text-[#4B3F72]">
                      {(user?.coins || 0) - selectedBenefit.price} coins
                    </span>
                  </div>

                  {(user?.coins || 0) < selectedBenefit.price && (
                    <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-md flex items-start gap-2">
                      <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
                      <p className="text-sm">
                        You don't have enough coins to redeem this benefit.
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-4">
                  <div className="rounded-full p-4 inline-flex mb-4" style={{ backgroundColor: '#09EBCB20' }}>
                    <ShoppingCart className="h-12 w-12" style={{ color: '#09EBCB' }} />
                  </div>
                  <h4 className="text-xl font-semibold text-[#2E2E2E] mb-2">
                    Benefit Redeemed!
                  </h4>
                  <p className="text-[#4B3F72] mb-6">
                    Your redemption code has been generated and sent to your email.
                  </p>

                  <div className="bg-[#E1EBF7] p-4 rounded-md mb-6">
                    <p className="text-sm text-[#4B3F72] mb-1">Redemption Code:</p>
                    <p className="text-lg font-mono font-semibold text-[#2E2E2E] tracking-wider">
                      {redemptionCode}
                    </p>
                  </div>

                  <p className="text-sm text-[#4B3F72]">
                    Present this code to claim your benefit. A confirmation has been sent to your email.
                  </p>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="border-t border-[#A3D9B1] p-4 flex justify-end gap-3">
              {!redemptionCode ? (
                <>
                  <button
                    onClick={closeModal}
                    className="px-4 py-2 border border-[#A3D9B1] text-[#4B3F72] rounded-md hover:bg-[#E1EBF7]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmPurchase}
                    disabled={isConfirming || (user?.coins || 0) < selectedBenefit.price}
                    className={`px-4 py-2 rounded-md flex items-center gap-2
                  ${(user?.coins || 0) >= selectedBenefit.price
                        ? 'text-white hover:opacity-90'
                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                    style={{
                      backgroundColor: (user?.coins || 0) >= selectedBenefit.price ? '#09EB7E' : '#d1d5db'
                    }}
                  >
                    {isConfirming ? 'Processing...' : 'Confirm'}
                    {!isConfirming && <ArrowRight size={16} />}
                  </button>
                </>
              ) : (
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-white rounded-md hover:opacity-90 w-full"
                  style={{ backgroundColor: '#09EB7E' }}
                >
                  Done
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentMarketplace;