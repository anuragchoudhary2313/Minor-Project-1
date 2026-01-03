// API configuration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  SIGNUP: `${API_BASE_URL}/api/auth/createuser`,
  GET_USER: `${API_BASE_URL}/api/auth/getuser`,
  GET_LOCATION: `${API_BASE_URL}/api/auth/getlocation`,

  // Food endpoints
  GET_FOOD_DATA: `${API_BASE_URL}/api/auth/foodData`,

  // Order endpoints
  PLACE_ORDER: `${API_BASE_URL}/api/auth/orderData`,
  GET_MY_ORDERS: `${API_BASE_URL}/api/auth/myOrderData`,
};

// API helper function
export const apiCall = async (url, options = {}) => {
  try {
    const defaultOptions = {
      headers: {
        'Content-Type': 'application/json',
        ...(localStorage.getItem('token') && {
          'auth-token': localStorage.getItem('token'),
        }),
      },
    };

    const response = await fetch(url, {
      ...defaultOptions,
      ...options,
      headers: {
        ...defaultOptions.headers,
        ...options.headers,
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

export default API_BASE_URL;
