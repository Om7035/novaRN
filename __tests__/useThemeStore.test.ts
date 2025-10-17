import { renderHook, act } from '@testing-library/react-native';
import { useThemeStore } from '@/shared/store/useThemeStore';
import { useAppTheme } from '@/shared/hooks/use-app-theme';

// Mock the storage module
jest.mock('@/shared/utils/storage', () => ({
  storage: {
    getString: jest.fn(),
    set: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('useThemeStore', () => {
  beforeEach(() => {
    // Clear all mocks and reset store
    jest.clearAllMocks();
    
    // Reset the store to initial state
    const { result } = renderHook(() => useThemeStore());
    act(() => {
      result.current.setTheme('system');
    });
  });

  it('has initial theme as system', () => {
    const { result } = renderHook(() => useThemeStore());
    
    expect(result.current.theme).toBe('system');
  });

  it('toggles theme correctly through all states', () => {
    const { result } = renderHook(() => useThemeStore());
    
    // Initial state is 'system'
    expect(result.current.theme).toBe('system');
    
    // Toggle to 'light'
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('light');
    
    // Toggle to 'dark'
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('dark');
    
    // Toggle back to 'system'
    act(() => {
      result.current.toggleTheme();
    });
    expect(result.current.theme).toBe('system');
  });

  it('sets theme directly', () => {
    const { result } = renderHook(() => useThemeStore());
    
    act(() => {
      result.current.setTheme('dark');
    });
    
    expect(result.current.theme).toBe('dark');
  });
});

describe('useAppTheme', () => {
  beforeEach(() => {
    // Reset the store to initial state
    const { result: storeResult } = renderHook(() => useThemeStore());
    act(() => {
      storeResult.current.setTheme('system');
    });
  });

  it('returns system theme when store theme is system', () => {
    // Mock useColorScheme to return 'dark'
    jest.mock('@/shared/hooks/use-color-scheme', () => ({
      useColorScheme: () => 'dark',
    }));

    // Re-import after mock
    const { useAppTheme } = require('@/shared/hooks/use-app-theme');
    
    const { result: storeResult } = renderHook(() => useThemeStore());
    const { result: appThemeResult } = renderHook(() => useAppTheme());
    
    expect(storeResult.current.theme).toBe('system');
    expect(appThemeResult.current).toBe('dark');
  });
});