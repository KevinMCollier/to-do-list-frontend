import TodoItem from './TodoItem';
import { Todo } from '../types/Todo';
import TodoService from '../services/TodoService';
import { useUser } from '../hooks/useUser';
import { groupTasksByDisplayDates, startOfWeek, endOfWeek, groupTasksByDate } from '../utils/utils';
import { format } from 'date-fns';

type TodoListProps = {
  todos: Todo[];
  refreshTodos: () => void;
  viewMode: 'all' | 'today' | 'week';
};

const TodoList: React.FC<TodoListProps> = ({ todos, refreshTodos, viewMode }) => {
  const { user } = useUser();

  let groupedTodos: Record<string, Todo[]> = {}; // Explicitly defining the type
  if (viewMode === 'all') {
    groupedTodos = groupTasksByDate(todos); // Use the original grouping logic for 'all' view
  } else if (viewMode === 'today') {
    // Logic for today's tasks
  } else if (viewMode === 'week') {
    const start = startOfWeek(new Date());
    const end = endOfWeek(new Date());
    groupedTodos = groupTasksByDisplayDates(todos, start, end);
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
        <div key={date}>
          <h4 className="text-lg font-bold">
            {format(new Date(date), 'MMMM dd, yyyy')}
          </h4>
          {todosForDate.map(todo => (
            <TodoItem key={todo._id} todo={todo} onDelete={handleDelete} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TodoList;
