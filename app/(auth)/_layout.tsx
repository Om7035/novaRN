import { Stack } from 'expo-router';

/**
 * Layout component for the authentication screens
 * Sets up a stack navigator for login and signup screens
 */
export default function AuthLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="login" />
    </Stack>
  );
}
