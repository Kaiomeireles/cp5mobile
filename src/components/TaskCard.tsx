import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Task } from '../types/task';
import { StatusBadge } from './StatusBadge';
import { formatDate } from '../utils/formatDate';

interface Props {
  task: Task;
  onPress: () => void;
}

export const TaskCard: React.FC<Props> = ({ task, onPress }) => {
  const getPriorityColor = () => {
    switch (task.priority) {
      case 'alta': return '#FF3B30';
      case 'media': return '#FF9500';
      case 'baixa': return '#34C759';
      default: return '#8E8E93';
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.priorityLine, { backgroundColor: getPriorityColor() }]} />
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.title} numberOfLines={1}>{task.title}</Text>
          <StatusBadge status={task.status} />
        </View>
        <Text style={styles.description} numberOfLines={2}>{task.description}</Text>
        <View style={styles.footer}>
          <Text style={styles.category}>{task.category}</Text>
          <Text style={styles.date}>{formatDate(task.createdAt)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginVertical: 8,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  priorityLine: {
    width: 6,
  },
  content: {
    flex: 1,
    padding: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
    marginRight: 10,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  category: {
    fontSize: 12,
    color: '#8E8E93',
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  date: {
    fontSize: 12,
    color: '#AEAEB2',
  },
});
