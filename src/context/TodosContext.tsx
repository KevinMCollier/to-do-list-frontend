import { createContext, useState, useEffect, ReactNode } from 'react';
import TodoService from '../services/TodoService';
import { useAuth } from '../hooks/useAuth';
import { Todo } from '../types/Todo';

type TodosContextType = {
  allTodos: Todo[];
  todaysTodos: Todo[];
  loadAllTodos: (userId: string, authToken: string) => Promise<void>;
  loadTodaysTodos: (userId: string, authToken: string) => Promise<void>;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

export const TodosProvider = ({ children }: { children: ReactNode }) => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [todaysTodos, setTodaysTodos] = useState<Todo[]>([]);
  const { user, token } = useAuth();

  useEffect(() => {
    console.log("User ID in TodosContext:", user?._id);
    if (user && user._id && token) {
      loadAllTodos(user._id, token);
      loadTodaysTodos(user._id, token);
    } else {
      console.log("User data not available yet in TodosProvider");
    }
  }, [user, token]);

  const loadAllTodos = async (userId: string, authToken: string) => {
    console.log('Fetching all todos for user ID:', userId);
    const todos = await TodoService.fetchAllTodos(userId, authToken);
    setAllTodos(todos);
  };

  const loadTodaysTodos = async (userId: string, authToken: string) => {
    console.log('Fetching todays todos for user ID:', userId);
    const todos = await TodoService.fetchTodaysTodos(userId, authToken);
    setTodaysTodos(todos);
  };

  return (
    <TodosContext.Provider value={{ allTodos, todaysTodos, loadAllTodos, loadTodaysTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
