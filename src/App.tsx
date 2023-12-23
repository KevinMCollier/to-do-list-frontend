// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import { TodosProvider } from './context/TodosContext';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import CreateTodoPage from './pages/CreateTodoPage';
import './App.css';

function App() {

  return (
    <Router>
      <AuthProvider>
      <TodosProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/homepage" element={
            // <TodosProvider>
              <Homepage />
            // </TodosProvider>
          } />
          <Route path="/create-todo" element={<CreateTodoPage />} />
        </Routes>
        </TodosProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
