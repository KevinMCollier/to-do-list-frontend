// src/context/TodosContext.tsx
import { createContext, useState, useEffect, ReactNode } from 'react';
import TodoService from '../services/TodoService';
import { useUser } from '../hooks/useUser';
import { Todo } from '../types/Todo'; // Import the User interface

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
    console.log("User ID in TodosContext:", user?._id); // Add this line
    if (user && user._id) {
      loadAllTodos(user._id);
      loadTodaysTodos(user._id);
    }
  }, [user]);

  const loadAllTodos = async (userId: string) => {
    console.log('Fetching all todos for user ID:', userId);
    const todos = await TodoService.fetchAllTodos(userId);
    setAllTodos(todos);
  };

  const loadTodaysTodos = async (userId: string) => {
    console.log('Fetching todays todos for user ID:', userId);
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
