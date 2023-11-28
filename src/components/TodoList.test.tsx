import { render, fireEvent, screen } from '@testing-library/react';
import TodoList from './TodoList';
import '@testing-library/jest-dom';
import { startOfDay, format, addDays } from 'date-fns';
import { Todo } from '../types/Todo'; // Import the Todo type
// @ts-expect-error config issues between React and Typescript
import React from 'react';

// Mock TodoService and useUser
jest.mock('../services/TodoService', () => ({
  deleteTodo: jest.fn(),
}));
jest.mock('../hooks/useUser', () => ({
  useUser: jest.fn().mockReturnValue({ user: { _id: 'user123' }, setUser: jest.fn() }),
}));

// Corrected mock data
const mockTodos: Todo[] = [
  {
    _id: 'todo1',
    title: 'Todo 1',
    date: new Date().toISOString(),
    repeat: 'Never', // Matches one of the string literals
    user: 'user1',
  },
  {
    _id: 'todo2',
    title: 'Todo 2',
    date: new Date().toISOString(),
    repeat: 'Daily', // Matches one of the string literals
    user: 'user2',
    dayOfWeek: 'Monday',
  },
];

describe('TodoList', () => {
  it('renders todos for all view mode', () => {
    render(<TodoList todos={mockTodos} refreshTodos={jest.fn()} viewMode="all" />);
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('renders todos for today view mode', () => {
    render(<TodoList todos={mockTodos} refreshTodos={jest.fn()} viewMode="today" />);
    expect(screen.getByText('Todo 1')).toBeInTheDocument();
    expect(screen.getByText('Todo 2')).toBeInTheDocument();
  });

  it('renders todos for week view mode and navigates dates', () => {
    const { rerender } = render(<TodoList todos={mockTodos} refreshTodos={jest.fn()} viewMode="week" />);
    const leftButton = screen.getByText('<');
    const rightButton = screen.getByText('>');

    // Check initial date
    expect(screen.getByText(format(startOfDay(new Date()), 'MMMM dd, yyyy'))).toBeInTheDocument();

    // Navigate to next date
    fireEvent.click(rightButton);
    rerender(<TodoList todos={mockTodos} refreshTodos={jest.fn()} viewMode="week" />);
    expect(screen.getByText(format(addDays(startOfDay(new Date()), 1), 'MMMM dd, yyyy'))).toBeInTheDocument();

    // Navigate back to initial date
    fireEvent.click(leftButton);
    rerender(<TodoList todos={mockTodos} refreshTodos={jest.fn()} viewMode="week" />);
    expect(screen.getByText(format(startOfDay(new Date()), 'MMMM dd, yyyy'))).toBeInTheDocument();
  });

  // Additional tests for delete functionality and other aspects...
});
