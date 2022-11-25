import { useState, useReducer,useEffect } from 'react';
import {Routes,Route} from 'react-router-dom';
import axios from 'axios';

//Components
import Home from './pages/home';
import Activate from './pages/home/activate';
import Login from './pages/Login';
import Profile from './pages/profile';
import Reset from './pages/reset';
import LoggedInRoutes from './routes/LoggedinRoutes';
import NotLoggedInRoutes from './routes/NotLoggedInRoutes';
import CreatePostPopup from './components/createPostPopup';
import { useSelector } from 'react-redux';
import { postsReducer } from './functions/reducers'
import Friends from './pages/friends';

const App = () => {



  const [visible, setVisible] = useState(false);
  const { user, darkTheme } = useSelector((state)=>({...state}));
  const [{ loading, error, posts}, dispatch] = useReducer(postsReducer,{
    loading:false,
    posts: [],
    error:"",
  });

  useEffect(() => {
    getAllPosts();
  },[]);

  const getAllPosts = async () => {
    try {
      dispatch({
        type:"POSTS_REQUEST",
      });
      const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getAllPosts`,{
        headers:{
          Authorization:`Bearer ${user.token}`
        }
      });
      dispatch({ 
        type:"POSTS_SUCCESS",
        payload:data,
      });
    } catch (err) {
      dispatch({ 
        type:"POSTS_ERROR",
        payload:err.response.data.message,
      });
    }
  };


  return (
    <div className={darkTheme && 'dark'}>
      { visible && <CreatePostPopup user={user} setVisible={setVisible} posts={posts} dispatch={dispatch}/> }
      <Routes>
        <Route element={<LoggedInRoutes/>}>
          <Route path='/profile' element={<Profile setVisible={setVisible}/>} getAllPosts={getAllPosts} exact/>
          <Route path='/profile/:username' element={<Profile setVisible={setVisible}/>} getAllPosts={getAllPosts} exact/>
          <Route path='/friends' element={<Friends setVisible={setVisible}/>} getAllPosts={getAllPosts} exact/>
          <Route path='/friends/:type' element={<Friends setVisible={setVisible}/>} getAllPosts={getAllPosts} exact/>
          <Route path='/' element={<Home setVisible={setVisible} posts={posts}/>} loading={loading} getAllPosts={getAllPosts} exact/>
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