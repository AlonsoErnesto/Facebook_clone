import {Routes,Route} from 'react-router-dom';



//Components
import Home from './pages/home';
import Login from './pages/Login';
import Profile from './pages/profile';
import LoggedInRoutes from './routes/LoggedinRoutes';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<LoggedInRoutes/>}>
          <Route path='/profile' element={<Profile/>}exact/>
          <Route path='/' element={<Home/>}exact/>
        </Route>
        <Route element={<NotLoggedInRoutes/>}>
          <Route path='/login' element={<Login/>}exact/>
        </Route>
      </Routes>
    </div>
  )
}

export default App;