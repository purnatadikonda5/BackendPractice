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
import Postpage from './pages/Postpage';
import {EditPostpage} from './pages/editpost';
function App() {
  return (
    <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Indexpage />}/>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/create" element={<CreatePost/>} />
          <Route path="/post/:id" element={<Postpage/>} />
          <Route path="/editpostpage/:id" element={<EditPostpage/>} />
        </Route>
    </Routes>
  )
}
export default App
