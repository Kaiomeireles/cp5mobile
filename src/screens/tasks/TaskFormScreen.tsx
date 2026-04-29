import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ScrollView, Alert, Text, TouchableOpacity } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { TaskStackParamList } from '../../types/navigation';
import { CustomInput } from '../../components/CustomInput';
import { CustomButton } from '../../components/CustomButton';
import { useTasks } from '../../hooks/useTasks';
import { useTheme } from '../../hooks/useTheme';
import { generateId } from '../../utils/generateId';
import { TaskPriority, TaskStatus } from '../../types/task';

type NavigationProp = NativeStackNavigationProp<TaskStackParamList, 'TaskForm'>;
type RouteProps = RouteProp<TaskStackParamList, 'TaskForm'>;

export const TaskFormScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<RouteProps>();
  const { taskId } = route.params || {};
  const { addTask, updateTask, getTaskById } = useTasks();
  const { theme } = useTheme();

  const isDark = theme === 'dark';

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('media');
  const [status, setStatus] = useState<TaskStatus>('pendente');
  const [category, setCategory] = useState('Geral');

  useEffect(() => {
    if (taskId) {
      const task = getTaskById(taskId);
      if (task) {
        setTitle(task.title);
        setDescription(task.description);
        setPriority(task.priority);
        setStatus(task.status);
        setCategory(task.category);
      }
    }
  }, [taskId]);

  const handleSave = async () => {
    if (!title.trim()) {
      Alert.alert('Erro', 'O título é obrigatório');
      return;
    }

    const taskData = {
      id: taskId || generateId(),
      title,
      description,
      priority,
      status,
      category,
      categoryIcon: 'list',
      createdAt: taskId ? getTaskById(taskId)?.createdAt || new Date().toISOString() : new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    if (taskId) {
      await updateTask(taskData);
    } else {
      await addTask(taskData);
    }

    navigation.goBack();
  };

  const priorities: TaskPriority[] = ['baixa', 'media', 'alta'];

  return (
    <ScrollView style={[styles.container, { backgroundColor: isDark ? '#1C1C1E' : '#F2F2F7' }]}>
      <View style={[styles.card, { backgroundColor: isDark ? '#2C2C2E' : '#FFF' }]}>
        <CustomInput 
          label="Título"
          placeholder="Ex: Estudar React Native"
          value={title}
          onChangeText={setTitle}
        />
        
        <CustomInput 
          label="Descrição"
          placeholder="Detalhes da tarefa..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
          style={styles.textArea}
        />

        <CustomInput 
          label="Categoria"
          placeholder="Ex: Trabalho, Estudo..."
          value={category}
          onChangeText={setCategory}
        />

        <Text style={styles.label}>Prioridade</Text>
        <View style={styles.priorityContainer}>
          {priorities.map((p) => (
            <TouchableOpacity 
              key={p}
              style={[
                styles.priorityButton, 
                priority === p && styles.prioritySelected,
                priority === p && { backgroundColor: p === 'alta' ? '#FF3B30' : p === 'media' ? '#FF9500' : '#34C759' }
              ]}
              onPress={() => setPriority(p)}
            >
              <Text style={[styles.priorityText, priority === p && styles.priorityTextSelected]}>
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <CustomButton 
          title={taskId ? "Atualizar Tarefa" : "Criar Tarefa"}
          onPress={handleSave}
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
  card: {
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
    fontWeight: '500',
  },
  priorityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  priorityButton: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#F2F2F7',
    marginHorizontal: 5,
  },
  prioritySelected: {
    backgroundColor: '#007AFF',
  },
  priorityText: {
    fontSize: 14,
    color: '#8E8E93',
  },
  priorityTextSelected: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 10,
  }
});
