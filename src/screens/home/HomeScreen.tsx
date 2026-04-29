import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Header } from '../../components/Header';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { api } from '../../services/api';

export const HomeScreen: React.FC = () => {
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
      <ScrollView contentContainerStyle={styles.content}>
        <View style={[styles.card, { backgroundColor: isDark ? '#2C2C2E' : '#FFF' }]}>
          <Text style={[styles.greeting, { color: isDark ? '#FFF' : '#333' }]}>
            Bem-vindo de volta, {user?.name}!
          </Text>
          <Text style={styles.subtitle}>O que vamos realizar hoje?</Text>
        </View>

        <View style={[styles.quoteCard, { backgroundColor: isDark ? '#007AFF20' : '#007AFF10' }]}>
          <Text style={styles.quoteTitle}>Frase do Dia</Text>
          {loading ? (
            <ActivityIndicator color="#007AFF" />
          ) : (
            <>
              <Text style={[styles.quoteText, { color: isDark ? '#FFF' : '#007AFF' }]}>"{quote.quote}"</Text>
              <Text style={styles.quoteAuthor}>- {quote.author}</Text>
            </>
          )}
        </View>

        <View style={[styles.card, { backgroundColor: isDark ? '#2C2C2E' : '#FFF' }]}>
          <Text style={[styles.infoTitle, { color: isDark ? '#FFF' : '#333' }]}>Dica TaskFlow</Text>
          <Text style={styles.infoText}>
            Organize suas tarefas por prioridade para aumentar sua produtividade em até 30%.
          </Text>
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
  card: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: '#8E8E93',
  },
  quoteCard: {
    borderRadius: 16,
    padding: 25,
    marginBottom: 20,
    borderLeftWidth: 5,
    borderLeftColor: '#007AFF',
  },
  quoteTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#007AFF',
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  quoteText: {
    fontSize: 18,
    fontStyle: 'italic',
    fontWeight: '600',
    lineHeight: 26,
  },
  quoteAuthor: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 10,
    textAlign: 'right',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  }
});