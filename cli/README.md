# create-nova-rn

A CLI to scaffold [NovaRN](https://github.com/Om7035/novarn) — the vibe-coded, production-ready Expo boilerplate for 2025.

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

## 🚀 Usage

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

## 📄 License
MIT

---

**Built with ❤️ for the React Native community.**