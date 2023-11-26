import { useState, ChangeEvent, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import UserService from '../services/UserService';
import InputField from '../ui/InputField';
import Button from '../ui/Button';
// @ts-expect-error config issues between React and Typescript for testing
import React from 'react';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    if (username.trim()) {
      const user = await UserService.setUser(username);
      setUser(user);
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
        <Button type="submit" className="w-full">Login</Button>
      </form>
    </div>
  );
};

export default LoginPage;
