import { UserProvider } from './context/UserContext';
import LoginPage from './pages/LoginPage';
import './App.css'

function App() {
  return (
    <UserProvider>
      <LoginPage />
    </UserProvider>
  )
}

export default App
