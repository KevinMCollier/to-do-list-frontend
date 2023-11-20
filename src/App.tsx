import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { TodosProvider } from './context/TodosContext';
import LoginPage from './pages/LoginPage';
import Homepage from './pages/Homepage';
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
        </Routes>
      </UserProvider>
    </Router>
  )
}

export default App
