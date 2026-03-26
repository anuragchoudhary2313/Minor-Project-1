let apiBaseUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const LOCAL_PORT_RANGE = [5000, 5001, 5002, 5003, 5004, 5005, 5006, 5007, 5008, 5009, 5010];

const ENDPOINT_PATHS = {
  LOGIN: '/api/auth/login',
  SIGNUP: '/api/auth/createuser',
  GET_USER: '/api/auth/getuser',
  GET_LOCATION: '/api/auth/getlocation',
  GET_FOOD_DATA: '/api/auth/foodData',
  PLACE_ORDER: '/api/auth/orderData',
  GET_MY_ORDERS: '/api/auth/myOrderData',
};

const buildEndpoint = (key) => `${apiBaseUrl}${ENDPOINT_PATHS[key]}`;

export const API_ENDPOINTS = new Proxy({}, {
  get: (_, prop) => {
    if (!Object.prototype.hasOwnProperty.call(ENDPOINT_PATHS, prop)) {
      return undefined;
    }
    return buildEndpoint(prop);
  },
});

export const getApiBaseUrl = () => apiBaseUrl;

const PROTECTED_ROUTE_PATTERNS = ['/api/auth/getuser', '/api/auth/orderData', '/api/auth/myOrderData'];

const shouldAttachAuthToken = (requestUrl) => {
  return PROTECTED_ROUTE_PATTERNS.some((pattern) => requestUrl.includes(pattern));
};

const canReachApi = async (baseUrl) => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 1200);

  try {
    const response = await fetch(`${baseUrl}/`, {
      method: 'GET',
      cache: 'no-store',
      signal: controller.signal,
    });
    if (!response.ok) {
      return false;
    }

    const payload = await response.json();
    return payload && payload.message === 'GoFood API Server' && payload.status === 'running';
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
};

const findActiveLocalApiBaseUrl = async () => {
  for (const port of LOCAL_PORT_RANGE) {
    const candidate = `http://localhost:${port}`;
    // Sequential probing avoids opening too many pending requests during startup.
    const isReachable = await canReachApi(candidate);
    if (isReachable) {
      return candidate;
    }
  }
  return null;
};

export const initializeApiBaseUrl = async () => {
  if (process.env.NODE_ENV === 'production') {
    return apiBaseUrl;
  }

  try {
    let runtimeUrl;
    const response = await fetch('/backend-runtime.json', { cache: 'no-store' });
    if (response.ok) {
      const runtimeConfig = await response.json();
      runtimeUrl = runtimeConfig && runtimeConfig.apiBaseUrl;
    }

    if (runtimeUrl && (await canReachApi(runtimeUrl))) {
      apiBaseUrl = runtimeUrl;
      return apiBaseUrl;
    }

    const discoveredApiBaseUrl = await findActiveLocalApiBaseUrl();
    if (discoveredApiBaseUrl) {
      apiBaseUrl = discoveredApiBaseUrl;
    }

    return apiBaseUrl;
  } catch (error) {
    const discoveredApiBaseUrl = await findActiveLocalApiBaseUrl();
    if (discoveredApiBaseUrl) {
      apiBaseUrl = discoveredApiBaseUrl;
      return apiBaseUrl;
    }
    console.warn('Using default API URL. Runtime config unavailable.', error.message);
  }

  return apiBaseUrl;
};

const executeRequest = async (requestUrl, options) => {
  const token = localStorage.getItem('token');
  const includeAuthToken = Boolean(token && shouldAttachAuthToken(requestUrl));

  const defaultOptions = {
    headers: {
      'Content-Type': 'application/json',
      ...(includeAuthToken && {
        'auth-token': token,
      }),
    },
  };

  const response = await fetch(requestUrl, {
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
};

const replaceLocalhostPortInUrl = (url, nextBaseUrl) => {
  return url.replace(/^https?:\/\/localhost:\d+/i, nextBaseUrl);
};

// API helper function
export const apiCall = async (url, options = {}) => {
  try {
    return await executeRequest(url, options);
  } catch (error) {
    const isNetworkError =
      process.env.NODE_ENV !== 'production' &&
      error instanceof TypeError &&
      error.message &&
      error.message.toLowerCase().includes('failed to fetch');

    if (isNetworkError) {
      const discoveredApiBaseUrl = await findActiveLocalApiBaseUrl();
      if (discoveredApiBaseUrl && discoveredApiBaseUrl !== apiBaseUrl) {
        apiBaseUrl = discoveredApiBaseUrl;
        const retryUrl = replaceLocalhostPortInUrl(url, discoveredApiBaseUrl);
        try {
          return await executeRequest(retryUrl, options);
        } catch (retryError) {
          console.error(`API Error (${retryUrl}):`, retryError);
          throw retryError;
        }
      }
    }

    console.error(`API Error (${url}):`, error);
    throw error;
  }
};

export default getApiBaseUrl;
