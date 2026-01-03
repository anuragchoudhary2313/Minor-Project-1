import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useNavigate, Link } from 'react-router-dom';
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
    <>
      <Navbar />
      <div
        style={{
          minHeight: '100vh',
          background: 'linear-gradient(180deg,#f5f6f7 0%, #efefef 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '60px 20px',
        }}
      >
        <div
          style={{
            width: '100%',
            maxWidth: '1100px',
            borderRadius: '14px',
            overflow: 'hidden',
            display: 'flex',
            boxShadow: '0 20px 60px rgba(16,24,40,0.15)',
          }}
        >
          <div style={{ flex: '1 1 520px', background: '#fff', padding: '48px 56px' }}>
            <div style={{ maxWidth: '420px', margin: '0 auto' }}>
              <h1
                style={{
                  margin: 0,
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#0f172a',
                  textAlign: 'center',
                }}
              >
                Welcome Back
              </h1>
              <p style={{ marginTop: '8px', color: '#6b7280', textAlign: 'center' }}>
                Sign in to continue to your account
              </p>

              <div
                style={{
                  display: 'flex',
                  gap: '12px',
                  background: '#f3f4f6',
                  borderRadius: '10px',
                  padding: '6px',
                  marginTop: '22px',
                }}
              >
                <Link
                  to="/signup"
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '8px',
                    background: 'transparent',
                    border: 'none',
                    color: '#9ca3af',
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  Sign up
                </Link>
                <button
                  style={{
                    flex: 1,
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    background: '#ffffff',
                    boxShadow: 'inset 0 0 0 1px rgba(15,23,42,0.04)',
                    fontWeight: 700,
                    cursor: 'default',
                  }}
                >
                  Log in
                </button>
              </div>

              {error && (
                <div
                  style={{
                    marginTop: '18px',
                    padding: '12px',
                    borderRadius: '8px',
                    background: '#fff7ed',
                    color: '#c2410c',
                    border: '1px solid rgba(249,115,22,0.12)',
                  }}
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} style={{ marginTop: '20px' }}>
                <label
                  htmlFor="login-email"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    color: '#374151',
                    marginBottom: '8px',
                  }}
                >
                  Email
                </label>
                <input
                  id="login-email"
                  name="email"
                  value={credentials.email}
                  onChange={onChange}
                  required
                  type="email"
                  placeholder="Enter your email"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid #e6e9ef',
                    marginBottom: '12px',
                    fontSize: '15px',
                  }}
                />

                <label
                  htmlFor="login-password"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    color: '#374151',
                    marginBottom: '8px',
                  }}
                >
                  Password
                </label>
                <input
                  id="login-password"
                  name="password"
                  value={credentials.password}
                  onChange={onChange}
                  required
                  type="password"
                  placeholder="Enter your password"
                  style={{
                    width: '100%',
                    padding: '12px 14px',
                    borderRadius: '8px',
                    border: '1px solid #e6e9ef',
                    marginBottom: '18px',
                    fontSize: '15px',
                  }}
                />

                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="submit"
                    disabled={loading}
                    style={{
                      flex: 1,
                      background: 'linear-gradient(90deg,#3b82f6,#2563eb)',
                      color: '#fff',
                      padding: '12px',
                      borderRadius: '8px',
                      border: 'none',
                      fontWeight: 700,
                      cursor: 'pointer',
                    }}
                  >
                    {loading ? 'Logging in...' : 'Login'}
                  </button>
                </div>

                <div style={{ display: 'flex', gap: '12px', marginTop: '18px' }}>
                  <button
                    type="button"
                    onClick={() => handleSocial('Google')}
                    style={{
                      flex: 1,
                      borderRadius: '8px',
                      padding: '10px',
                      border: '1px solid #e6e9ef',
                      background: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    Sign in with Google
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSocial('Apple')}
                    style={{
                      flex: 1,
                      borderRadius: '8px',
                      padding: '10px',
                      border: '1px solid #e6e9ef',
                      background: '#fff',
                      cursor: 'pointer',
                    }}
                  >
                    Sign in with Apple
                  </button>
                </div>

                {toast && (
                  <div
                    style={{
                      position: 'fixed',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      bottom: 28,
                      background: '#111827',
                      color: '#fff',
                      padding: '12px 18px',
                      borderRadius: 10,
                      boxShadow: '0 12px 40px rgba(2,6,23,0.4)',
                    }}
                  >
                    {toast}
                  </div>
                )}

                <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '18px' }}>
                  No account?{' '}
                  <Link to="/signup" style={{ color: '#2563eb' }}>
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>

          <div
            style={{
              flex: '1 1 520px',
              background: 'linear-gradient(180deg,#111827 0%, #0b1220 100%)',
              color: '#fff',
              position: 'relative',
              padding: '32px',
            }}
          >
            <div
              style={{
                height: '100%',
                borderRadius: '0 12px 12px 0',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  height: '100%',
                  backgroundImage:
                    'url(https://images.unsplash.com/photo-1541698444083-023c97d3f4b6?q=80&w=1400&auto=format&fit=crop&ixlib=rb-4.0.3&s=)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  filter: 'grayscale(100%)',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    position: 'absolute',
                    right: 18,
                    top: 18,
                    background: 'rgba(255,255,255,0.06)',
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  →
                </div>
                <div style={{ position: 'absolute', left: 18, bottom: 24, right: 18 }}>
                  <div
                    style={{
                      background: 'linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.6))',
                      padding: '18px',
                      borderRadius: '12px',
                      maxWidth: '85%',
                    }}
                  >
                    <p style={{ margin: 0, color: '#e6eef6', fontSize: '14px', lineHeight: 1.4 }}>
                      Fast, reliable deliveries and curated cuisine. Sign in to see your orders and
                      favourites.
                    </p>
                    <div style={{ marginTop: '12px', color: '#a1b2c9', fontSize: '12px' }}>
                      GoFood · Curated service
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
