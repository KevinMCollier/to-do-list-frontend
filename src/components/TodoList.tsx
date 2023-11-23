import TodoItem from './TodoItem';
import { Todo } from '../types/Todo';
import TodoService from '../services/TodoService';
import { useUser } from '../hooks/useUser';

type TodoListProps = {
  todos: Todo[];
  refreshTodos: () => void; // function to refresh the todo list after deletion
};

const TodoList: React.FC<TodoListProps> = ({ todos, refreshTodos }) => {
  const { user } = useUser();

  const handleDelete = async (todoId: string) => {
    if (!user) return;

    try {
      await TodoService.deleteTodo(todoId, user._id);
      refreshTodos(); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting todo:', error);
      // Handle error (e.g., show error message)
    }
  };

  return (
    <div className="bg-lightGray mx-auto p-4 rounded max-w-3xl">
      {todos.map(todo => (
        <TodoItem key={todo._id} todo={todo} onDelete={handleDelete} />
      ))}
    </div>
  );
};

export default TodoList;
