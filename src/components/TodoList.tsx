import TodoItem from './TodoItem';
import { Todo } from '../types/Todo';
import TodoService from '../services/TodoService';
import { useUser } from '../hooks/useUser';
import { groupTasksByDisplayDates } from '../utils/utils';
import { format, addDays, startOfDay, subDays } from 'date-fns';
import { useState } from 'react';
import './TodoList.css';

type TodoListProps = {
  todos: Todo[];
  refreshTodos: () => void;
  viewMode: 'all' | 'today' | 'week';
};

const TodoList: React.FC<TodoListProps> = ({ todos, refreshTodos, viewMode }) => {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState(startOfDay(new Date()));

  const groupedTodos: Record<string, Todo[]> = groupTasksByDisplayDates(todos, selectedDate, addDays(selectedDate, 1));

  const handleDelete = async (todoId: string) => {
    if (!user) return;
    try {
      await TodoService.deleteTodo(todoId, user._id);
      refreshTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleDateChange = (direction: 'left' | 'right') => {
    const newDate = direction === 'left' ? subDays(selectedDate, 1) : addDays(selectedDate, 1);
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
  {groupedTodos[format(selectedDate, 'yyyy-MM-dd')] && groupedTodos[format(selectedDate, 'yyyy-MM-dd')].map(todo => (
    <TodoItem key={todo._id} todo={todo} onDelete={handleDelete} />
  ))}
</div>

    </div>
  );
};

export default TodoList;
