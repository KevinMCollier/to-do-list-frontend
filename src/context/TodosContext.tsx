// src/context/TodosContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import TodoService from '../services/TodoService';
import { useUser } from '../hooks/useUser';

type Todo = {
  id: string;
  title: string;
  date: string;
  repeat: 'Never' | 'Daily - Weekdays' | 'Daily - Weekends' | 'Daily' | 'Weekly';
  dayOfWeek?: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  user: string; // Update this if needed
};

type TodosContextType = {
  allTodos: Todo[];
  todaysTodos: Todo[];
  loadAllTodos: (userId: string) => Promise<void>;
  loadTodaysTodos: (userId: string) => Promise<void>;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [todaysTodos, setTodaysTodos] = useState<Todo[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user && user._id) {
      loadAllTodos(user._id);
      loadTodaysTodos(user._id);
    }
  }, [user]);

  const loadAllTodos = async (userId: string) => {
    const todos = await TodoService.fetchAllTodos(userId);
    setAllTodos(todos);
  };

  const loadTodaysTodos = async (userId: string) => {
    const todos = await TodoService.fetchTodaysTodos(userId);
    setTodaysTodos(todos);
  };

  return (
    <TodosContext.Provider value={{ allTodos, todaysTodos, loadAllTodos, loadTodaysTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
