import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Task } from '../types/task';
import { taskStorage } from '../services/taskStorage';

interface TaskContextData {
  tasks: Task[];
  loading: boolean;
  addTask(task: Task): Promise<void>;
  updateTask(task: Task): Promise<void>;
  deleteTask(id: string): Promise<void>;
  getTaskById(id: string): Task | undefined;
}

export const TaskContext = createContext<TaskContextData>({} as TaskContextData);

export const TaskProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTasks() {
      const savedTasks = await taskStorage.getTasks();
      setTasks(savedTasks);
      setLoading(false);
    }
    loadTasks();
  }, []);

  const addTask = async (task: Task) => {
    const newTasks = [...tasks, task];
    setTasks(newTasks);
    await taskStorage.saveTasks(newTasks);
  };

  const updateTask = async (updatedTask: Task) => {
    const newTasks = tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
    setTasks(newTasks);
    await taskStorage.saveTasks(newTasks);
  };

  const deleteTask = async (id: string) => {
    const newTasks = tasks.filter(t => t.id !== id);
    setTasks(newTasks);
    await taskStorage.saveTasks(newTasks);
  };

  const getTaskById = (id: string) => {
    return tasks.find(t => t.id === id);
  };

  return (
    <TaskContext.Provider value={{ tasks, loading, addTask, updateTask, deleteTask, getTaskById }}>
      {children}
    </TaskContext.Provider>
  );
};
