import React from 'react';
import { useSelector } from 'react-redux';

// COMPONENTS
import CreatePost from '../../components/createPost';
import Header from "../../components/header";
import LeftHome from '../../components/home/left';
import RightHome from '../../components/home/right';
import Storires from '../../components/home/stories';
import './style.css'

// import useClickOutside from "../../helpers/clickOutside";

export default function Home () {

   // const [ visible, setVisible ] = useState(false);
   // const el = useRef(null);
   // useClickOutside(el,()=>{
   //    setVisible(false)
   // });
   const {user} = useSelector((user)=>({...user}));

   return (
      <div className="home">
         <Header/>
         {/* {visible && <div className="card" ref={el}></div>} */}
         <LeftHome user={user}/>
         <div className="home_middle">
            <Storires/>
            <CreatePost user={user}/>
         </div>
         <RightHome user={user}/>
      </div>
)}