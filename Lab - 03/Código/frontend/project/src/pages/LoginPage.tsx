import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      showToast('Please enter both email and password', 'error');
      return;
    }

    setIsLoading(true);

    try {
      const success = await login(email, password);

      if (success) {
        showToast('Login successful!', 'success');
        navigate(from);
      } else {
        showToast('Invalid email or password', 'error');
      }
    } catch (error) {
      showToast('An error occurred during login', 'error');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-skyMist px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-royalIndigo font-title">Meritus</h1>
          <p className="mt-2 text-slateGraphite text-sm">Academic Merit Recognition System</p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl p-8 mt-6">
          <h2 className="text-2xl font-semibold text-slateGraphite font-title mb-6">Sign In</h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slateGraphite mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 border border-slateGraphite rounded-md placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-mintProgress"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slateGraphite mb-1">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-slateGraphite rounded-md placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-mintProgress"
                placeholder="Enter your password"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex justify-center py-3 px-4 rounded-xl text-sm font-semibold text-white bg-mintProgress hover:bg-goldenAmber focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-royalIndigo transition ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
            </div>
          </form>

          <div className="mt-6 text-center text-sm text-slateGraphite">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-goldenAmber hover:text-royalIndigo">
              Sign up now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;