// CreateTodoPage.tsx

import AddTodoForm from '../components/AddTodoForm';
import TodoService from '../services/TodoService';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CreateTodoPage = () => {
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const handleAddTodo = async (todoData: { title: string; date: Date, repeat: string }) => {
    if (!user || !token) return;

    try {
      await TodoService.createTodo({
        ...todoData,
        userId: user._id, // Assuming the user object includes _id
      }, user.email, token); // Pass the user's email and token
      navigate('/homepage'); // Redirect to homepage
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  return (
    <div className="bg-offWhite min-h-screen p-4 max-w-lg mx-auto">
      <div className="mb-4">
        <Link to="/homepage" className="text-blue-500 hover:text-blue-700">
          ← Return
        </Link>
      </div>
      <AddTodoForm onAddTodo={handleAddTodo} />
    </div>
  );
};

export default CreateTodoPage;
