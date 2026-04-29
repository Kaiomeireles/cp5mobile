import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface Props {
  message?: string;
}

export const EmptyState: React.FC<Props> = ({ message = 'Nenhuma tarefa encontrada.' }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  text: {
    fontSize: 16,
    color: '#AEAEB2',
    textAlign: 'center',
  },
});
