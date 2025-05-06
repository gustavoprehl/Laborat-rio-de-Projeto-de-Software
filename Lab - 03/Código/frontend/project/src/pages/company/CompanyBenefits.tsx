import React, { useState } from 'react';
import { Plus, Pencil, Trash2, Eye, X, ArrowRight, AlertCircle, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import { mockBenefits } from '../../data/mockData';

const CompanyBenefits: React.FC = () => {
  const { user } = useAuth();
  const { showToast } = useToast();

  // Filter benefits for this company
  const [benefits, setBenefits] = useState(mockBenefits.filter(b => b.companyId === user?.id));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentBenefit, setCurrentBenefit] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState<string | null>(null);

  const defaultBenefit = {
    title: '',
    description: '',
    price: 100,
    imageUrl: '',
    active: true,
  };

  const openAddModal = () => {
    setCurrentBenefit(defaultBenefit);
    setIsModalOpen(true);
  };

  const openEditModal = (benefit: any) => {
    setCurrentBenefit({ ...benefit });
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentBenefit(null);
    setDeleteConfirmation(null);
  };

  const toggleBenefitStatus = (benefitId: string) => {
    setBenefits(prevBenefits =>
      prevBenefits.map(benefit =>
        benefit.id === benefitId
          ? { ...benefit, active: !benefit.active }
          : benefit
      )
    );

    showToast('Benefit status updated', 'success');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    setCurrentBenefit(prev => ({
      ...prev,
      [name]: type === 'number' ? parseInt(value) : value,
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setCurrentBenefit(prev => ({
      ...prev,
      [name]: checked,
    }));
  };

  const validateForm = () => {
    if (!currentBenefit) return false;

    const { title, description, price, imageUrl } = currentBenefit;

    if (!title.trim() || !description.trim() || !imageUrl.trim()) {
      showToast('Please fill in all fields', 'error');
      return false;
    }

    if (price <= 0) {
      showToast('Price must be greater than 0', 'error');
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      setTimeout(() => {
        if (currentBenefit.id) {
          // Update existing benefit
          setBenefits(prevBenefits =>
            prevBenefits.map(benefit =>
              benefit.id === currentBenefit.id ? currentBenefit : benefit
            )
          );
          showToast('Benefit updated successfully', 'success');
        } else {
          // Add new benefit
          const newBenefit = {
            ...currentBenefit,
            id: `benefit-${Date.now()}`,
            companyId: user?.id,
          };

          setBenefits(prevBenefits => [...prevBenefits, newBenefit]);
          showToast('Benefit added successfully', 'success');
        }

        closeModal();
      }, 1000);
    } catch (error) {
      console.error('Error saving benefit:', error);
      showToast('Failed to save benefit', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = () => {
    if (!currentBenefit) return;

    setIsSubmitting(true);

    try {
      // Simulate API call
      setTimeout(() => {
        setBenefits(prevBenefits =>
          prevBenefits.filter(benefit => benefit.id !== currentBenefit.id)
        );

        showToast('Benefit deleted successfully', 'success');
        closeModal();
      }, 1000);
    } catch (error) {
      console.error('Error deleting benefit:', error);
      showToast('Failed to delete benefit', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#2E2E2E]">Manage Benefits</h1>
          <p className="text-[#4B3F72]">Create and manage your benefit offerings</p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center px-4 py-2 bg-[#09EB7E] text-white rounded-md shadow-sm font-medium hover:bg-[#4B3F72] transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Benefit
        </button>
      </header>

      {/* Benefits List */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {benefits.length === 0 ? (
          <div className="p-8 text-center">
            <div className="bg-[#E0FAF3] p-3 rounded-full inline-flex mb-4">
              <Eye className="h-6 w-6 text-[#09EB7E]" />
            </div>
            <h3 className="text-lg font-medium text-[#2E2E2E] mb-1">No benefits yet</h3>
            <p className="text-[#4B3F72] mb-4">
              Start adding benefits to attract students
            </p>
            <button
              onClick={openAddModal}
              className="inline-flex items-center px-4 py-2 bg-[#09EB7E] text-white rounded-md shadow-sm font-medium hover:bg-[#4B3F72] transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add New Benefit
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#E1EBF7]">
              <thead className="bg-[#E1EBF7]">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#4B3F72] uppercase tracking-wider">
                    Benefit
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#4B3F72] uppercase tracking-wider">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-[#4B3F72] uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-[#4B3F72] uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-[#E1EBF7]">
                {benefits.map((benefit) => (
                  <tr key={benefit.id} className="hover:bg-[#E1EBF7]">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-md object-cover"
                            src={benefit.imageUrl}
                            alt={benefit.title}
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-[#2E2E2E]">{benefit.title}</div>
                          <div className="text-sm text-[#4B3F72] line-clamp-1">{benefit.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-[#2E2E2E]">{benefit.price} coins</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${benefit.active ? 'bg-[#E0FAF3] text-[#09EB7E]' : 'bg-gray-100 text-gray-800'
                        }`}>
                        {benefit.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => toggleBenefitStatus(benefit.id)}
                          className={`p-1 rounded-md ${benefit.active
                              ? 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                              : 'text-[#09EB7E] hover:text-[#4B3F72] hover:bg-[#E0FAF3]'
                            }`}
                          title={benefit.active ? 'Deactivate' : 'Activate'}
                        >
                          {benefit.active ? 'Deactivate' : 'Activate'}
                        </button>
                        <button
                          onClick={() => openEditModal(benefit)}
                          className="p-1 rounded-md text-[#4B3F72] hover:text-[#2E2E2E] hover:bg-[#E1EBF7]"
                          title="Edit"
                        >
                          <Pencil size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && currentBenefit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full">
            {/* Modal Header */}
            <div className="flex justify-between items-center border-b border-[#A3D9B1] p-4">
              <h3 className="text-lg font-semibold text-[#2E2E2E]">
                {currentBenefit.id ? 'Edit Benefit' : 'Add New Benefit'}
              </h3>
              <button onClick={closeModal} className="text-[#4B3F72] hover:text-[#2E2E2E]">
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            {deleteConfirmation ? (
              <div className="p-6">
                <div className="flex items-center justify-center">
                  <div className="bg-red-100 rounded-full p-3 mb-4">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                  </div>
                </div>
                <h4 className="text-lg font-medium text-center text-[#2E2E2E] mb-2">
                  Delete this benefit?
                </h4>
                <p className="text-center text-[#4B3F72] mb-6">
                  This action cannot be undone and will permanently remove this benefit.
                </p>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setDeleteConfirmation(null)}
                    className="px-4 py-2 border border-[#A3D9B1] text-[#4B3F72] rounded-md hover:bg-[#E1EBF7]"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDelete}
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors disabled:bg-red-300"
                  >
                    {isSubmitting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="title" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                      Title
                    </label>
                    <input
                      id="title"
                      name="title"
                      type="text"
                      value={currentBenefit.title}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-[#A3D9B1] rounded-md shadow-sm focus:outline-none focus:ring-[#4B3F72] focus:border-[#4B3F72]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      name="description"
                      rows={3}
                      value={currentBenefit.description}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-[#A3D9B1] rounded-md shadow-sm focus:outline-none focus:ring-[#4B3F72] focus:border-[#4B3F72]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="price" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                      Price (in coins)
                    </label>
                    <input
                      id="price"
                      name="price"
                      type="number"
                      min="1"
                      value={currentBenefit.price}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-[#A3D9B1] rounded-md shadow-sm focus:outline-none focus:ring-[#4B3F72] focus:border-[#4B3F72]"
                      required
                    />
                  </div>

                  <div>
                    <label htmlFor="imageUrl" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                      Image URL
                    </label>
                    <input
                      id="imageUrl"
                      name="imageUrl"
                      type="text"
                      value={currentBenefit.imageUrl}
                      onChange={handleChange}
                      className="block w-full px-3 py-2 border border-[#A3D9B1] rounded-md shadow-sm focus:outline-none focus:ring-[#4B3F72] focus:border-[#4B3F72]"
                      placeholder="https://example.com/image.jpg"
                      required
                    />
                    <p className="mt-1 text-xs text-[#4B3F72]">
                      Enter a URL for the benefit image
                    </p>
                  </div>

                  <div className="flex items-center">
                    <input
                      id="active"
                      name="active"
                      type="checkbox"
                      checked={currentBenefit.active}
                      onChange={handleCheckboxChange}
                      className="h-4 w-4 text-[#09EB7E] focus:ring-[#4B3F72] border-[#A3D9B1] rounded"
                    />
                    <label htmlFor="active" className="ml-2 block text-sm text-[#2E2E2E]">
                      Active (visible to students)
                    </label>
                  </div>

                  {currentBenefit.imageUrl && (
                    <div className="mt-2">
                      <p className="text-sm font-medium text-[#2E2E2E] mb-1">Image Preview</p>
                      <div className="border border-[#A3D9B1] rounded-md overflow-hidden">
                        <img
                          src={currentBenefit.imageUrl}
                          alt="Benefit Preview"
                          className="w-full h-40 object-cover"
                          onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                            e.currentTarget.src = 'https://via.placeholder.com/400x200?text=Invalid+Image+URL';
                          }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Modal Footer */}
                <div className="mt-6 flex justify-between gap-3">
                  {currentBenefit.id ? (
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmation(currentBenefit.id)}
                      className="px-4 py-2 border border-red-300 text-red-700 rounded-md hover:bg-red-50"
                    >
                      Delete
                    </button>
                  ) : (
                    <div></div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 border border-[#A3D9B1] text-[#4B3F72] rounded-md hover:bg-[#E1EBF7]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 bg-[#09EB7E] text-white rounded-md hover:bg-[#4B3F72] transition-colors disabled:bg-gray-300 flex items-center gap-2"
                    >
                      {isSubmitting
                        ? 'Saving...'
                        : currentBenefit.id
                          ? 'Save Changes'
                          : 'Add Benefit'
                      }
                      {!isSubmitting && <ArrowRight size={16} />}
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CompanyBenefits;