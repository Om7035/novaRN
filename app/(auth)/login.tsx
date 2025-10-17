import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { LoginForm } from '@/features/auth/components/LoginForm';

/**
 * Login screen for user authentication
 * Allows users to enter their credentials and log in
 */
export default function LoginScreen() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, backgroundColor: '#fff', padding: 24, justifyContent: 'center' }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 32 }}>Login</Text>
      
      <LoginForm />
      
      <TouchableOpacity 
        style={{ marginTop: 16, padding: 16 }}
        onPress={() => router.replace('/(app)/(tabs)/home')}
      >
        <Text style={{ color: '#007AFF', textAlign: 'center' }}>
          Skip Login (Demo Mode)
        </Text>
      </TouchableOpacity>
    </View>
  );
}
