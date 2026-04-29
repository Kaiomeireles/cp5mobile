import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { Feather } from '@expo/vector-icons';

export const SettingsScreen: React.FC = () => {
  const { user, signOut } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const [treatment, setTreatment] = useState('Sr.');

  const isDark = theme === 'dark';

  const treatmentOptions = ['Sr.', 'Sra.', 'Srta.'];

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#0A0E1A' : '#F8F9FE' }]}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.section, { backgroundColor: isDark ? '#1E2328' : '#FFF', borderColor: isDark ? '#C8AA6E50' : 'transparent', borderWidth: isDark ? 1 : 0 }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#C8AA6E' : '#1A1A1A' }]}>Perfil do Invocador</Text>
          <View style={styles.row}>
            <View style={styles.labelGroup}>
              <Feather name="user" size={18} color="#C8AA6E" style={styles.icon} />
              <Text style={[styles.label, { color: isDark ? '#A09B8C' : '#8E8E93' }]}>Nick</Text>
            </View>
            <Text style={[styles.value, { color: isDark ? '#F0E6D2' : '#1A1A1A' }]}>{user?.name}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.labelGroup}>
              <Feather name="shield" size={18} color="#C8AA6E" style={styles.icon} />
              <Text style={[styles.label, { color: isDark ? '#A09B8C' : '#8E8E93' }]}>Função</Text>
            </View>
            <Text style={[styles.value, { color: user?.role === 'admin' ? '#C8AA6E' : '#34C759' }]}>
              {user?.role === 'admin' ? 'Capitão (Admin)' : 'Player'}
            </Text>
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: isDark ? '#1E2328' : '#FFF', borderColor: isDark ? '#C8AA6E50' : 'transparent', borderWidth: isDark ? 1 : 0 }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#C8AA6E' : '#1A1A1A' }]}>Tratamento</Text>
          <View style={styles.treatmentContainer}>
            {treatmentOptions.map((opt) => (
              <TouchableOpacity 
                key={opt}
                onPress={() => setTreatment(opt)}
                style={[
                  styles.treatmentOption,
                  treatment === opt && styles.treatmentSelected,
                  treatment === opt && { backgroundColor: '#C8AA6E' }
                ]}
              >
                <Text style={[
                  styles.treatmentText,
                  treatment === opt && styles.treatmentTextSelected
                ]}>
                  {opt}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={[styles.section, { backgroundColor: isDark ? '#1E2328' : '#FFF', borderColor: isDark ? '#C8AA6E50' : 'transparent', borderWidth: isDark ? 1 : 0 }]}>
          <Text style={[styles.sectionTitle, { color: isDark ? '#C8AA6E' : '#1A1A1A' }]}>Interface do Rift</Text>
          <View style={styles.row}>
            <View style={styles.labelGroup}>
              <Feather name={isDark ? "moon" : "sun"} size={18} color="#C8AA6E" style={styles.icon} />
              <Text style={[styles.label, { color: isDark ? '#A09B8C' : '#8E8E93' }]}>Modo Dark</Text>
            </View>
            <Switch 
              value={isDark} 
              onValueChange={toggleTheme}
              trackColor={{ false: '#D1D1D6', true: '#C8AA6E' }}
              thumbColor={Platform.OS === 'android' ? '#FFF' : undefined}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
          <Feather name="log-out" size={18} color="#FF3B30" style={{ marginRight: 8 }} />
          <Text style={styles.signOutText}>Sair da Partida</Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Nexus v2.0 • Pro Build</Text>
          <Text style={styles.credits}>Desenvolvido por QuadraDevs</Text>
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
    paddingBottom: 40,
  },
  section: {
    borderRadius: 24,
    padding: 24,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 12,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    marginBottom: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F030',
  },
  labelGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
  },
  value: {
    fontSize: 15,
    fontWeight: '700',
  },
  treatmentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  treatmentOption: {
    flex: 1,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    backgroundColor: '#F5F7FA10',
    marginHorizontal: 4,
  },
  treatmentSelected: {
    shadowColor: '#C8AA6E',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  treatmentText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#8E8E93',
  },
  treatmentTextSelected: {
    color: '#0A0E1A',
    fontWeight: 'bold',
  },
  signOutButton: {
    backgroundColor: '#FF3B3010',
    height: 56,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  signOutText: {
    color: '#FF3B30',
    fontSize: 16,
    fontWeight: '800',
  },
  footer: {
    marginTop: 40,
    alignItems: 'center',
  },
  footerText: {
    color: '#A09B8C',
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 6,
  },
  credits: {
    color: '#8E8E93',
    fontSize: 11,
    fontWeight: '500',
  }
});