// src/services/TodoService.ts

// Assuming this is the type of your todo items
type Todo = {
  id: string;
  title: string;
  date: string;
  repeat: 'Never' | 'Daily - Weekdays' | 'Daily - Weekends' | 'Daily' | 'Weekly';
  dayOfWeek?: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  user: string;
};

const API_BASE_URL = 'http://localhost:3000'; // Adjust as needed for your backend URL

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

  // Additional functions as needed
};

export default TodoService;
