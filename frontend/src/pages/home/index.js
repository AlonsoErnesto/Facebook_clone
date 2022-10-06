import React, {useRef,useState} from 'react';
import { useSelector } from 'react-redux';
import Header from "../../components/header";
import LeftHome from '../../components/home/left';
import useClickOutside from "../../helpers/clickOutside";


export default function Home () {

   const [ visible, setVisible ] = useState(false);
   const el = useRef(null);
   useClickOutside(el,()=>{
      setVisible(false)
   });
   const {user} = useSelector((user)=>({...user}));

   return (
      <div>
         <Header/>
         {visible && <div className="card" ref={el}></div>}
         <LeftHome user={user}/>
      </div>
)}