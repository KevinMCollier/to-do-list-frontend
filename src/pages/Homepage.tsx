import TodoList from '../components/TodoList';
import ToggleSwitch from '../components/ToggleSwitch';
import useTodos from '../hooks/useTodos';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useUser } from '../hooks/useUser'; // Import the useUser hook

const Homepage = () => {
  const [isTodayView, setIsTodayView] = useState(false);
  const { allTodos, todaysTodos, loadAllTodos, loadTodaysTodos } = useTodos();
  const { user } = useUser(); // Use the useUser hook to access the user context

  const refreshTodos = () => {
    // Check if user is available
    if (user) {
      if (isTodayView) {
        loadTodaysTodos(user._id); // Pass user ID to loadTodaysTodos
      } else {
        loadAllTodos(user._id); // Pass user ID to loadAllTodos
      }
    }
  };

  return (
    <div className="bg-offWhite min-h-screen p-4">
      <ToggleSwitch isToday={isTodayView} setTodayView={setIsTodayView} />
      <div className="flex flex-col items-center">
        <TodoList todos={isTodayView ? todaysTodos : allTodos} refreshTodos={refreshTodos} />
        <Link to="/create-todo" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 inline-flex items-center">
          <span>Add New Item</span>
        </Link>
      </div>
    </div>
  );
};

export default Homepage;
