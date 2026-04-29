import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TaskStackParamList } from '../../types/navigation';
import { Header } from '../../components/Header';
import { FilterBar } from '../../components/FilterBar';
import { TaskCard } from '../../components/TaskCard';
import { EmptyState } from '../../components/EmptyState';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';

type NavigationProp = NativeStackNavigationProp<TaskStackParamList, 'TaskList'>;

export const TaskListScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const { tasks } = useTasks();
  const { theme } = useTheme();
  const [filter, setFilter] = useState('all');

  const isDark = theme === 'dark';

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true;
    return task.status === filter;
  });

  return (
    <View style={[styles.container, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}>
      <Header />
      <FilterBar selectedFilter={filter} onFilterChange={setFilter} />
      
      <FlatList 
        data={filteredTasks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TaskCard 
            task={item} 
            onPress={() => navigation.navigate('TaskDetail', { taskId: item.id })}
          />
        )}
        contentContainerStyle={styles.list}
        ListEmptyComponent={<EmptyState />}
      />

      <TouchableOpacity 
        style={styles.fab}
        onPress={() => navigation.navigate('TaskForm', {})}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  list: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  fabText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: '300',
  }
});
