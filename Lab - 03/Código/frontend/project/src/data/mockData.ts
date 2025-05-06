// Mock data for the Student Currency System

// Users (Students, Professors, Companies)
export const mockUsers = [
  {
    id: 'student1',
    name: 'John Student',
    email: 'student@example.com',
    password: 'password', // In a real app, this would be hashed
    role: 'student',
    cpf: '123.456.789-00',
    rg: 'MG-12.345.678',
    address: 'Student Avenue, 123',
    institution: 'Federal University of Technology',
    course: 'Computer Science',
    coins: 350
  },
  {
    id: 'professor1',
    name: 'Dr. Smith',
    email: 'professor@example.com',
    password: 'password',
    role: 'professor',
    cpf: '987.654.321-00',
    department: 'Computer Science Department',
    institution: 'Federal University of Technology',
    coins: 800
  },
  {
    id: 'company1',
    name: 'Tech Books Store',
    email: 'company@example.com',
    password: 'password',
    role: 'company',
    cnpj: '12.345.678/0001-90',
    address: 'Commercial Street, 456'
  }
];

// Educational Institutions
export const mockInstitutions = [
  { id: 'inst1', name: 'Federal University of Technology' },
  { id: 'inst2', name: 'State University' },
  { id: 'inst3', name: 'Central Technical Institute' },
  { id: 'inst4', name: 'Regional College of Engineering' }
];

// Departments
export const mockDepartments = [
  { id: 'dept1', name: 'Computer Science', institutionId: 'inst1' },
  { id: 'dept2', name: 'Electrical Engineering', institutionId: 'inst1' },
  { id: 'dept3', name: 'Mathematics', institutionId: 'inst1' },
  { id: 'dept4', name: 'Physics', institutionId: 'inst2' },
  { id: 'dept5', name: 'Biology', institutionId: 'inst2' }
];

// Courses
export const mockCourses = [
  { id: 'course1', name: 'Computer Science', institutionId: 'inst1' },
  { id: 'course2', name: 'Information Systems', institutionId: 'inst1' },
  { id: 'course3', name: 'Electrical Engineering', institutionId: 'inst1' },
  { id: 'course4', name: 'Civil Engineering', institutionId: 'inst2' },
  { id: 'course5', name: 'Medicine', institutionId: 'inst2' }
];

// Benefits offered by partner companies
export const mockBenefits = [
  {
    id: 'benefit1',
    companyId: 'company1',
    title: 'Programming Books Discount',
    description: '20% discount on any programming book from our store',
    price: 150,
    imageUrl: 'https://images.pexels.com/photos/2846814/pexels-photo-2846814.jpeg',
    active: true
  },
  {
    id: 'benefit2',
    companyId: 'company1',
    title: 'University Cafeteria Voucher',
    description: 'Free meal voucher for the university cafeteria',
    price: 50,
    imageUrl: 'https://images.pexels.com/photos/6814354/pexels-photo-6814354.jpeg',
    active: true
  },
  {
    id: 'benefit3',
    companyId: 'company1',
    title: 'Monthly Subscription Discount',
    description: '50% off on a monthly subscription to CodePro learning platform',
    price: 200,
    imageUrl: 'https://images.pexels.com/photos/6238297/pexels-photo-6238297.jpeg',
    active: true
  },
  {
    id: 'benefit4',
    companyId: 'company1',
    title: 'Stationery Kit',
    description: 'Complete stationery kit with notebook, pens, and more',
    price: 100,
    imageUrl: 'https://images.pexels.com/photos/6161338/pexels-photo-6161338.jpeg',
    active: true
  }
];

// Transactions (coin transfers and benefit redemptions)
export const mockTransactions = [
  {
    id: 'trans1',
    type: 'award',
    fromId: 'professor1',
    toId: 'student1',
    amount: 50,
    message: 'Excellent participation in class discussion',
    createdAt: '2023-11-10T14:30:00Z'
  },
  {
    id: 'trans2',
    type: 'award',
    fromId: 'professor1',
    toId: 'student1',
    amount: 100,
    message: 'Outstanding project presentation',
    createdAt: '2023-11-05T10:15:00Z'
  },
  {
    id: 'trans3',
    type: 'redemption',
    fromId: 'student1',
    benefitId: 'benefit2',
    amount: 50,
    code: 'MEAL-123456',
    status: 'completed',
    createdAt: '2023-11-01T09:45:00Z'
  }
];