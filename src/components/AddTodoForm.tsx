import { useState, FormEvent, ChangeEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface AddTodoFormProps {
  onAddTodo: (todo: { title: string; date: Date; repeat: string }) => void;
}


const repeatOptions = ['Never', 'Daily', 'Daily - Weekdays', 'Daily - Weekends', 'Weekly'];

const AddTodoForm = ({ onAddTodo }: AddTodoFormProps) => {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date());
  const [repeat, setRepeat] = useState(repeatOptions[0]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title) return;

    onAddTodo({
      title,
      date,
      repeat
    });

    setTitle('');
    setDate(new Date());
    setRepeat(repeatOptions[0]);
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
      <select value={repeat} onChange={(e) => setRepeat(e.target.value)}>
        {repeatOptions.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default AddTodoForm;
