// src/context/TodosContext.tsx
import { createContext, useState, ReactNode, useEffect } from 'react';
import TodoService from '../services/TodoService';
import { useUser } from '../hooks/useUser';

type Todo = {
  id: string;
  title: string;
  date: string;
  repeat: 'Never' | 'Daily - Weekdays' | 'Daily - Weekends' | 'Daily' | 'Weekly';
  dayOfWeek?: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  user: string;
};

type TodosContextType = {
  allTodos: Todo[];
  todaysTodos: Todo[];
  loadAllTodos: (userName: string) => Promise<void>;
  loadTodaysTodos: (userName: string) => Promise<void>;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

type TodosProviderProps = {
  children: ReactNode;
};

export const TodosProvider = ({ children }: TodosProviderProps) => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [todaysTodos, setTodaysTodos] = useState<Todo[]>([]);
  const { user } = useUser();

  useEffect(() => {
    if (user) {
      loadAllTodos(user);
      loadTodaysTodos(user);
    }
  }, [user]);

  const loadAllTodos = async (userName: string) => {
    const todos = await TodoService.fetchAllTodos(userName);
    setAllTodos(todos);
  };

  const loadTodaysTodos = async (userName: string) => {
    const todos = await TodoService.fetchTodaysTodos(userName);
    setTodaysTodos(todos);
  };

  return (
    <TodosContext.Provider value={{ allTodos, todaysTodos, loadAllTodos, loadTodaysTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
