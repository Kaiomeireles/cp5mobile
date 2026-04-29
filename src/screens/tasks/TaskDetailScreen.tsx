import React from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TaskStackParamList } from '../../types/navigation';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import { StatusBadge } from '../../components/StatusBadge';
import { CustomButton } from '../../components/CustomButton';
import { formatDate } from '../../utils/formatDate';

type NavigationProp = NativeStackNavigationProp<TaskStackParamList, 'TaskDetail'>;
type RouteProps = RouteProp<TaskStackParamList, 'TaskDetail'>;

export const TaskDetailScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { taskId } = route.params;
  const { getTaskById, deleteTask, updateTask } = useTasks();
  const { theme } = useTheme();

  const isDark = theme === 'dark';
  const task = getTaskById(taskId);

  if (!task) {
    return (
      <View style={styles.center}>
        <Text>Tarefa não encontrada.</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Deseja realmente excluir esta tarefa?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          style: 'destructive',
          onPress: async () => {
            await deleteTask(taskId);
            navigation.goBack();
          }
        }
      ]
    );
  };

  const handleToggleStatus = async () => {
    const newStatus = task.status === 'concluida' ? 'pendente' : 'concluida';
    await updateTask({ ...task, status: newStatus, updatedAt: new Date().toISOString() });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}>
      <View style={[styles.card, { backgroundColor: isDark ? '#2C2C2E' : '#FFF' }]}>
        <View style={styles.header}>
          <StatusBadge status={task.status} />
          <Text style={styles.category}>{task.category}</Text>
        </View>

        <Text style={[styles.title, { color: isDark ? '#FFF' : '#333' }]}>{task.title}</Text>
        <Text style={styles.description}>{task.description || 'Sem descrição.'}</Text>

        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Prioridade</Text>
            <Text style={[styles.infoValue, { color: task.priority === 'alta' ? '#FF3B30' : task.priority === 'media' ? '#FF9500' : '#34C759' }]}>
              {task.priority.toUpperCase()}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Criada em</Text>
            <Text style={styles.infoValue}>{formatDate(task.createdAt)}</Text>
          </View>
        </View>

        <CustomButton 
          title={task.status === 'concluida' ? "Marcar como Pendente" : "Concluir Tarefa"}
          type="secondary"
          onPress={handleToggleStatus}
          style={styles.button}
        />

        <CustomButton 
          title="Editar Tarefa"
          onPress={() => navigation.navigate('TaskForm', { taskId })}
          style={styles.button}
        />

        <CustomButton 
          title="Excluir Tarefa"
          type="danger"
          onPress={handleDelete}
          style={styles.button}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    margin: 20,
    padding: 25,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  category: {
    fontSize: 14,
    color: '#8E8E93',
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 30,
  },
  infoSection: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#F2F2F7',
    paddingTop: 20,
    marginBottom: 30,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#AEAEB2',
    textTransform: 'uppercase',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    marginBottom: 10,
  }
});
