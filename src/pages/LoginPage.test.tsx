import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import LoginPage from './LoginPage';
import { UserContext } from '../context/UserContext';
import '@testing-library/jest-dom';
// @ts-expect-error config issues between React and Typescript
import React from 'react';


describe('LoginPage', () => {
  it('renders the login form and updates input field', () => {
    const setUser = jest.fn();
    render(
      <Router>
        <UserContext.Provider value={{ user: null, setUser }}>
          <LoginPage />
        </UserContext.Provider>
      </Router>
    );

    const input = screen.getByPlaceholderText('Enter Username');
    fireEvent.change(input, { target: { value: 'testuser' } });
    expect(input).toHaveValue('testuser');
  });
});
