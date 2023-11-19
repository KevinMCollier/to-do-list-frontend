// src/context/TodosContext.tsx
import { createContext, useState, ReactNode } from 'react';
import TodoService from '../services/TodoService';

type Todo = {
  // Define your Todo type
};

type TodosContextType = {
  allTodos: Todo[];
  todaysTodos: Todo[];
  loadAllTodos: () => Promise<void>;
  loadTodaysTodos: () => Promise<void>;
};

const TodosContext = createContext<TodosContextType | undefined>(undefined);

type TodosProviderProps = {
  children: ReactNode;
};

export const TodosProvider = ({ children }: TodosProviderProps) => {
  const [allTodos, setAllTodos] = useState<Todo[]>([]);
  const [todaysTodos, setTodaysTodos] = useState<Todo[]>([]);

  const loadAllTodos = async () => {
    const todos = await TodoService.fetchAllTodos();
    setAllTodos(todos);
  };

  const loadTodaysTodos = async () => {
    const todos = await TodoService.fetchTodaysTodos();
    setTodaysTodos(todos);
  };

  return (
    <TodosContext.Provider value={{ allTodos, todaysTodos, loadAllTodos, loadTodaysTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

export default TodosContext;
