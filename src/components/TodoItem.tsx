type TodoItemProps = {
  todo: {
    id: string;
    title: string;
    date: string;
    repeat: 'Never' | 'Daily - Weekdays' | 'Daily - Weekends' | 'Daily' | 'Weekly';
    dayOfWeek?: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
    user: string;
  };
};

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  return (
    <div className="bg-white p-2 mb-2 rounded shadow-sm">
      <p className="text-darkGray">{todo.title}</p>
    </div>
  );
};

export default TodoItem;
