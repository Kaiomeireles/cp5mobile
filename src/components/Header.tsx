import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, Platform } from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { useTheme } from '../hooks/useTheme';
import { Feather } from '@expo/vector-icons';

export const Header: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme } = useTheme();
  
  const isDark = theme === 'dark';

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: isDark ? '#1C1C1E' : '#FFF' }]}>
      <View style={styles.container}>
        <View style={styles.userSection}>
          <View style={[styles.avatar, { backgroundColor: isDark ? '#3A3A3C' : '#F2F2F7' }]}>
            <Text style={[styles.avatarText, { color: isDark ? '#FFF' : '#5856D6' }]}>
              {user?.name.charAt(0).toUpperCase()}
            </Text>
          </View>
          <View style={styles.info}>
            <Text style={[styles.welcome, { color: isDark ? '#FFF' : '#1A1A1A' }]}>Olá, {user?.name}</Text>
            <View style={[styles.badge, { backgroundColor: user?.role === 'admin' ? '#5856D620' : '#34C75920' }]}>
              <Text style={[styles.role, { color: user?.role === 'admin' ? '#5856D6' : '#34C759' }]}>
                {user?.role === 'admin' ? 'Administrador' : 'Usuário'}
              </Text>
            </View>
          </View>
        </View>
        <TouchableOpacity onPress={signOut} style={styles.logoutButton}>
          <Feather name="log-out" size={20} color="#FF3B30" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safe: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 4,
      },
    }),
    zIndex: 10,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  info: {
    justifyContent: 'center',
  },
  welcome: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 2,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  role: {
    fontSize: 10,
    fontWeight: '800',
    textTransform: 'uppercase',
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF3B3010',
    justifyContent: 'center',
    alignItems: 'center',
  },
});