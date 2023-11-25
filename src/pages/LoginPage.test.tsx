import { render, fireEvent, screen } from '@testing-library/react';
import LoginPage from './LoginPage';
import { UserContext } from '../context/UserContext';
import '@testing-library/jest-dom';

describe('LoginPage', () => {
  it('renders the login form and updates input field', () => {
    const setUser = jest.fn();
    render(
      <UserContext.Provider value={{ user: null, setUser }}>
        <LoginPage />
      </UserContext.Provider>
    );

    const input = screen.getByPlaceholderText('Enter Username');
    fireEvent.change(input, { target: { value: 'testuser' } });
    expect(input).toHaveValue('testuser');
  });
});
