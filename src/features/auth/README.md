# Auth Feature

This directory contains all authentication-related functionality for the application.

## Structure

```
auth/
├── hooks/
│   └── useAuth.ts          # Main authentication controller
├── store/
│   └── useAuthStore.ts     # Zustand store for authentication state (memory-only)
└── components/
    └── LoginForm.tsx       # Login form component
```

## Key Components

- **useAuth.ts**: Main authentication hook that handles login, logout, and token management
- **useAuthStore.ts**: Zustand store that holds authentication state in memory (never persisted)
- **LoginForm.tsx**: UI component for the login form

## Security

- Authentication tokens are stored securely using expo-secure-store
- Access tokens are kept in memory only (never persisted)
- Refresh tokens are stored securely with hardware authentication when available