import { Todo } from '../types/Todo'; // Import the Todo type

type TodoItemProps = {
  todo: Todo;
  onDelete: (todoId: string) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
  return (
    <div className="bg-white p-2 mb-2 rounded shadow-sm">
      <p className="text-gray-700">{todo.title}</p>
      <button onClick={() => onDelete(todo._id)}> - </button>
    </div>
  );
};

export default TodoItem;
