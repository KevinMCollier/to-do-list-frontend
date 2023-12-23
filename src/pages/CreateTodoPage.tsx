// CreateTodoPage.tsx
import AddTodoForm from '../components/AddTodoForm';
import TodoService from '../services/TodoService';
import { useAuth } from '../hooks/useAuth';
import useTodos from '../hooks/useTodos';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const CreateTodoPage = () => {
  const navigate = useNavigate();
  const { email, token } = useAuth();
  const { loadAllTodos } = useTodos();

  const handleAddTodo = async (todoData: { title: string; date: Date, repeat: string }) => {
    if (!email || !token) return;

    try {
      const newTodo = await TodoService.createTodo(todoData, email, token); // Pass the user's email and token
      console.log("New Todo created:", newTodo);

      await loadAllTodos(email, token);
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
