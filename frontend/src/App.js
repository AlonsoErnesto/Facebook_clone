import {Routes,Route} from 'react-router-dom';

//Components
import Home from './pages/home';
import Activate from './pages/home/activate';
import Login from './pages/Login';
import Profile from './pages/profile';
import Reset from './pages/reset';
import LoggedInRoutes from './routes/LoggedinRoutes';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';

const App = () => {
  return (
    <div>
      <Routes>
        <Route element={<LoggedInRoutes/>}>
          <Route path='/profile' element={<Profile/>}exact/>
          <Route path='/' element={<Home/>}exact/>
          <Route path='/activate/:token' element={<Activate/>}exact/>
        </Route>
        <Route element={<NotLoggedInRoutes/>}>
          <Route path='/login' element={<Login/>}exact/>
        </Route>
        <Route path="/reset" element={<Reset/>}/>
      </Routes>
    </div>
  )
}

export default App;