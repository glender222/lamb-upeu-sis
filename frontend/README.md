# LAMB UPEU SIS - Frontend

React + Vite + TypeScript frontend application for LAMB UPEU SIS (Sistema de Información).

## 🚀 Features

- ✅ **Authentication System**: Login, Register, JWT token management with auto-refresh
- ✅ **Category Management**: CRUD operations for categories
- ✅ **User Management**: Complete user administration with roles and statuses
- ✅ **User Statistics**: Dashboard with role and status statistics
- ✅ **Protected Routes**: Authentication-based route protection
- ✅ **Responsive Design**: Mobile-friendly interface
- ✅ **Type Safety**: Full TypeScript implementation
- ✅ **Modern UI**: Clean and intuitive user interface

## 🛠️ Technology Stack

- **React 18** - UI Library
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **React Router DOM** - Client-side routing
- **Axios** - HTTP client with interceptors
- **React Hook Form** - Form management
- **Zod** - Schema validation

## 📋 Prerequisites

- Node.js 18+ and npm
- Backend API running on `http://localhost:8080`

## 🔧 Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
```

Edit `.env` file if your backend API is on a different URL:
```env
VITE_API_BASE_URL=http://localhost:8080/api/v1
```

## 🚀 Running the Application

### Development Mode
```bash
npm run dev
```
The application will be available at `http://localhost:5173`

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable components
│   │   ├── common/          # Common components (ProtectedRoute, etc.)
│   │   └── layout/          # Layout components (Navbar, etc.)
│   ├── contexts/            # React contexts (AuthContext)
│   ├── pages/               # Page components
│   │   ├── auth/            # Login, Register
│   │   ├── categories/      # Category CRUD pages
│   │   └── users/           # User CRUD pages
│   ├── services/            # API services
│   │   ├── api.ts           # Axios configuration
│   │   ├── authService.ts   # Authentication API
│   │   ├── categoryService.ts # Category API
│   │   └── userService.ts   # User API
│   ├── types/               # TypeScript types/interfaces
│   ├── App.tsx              # Main app component with routing
│   └── main.tsx             # Entry point
├── .env.example             # Environment variables template
├── package.json             # Dependencies and scripts
└── README.md               # This file
```

## 🔐 Authentication

The application uses JWT bearer token authentication:

1. **Login/Register**: User credentials are sent to `/api/v1/auth/login` or `/api/v1/auth/register`
2. **Token Storage**: Access and refresh tokens are stored in localStorage
3. **Auto Refresh**: Axios interceptor automatically refreshes expired tokens
4. **Protected Routes**: Routes require authentication via `ProtectedRoute` component

### Example Login
```typescript
const response = await AuthService.login({
  username: "usuario123",
  password: "password123"
});
// Tokens are automatically stored and added to subsequent requests
```

## 📝 API Integration

All API calls are made through service classes:

### Auth Service
- `login(credentials)` - User login
- `register(data)` - User registration
- `refreshToken(token)` - Refresh access token
- `logout(token)` - User logout
- `validateToken()` - Validate current token

### Category Service
- `getAll(activeOnly?)` - Get all categories
- `getById(id)` - Get category by ID
- `create(data)` - Create new category
- `update(id, data)` - Update category
- `delete(id)` - Delete category

### User Service
- `getAll(status?, role?)` - Get all users with filters
- `getById(id)` - Get user by ID
- `getByUsername(username)` - Get user by username
- `create(data)` - Create new user
- `update(id, data)` - Update user
- `changePassword(id, data)` - Change user password
- `delete(id)` - Delete user
- `getStats()` - Get user statistics

## 🎨 Available Pages

### Public Routes
- `/login` - User login
- `/register` - User registration

### Protected Routes
- `/` - Dashboard (Home)
- `/categories` - Category list
- `/categories/new` - Create category
- `/categories/:id` - View category
- `/categories/:id/edit` - Edit category
- `/users` - User list
- `/users/new` - Create user
- `/users/:id` - View user
- `/users/:id/edit` - Edit user
- `/users/stats` - User statistics

## 🔍 Features Details

### Categories Module
- List all categories with active/inactive filter
- Create new categories with name, description, and status
- View category details
- Edit category information
- Delete categories
- Real-time status badges

### Users Module
- List all users with role and status filters
- Create users with complete profile information
- View user details including audit information
- Edit user profiles, roles, and statuses
- Delete users
- View comprehensive statistics by role and status
- Password management

### Authentication Flow
1. User logs in or registers
2. JWT tokens (access + refresh) are received and stored
3. Access token is automatically added to all API requests
4. On 401 error, refresh token is used to get new access token
5. If refresh fails, user is redirected to login

## 🐛 Troubleshooting

### CORS Errors
Ensure backend allows requests from `http://localhost:5173`. Add CORS configuration in backend.

### Token Refresh Loops
Check that refresh token endpoint returns valid tokens and doesn't require authentication.

### API Connection Issues
1. Verify backend is running on configured URL
2. Check `.env` file has correct `VITE_API_BASE_URL`
3. Check browser console for specific errors

## 📚 Additional Resources

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)

## 📄 License

This project is part of LAMB UPEU SIS system.
