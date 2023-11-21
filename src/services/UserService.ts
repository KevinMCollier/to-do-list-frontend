const BASE_URL = 'http://localhost:3000/users'; // Replace with your actual API URL

const UserService = {
  setUser: async (username: string) => {
    try {
      const response = await fetch(`${BASE_URL}/username/${username}`);
      if (!response.ok) {
        throw new Error('Failed to set user');
      }
      const user = await response.json();
      return user; // Return the entire user object
      //       return user._id;
    } catch (error) {
      console.error('Error setting user:', error);
      throw error;
    }
  },
  // ... other methods ...
};
export default UserService;
