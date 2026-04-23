import { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import Header from '../../components/Header';
import { getQuote } from '../../services/api';

export default function HomeScreen() {
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadQuote();
  }, []);

  async function loadQuote() {
    const data = await getQuote();
    setQuote(data);
    setLoading(false);
  }

  return (
    <View style={{ flex: 1 }}>
      <Header />

      <View style={{ padding: 20 }}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <Text>{quote}</Text>
        )}
      </View>
    </View>
  );
}