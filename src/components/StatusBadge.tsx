import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TaskStatus, TaskPriority } from '../types/task';

interface Props {
  status: TaskStatus;
}

export const StatusBadge: React.FC<Props> = ({ status }) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pendente': return { label: 'Pendente', color: '#FF9500' };
      case 'em_andamento': return { label: 'Em Andamento', color: '#FF3B30' }; // Swapped blue for red
      case 'concluida': return { label: 'Concluída', color: '#34C759' };
      default: return { label: 'Pendente', color: '#FF9500' };
    }
  };

  const config = getStatusConfig();

  return (
    <View style={[styles.badge, { backgroundColor: config.color + '15' }]}>
      <Text style={[styles.text, { color: config.color }]}>{config.label}</Text>
    </View>
  );
};

export const PriorityLabel = (priority: TaskPriority) => {
  switch (priority) {
    case 'alta': return { label: 'Alta', color: '#E53935' };
    case 'media': return { label: 'Média', color: '#FF9500' };
    case 'baixa': return { label: 'Baixa', color: '#8E8E93' };
    default: return { label: 'Baixa', color: '#8E8E93' };
  }
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
});
