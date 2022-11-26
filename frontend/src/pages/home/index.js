import {useState,useRef,useEffect} from 'react';
import { useSelector } from 'react-redux';
import { HashLoader } from 'react-spinners';

// COMPONENTS
import CreatePost from '../../components/createPost';
import Header from "../../components/header";
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import SendVerification from '../../components/home/sendVerification';
import Storires from '../../components/home/stories';
import Post from '../../components/post';
import './style.css'

export default function Home ({setVisible,posts,loading,getAllPosts}) {

   const {user} = useSelector((state)=>({...state}));
   const middle = useRef(null);
   const [height, setHeight] = useState();
   useEffect(() => {
      setHeight(middle.current.clientHeight);
   }, [loading,height]);

   return (
      <div className="home" style={{height:`${height + 1050}px`}}>
         <Header page="home" getAllPosts={getAllPosts}/>
         <LeftHome user={user}/>
         <div className="home_middle" ref={middle}>
            <Storires/>
            { user.verified === false && <SendVerification user={user}/> }
            <CreatePost user={user} setVisible={setVisible}/>
            {
               loading ? (
                  <div className="skeleton_loader">
                     <HashLoader color="1876f2"/>
                  </div>
               ) : (
                  <div className="posts">
                  {posts.map((post,i)=>(
                     <Post key={i} post={post} user={user}/>
                  ))}
               </div>
            )}
        
         </div>
         <RightHome user={user}/>
      </div>
)}