# NovaRN Source Code Structure

This document outlines the organization of the NovaRN template source code.

## Directory Structure

```
src/
├── assets               # Static assets (images, fonts)
├── components           # Shared UI components
│   ├── ui               # Reusable UI components
│   │   ├── README.md
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── alert.tsx
│   │   ├── loading.tsx
│   │   ├── modal.tsx
│   │   ├── checkbox.tsx
│   │   └── collapsible.tsx
│   ├── README.md
│   ├── ErrorBoundary.tsx
│   ├── ErrorExample.tsx
│   ├── Form.tsx
│   ├── ThemeToggle.tsx
│   └── WelcomeScreen.tsx
├── constants            # App-wide constants
│   ├── README.md
│   └── theme.ts
├── features             # Feature-specific modules
│   ├── auth
│   │   ├── components
│   │   │   └── LoginForm.tsx
│   │   ├── hooks
│   │   │   └── useAuth.ts
│   │   ├── store
│   │   │   └── useAuthStore.ts
│   │   └── README.md
│   ├── tasks
│   │   ├── components
│   │   │   └── TaskItem.tsx
│   │   ├── hooks
│   │   │   └── useTasks.ts
│   │   └── README.md
│   └── README.md
├── shared               # Shared utilities and components
│   ├── api
│   │   ├── README.md
│   │   ├── client.ts
│   │   ├── mockApi.ts
│   │   └── queryClient.ts
│   ├── components
│   │   ├── README.md
│   │   ├── ThemeToggle.tsx
│   │   └── WelcomeScreen.tsx
│   ├── hooks
│   │   ├── README.md
│   │   ├── use-app-theme.ts
│   │   ├── use-color-scheme.ts
│   │   ├── use-color-scheme.web.ts
│   │   ├── use-theme-color.ts
│   │   ├── useAuthBoundary.ts
│   │   ├── useForm.ts
│   │   └── useErrorHandler.ts
│   ├── providers
│   │   ├── QueryProvider.tsx
│   │   └── README.md
│   ├── store
│   │   ├── README.md
│   │   └── useThemeStore.ts        # Zustand + persist (MMKV)
│   ├── theme
│   │   ├── README.md
│   │   ├── colors.ts
│   │   ├── space.ts
│   │   └── typography.ts
│   ├── utils
│   │   ├── README.md
│   │   ├── formUtils.ts
│   │   ├── auth.ts
│   │   ├── authUtils.ts
│   │   ├── responsive.ts
│   │   └── storage.ts
│   └── README.md
└── types               # TypeScript type definitions
    ├── README.md
    └── react-native-netinfo.d.ts
```

## Key Design Principles

1. **Feature-first organization**: Related code is grouped by feature rather than type
2. **Shared utilities**: Common functionality is in the `shared` directory
3. **Explicit dependencies**: Each module declares its own dependencies
4. **Type safety**: Full TypeScript coverage with strict typing
5. **Separation of concerns**: Clear boundaries between UI, logic, and data layers

## Module Descriptions

### Assets
Static resources like images and custom fonts.

### Components
Reusable UI components that can be used across features:
- **ui/**: Common UI components like Button, Card, Input, etc.
- **ErrorBoundary.tsx**: Global error boundary component
- **Form.tsx**: Reusable form component with validation
- **ThemeToggle.tsx**: Theme switcher component

### Constants
Application-wide constants like theme definitions and configuration values.

### Features
Feature-specific modules containing all related code:
- **auth**: Authentication system with JWT tokens
- **tasks**: Task management with offline support

### Shared
Utilities and components used across multiple features:
- **api**: HTTP client and query configuration
- **components**: Shared UI components
- **hooks**: Custom React hooks for common functionality
  - **useForm**: Form handling and validation
  - **useErrorHandler**: Error handling utilities
  - **use-app-theme**: Theme management
- **providers**: React context providers
- **store**: Global state management with Zustand
- **theme**: Design system tokens
- **utils**: Utility functions
  - **formUtils**: Form validation utilities
  - **storage**: MMKV storage utilities

### Types
TypeScript type definitions for external libraries and application-specific types.