const API_URL = 'https://fast-tor-67274.herokuapp.com/api/v1';

export type Credentials = {
  email: string;
  password: string;
};

export const login = async (credentials: Credentials) => {
  try {
    const response = await fetch(`${API_URL}/users/sign_in`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: credentials }),
    });

    const data = await response.json();

    console.log('Login response:', data);

    if (!response.ok) {
      throw new Error('Login failed');
    }

    // Extract the complete user data
    const user = {
      email: data.user.email,
      authentication_token: data.user.authentication_token,
      _id: data.user._id, // Add other properties as needed
    };

    console.log('User data:', user); // Debugging: Log the user data


    return { user, token: user.authentication_token };
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

export const logout = async () => {
  // Implement logout functionality
};
