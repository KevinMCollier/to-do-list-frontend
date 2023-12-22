// App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useAuth } from './hooks/useAuth';  // Corrected import
import { TodosProvider } from './context/TodosContext';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import CreateTodoPage from './pages/CreateTodoPage';
import './App.css';

function App() {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/homepage" element={
            <TodosProvider>
              <Homepage />
            </TodosProvider>
          } />
          <Route path="/create-todo" element={<CreateTodoPage />} />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
