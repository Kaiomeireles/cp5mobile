import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, Text } from 'react-native';

// Exemplo de tela de tarefas
function TasksScreen() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Tela de Tarefas</Text>
    </View>
  );
}

const Stack = createNativeStackNavigator();

export default function TaskStackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TasksMain" component={TasksScreen} options={{ title: 'Tarefas' }} />
    </Stack.Navigator>
  );
}
