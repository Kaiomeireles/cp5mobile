import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../hooks/useAuth';

export default function Header() {
  const { user, logout } = useAuth();

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.name}>{user?.name}</Text>
        <Text style={styles.role}>{user?.role}</Text>
      </View>

      <TouchableOpacity onPress={logout}>
        <Text style={styles.logout}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#222',
  },
  name: { color: '#fff', fontWeight: 'bold' },
  role: { color: '#aaa' },
  logout: { color: 'red' },
});