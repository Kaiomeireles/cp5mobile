import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView } from 'react-native';
import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';

export const SettingsScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === 'dark';

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.section, { backgroundColor: isDark ? '#2C2C2E' : '#FFF' }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#FFF' : '#333' }]}>Perfil</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Nome</Text>
            <Text style={styles.value}>{user?.name}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Usuário</Text>
            <Text style={styles.value}>@{user?.username}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Perfil</Text>
            <Text style={styles.value}>{user?.role === 'admin' ? 'Administrador' : 'Usuário'}</Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: isDark ? '#2C2C2E' : '#FFF' }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#FFF' : '#333' }]}>Aparência</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Tema Escuro</Text>
            <Switch 
              value={isDark} 
              onValueChange={toggleTheme}
              trackColor={{ false: '#D1D1D6', true: '#34C759' }}
            />
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: isDark ? '#2C2C2E' : '#FFF' }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#FFF' : '#333' }]}>Preferências</Text>
          <View style={styles.row}>
            <Text style={styles.label}>Tratamento</Text>
            <Text style={styles.value}>Sr.</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
          <Text style={styles.signOutText}>Sair da Conta</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>TaskFlow v1.0.0</Text>
          <Text style={styles.footerText}>Desenvolvido por Kaio, Lucas, Guilherme e João</Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  label: {
    fontSize: 16,
    color: '#8E8E93',
  },
  value: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
  },
  signOutButton: {
    backgroundColor: '#FF3B3015',
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signOutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
    marginBottom: 40,
  },
  footerText: {
    color: '#AEAEB2',
    fontSize: 12,
    marginBottom: 5,
  }
});