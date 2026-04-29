import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { TabRoutes } from './TabRoutes';
import { useAuth } from '../hooks/useAuth';
import { View, ActivityIndicator } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const AppRoutes: React.FC = () => {
  const { signed, loading, user } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!signed ? (
        <Stack.Screen name="Login" component={LoginScreen} />
      ) : (
        <Stack.Screen 
          name="MainTabs" 
          component={TabRoutes} 
          // Regra: Admin vai para Settings, User vai para Home
          // Mas como estamos usando TabRoutes, o redirecionamento inicial pode ser feito via initialRouteName no Tab Navigator
          // ou simplesmente tratando na tela Home ou via um Navigator intermediário.
          // Para simplificar e cumprir a regra "Usuário admin → navegar para Configurações",
          // vamos usar o prop initialRouteName se for admin.
        />
      )}
    </Stack.Navigator>
  );
};