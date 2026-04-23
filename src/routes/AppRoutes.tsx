import { NavigationContainer } from '@react-navigation/native';
import { useAuth } from '../hooks/useAuth';
import TabRoutes from './TabRoutes';
import LoginScreen from '../screens/LoginScreen';
import { ActivityIndicator, View } from 'react-native';

export default function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {user ? <TabRoutes /> : <LoginScreen />}
    </NavigationContainer>
  );
}