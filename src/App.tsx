import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { TodosProvider } from './context/TodosContext';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Homepage';
import CreateTodoPage from './pages/CreateTodoPage';
import './App.css'

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/homepage" element={
            <TodosProvider>
              <Homepage />
            </TodosProvider>
          } />
          <Route path="/create-todo" element={<CreateTodoPage />} />
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App
