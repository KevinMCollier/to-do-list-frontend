// TodosContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import TodoService from '../services/TodoService';
import { useAuth } from '../hooks/useAuth';
import { Todo } from '../types/Todo';

type TodosContextType = {
  allTodos: Todo[];
  todaysTodos: Todo[];
  loadAllTodos: (authEmail: string, authToken: string) => Promise<void>;
  loadTodaysTodos: (authEmail: string, authToken: string) => Promise<void>;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [todaysTodos, setTodaysTodos] = useState<Todo[]>([]);
  const auth = useAuth();

  useEffect(() => {
    if (auth.email && auth.token) {
      console.log("Attempting to load todos...");
      loadAllTodos(auth.email, auth.token);
      loadTodaysTodos(auth.email, auth.token);
    }
  }, [auth.email, auth.token]);

  const loadAllTodos = async (authEmail: string, authToken: string) => {
    try {
      const todos = await TodoService.fetchAllTodos(authEmail, authToken);
      console.log("Fetched all todos:", todos);
      setAllTodos(todos);
    } catch (error) {
      console.error("Failed to load all todos:", error);
    }
  };

  const loadTodaysTodos = async (authEmail: string, authToken: string) => {
    try {
      const todos = await TodoService.fetchTodaysTodos(authEmail, authToken);
      console.log("Fetched today's todos:", todos);
      setTodaysTodos(todos);
    } catch (error) {
      console.error("Failed to load today's todos:", error);
    }
  };

  return (
    <TodosContext.Provider value={{ allTodos, todaysTodos, loadAllTodos, loadTodaysTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
