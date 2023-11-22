import AddTodoForm from '../components/AddTodoForm';
import TodoService from '../services/TodoService';
import { useUser } from '../hooks/useUser';
import { useNavigate } from 'react-router-dom';

const CreateTodoPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleAddTodo = async (todoData: { title: string; date: Date, repeat: string }) => {
    if (!user) return;

    try {
      await TodoService.createTodo({
        ...todoData,
        userId: user._id,
      });
      navigate('/homepage'); // Redirect to homepage
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <div>
      <h1>Create New Todo</h1>
      <AddTodoForm onAddTodo={handleAddTodo} />
    </div>
  );
};

export default CreateTodoPage;
