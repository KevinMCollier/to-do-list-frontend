import TodoList from '../components/TodoList';
import ToggleSwitch from '../components/ToggleSwitch';
import useTodos from '../hooks/useTodos';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Homepage = () => {
  const [isTodayView, setIsTodayView] = useState(false);
  const { allTodos, todaysTodos } = useTodos();
  console.log("All Todos:", allTodos); // Add this line
  console.log("Today's Todos:", todaysTodos); // Add this line


  return (
    <div className="bg-offWhite min-h-screen p-4">
      <ToggleSwitch isToday={isTodayView} setTodayView={setIsTodayView} />
      <div className="flex flex-col items-center">
        <TodoList todos={isTodayView ? todaysTodos : allTodos} />
        <Link to="/create-todo" className="text-blue-500 hover:text-blue-700 mt-4">Create New Todo</Link>
      </div>
    </div>
  );
};

export default Homepage;
