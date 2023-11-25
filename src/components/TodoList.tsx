import TodoItem from './TodoItem';
import { Todo } from '../types/Todo';
import TodoService from '../services/TodoService';
import { useUser } from '../hooks/useUser';
import { groupTasksByDisplayDates, groupTasksByDate } from '../utils/utils';
import { format, addDays, startOfDay, isSameDay } from 'date-fns';
import { useState } from 'react';
import './TodoList.css';


type TodoListProps = {
  todos: Todo[];
  refreshTodos: () => void;
  viewMode: 'all' | 'today' | 'week';
};

const TodoList: React.FC<TodoListProps> = ({ todos, refreshTodos, viewMode }) => {
  const { user } = useUser();
  const [hoveredDate, setHoveredDate] = useState('');

  let groupedTodos: Record<string, Todo[]> = {};
  const today = startOfDay(new Date());

  if (viewMode === 'all') {
    groupedTodos = groupTasksByDate(todos);
  } else if (viewMode === 'today') {
    const filteredTodayTodos = todos.filter(todo => isSameDay(new Date(todo.date), today));
    groupedTodos[today.toISOString()] = filteredTodayTodos;  } else if (viewMode === 'week') {
    const end = addDays(today, 7);
    groupedTodos = groupTasksByDisplayDates(todos, today, end);
  }

  const handleDelete = async (todoId: string) => {
    if (!user) return;
    try {
      await TodoService.deleteTodo(todoId, user._id);
      refreshTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="bg-lightGray mx-auto p-4 rounded max-w-3xl">
      {Object.entries(groupedTodos).map(([date, todosForDate]) => (
        <div key={date} className={viewMode === 'week' ? 'date-card' : ''}
            onMouseEnter={() => setHoveredDate(date)}
            onMouseLeave={() => setHoveredDate('')}>
          <h4 className="text-sm font-semibold date-header">
            {viewMode !== 'all' && (
              <>
                {format(new Date(date), 'MMMM dd, yyyy')}
                {viewMode === 'week' && <span className="down-arrow">&#9660;</span>}
              </>
            )}
          </h4>
          {(viewMode !== 'week' || hoveredDate === date) && (
            <div className={viewMode === 'week' ? 'tasks-dropdown' : ''}>
              {todosForDate.map(todo => (
                <TodoItem key={todo._id} todo={todo} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
