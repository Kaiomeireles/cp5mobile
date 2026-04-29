import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { Task } from '../types/task';
import { StatusBadge, PriorityLabel } from './StatusBadge';
import { formatDate } from '../utils/formatDate';
import { Feather } from '@expo/vector-icons';

interface Props {
  task: Task;
  onPress: () => void;
}

export const TaskCard: React.FC<Props> = ({ task, onPress }) => {
  const priorityInfo = PriorityLabel(task.priority);

  const getCategoryIcon = () => {
    switch (task.category.toLowerCase()) {
      case 'trabalho': return 'briefcase';
      case 'estudo': return 'book';
      case 'pessoal': return 'user';
      case 'saúde': return 'heart';
      default: return 'list';
    }
  };

  return (
    <TouchableOpacity 
      activeOpacity={0.7} 
      style={styles.container} 
      onPress={onPress}
    >
      <View style={[styles.priorityIndicator, { backgroundColor: priorityInfo.color }]} />
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.titleSection}>
            <View style={styles.iconContainer}>
              <Feather name={getCategoryIcon() as any} size={14} color="#FF3B30" />
            </View>
            <Text style={styles.title} numberOfLines={1}>{task.title}</Text>
          </View>
          <StatusBadge status={task.status} />
        </View>
        
        {task.description ? (
          <Text style={styles.description} numberOfLines={2}>{task.description}</Text>
        ) : null}
        
        <View style={styles.footer}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{task.category}</Text>
          </View>
          <View style={styles.dateSection}>
            <Feather name="calendar" size={12} color="#AEAEB2" style={{ marginRight: 4 }} />
            <Text style={styles.date}>{formatDate(task.createdAt)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    marginVertical: 8,
    flexDirection: 'row',
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
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#F2F2F7',
  },
  priorityIndicator: {
    width: 4,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  iconContainer: {
    width: 24,
    height: 24,
    borderRadius: 6,
    backgroundColor: '#FF3B3010',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1A1A1A',
  },
  description: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tag: {
    backgroundColor: '#F2F2F7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
  tagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#8E8E93',
  },
  dateSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  date: {
    fontSize: 12,
    color: '#AEAEB2',
  },
});
