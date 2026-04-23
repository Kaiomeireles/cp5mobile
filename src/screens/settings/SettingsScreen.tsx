import { View, Text } from 'react-native';
import Header from '../../components/Header';

export default function SettingsScreen() {
  return (
    <View style={{ flex: 1 }}>
      <Header />
      <Text>Settings Screen</Text>
    </View>
  );
}