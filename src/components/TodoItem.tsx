import { Todo } from '../types/Todo'; // Import the Todo type

type TodoItemProps = {
  todo: Todo;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <div className="bg-white p-2 mb-2 rounded shadow-sm">
      <p className="text-gray-700">{todo.title}</p>
    </div>
  );
};

export default TodoItem;
