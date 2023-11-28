import { Todo } from '../types/Todo';
import React from 'react';


type TodoItemProps = {
  todo: Todo;
  onDelete: (todoId: string) => void;
};

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
  return (
    <div className="bg-white p-2 mb-2 rounded shadow-md flex justify-between items-center">
      <p className="text-gray-700 flex-1">{todo.title}</p>
      <button onClick={() => onDelete(todo._id)} className="text-gray-400 hover:text-gray-500 ml-10">
        <svg className="w-5 h-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  );
};

export default TodoItem;
