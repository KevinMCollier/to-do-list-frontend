import { Todo } from '../types/Todo';


const API_BASE_URL = 'http://localhost:3000';

const TodoService = {
  fetchAllTodos: async (userId: string): Promise<Todo[]> => {
    const response = await fetch(`${API_BASE_URL}/todos/user/${userId}`);
    console.log('Response for fetchAllTodos:', await response.clone().json());
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return await response.json();
  },

  fetchTodaysTodos: async (userId: string): Promise<Todo[]> => {
    const today = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD
    const response = await fetch(`${API_BASE_URL}/todos/byDate?date=${today}&user=${userId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch today\'s todos');
    }
    return await response.json();
  },

  createTodo: async (todoData: { title: string; date: Date, userId: string, repeat: string }): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: todoData.title,
        date: todoData.date.toISOString(),
        user: todoData.userId,
        repeat: todoData.repeat
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to create todo');
    }

    return await response.json();
  },

  deleteTodo: async (todoId: string, userId: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/todos/${todoId}?user=${userId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  },
};

export default TodoService;
