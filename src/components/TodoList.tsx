import TodoItem from './TodoItem';
import { Todo } from '../types/Todo'; // Import the Todo type

type TodoListProps = {
  todos: Todo[];
}

const ToDoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div className="bg-beige p-4 rounded">
      {todos.map(todo => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
};

export default ToDoList;
