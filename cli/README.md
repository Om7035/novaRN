# create-nova-rn

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
</p>

A CLI to scaffold [NovaRN](https://github.com/Om7035/novarn) — the vibe-coded, production-ready Expo boilerplate for 2025.

<p align="center">
  <img src="../src/assets/images/icon.png" width="200" alt="NovaRN Logo" />
</p>

## 🌟 Why NovaRN?

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

## ✨ Features

- Expo Router + TypeScript
- Auth + API + Offline sync ("The Trinity")
- Dark/light/system mode
- TanStack Query + Zustand
- Form handling and validation
- Global error boundaries
- Rich UI component library
- NativeWind (Tailwind CSS for React Native)
- EAS Build ready

---

## 🧰 Commands

```bash
# Create a new app (default)
npx create-nova-rn MyApp

# List available templates
npx create-nova-rn list-templates

# Display information about NovaRN
npx create-nova-rn info

# Show version
npx create-nova-rn --version

# Show help
npx create-nova-rn --help
```

## 🛠 Options

```bash
# Verbose output
npx create-nova-rn MyApp --verbose

# Template selection (currently only 'full' is available)
npx create-nova-rn MyApp --template full
```

---

## 📁 Project Structure

Your new NovaRN app will include:

```
MyApp/
├── app/                 # Expo Router (file-based routing)
├── src/                 # Source code
│   ├── features/        # Feature-based modules
│   ├── shared/          # Shared functionality
│   └── components/      # UI components
├── package.json         # Dependencies
└── README.md            # Project documentation
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

---

## 🎨 NativeWind (Tailwind CSS for React Native)

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

---

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

---

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

---

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

---

## 📚 Learn More

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router docs](https://docs.expo.dev/router/introduction/)
- [TanStack Query docs](https://tanstack.com/query/latest)
- [Zustand docs](https://zustand-demo.pmnd.rs/)
- [NativeWind docs](https://www.nativewind.dev/)

---

## 📄 License

MIT

---

<p align="center">
  <strong>Built with ❤️ for the React Native community.</strong>
</p>

<p align="center">
  <sub>If you like NovaRN, please consider starring the repo! ⭐</sub>
</p>