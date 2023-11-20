import TodoItem from './TodoItem';

type Todo = {
  id: string;
  title: string;
  date: string;
  repeat: 'Never' | 'Daily - Weekdays' | 'Daily - Weekends' | 'Daily' | 'Weekly';
  dayOfWeek?: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  user: string;
};

type TodoListProps = {
  todos: Todo[];
}

const ToDoList: React.FC<TodoListProps> = ({ todos }) => {
  return (
    <div className="bg-beige p-4 rounded">
      {todos.map(todo => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

export default ToDoList;
