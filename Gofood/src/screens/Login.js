import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import { API_ENDPOINTS, apiCall } from '../utils/api';

export default function Login() {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState('');
  const navigate = useNavigate();

  const showToast = (msg = '') => {
    setToast(msg);
    if (msg) setTimeout(() => setToast(''), 3000);
  };

  const handleSocial = (provider) => {
    const prov = provider.toLowerCase();
    const envFlag = process.env[`REACT_APP_${prov.toUpperCase()}_CLIENT_ID`];
    if (envFlag) {
      window.location.href = `/api/auth/oauth/${prov}`;
      return;
    }
    showToast(`${provider} sign-in successful`);
    setTimeout(() => {
      localStorage.setItem('userEmail', `guest-${provider.toLowerCase()}@gofood.com`);
      localStorage.setItem('token', `stub-${provider}`);
      navigate('/');
    }, 900);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await apiCall(API_ENDPOINTS.LOGIN, {
        method: 'POST',
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });
      if (data.success) {
        localStorage.setItem('userEmail', credentials.email);
        localStorage.setItem('token', data.authToken);
        showToast('Logged in — redirecting...');
        setTimeout(() => navigate('/'), 900);
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError(err.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

  return (
    <div className="auth-page-root">
      <Navbar />
      
      <div className="auth-card-glass">
        <div className="text-center mb-5">
          <div className="landing-pill mx-auto mb-3">Welcome Back</div>
          <h1 className="display-5 fw-black text-white mb-2">Sign In</h1>
          <p className="text-white-50">Enter your credentials to access your account</p>
        </div>

        <div className="auth-toggle-group">
          <Link to="/signup" className="auth-toggle-btn">
            Sign Up
          </Link>
          <div className="auth-toggle-btn active">
            Log In
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-4 bg-danger bg-opacity-10 border border-danger border-opacity-20 text-danger text-center small fw-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label htmlFor="login-email" className="auth-label">Email Address</label>
            <div className="auth-input-wrapper">
              <Mail className="auth-input-icon" size={20} />
              <input
                id="login-email"
                name="email"
                value={credentials.email}
                onChange={onChange}
                required
                type="email"
                placeholder="name@example.com"
                className="auth-input"
              />
            </div>
          </div>

          <div className="auth-input-group mb-5">
            <label htmlFor="login-password" className="auth-label">Password</label>
            <div className="auth-input-wrapper">
              <Lock className="auth-input-icon" size={20} />
              <input
                id="login-password"
                name="password"
                value={credentials.password}
                onChange={onChange}
                required
                type="password"
                placeholder="••••••••"
                className="auth-input"
              />
            </div>
          </div>

          <button type="submit" disabled={loading} className="landing-cta w-100 py-3 mb-4 shadow-lg">
            {loading ? 'Authenticating...' : (
              <span className="d-flex align-items-center justify-content-center">
                Sign In Now <ArrowRight size={20} className="ms-2" />
              </span>
            )}
          </button>

          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="flex-grow-1 border-bottom border-white border-opacity-10"></div>
            <span className="small text-white-50 text-uppercase fw-bold letter-spacing-1">Or continue with</span>
            <div className="flex-grow-1 border-bottom border-white border-opacity-10"></div>
          </div>

          <div className="d-flex gap-3 mb-5">
            <button type="button" onClick={() => handleSocial('Google')} className="social-btn-elite">
              <img src="https://www.vectorlogo.zone/logos/google/google-icon.svg" width="20" alt="Google" /> Google
            </button>
            <button type="button" onClick={() => handleSocial('Apple')} className="social-btn-elite">
               <img src="https://www.vectorlogo.zone/logos/apple/apple-icon.svg" width="20" alt="Apple" /> Apple
            </button>
          </div>

          <p className="text-center mb-0 text-white-50 small">
            Don&apos;t have an account?{' '}
            <Link to="/signup" className="text-amber-500 fw-bold text-decoration-none">
              Create an account
            </Link>
          </p>
        </form>

        {toast && (
          <div className="position-fixed bottom-0 start-50 translate-middle-x mb-5 p-3 rounded-4 bg-amber-500 text-slate-900 fw-black shadow-lg z-3">
             {toast}
          </div>
        )}
      </div>
    </div>
  );
}
