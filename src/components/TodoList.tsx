import TodoItem from './TodoItem';
import { Todo } from '../types/Todo';
import TodoService from '../services/TodoService';
import { useAuth } from '../hooks/useAuth';
import { groupTasksByDisplayDates } from '../utils/utils';
import { format, addDays, startOfDay } from 'date-fns';
import { useState } from 'react';
import './TodoList.css';
import React from 'react';

type TodoListProps = {
  todos: Todo[];
  refreshTodos: () => void;
  viewMode: 'all' | 'today' | 'week';
};

const TodoList: React.FC<TodoListProps> = ({ todos, refreshTodos, viewMode }) => {
  const { email, token } = useAuth();
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));

  let displayedTodos: Todo[] = [];

  if (viewMode === 'week') {
    // Adjusting the range to the next 7 days instead of just one day
    const upcomingEndDate = addDays(selectedDate, 7); // e.g., next 7 days
    const groupedTodos = groupTasksByDisplayDates(todos, selectedDate, upcomingEndDate);

    // Log to check the date range and results
    console.log("Selected Date (Start):", selectedDate);
    console.log("Upcoming End Date:", upcomingEndDate);
    console.log("Grouped Todos:", groupedTodos);

    displayedTodos = groupedTodos[format(selectedDate, 'yyyy-MM-dd')] || [];
  } else {
    displayedTodos = todos;
  }

  const handleDelete = async (todoId: string) => {
    if (!email || !token || !todoId) return;
    try {
      await TodoService.deleteTodo(todoId, email, token);
      refreshTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleDateChange = (direction: 'left' | 'right') => {
    const newDate = direction === 'left' ? addDays(selectedDate, -1) : addDays(selectedDate, 1);
    setSelectedDate(newDate);
  };

  return (
    <div className="bg-lightGray mx-auto p-4 rounded max-w-3xl">
      {viewMode === 'week' && (
        <div className="carousel">
          <button onClick={() => handleDateChange('left')}>{'<'}</button>
          <h4 className="text-sm font-semibold date-header">
            {format(selectedDate, 'MMMM dd, yyyy')}
          </h4>
          <button onClick={() => handleDateChange('right')}>{'>'}</button>
        </div>
      )}
      <div>
        {displayedTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} onDelete={() => handleDelete(todo.id)} />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
