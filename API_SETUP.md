# API Configuration Setup Guide - Eyeyoptics

## Overview

All hardcoded `http://localhost:8000` URLs in the eyeyoptics codebase have been replaced with environment variable references using `process.env.NEXT_PUBLIC_API_URL`.

## Setup Instructions

### 1. Create Environment File

Create a `.env.local` file in the `eyeyoptics` directory with the following content:

```bash
# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000

# Environment
NODE_ENV=development
```

### 2. Environment Variables Explained

- **NEXT_PUBLIC_API_URL**: The base URL for your backend API
  - Development: `http://localhost:8000`
  - Production: `https://your-production-domain.com`

### 3. Files Updated

The following files have been updated to use the environment variable:

#### Context Files:

- `context/CartContext.js` - Cart management API calls
- `context/AuthContext.js` - Authentication API calls

#### Page Files:

- `app/contact/page.js` - Contact form submission
- `app/women/page.js` - Women's products
- `app/men/page.js` - Men's products
- `app/kids/page.js` - Kids' products
- `app/hot-sellers/page.js` - Hot sellers products
- `app/new-arrivals/page.js` - New arrivals products
- `app/sunglasses/page.js` - Sunglasses products
- `app/computer-glasses/page.js` - Computer glasses products
- `app/contact-lenses/page.js` - Contact lenses products
- `app/power-glasses/page.js` - Power glasses products
- `app/eyeglasses/page.js` - Eyeglasses products

#### Product Detail Pages:

- `app/sunglasses/[slug]/page.js` - Individual sunglasses product
- `app/computer-glasses/[slug]/page.js` - Individual computer glasses product
- `app/contact-lenses/[slug]/page.js` - Individual contact lenses product
- `app/power-glasses/[slug]/page.js` - Individual power glasses product
- `app/eyeglasses/[slug]/page.js` - Individual eyeglasses product

#### Component Files:

- `components/AddressModal.js` - Shipping calculation API

#### Configuration:

- `config.js` - Centralized API configuration

### 4. Usage Pattern

All API calls now use this pattern:

```javascript
const res = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"}/api/endpoint`,
  {
    // ... fetch options
  }
);
```

### 5. Fallback Behavior

If `NEXT_PUBLIC_API_URL` is not set, the system will fallback to `http://localhost:8000` for backward compatibility.

### 6. Production Deployment

For production deployment, set the environment variable to your production API URL:

```bash
NEXT_PUBLIC_API_URL=https://your-production-api.com
```

### 7. Testing

After setting up the environment variable:

1. Restart your development server:

   ```bash
   npm run dev
   ```

2. Test the application functionality to ensure all API calls work correctly:
   - User registration and login
   - Product browsing
   - Cart functionality
   - Contact form submission
   - Address validation

### 8. Benefits

- ✅ **Environment Flexibility**: Easy switching between development and production
- ✅ **Centralized Configuration**: All API URLs managed in one place
- ✅ **Backward Compatibility**: Fallback to localhost if env var not set
- ✅ **Production Ready**: No hardcoded URLs in production code

### 9. API Endpoints Covered

The following API endpoints are now configurable:

#### User Management:

- `/api/users/signup` - User registration
- `/api/users/login` - User login
- `/api/users/logout` - User logout
- `/api/users/me` - Get current user
- `/api/users/profile` - Update user profile

#### Cart Management:

- `/api/cart/add` - Add item to cart
- `/api/cart/update` - Update cart item
- `/api/cart/remove` - Remove item from cart
- `/api/cart/clear` - Clear entire cart
- `/api/cart/:userId` - Get user's cart

#### Product Management:

- `/api/products` - Get all products
- `/api/products/:slug` - Get specific product
- `/api/products?category=...` - Get products by category
- `/api/products?women=true` - Get women's products
- `/api/products?men=true` - Get men's products
- `/api/products?kids=true` - Get kids' products
- `/api/products?hotSeller=true` - Get hot sellers
- `/api/products?newArrival=true` - Get new arrivals

#### Contact & Shipping:

- `/api/contact/submit` - Submit contact form
- `/api/shipping/calculate` - Calculate shipping costs

### 10. Next Steps

You can now:

1. Set different API URLs for different environments
2. Deploy to production with the correct API endpoint
3. Use the centralized `config.js` for additional API configuration

## Troubleshooting

If you encounter issues:

1. **Check Environment File**: Ensure `.env.local` exists and has the correct variable name
2. **Restart Server**: Restart the development server after adding environment variables
3. **Check Variable Name**: Ensure you're using `NEXT_PUBLIC_API_URL` (not `API_URL`)
4. **Verify Fallback**: The fallback URL should work if the environment variable is missing
5. **Check Network Tab**: Use browser dev tools to verify API calls are using the correct URL
