import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
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
    // If OAuth client IDs / backend endpoint available, redirect to backend OAuth flow
    const prov = provider.toLowerCase();
    const envFlag = process.env[`REACT_APP_${prov.toUpperCase()}_CLIENT_ID`];
    if (envFlag) {
      // open full-window redirect to backend OAuth route (backend should handle provider flow)
      window.location.href = `/api/auth/oauth/${prov}`;
      return;
    }

    // fallback stub (previous behavior)
    showToast(`${provider} sign-in successful`);
    setTimeout(() => {
      localStorage.setItem('token', `stub-${provider}`);
      navigate('/');
    }, 900);
  };

  // Geolocation removed — not required for signup. Keep credentials.geolocation for optional future use.

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
                Sign into your account
              </h1>
              <p style={{ marginTop: '8px', color: '#6b7280', textAlign: 'center' }}>
                Sign up and get 1 month free trial
              </p>

              <div style={{ position: 'relative', marginTop: '22px' }}>
                <div
                  style={{
                    display: 'flex',
                    gap: '12px',
                    background: '#f3f4f6',
                    borderRadius: '10px',
                    padding: '6px',
                  }}
                >
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
                    Sign up
                  </button>
                  <Link
                    to="/login"
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
                    Log in
                  </Link>
                </div>

                {/* Overlapping orange pill (adjusted for exact placement + optional icon) */}
                <div
                  style={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    top: -14,
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 10,
                      background: 'linear-gradient(90deg,#ff8a00,#ff4d4d)',
                      color: '#fff',
                      padding: '10px 20px',
                      borderRadius: 9999,
                      boxShadow: '0 12px 40px rgba(255,90,40,0.18)',
                      fontWeight: 800,
                      fontSize: '14px',
                    }}
                  >
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-hidden
                    >
                      <path d="M12 2L15 8H9L12 2Z" fill="white" />
                      <path
                        d="M12 22V9"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span>Get Started</span>
                  </div>
                </div>
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
                  htmlFor="signup-name"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    color: '#374151',
                    marginBottom: '8px',
                  }}
                >
                  Full name
                </label>
                <input
                  id="signup-name"
                  name="name"
                  value={credentials.name}
                  onChange={onChange}
                  required
                  placeholder="Enter your name"
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
                  htmlFor="signup-email"
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
                  id="signup-email"
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
                  htmlFor="signup-password"
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
                  id="signup-password"
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

                <label
                  htmlFor="signup-password2"
                  style={{
                    display: 'block',
                    fontSize: '13px',
                    color: '#374151',
                    marginBottom: '8px',
                  }}
                >
                  Repeat the password
                </label>
                <input
                  id="signup-password2"
                  name="password2"
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
                    {loading ? 'Signing up...' : 'Sign up'}
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
                    Sign up with Google
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
                    Sign up with Apple
                  </button>
                </div>

                <p style={{ fontSize: '12px', color: '#9ca3af', marginTop: '18px' }}>
                  By signing up, you agree to the{' '}
                  <a href="/terms" style={{ color: '#2563eb' }}>
                    Terms of Service
                  </a>{' '}
                  and{' '}
                  <a href="/privacy" style={{ color: '#2563eb' }}>
                    Privacy Policy
                  </a>
                  .
                </p>
              </form>

              {/* Toast */}
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
                  ←
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
                      Knowly has transformed the way I learn! The courses are well-structured,
                      engaging, and easy to follow. I highly recommend it for anyone looking to
                      upskill!
                    </p>
                    <div style={{ marginTop: '12px', color: '#a1b2c9', fontSize: '12px' }}>
                      Koushik · UI/UX Designer
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
