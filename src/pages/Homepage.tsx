// Homepage.tsx
import TodoList from '../components/TodoList';
import ToggleSwitch from '../components/ToggleSwitch';
import useTodos from '../hooks/useTodos';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useAuth } from '../hooks/useAuth';

const Homepage = () => {
  const [viewMode, setViewMode] = useState<'all' | 'today' | 'week'>('all');
  const { allTodos, todaysTodos, loadAllTodos, loadTodaysTodos } = useTodos();
  const { email, token } = useAuth();

  const refreshTodos = () => {
    if (email && token) {
      loadAllTodos(email, token);
      loadTodaysTodos(email, token);
    }
  };

  const todosToShow = viewMode === 'today' ? todaysTodos : allTodos;

  return (
    <div className="bg-offWhite min-h-screen p-4">
      <ToggleSwitch viewMode={viewMode} setViewMode={setViewMode} />
      <div className="flex flex-col items-center">
        <TodoList todos={todosToShow} refreshTodos={refreshTodos} viewMode={viewMode} />
        <Link to="/create-todo" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 inline-flex items-center">
          <span>Add New Task</span>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
