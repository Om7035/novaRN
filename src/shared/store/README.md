# Store

This directory contains global state management solutions using Zustand.

## Files

- **useThemeStore.ts**: Zustand store for managing the application's theme (light/dark/system mode)
  - Persists theme preference to MMKV storage
  - Provides toggle and direct set functions
  - Supports system theme detection