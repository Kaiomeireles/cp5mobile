import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

const TASKS_KEY = '@taskflow_tasks';

export const taskStorage = {
  getTasks: async (): Promise<Task[]> => {
    try {
      const data = await AsyncStorage.getItem(TASKS_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error('Error getting tasks', error);
      return [];
    }
  },

  saveTasks: async (tasks: Task[]): Promise<void> => {
    try {
      await AsyncStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
    } catch (error) {
      console.error('Error saving tasks', error);
    }
  },

  clearTasks: async (): Promise<void> => {
    try {
      await AsyncStorage.removeItem(TASKS_KEY);
    } catch (error) {
      console.error('Error clearing tasks', error);
    }
  }
};
