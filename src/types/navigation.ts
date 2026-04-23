export type TabParamList = {
  Home: undefined;
  Tasks: undefined;
  Settings: undefined;
};

export type TaskStackParamList = {
  TaskList: undefined;
  TaskForm: { taskId?: string };
  TaskDetail: { taskId: string };
};