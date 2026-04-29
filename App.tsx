import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { AuthProvider } from './src/context/AuthContext';
import { TaskProvider } from './src/context/TaskContext';
import { ThemeProvider } from './src/context/ThemeContext';
import { AppRoutes } from './src/routes/AppRoutes';

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <TaskProvider>
          <ThemeProvider>
            <AppRoutes />
            <StatusBar style="auto" />
          </ThemeProvider>
        </TaskProvider>
      </AuthProvider>
    </NavigationContainer>
  );
}
