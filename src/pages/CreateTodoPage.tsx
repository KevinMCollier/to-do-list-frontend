import AddTodoForm from '../components/AddTodoForm';
import TodoService from '../services/TodoService';
import { useUser } from '../hooks/useUser'; // Use your custom hook

const CreateTodoPage = () => {
  const { user } = useUser(); // Use the useUser hook

  const handleAddTodo = async (todoData: { title: string; date: Date }) => {
    // Ensure user is not null before proceeding
    if (!user) return;

    try {
      await TodoService.createTodo({
        ...todoData,
        userId: user._id, // Assuming user object has _id
      });
      // Handle post-creation logic here (e.g., navigate to a different page)
    } catch (error) {
      console.error('Error creating todo:', error);
      // Handle error (e.g., show error message)
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
