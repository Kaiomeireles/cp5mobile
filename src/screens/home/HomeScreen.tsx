import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, Platform, TouchableOpacity } from 'react-native';
import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { api } from '../../services/api';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { user } = useAuth();
  const { theme } = useTheme();
  const [quote, setQuote] = useState({ quote: '', author: '' });
  const [loading, setLoading] = useState(true);

  const isDark = theme === 'dark';

  useEffect(() => {
    async function loadQuote() {
      const data = await api.getQuote();
      setQuote(data);
      setLoading(false);
    }
    loadQuote();
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}>
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <View style={styles.brandingHeader}>
          <Text style={[styles.brandTitle, { color: isDark ? '#FFF' : '#1A1A1A' }]}>Nexus</Text>
          <Text style={styles.brandSubtitle}>BY QUADRADEVS</Text>
        </View>

        <View style={[styles.mainCard, { backgroundColor: isDark ? '#2C2C2E' : '#FF3B30' }]}>
          <View style={styles.mainCardContent}>
            <Text style={styles.greeting}>Olá,{'\n'}{user?.name}</Text>
            <Text style={styles.mainSubtitle}>Gerencie suas tarefas de forma simples.</Text>
          </View>
          <View style={styles.cardDecoration}>
            <Feather name="check-square" size={80} color="rgba(255,255,255,0.15)" />
          </View>
        </View>

        <View style={[styles.quoteCard, { backgroundColor: isDark ? '#2C2C2E' : '#FFF' }]}>
          <View style={styles.quoteHeader}>
            <Feather name="zap" size={18} color="#FF3B30" />
            <Text style={[styles.quoteLabel, { color: isDark ? '#FFF' : '#FF3B30' }]}>FRASE DO DIA</Text>
          </View>
          
          {loading ? (
            <ActivityIndicator color="#FF3B30" style={{ marginVertical: 20 }} />
          ) : (
            <View>
              <Text style={[styles.quoteText, { color: isDark ? '#FFF' : '#1A1A1A' }]}>
                {quote.quote}
              </Text>
              <Text style={[styles.quoteAuthor, { color: isDark ? '#AEAEB2' : '#8E8E93' }]}>— {quote.author || 'Desconhecido'}</Text>
            </View>
          )}
        </View>

        <View style={styles.statsRow}>
          <TouchableOpacity 
            style={[styles.statItem, { backgroundColor: isDark ? '#2C2C2E' : '#FFF' }]}
            onPress={() => (navigation as any).navigate('Tarefas')}
          >
            <Feather name="list" size={24} color="#FF3B30" />
            <Text style={[styles.statValue, { color: isDark ? '#FFF' : '#1A1A1A' }]}>Ver Tarefas</Text>
            <Text style={styles.statLabel}>Ir para Lista</Text>
          </TouchableOpacity>
          <View style={[styles.statItem, { backgroundColor: isDark ? '#2C2C2E' : '#FFF' }]}>
            <Feather name="clock" size={24} color="#E53935" />
            <Text style={[styles.statValue, { color: isDark ? '#FFF' : '#1A1A1A' }]}>Em dia</Text>
            <Text style={styles.statLabel}>Prazos</Text>
          </View>
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
  brandingHeader: {
    marginBottom: 20,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '900',
    letterSpacing: -1,
  },
  brandSubtitle: {
    fontSize: 10,
    fontWeight: '800',
    color: '#8E8E93',
    letterSpacing: 2,
    marginTop: 2,
  },
  mainCard: {
    borderRadius: 24,
    padding: 25,
    height: 160,
    marginBottom: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#FF3B30',
        shadowOffset: { width: 0, height: 10 },
        shadowOpacity: 0.15,
        shadowRadius: 20,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  mainCardContent: {
    flex: 1,
    justifyContent: 'center',
    zIndex: 2,
  },
  greeting: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFF',
    lineHeight: 34,
  },
  mainSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 8,
  },
  cardDecoration: {
    position: 'absolute',
    right: -10,
    bottom: -10,
    zIndex: 1,
  },
  quoteCard: {
    borderRadius: 20,
    padding: 20,
    marginBottom: 20,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  quoteHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  quoteLabel: {
    fontSize: 12,
    fontWeight: '800',
    marginLeft: 8,
    letterSpacing: 1,
  },
  quoteText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  quoteAuthor: {
    fontSize: 14,
    marginTop: 8,
    fontWeight: '500',
    textAlign: 'right',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statItem: {
    flex: 0.48,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  statValue: {
    fontSize: 16,
    fontWeight: '700',
    marginTop: 10,
  },
  statLabel: {
    fontSize: 12,
    color: '#AEAEB2',
    fontWeight: '600',
    marginTop: 2,
  }
});