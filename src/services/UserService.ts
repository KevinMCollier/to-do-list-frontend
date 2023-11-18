const BASE_URL = 'http://localhost:3000'; // Replace with your actual API URL

export const UserService = {
  // Function to send the username to the backend
  setUser: async (username: string): Promise<void> => {
    try {
      const response = await fetch(`${BASE_URL}/setUser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
      });

      if (!response.ok) {
        throw new Error('Failed to set user');
      }
    } catch (error) {
      console.error('Error setting user:', error);
    }
  },

  // Additional user-related methods can go here
};

export default UserService;
