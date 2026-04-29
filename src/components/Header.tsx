import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: isDark ? '#1C1C1E' : '#FFF' }]}>
      <View style={styles.container}>
        <View>
          <Text style={[styles.welcome, { color: isDark ? '#FFF' : '#333' }]}>Olá, {user?.name}</Text>
          <Text style={styles.role}>{user?.role === 'admin' ? 'Administrador' : 'Usuário'}</Text>
        </View>
        <TouchableOpacity onPress={signOut} style={styles.logoutButton}>
          <Text style={styles.logoutText}>Sair</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  welcome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  role: {
    fontSize: 12,
    color: '#8E8E93',
    textTransform: 'uppercase',
  },
  logoutButton: {
    padding: 8,
    backgroundColor: '#FF3B3015',
    borderRadius: 6,
  },
  logoutText: {
    color: '#FF3B30',
    fontWeight: '600',
  },
});