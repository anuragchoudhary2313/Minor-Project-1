import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Mail, Lock, MapPin, ArrowRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import { API_ENDPOINTS, apiCall } from '../utils/api';

export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    geolocation: '',
  });
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
      localStorage.setItem('token', `stub-${provider}`);
      navigate('/');
    }, 900);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const data = await apiCall(API_ENDPOINTS.SIGNUP, {
        method: 'POST',
        body: JSON.stringify({
          name: credentials.name,
          email: credentials.email,
          password: credentials.password,
          location: credentials.geolocation || '',
        }),
      });
      if (data.success) {
        localStorage.setItem('token', data.authToken);
        showToast('Account created — redirecting...');
        setTimeout(() => navigate('/login'), 900);
      } else {
        setError(data.error || 'Signup failed');
      }
    } catch (err) {
      setError(err.message || 'Signup failed. Please try again.');
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
          <div className="landing-pill mx-auto mb-3">Join The Elite</div>
          <h1 className="display-5 fw-black text-white mb-2">Create Account</h1>
          <p className="text-white-50">Sign up and get 1 month free delivery</p>
        </div>

        <div className="auth-toggle-group">
          <div className="auth-toggle-btn active">
            Sign Up
          </div>
          <Link to="/login" className="auth-toggle-btn">
            Log In
          </Link>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-4 bg-danger bg-opacity-10 border border-danger border-opacity-20 text-danger text-center small fw-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="auth-input-group">
            <label htmlFor="signup-name" className="auth-label">Full Name</label>
            <div className="auth-input-wrapper">
              <User className="auth-input-icon" size={20} />
              <input
                id="signup-name"
                name="name"
                value={credentials.name}
                onChange={onChange}
                required
                placeholder="John Doe"
                className="auth-input"
              />
            </div>
          </div>

          <div className="auth-input-group">
            <label htmlFor="signup-email" className="auth-label">Email Address</label>
            <div className="auth-input-wrapper">
              <Mail className="auth-input-icon" size={20} />
              <input
                id="signup-email"
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

          <div className="row g-3 mb-4">
            <div className="col-md-6">
              <div className="auth-input-group mb-0">
                <label htmlFor="signup-password" className="auth-label">Password</label>
                <div className="auth-input-wrapper">
                  <Lock className="auth-input-icon" size={20} />
                  <input
                    id="signup-password"
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
            </div>
            <div className="col-md-6">
              <div className="auth-input-group mb-0">
                <label htmlFor="signup-location" className="auth-label">Location (Optional)</label>
                <div className="auth-input-wrapper">
                  <MapPin className="auth-input-icon" size={20} />
                  <input
                    id="signup-location"
                    name="geolocation"
                    value={credentials.geolocation}
                    onChange={onChange}
                    placeholder="City, Country"
                    className="auth-input"
                  />
                </div>
              </div>
            </div>
          </div>

          <button type="submit" disabled={loading} className="landing-cta w-100 py-3 mb-4 shadow-lg">
            {loading ? 'Creating Account...' : (
              <span className="d-flex align-items-center justify-content-center">
                Get Started <ArrowRight size={20} className="ms-2" />
              </span>
            )}
          </button>

          <div className="d-flex align-items-center gap-3 mb-4">
            <div className="flex-grow-1 border-bottom border-white border-opacity-10"></div>
            <span className="small text-white-50 text-uppercase fw-bold letter-spacing-1">Or sign up with</span>
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
            By signing up, you agree to our{' '}
            <Link to="/terms" className="text-white text-decoration-underline opacity-75">Terms</Link> & <Link to="/privacy" className="text-white text-decoration-underline opacity-75">Privacy</Link>.
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
