# ⚡ NovaRN Fast Installation Guide

## 🚀 Quick Start (30 seconds)

```bash
# Create your app
npx create-nova-rn@latest MyApp

# Fast installation (core features only)
cd MyApp
npm install --production
npx expo start
```

**This installs only the essential dependencies (~50 packages instead of 1600+)**

## 🔧 Full Setup (All Features)

If you want all features including testing, offline sync, and development tools:

```bash
cd MyApp
npm run setup
```

## 📊 Installation Comparison

| Method | Time | Packages | Features |
|--------|------|----------|----------|
| **Fast** | ~30s | ~50 | Core Expo app, routing, auth |
| **Full** | ~3min | ~1600 | Everything + testing + dev tools |

## ⚡ What's Included in Fast Mode

### ✅ Core Features (Always Available)
- 🚀 **Expo Router** - File-based routing
- 🔐 **Authentication** - Secure token handling
- 🎨 **Theming** - Dark/light mode
- 💾 **State Management** - Zustand
- 🌐 **HTTP Client** - Axios
- 📱 **UI Components** - NativeWind + Tailwind

### 🔧 Enhanced Features (Full Setup)
- 📴 **Offline Sync** - TanStack Query + MMKV
- 🧪 **Testing** - Jest + React Native Testing Library
- 🔍 **Linting** - ESLint + Prettier
- 📊 **Network Detection** - NetInfo
- 🛠️ **Dev Tools** - Expo CLI + debugging tools

## 🎯 Recommended Workflow

1. **Start Fast**: Use `npm install --production` to get running quickly
2. **Add Features**: Run `npm run setup` when you need enhanced features
3. **Develop**: Your app works immediately with core features

## 🚀 Why This Approach?

- **Faster onboarding** - Get started in seconds, not minutes
- **Progressive enhancement** - Add features as you need them
- **Better developer experience** - No waiting for heavy dependencies
- **Production ready** - Core features are production-grade

## 📝 Commands Reference

```bash
# Create new app
npx create-nova-rn@latest MyApp

# Fast install (production dependencies only)
npm install --production

# Full install (all features)
npm run setup

# Start development server
npx expo start

# Add specific features later
npm install @tanstack/react-query react-native-mmkv
```

## 🎉 Ready to Build!

Your NovaRN app is ready to use immediately with the fast installation. Add enhanced features when you need them!

**Happy coding! 🚀**
