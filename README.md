# NovaRN: The Vibe-Coded Expo Boilerplate

> **A production-ready React Native boilerplate that just works.** Built with Expo Router, TypeScript, and offline-first architecture.

![NovaRN Demo](demo.gif)

## Why NovaRN?

### 🚀 Expo Router
File-based routing that actually makes sense. No more manual navigation setup.

### 🔐 Auth Trinity
- **Zustand** for in-memory auth state (user, accessToken)
- **expo-secure-store** for refresh tokens only
- **TanStack Query** for automatic 401 handling and silent refresh

### 📴 Offline-First
Built-in optimistic updates and cache persistence with MMKV. Your app works even when the internet doesn't.

---

## Compared to Ignite

| Feature | NovaRN | Ignite |
|---------|--------|--------|
| **Philosophy** | Expo-first, zero native code | Bare React Native, ejectable |
| **Language** | TypeScript only | TypeScript + JavaScript |
| **Routing** | Expo Router (file-based) | React Navigation (manual) |
| **Bundle Size** | Lighter, focused stack | Heavier, more opinions |
| **Learning Curve** | Gentle, follows Expo conventions | Steeper, custom patterns |
| **Best For** | Fast MVPs, indie devs, startups | Teams needing full native control |

---

## When NOT to Use NovaRN

❌ **You need bare React Native** - NovaRN is Expo-first. If you need custom native modules not available in Expo, use Ignite or start from scratch.

❌ **JavaScript projects** - NovaRN is TypeScript-only. No JavaScript support.

❌ **Existing apps** - This is a boilerplate for new projects, not a migration tool.

---

## Stack

- **Expo SDK 54+** (Expo Go + EAS Build)
- **Expo Router** (file-based routing)
- **TypeScript** (strictly typed)
- **Zustand** (state management)
- **TanStack Query + Axios** (data fetching with 401 silent refresh)
- **expo-secure-store** (refresh tokens only)
- **MMKV** (cache persistence)
- **NativeWind** (Tailwind CSS for React Native)

## Folder Structure

```
NovaRNTemplate/
├── app/                          # 🗂️ Expo Router (file-based routing)
│   ├── (auth)/                  # Auth group (login, signup)
│   │   ├── _layout.tsx          # Auth layout wrapper
│   │   └── login.tsx            # Login screen
│   ├── (app)/                   # App group (protected routes)
│   │   ├── (tabs)/              # Tab navigator
│   │   │   ├── _layout.tsx      # Tabs layout
│   │   │   ├── home.tsx         # Home screen
│   │   │   └── tasks.tsx        # Tasks screen (offline demo)
│   │   └── _layout.tsx          # App layout wrapper
│   ├── _layout.tsx              # Root layout (auth boundary)
│   └── index.tsx                # Entry point
│
├── src/                          # 📦 Source code
│   ├── features/                # Feature-based modules
│   │   ├── auth/                # Authentication feature
│   │   │   ├── hooks/
│   │   │   │   └── useAuth.ts   # Auth controller
│   │   │   ├── store/
│   │   │   │   └── useAuthStore.ts # Auth state (memory-only)
│   │   │   └── components/
│   │   │       └── LoginForm.tsx # Login form
│   │   └── tasks/               # Tasks feature
│   │       ├── hooks/
│   │       │   └── useTasks.ts  # Task management
│   │       └── components/
│   │           └── TaskItem.tsx # Task item
│   ├── shared/                  # Shared functionality
│   │   ├── hooks/
│   │   │   ├── useAuthBoundary.ts # Route protection
│   │   │   ├── useForm.ts       # Form handling
│   │   │   ├── useErrorHandler.ts # Error handling
│   │   │   └── use-app-theme.ts # Theme management
│   │   ├── store/
│   │   │   └── useThemeStore.ts # Theme state (persisted)
│   │   ├── theme/
│   │   │   ├── colors.ts        # Color palette
│   │   │   ├── space.ts         # Spacing tokens
│   │   │   └── typography.ts    # Typography tokens
│   │   ├── api/
│   │   │   ├── client.ts        # Axios with 401 handling
│   │   │   └── queryClient.ts   # TanStack Query + MMKV
│   │   ├── providers/
│   │   │   └── QueryProvider.tsx # Query provider
│   │   ├── components/
│   │   │   ├── ErrorBoundary.tsx # Global error boundary
│   │   │   ├── Form.tsx         # Form components
│   │   │   └── ThemeToggle.tsx  # Theme switcher
│   │   ├── utils/
│   │   │   ├── formUtils.ts     # Form utilities
│   │   │   ├── auth.ts          # Auth utilities
│   │   │   ├── authUtils.ts     # Additional auth utilities
│   │   │   ├── storage.ts       # Storage utilities
│   │   │   └── responsive.ts    # Responsive helpers
│   │   └── ui/                  # UI components
│   │       ├── button.tsx       # Button component
│   │       ├── card.tsx         # Card component
│   │       ├── input.tsx        # Input component
│   │       ├── alert.tsx        # Alert component
│   │       ├── loading.tsx      # Loading component
│   │       ├── modal.tsx        # Modal component
│   │       ├── checkbox.tsx     # Checkbox component
│   │       └── collapsible.tsx  # Collapsible component
│   └── README.md                # Source code documentation
│
├── cli/                          # 🧰 CLI Tool
│   ├── index.js                 # CLI entry point
│   └── package.json             # CLI package configuration
│
├── .vscode/                      # VS Code settings
├── eas.json                      # EAS Build configuration
└── package.json                  # Dependencies
```

## Key Features

1. **File-based routing** with Expo Router
2. **Authentication flow** with proper token handling
3. **State management** with Zustand
4. **Data fetching** with TanStack Query and Axios
5. **Secure storage** for refresh tokens
6. **Cache persistence** with MMKV
7. **TypeScript strict mode**
8. **Path aliases** configured (@/*)
9. **Feature-based organization** for scalable codebase
10. **Theme management** with light/dark/system mode
11. **Form handling** with validation utilities
12. **Global error boundaries** for crash recovery
13. **Rich UI component library** for rapid development
14. **Dependency verification script** for maintenance
15. **NativeWind** (Tailwind CSS for React Native)

## Golden Rules

1. NEVER persist access tokens — only refresh tokens in SecureStore
2. Auth state (user, accessToken) lives in memory (Zustand, no persist)
3. All screens live in `app/` using Expo Router file-based conventions
4. Every new file includes a brief JSDoc comment explaining its purpose
5. Always prefer explicit over magic — devs must understand every line

## Authentication Flow

The authentication system is designed with security in mind:

- Access tokens are NEVER persisted to storage
- Refresh tokens are securely stored in expo-secure-store
- Auth state (user, accessToken) lives in memory using Zustand
- Automatic 401 interception and token refresh
- Hardware authentication support on Android

## NativeWind (Tailwind CSS for React Native)

NovaRN now includes NativeWind for styling components with Tailwind CSS classes:

```tsx
import { View, Text, TouchableOpacity } from 'react-native';

export const MyComponent = () => {
  return (
    <View className="flex-1 justify-center items-center bg-gray-100 dark:bg-gray-900 p-4">
      <Text className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">
        NativeWind Example
      </Text>
      <TouchableOpacity className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 px-6 py-3 rounded-lg">
        <Text className="text-white font-semibold">Click Me</Text>
      </TouchableOpacity>
    </View>
  );
};
```

## Form Handling

NovaRN includes a powerful form handling system with validation:

```tsx
import { Form, FormField } from '@/shared/components/Form';
import { ValidationRules } from '@/shared/utils/formUtils';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

interface FormValues {
  email: string;
  password: string;
}

const validationRules = {
  email: [
    ValidationRules.required('Email is required'),
    ValidationRules.email('Please enter a valid email'),
  ],
  password: [
    ValidationRules.required('Password is required'),
    ValidationRules.minLength(8, 'Password must be at least 8 characters'),
  ],
};

const MyForm = () => {
  const handleSubmit = async (values: FormValues) => {
    // Handle form submission
    console.log('Form submitted:', values);
  };

  return (
    <Form
      initialValues={{ email: '', password: '' }}
      validationRules={validationRules}
      onSubmit={handleSubmit}
    >
      {({ values, errors, setFieldValue, validateField, validate }) => (
        <>
          <FormField<FormValues>
            name="email"
            label="Email"
            errors={errors}
            validateField={validateField}
            render={({ error }) => (
              <Input
                placeholder="Enter your email"
                value={values.email}
                onChangeText={(text) => setFieldValue('email', text)}
                error={error}
              />
            )}
          />
          
          <FormField<FormValues>
            name="password"
            label="Password"
            errors={errors}
            validateField={validateField}
            render={({ error }) => (
              <Input
                placeholder="Enter your password"
                value={values.password}
                onChangeText={(text) => setFieldValue('password', text)}
                secureTextEntry
                error={error}
              />
            )}
          />
          
          <Button title="Submit" onPress={validate} />
        </>
      )}
    </Form>
  );
};
```

## Error Handling

NovaRN provides comprehensive error handling with global boundaries and custom hooks:

```tsx
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';

// Wrap your app with the global error boundary
export default function App() {
  return (
    <ErrorBoundary>
      <YourAppContent />
    </ErrorBoundary>
  );
}

// Use the error handler hook in components
const MyComponent = () => {
  const { error, handleError, clearError } = useErrorHandler();
  
  const handleAsyncOperation = async () => {
    try {
      await someAsyncOperation();
    } catch (err) {
      handleError(err);
    }
  };
  
  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
        <Button title="Retry" onPress={clearError} />
      </View>
    );
  }
  
  return <Button title="Do Something" onPress={handleAsyncOperation} />;
};
```

## UI Components

NovaRN includes a rich set of customizable UI components:

```tsx
import { Button, Card, Alert, Input, Modal } from '@/components/ui';

// Button with multiple variants
<Button title="Primary" variant="primary" onPress={handlePress} />
<Button title="Secondary" variant="secondary" onPress={handlePress} />
<Button title="Outline" variant="outline" onPress={handlePress} />

// Card container
<Card title="My Card">
  <Text>Card content goes here</Text>
</Card>

// Alert messages
<Alert 
  type="success" 
  title="Success!" 
  message="Operation completed successfully" 
/>

// Input with validation
<Input 
  label="Username"
  placeholder="Enter username"
  value={username}
  onChangeText={setUsername}
  error={error}
/>

// Modal
<Modal visible={showModal} onClose={setShowModal} title="My Modal">
  <Text>Modal content</Text>
</Modal>
```

## Theme Management

NovaRN supports light, dark, and system themes:

```tsx
import { useThemeStore } from '@/shared/store/useThemeStore';
import { useAppTheme } from '@/shared/hooks/use-app-theme';

const MyComponent = () => {
  const { theme, toggleTheme, setTheme } = useThemeStore();
  const effectiveTheme = useAppTheme();
  
  return (
    <View>
      <Text>Current theme: {theme}</Text>
      <Text>Effective theme: {effectiveTheme}</Text>
      <Button title="Toggle Theme" onPress={toggleTheme} />
    </View>
  );
};
```

## Dependency Verification

Run the dependency verification script to ensure all imports are properly installed:

```bash
npm run verify-deps
```

This script will:
- Check for missing dependencies
- Identify unused dependencies
- Report any unresolved imports

## Installation

```bash
npx create-nova-rn MyApp
cd MyApp
npm install
npx expo start
```

---

## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npx expo start
   ```

3. **Run on your desired platform:**
   ```bash
   # iOS
   npx expo start --ios

   # Android
   npx expo start --android

   # Web
   npx expo start --web
   ```

---

## Contributing

**Found a friction point? That's a bug.**

NovaRN is designed to be frictionless. If you hit a snag, open an issue. We treat developer experience bugs as seriously as code bugs.

### How to Contribute

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## Learn More

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router docs](https://docs.expo.dev/router/introduction/)
- [TanStack Query docs](https://tanstack.com/query/latest)
- [Zustand docs](https://zustand-demo.pmnd.rs/)
- [NativeWind docs](https://www.nativewind.dev/)

---

## License

MIT © NovaRN

---

**Built with ❤️ for the React Native community.**