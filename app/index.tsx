import { Redirect } from 'expo-router';

/**
 * Main entry point for the application
 * Redirects to the login screen
 */
export default function Index() {
  return <Redirect href="/(auth)/login" />;
}
