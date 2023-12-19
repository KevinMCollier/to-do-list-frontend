import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import InputField from '../ui/InputField';
import Button from '../ui/Button';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState(''); // Add a password state
  const { login } = useAuth(); // Use login from useAuth
  const navigate = useNavigate();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    if (username.trim() && password) {
      await login({ email: username, password }); // Use the login function with credentials
      navigate('/homepage');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleLogin} className="max-w-sm mx-auto my-20">
        <InputField
          type="text"
          name="username"
          placeholder="Enter Username"
          value={username}
          onChange={handleUsernameChange}
          className="mb-6 w-full"
        />
        <InputField
          type="password" // Add a password input field
          name="password"
          placeholder="Enter Password"
          value={password}
          onChange={handlePasswordChange}
          className="mb-6 w-full"
        />
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
