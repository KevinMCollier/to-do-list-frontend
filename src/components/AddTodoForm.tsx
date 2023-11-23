import { useState, FormEvent, ChangeEvent } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaRegCalendarAlt } from 'react-icons/fa';

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
<form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
  <div className="mb-4">
    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="text" value={title} onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)} placeholder="Todo title" />
  </div>
  <div className="mb-4 flex items-center">
    <DatePicker selected={date} onChange={handleDateChange} className="form-datepicker shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline flex-1" />
    <FaRegCalendarAlt className="ml-2 text-gray-500" />
  </div>
  <div className="mb-4">
    <p>Choose frequency:</p>
    <select className="shadow border rounded w-full py-2 px-3 text-gray-700" value={repeat} onChange={(e) => setRepeat(e.target.value)}>
      {repeatOptions.map(option => (
        <option key={option} value={option}>{option}</option>
      ))}
    </select>
  </div>
  <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
    Add Task
  </button>
</form>

  );
};

export default AddTodoForm;
