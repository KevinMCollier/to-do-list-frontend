import { Todo } from '../types/Todo';

const API_BASE_URL = 'https://fast-tor-67274.herokuapp.com/api/v1';

// Function to get authentication headers
const getAuthHeaders = (email: string, token: string) => ({
  'Content-Type': 'application/json',
  'X-User-Email': email,
  'X-User-Token': token,
});

const TodoService = {
  fetchAllTodos: async (email: string, token: string): Promise<Todo[]> => {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      headers: getAuthHeaders(email, token),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch todos');
    }
    return await response.json();
  },

  fetchTodaysTodos: async (email: string, token: string): Promise<Todo[]> => {
    const today = new Date().toISOString().split('T')[0];
    const response = await fetch(`${API_BASE_URL}/todos/by_date?date=${today}`, {
      headers: getAuthHeaders(email, token),
    });
    if (!response.ok) {
      throw new Error('Failed to fetch today\'s todos');
    }
    return await response.json();
  },

  createTodo: async (todoData: { title: string; date: Date, repeat: string }, email: string, token: string): Promise<Todo> => {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: getAuthHeaders(email, token),
      body: JSON.stringify(todoData),
    });
    if (!response.ok) {
      throw new Error('Failed to create todo');
    }
    return await response.json();
  },

  deleteTodo: async (todoId: string, email: string, token: string): Promise<void> => {
    console.log(`Calling DELETE on /todos/${todoId}`);
    const response = await fetch(`${API_BASE_URL}/todos/${todoId}`, {
      method: 'DELETE',
      headers: getAuthHeaders(email, token),
    });
    if (!response.ok) {
      throw new Error('Failed to delete todo');
    }
  },
};

export default TodoService;
