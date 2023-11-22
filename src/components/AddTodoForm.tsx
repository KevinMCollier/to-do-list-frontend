import { useState, FormEvent, ChangeEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface AddTodoFormProps {
  onAddTodo: (todo: { title: string; date: Date }) => void;
}

const AddTodoForm = ({ onAddTodo }: AddTodoFormProps) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onAddTodo({
      title,
      date,
    });

    setTitle('');
    setDate(new Date());
  };

  const handleDateChange = (newDate: Date | null) => {
    if (newDate) {
      setDate(newDate);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
        placeholder="Todo title"
      />
      <DatePicker selected={date} onChange={handleDateChange} />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodoForm;
