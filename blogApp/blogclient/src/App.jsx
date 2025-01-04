import './App.css'
import Header from './components/header'
import Post from './components/post'
import {Route, Routes} from 'react-router-dom';
import Indexpage from './pages';
import Layout from './components/layout';
import LoginPage from './pages/loginpage';
import RegisterPage from './pages/registerpage';
import { UserContextProvider } from './components/UserContext';
import { CreatePost } from './pages/createpost';
function App() {
  return (
    <UserContextProvider>
    <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Indexpage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost/>} />
        </Route>
    </Routes>
     </UserContextProvider>
  )
}

export default App
