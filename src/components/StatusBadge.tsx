import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TaskStatus } from '../types/task';

interface Props {
  status: TaskStatus;
}

export const StatusBadge: React.FC<Props> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pendente': return { label: 'Pendente', color: '#FF9500' };
      case 'em_andamento': return { label: 'Em Andamento', color: '#007AFF' };
      case 'concluida': return { label: 'Concluída', color: '#34C759' };
      default: return { label: 'Pendente', color: '#FF9500' };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.badge, { backgroundColor: config.color + '20' }]}>
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 10,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});
