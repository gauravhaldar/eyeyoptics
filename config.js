// API Configuration
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// API Endpoints
export const API_ENDPOINTS = {
  // User endpoints
  USERS_SIGNUP: `${API_BASE_URL}/api/users/signup`,
  USERS_LOGIN: `${API_BASE_URL}/api/users/login`,
  USERS_LOGOUT: `${API_BASE_URL}/api/users/logout`,
  USERS_ME: `${API_BASE_URL}/api/users/me`,
  USERS_PROFILE: `${API_BASE_URL}/api/users/profile`,

  // Cart endpoints
  CART_ADD: `${API_BASE_URL}/api/cart/add`,
  CART_UPDATE: `${API_BASE_URL}/api/cart/update`,
  CART_REMOVE: `${API_BASE_URL}/api/cart/remove`,
  CART_CLEAR: `${API_BASE_URL}/api/cart/clear`,
  CART_GET: `${API_BASE_URL}/api/cart`,

  // Product endpoints
  PRODUCTS: `${API_BASE_URL}/api/products`,

  // Contact endpoints
  CONTACT_SUBMIT: `${API_BASE_URL}/api/contact/submit`,

  // Shipping endpoints
  SHIPPING_CALCULATE: `${API_BASE_URL}/api/shipping/calculate`,

  // Coupon endpoints
  COUPONS_APPLY: `${API_BASE_URL}/api/users/coupons/apply`,
  COUPONS_AVAILABLE: `${API_BASE_URL}/api/admin/coupons`,

   // Order endpoints
   ORDERS_CREATE: `${API_BASE_URL}/api/orders/create`,
   ORDERS_USER: `${API_BASE_URL}/api/orders/my-orders`,
   ORDERS_DETAIL: `${API_BASE_URL}/api/orders`,
};

// Helper function to get API URL
export const getApiUrl = (endpoint) => {
  return `${API_BASE_URL}${endpoint}`;
};
