import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';
import { mockInstitutions, mockCourses, mockDepartments } from '../data/mockData';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student',
    cpf: '',
    rg: '',
    address: '',
    institution: '',
    course: '',
    department: '',
    cnpj: ''
  });

  const [isLoading, setIsLoading] = useState(false);
  const [institutions, setInstitutions] = useState(mockInstitutions);
  const [courses, setCourses] = useState<any[]>([]);
  const [departments, setDepartments] = useState<any[]>([]);

  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (formData.institution) {
      setCourses(mockCourses.filter(course => course.institutionId === formData.institution));
      setDepartments(mockDepartments.filter(dept => dept.institutionId === formData.institution));
    } else {
      setCourses([]);
      setDepartments([]);
    }
  }, [formData.institution]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      showToast('Passwords do not match', 'error');
      return false;
    }

    if (formData.role === 'student') {
      if (!formData.cpf || !formData.rg || !formData.address || !formData.institution || !formData.course) {
        showToast('Please fill in all required fields', 'error');
        return false;
      }
    } else if (formData.role === 'professor') {
      if (!formData.cpf || !formData.institution || !formData.department) {
        showToast('Please fill in all required fields', 'error');
        return false;
      }
    } else if (formData.role === 'company') {
      if (!formData.cnpj || !formData.address) {
        showToast('Please fill in all required fields', 'error');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const success = await register(formData);

      if (success) {
        showToast('Registration successful!', 'success');

        switch (formData.role) {
          case 'student':
            navigate('/student');
            break;
          case 'professor':
            navigate('/professor');
            break;
          case 'company':
            navigate('/company');
            break;
          default:
            navigate('/');
        }
      } else {
        showToast('Registration failed. Please try again.', 'error');
      }
    } catch (error) {
      showToast('An error occurred during registration', 'error');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-[#E1EBF7] to-[#A3D9B1] py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-[#4B3F72]" style={{ fontFamily: 'Poppins, sans-serif' }}>Meritus</h1>
          <p className="mt-2 text-[#2E2E2E]" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            Sistema de Reconhecimento de Mérito Acadêmico
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg p-8 mt-8">
          <h2 className="text-2xl font-semibold text-[#2E2E2E] mb-6" style={{ fontFamily: 'Poppins, sans-serif' }}>
            Create Your Account
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-medium text-[#2E2E2E] mb-1">I am a</label>
              <div className="flex space-x-4">
                <div className="flex items-center">
                  <input
                    id="student"
                    name="role"
                    type="radio"
                    value="student"
                    checked={formData.role === 'student'}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#4B3F72] focus:ring-[#A3D9B1]"
                  />
                  <label htmlFor="student" className="ml-2 block text-sm text-[#2E2E2E]">
                    Student
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="professor"
                    name="role"
                    type="radio"
                    value="professor"
                    checked={formData.role === 'professor'}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#4B3F72] focus:ring-[#A3D9B1]"
                  />
                  <label htmlFor="professor" className="ml-2 block text-sm text-[#2E2E2E]">
                    Professor
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="company"
                    name="role"
                    type="radio"
                    value="company"
                    checked={formData.role === 'company'}
                    onChange={handleChange}
                    className="h-4 w-4 text-[#4B3F72] focus:ring-[#A3D9B1]"
                  />
                  <label htmlFor="company" className="ml-2 block text-sm text-[#2E2E2E]">
                    Company
                  </label>
                </div>
              </div>
            </div>

            <div>
              <label htmlFor="name" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                {formData.role === 'company' ? 'Company Name' : 'Full Name'}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#A3D9B1] focus:border-[#A3D9B1]"
                placeholder={formData.role === 'company' ? "Company name" : "Your full name"}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#A3D9B1] focus:border-[#A3D9B1]"
                placeholder="Your email address"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="new-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#A3D9B1] focus:border-[#A3D9B1]"
                  placeholder="Create a password"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#A3D9B1] focus:border-[#A3D9B1]"
                  placeholder="Confirm your password"
                />
              </div>
            </div>

            {formData.role === 'student' && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cpf" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                      CPF
                    </label>
                    <input
                      id="cpf"
                      name="cpf"
                      type="text"
                      value={formData.cpf}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-[#A3D9B1] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4B3F72] focus:border-[#4B3F72]"
                      placeholder="000.000.000-00"
                    />
                  </div>

                  <div>
                    <label htmlFor="rg" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                      RG
                    </label>
                    <input
                      id="rg"
                      name="rg"
                      type="text"
                      value={formData.rg}
                      onChange={handleChange}
                      className="appearance-none block w-full px-3 py-2 border border-[#A3D9B1] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4B3F72] focus:border-[#4B3F72]"
                      placeholder="00.000.000-0"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-[#A3D9B1] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4B3F72] focus:border-[#4B3F72]"
                    placeholder="Your full address"
                  />
                </div>

                <div>
                  <label htmlFor="institution" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                    Educational Institution
                  </label>
                  <select
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-[#A3D9B1] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4B3F72] focus:border-[#4B3F72]"
                  >
                    <option value="">Select an institution</option>
                    {institutions.map((inst) => (
                      <option key={inst.id} value={inst.id}>
                        {inst.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="course" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                    Course
                  </label>
                  <select
                    id="course"
                    name="course"
                    value={formData.course}
                    onChange={handleChange}
                    disabled={!formData.institution}
                    className="appearance-none block w-full px-3 py-2 border border-[#A3D9B1] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4B3F72] focus:border-[#4B3F72]"
                  >
                    <option value="">Select a course</option>
                    {courses.map((course) => (
                      <option key={course.id} value={course.id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {formData.role === 'professor' && (
              <>
                <div>
                  <label htmlFor="cpf" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                    CPF
                  </label>
                  <input
                    id="cpf"
                    name="cpf"
                    type="text"
                    value={formData.cpf}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-[#A3D9B1] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4B3F72] focus:border-[#4B3F72]"
                    placeholder="000.000.000-00"
                  />
                </div>

                <div>
                  <label htmlFor="institution" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                    Educational Institution
                  </label>
                  <select
                    id="institution"
                    name="institution"
                    value={formData.institution}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-[#A3D9B1] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4B3F72] focus:border-[#4B3F72]"
                  >
                    <option value="">Select an institution</option>
                    {institutions.map((inst) => (
                      <option key={inst.id} value={inst.id}>
                        {inst.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="department" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                    Department
                  </label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                    disabled={!formData.institution}
                    className="appearance-none block w-full px-3 py-2 border border-[#A3D9B1] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4B3F72] focus:border-[#4B3F72]"
                  >
                    <option value="">Select a department</option>
                    {departments.map((dept) => (
                      <option key={dept.id} value={dept.id}>
                        {dept.name}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {formData.role === 'company' && (
              <>
                <div>
                  <label htmlFor="cnpj" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                    CNPJ
                  </label>
                  <input
                    id="cnpj"
                    name="cnpj"
                    type="text"
                    value={formData.cnpj}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-[#A3D9B1] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4B3F72] focus:border-[#4B3F72]"
                    placeholder="00.000.000/0000-00"
                  />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-[#2E2E2E] mb-1">
                    Address
                  </label>
                  <input
                    id="address"
                    name="address"
                    type="text"
                    value={formData.address}
                    onChange={handleChange}
                    className="appearance-none block w-full px-3 py-2 border border-[#A3D9B1] rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#4B3F72] focus:border-[#4B3F72]"
                    placeholder="Company address"
                  />
                </div>
              </>
            )}

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#09EB7E] hover:bg-[#09C1EB] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#09EBCB] transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Registering...' : 'Register'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <p className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="font-medium text-[#09EBCB] hover:text-[#09C1EB]">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;