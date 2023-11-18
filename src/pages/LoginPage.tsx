// src/pages/LoginPage.tsx
import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import UserService from '../services/UserService';
import InputField from '../ui/InputField';
import Button from '../ui/Button';

const LoginPage = () => {
  console.log("LoginPage is rendering");
  const [username, setUsername] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    if (username.trim()) {
      setUser(username);
      await UserService.setUser(username);
      navigate('/homepage');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleLogin} className="max-w-sm mx-auto">
        <h1 className="text-2xl font-bold text-center mb-4">Login</h1>
        <InputField
          type="text"
          name="username"
          placeholder="Enter Username"
          value={username}
          onChange={handleUsernameChange}
          className="mb-4"
        />
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
