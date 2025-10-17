# Testing Guide

NovaRN includes a comprehensive testing setup with Jest and React Native Testing Library.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- __tests__/MyComponent.test.ts
```

## Testing Components

Use render for testing components:

```typescript
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button } from '@/components/ui/button';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button title="Click me" onPress={jest.fn()} />);
    expect(screen.getByText('Click me')).toBeTruthy();
  });

  it('handles press events', () => {
    const onPressMock = jest.fn();
    render(<Button title="Click me" onPress={onPressMock} />);
    
    fireEvent.press(screen.getByText('Click me'));
    expect(onPressMock).toHaveBeenCalledTimes(1);
  });
});
```

## Testing Hooks

Use renderHook for testing custom hooks:

```typescript
import { renderHook, act } from '@testing-library/react-native';
import { useThemeStore } from '@/shared/store/useThemeStore';
import { useForm } from '@/shared/hooks/useForm';
import { useErrorHandler } from '@/shared/hooks/useErrorHandler';

describe('useThemeStore', () => {
  beforeEach(() => {
    // Clear all mocks and reset store
    jest.clearAllMocks();
  });

  it('toggles theme correctly', () => {
    const { result } = renderHook(() => useThemeStore());
    
    expect(result.current.theme).toBe('system');
    
    act(() => {
      result.current.toggleTheme();
    });
    
    expect(result.current.theme).toBe('light');
  });
});

describe('useForm', () => {
  it('manages form state correctly', () => {
    const initialValues = { name: '', email: '' };
    const { result } = renderHook(() => useForm(initialValues));
    
    expect(result.current.getValues()).toEqual(initialValues);
    
    act(() => {
      result.current.setFieldValue('name', 'John Doe');
    });
    
    expect(result.current.getValues().name).toBe('John Doe');
  });
});

describe('useErrorHandler', () => {
  it('handles errors correctly', () => {
    const { result } = renderHook(() => useErrorHandler());
    
    act(() => {
      result.current.handleError(new Error('Test error'));
    });
    
    expect(result.current.error).toBeInstanceOf(Error);
    expect(result.current.error?.message).toBe('Test error');
  });
});
```

## Testing Forms

Test form components with user interactions:

```typescript
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Form, FormField } from '@/shared/components/Form';
import { ValidationRules } from '@/shared/utils/formUtils';

describe('Form', () => {
  it('validates fields correctly', async () => {
    const validationRules = {
      email: [ValidationRules.required('Email is required')],
    };
    
    const onSubmit = jest.fn();
    
    render(
      <Form
        initialValues={{ email: '' }}
        validationRules={validationRules}
        onSubmit={onSubmit}
      >
        {({ values, errors, setFieldValue, validate }) => (
          <>
            <FormField
              name="email"
              render={() => (
                <TextInput
                  value={values.email}
                  onChangeText={(text) => setFieldValue('email', text)}
                  testID="email-input"
                />
              )}
            />
            <Button title="Submit" onPress={validate} testID="submit-button" />
          </>
        )}
      </Form>
    );
    
    // Try to submit without filling the form
    fireEvent.press(screen.getByTestId('submit-button'));
    
    // Check that validation error is shown
    expect(onSubmit).not.toHaveBeenCalled();
  });
});
```

## Testing UI Components

Test the new UI components:

```typescript
import { render, screen, fireEvent } from '@testing-library/react-native';
import { Button, Card, Alert, Input } from '@/components/ui';

describe('UI Components', () => {
  describe('Button', () => {
    it('renders with correct title', () => {
      render(<Button title="Test Button" onPress={jest.fn()} />);
      expect(screen.getByText('Test Button')).toBeTruthy();
    });
    
    it('handles press events', () => {
      const onPress = jest.fn();
      render(<Button title="Test" onPress={onPress} />);
      fireEvent.press(screen.getByText('Test'));
      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });
  
  describe('Card', () => {
    it('renders with title and content', () => {
      render(
        <Card title="Test Card">
          <Text>Card content</Text>
        </Card>
      );
      
      expect(screen.getByText('Test Card')).toBeTruthy();
      expect(screen.getByText('Card content')).toBeTruthy();
    });
  });
  
  describe('Alert', () => {
    it('renders different alert types', () => {
      const { rerender } = render(
        <Alert type="success" message="Success message" />
      );
      
      // Re-render with different type
      rerender(<Alert type="error" message="Error message" />);
      expect(screen.getByText('Error message')).toBeTruthy();
    });
  });
  
  describe('Input', () => {
    it('handles text input changes', () => {
      const onChangeText = jest.fn();
      render(
        <Input
          value=""
          onChangeText={onChangeText}
          placeholder="Enter text"
          testID="test-input"
        />
      );
      
      fireEvent.changeText(screen.getByTestId('test-input'), 'Hello');
      expect(onChangeText).toHaveBeenCalledWith('Hello');
    });
  });
});
```

## Writing API/Service Tests

Test API functions with mocked responses:

```typescript
import { fetchTasks } from '@/shared/api/mockApi';

// Mock the delay function to avoid waiting
jest.mock('@/shared/api/mockApi', () => ({
  ...jest.requireActual('@/shared/api/mockApi'),
  delay: jest.fn(() => Promise.resolve()),
}));

describe('mockApi', () => {
  it('fetches tasks successfully', async () => {
    const tasks = await fetchTasks();
    
    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.length).toBeGreaterThan(0);
  });
});
```

## Testing Authentication

Test authentication flows with mocked SecureStore:

```typescript
import * as SecureStore from 'expo-secure-store';
import { login, logout } from '@/features/auth/hooks/useAuth';
import { useAuthStore } from '@/features/auth/store/useAuthStore';

// Mock SecureStore
jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(),
  getItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));

describe('Authentication', () => {
  beforeEach(() => {
    // Clear mocks and reset store
    jest.clearAllMocks();
    useAuthStore.getState().setUser(null);
    useAuthStore.getState().setTokens(null, null);
  });

  it('logs in successfully', async () => {
    const result = await login('test@example.com', 'password123');
    
    expect(result.success).toBe(true);
    expect(useAuthStore.getState().isAuthenticated).toBe(true);
    expect(SecureStore.setItemAsync).toHaveBeenCalledWith(
      'refreshToken',
      expect.any(String)
    );
  });

  it('logs out successfully', async () => {
    // First login
    await login('test@example.com', 'password123');
    
    // Then logout
    await logout();
    
    expect(useAuthStore.getState().isAuthenticated).toBe(false);
    expect(SecureStore.deleteItemAsync).toHaveBeenCalledWith('refreshToken');
  });
});
```

## Testing Offline Functionality

Test offline functionality with mocked network conditions:

```typescript
import { useGetTasks, useCreateTask } from '@/features/tasks/hooks/useTasks';
import { renderHook, act } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

describe('Offline Functionality', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );

  it('handles network errors gracefully', async () => {
    // Mock network error
    jest.spyOn(global, 'fetch').mockRejectedValue(new Error('Network Error'));
    
    const { result } = renderHook(() => useGetTasks(), { wrapper });
    
    await act(async () => {
      await queryClient.refetchQueries({ queryKey: ['tasks'] });
    });
    
    expect(result.current.error).toBeTruthy();
    expect(result.current.isLoading).toBe(false);
  });
});
```

## Continuous Integration

The testing setup is configured to work with CI/CD pipelines. Ensure your CI environment has:

1. Node.js installed
2. Dependencies installed with `npm install`
3. Tests run with `npm test`

Example GitHub Actions workflow:

```yaml
name: Test
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm test
```

## Debugging Tests

If tests are failing:

1. Check that all mocks are properly configured
2. Ensure imports are using correct paths
3. Verify that async operations are properly awaited
4. Use `console.log` statements to debug test flow

Run tests with verbose output:

```bash
npm test -- --verbose
```

## Resources

- [React Native Testing Library](https://callstack.github.io/react-native-testing-library/)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [Expo Testing Guide](https://docs.expo.dev/develop/unit-testing/)
- [TanStack Query Testing](https://tanstack.com/query/latest/docs/react/guides/testing)