# NovaRN: The Vibe-Coded Expo Boilerplate

> **A production-ready React Native boilerplate that just works.** Built with Expo Router, TypeScript, and offline-first architecture.

<p align="center">
  <img src="src/assets/images/Banner.png" width="2000" alt="NovaRN Logo" />
</p>

<p align="center">
  <a href="https://github.com/Om7035/novaRN/stargazers">
    <img src="https://img.shields.io/github/stars/Om7035/novaRN?style=flat-square" alt="GitHub Stars">
  </a>
  <a href="https://github.com/Om7035/novaRN/issues">
    <img src="https://img.shields.io/github/issues/Om7035/novaRN?style=flat-square" alt="GitHub Issues">
  </a>
  <a href="https://github.com/Om7035/novaRN/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/Om7035/novaRN?style=flat-square" alt="GitHub License">
  </a>
  <a href="https://npmjs.com/package/create-nova-rn">
    <img src="https://img.shields.io/npm/v/create-nova-rn?style=flat-square" alt="NPM Version">
  </a>
  <a href="https://github.com/Om7035/novaRN/actions">
    <img src="https://img.shields.io/github/workflow/status/Om7035/novaRN/CI?style=flat-square" alt="Build Status">
  </a>
</p>

## 🌟 Why Developers Love NovaRN

NovaRN is the ultimate React Native boilerplate that eliminates the friction of starting a new project. It's designed for developers who want to build production-ready apps without the boilerplate headaches.

### Key Benefits

✨ **Zero Configuration** - Get started in seconds, not hours  
🔒 **Production-Ready Security** - Secure token handling built-in  
📡 **Offline-First Architecture** - Works even when the internet doesn't  
🎨 **Modern Styling** - NativeWind (Tailwind CSS) for beautiful UIs  
⚡ **Performance Optimized** - Lightweight stack with best practices  
📚 **Well Documented** - Comprehensive examples and guides  
🛠 **Developer Experience** - TypeScript, ESLint, and more

---

## 🚀 Quick Start

```bash
# Create a new NovaRN app
npx create-nova-rn MyApp

# Navigate to your project
cd MyApp

# Install dependencies
npm install

# Start the development server
npx expo start
```

That's it! You now have a fully functional React Native app with authentication, offline support, and a rich component library.

---

## 🎯 Features That Matter

### 🔐 Authentication Trinity
- **Zustand** for in-memory auth state (user, accessToken)
- **expo-secure-store** for refresh tokens only
- **TanStack Query** for automatic 401 handling and silent refresh

### 📴 Offline-First
Built-in optimistic updates and cache persistence with MMKV. Your app works even when the internet doesn't.

### 🎨 NativeWind (Tailwind CSS)
Style your components with familiar Tailwind classes:
```tsx
<View className="flex-1 justify-center items-center bg-gray-100 dark:bg-gray-900 p-4">
  <Text className="text-2xl font-bold text-blue-600 dark:text-blue-400">
    Beautiful UI with NativeWind
  </Text>
</View>
```

### 🧠 Smart Architecture
- **File-based routing** with Expo Router
- **Feature-based organization** for scalable codebase
- **Global error boundaries** for crash recovery
- **Theme management** with light/dark/system mode

---

## 📊 Compared to Other Solutions

| Feature | NovaRN | Ignite | Expo Template |
|---------|--------|--------|---------------|
| **Philosophy** | Expo-first, zero native code | Bare React Native | Basic Expo setup |
| **Language** | TypeScript only | TypeScript + JavaScript | JavaScript/TypeScript |
| **Routing** | Expo Router (file-based) | React Navigation (manual) | Basic navigation |
| **Auth** | Complete 401 handling | Manual setup | None |
| **Offline** | MMKV + Optimistic Updates | Manual setup | None |
| **Styling** | NativeWind (Tailwind) | StyleSheet | StyleSheet |
| **Bundle Size** | Lighter, focused stack | Heavier, more opinions | Minimal |
| **Learning Curve** | Gentle, follows Expo conventions | Steeper, custom patterns | Basic |
| **Best For** | Fast MVPs, indie devs, startups | Teams needing full native control | Learning Expo |

---

## 🛠 Tech Stack

- **Expo SDK 54+** (Expo Go + EAS Build)
- **Expo Router** (file-based routing)
- **TypeScript** (strictly typed)
- **Zustand** (state management)
- **TanStack Query + Axios** (data fetching with 401 silent refresh)
- **expo-secure-store** (refresh tokens only)
- **MMKV** (cache persistence)
- **NativeWind** (Tailwind CSS for React Native)
- **React Native Reanimated** (smooth animations)

---

## 📁 Project Structure

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

## 🎯 Key Features Included

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

## 🏆 Golden Rules

1. NEVER persist access tokens — only refresh tokens in SecureStore
2. Auth state (user, accessToken) lives in memory (Zustand, no persist)
3. All screens live in `app/` using Expo Router file-based conventions
4. Every new file includes a brief JSDoc comment explaining its purpose
5. Always prefer explicit over magic — devs must understand every line

## 🔧 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn
- Expo Go app on your device (for development)

### Installation
```bash
# Create a new NovaRN app
npx create-nova-rn MyApp

# Navigate to your project
cd MyApp

# Install dependencies
npm install

# Start the development server
npx expo start
```

### Running on Devices
```bash
# iOS Simulator
npx expo start --ios

# Android Emulator
npx expo start --android

# Web Browser
npx expo start --web

# Physical Device
# Scan the QR code with the Expo Go app
```

## 🧪 Testing

NovaRN includes a comprehensive testing setup with Jest and React Native Testing Library:

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage
```

## 🚀 Deployment

### EAS Build (Recommended)
```bash
# Install EAS CLI
npm install -g eas-cli

# Configure your project
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android
```

### Manual Deployment
Follow the [Expo deployment guides](https://docs.expo.dev/distribution/introduction/) for detailed instructions.

## 🤝 Contributing

We love contributions! NovaRN is built by developers for developers.

### How to Contribute
1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Reporting Issues
**Found a friction point? That's a bug.**

NovaRN is designed to be frictionless. If you hit a snag, [open an issue](https://github.com/Om7035/novaRN/issues). We treat developer experience bugs as seriously as code bugs.

## 📚 Learn More

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router docs](https://docs.expo.dev/router/introduction/)
- [TanStack Query docs](https://tanstack.com/query/latest)
- [Zustand docs](https://zustand-demo.pmnd.rs/)
- [NativeWind docs](https://www.nativewind.dev/)

## 📄 License

MIT © NovaRN

---

<p align="center">
  <strong>Built with ❤️ for the React Native community.</strong>
</p>

<p align="center">
  <sub>If you like NovaRN, please consider starring the repo! ⭐</sub>
</p>

awjbdajwbdwajbdb

