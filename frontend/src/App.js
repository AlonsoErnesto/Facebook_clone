import {Routes,Route} from 'react-router-dom';



//Components
import Home from './pages/home';
import Login from './pages/Login';
import Profile from './pages/profile';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/profile' element={<Profile/>}exact/>
        <Route path='/login' element={<Login/>}exact/>
        <Route path='/' element={<Home/>}exact/>
      </Routes>
    </div>
  )
}

export default App;