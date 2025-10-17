import { View, Text, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '@/features/auth/store/useAuthStore';
import { logout } from '@/features/auth/hooks/useAuth';
import { WelcomeScreen } from '@/shared/components/WelcomeScreen';

/**
 * Home screen for the application
 * This is the main screen that users see after logging in
 */
export default function HomeScreen() {
  const router = useRouter();
  const { user } = useAuthStore();

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  return (
    <View style={{ flex: 1 }}>
      <WelcomeScreen />
      {user && (
        <View style={{ padding: 20, alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: '#333' }}>Hello, {user.name}!</Text>
          <Text style={{ fontSize: 14, color: '#666', marginTop: 4 }}>{user.email}</Text>
        </View>
      )}
      <View style={{ padding: 20 }}>
        <TouchableOpacity 
          style={{ backgroundColor: '#FF3B30', padding: 16, borderRadius: 8, alignItems: 'center' }}
          onPress={handleLogout}
        >
          <Text style={{ color: '#fff', fontWeight: 'bold' }}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}