import TodoList from '../components/TodoList';
import ToggleSwitch from '../components/ToggleSwitch';
import useTodos from '../hooks/useTodos';
import { useState } from 'react';

const Homepage = () => {
  const [isTodayView, setIsTodayView] = useState(false);
  const { allTodos, todaysTodos } = useTodos();
  console.log("All Todos:", allTodos); // Add this line
  console.log("Today's Todos:", todaysTodos); // Add this line

  return (
    <div className="bg-offWhite min-h-screen p-4">
      <ToggleSwitch isToday={isTodayView} setTodayView={setIsTodayView} />
      <TodoList todos={isTodayView ? todaysTodos : allTodos} />
    </div>
  );
};

export default Homepage;
