import { useReducer, useEffect} from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom"
import axios from 'axios';


import './style.css';
import Cover from './Cover';

import { profileReducer } from "../../functions/reducers";
import Header from '../../components/header';
import ProfilePictureInfos from "./ProfilePictureInfos";
import ProfileMenu from "./ProfileMenu";
import PpYouMayKnow from "./PpYouMayKnow";
import CreatePost from '../../components/createPost';
import GridPosts from "./GridPosts";

export default function Profile ({setVisible}) {

   const { username } = useParams();
   const navigate = useNavigate();
   const { user } = useSelector((state)=>({...state}));
   let userName = username === undefined ? user.username : username;
   const [{ loading, error, profile}, dispatch] = useReducer(profileReducer,{
      loading:false,
      profile: {},
      error:"",
   });
   useEffect(() => {getProfile()}, [userName]);

   const getProfile = async () => {
      try {
         dispatch({
            type:"PROFILE_REQUEST",
         });
         const { data } = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/getProfile/${userName}`,{
            headers:{
            Authorization:`Bearer ${user.token}`
            }
         });
         if(data.ok === false){
            navigate('/profile');
         }else {
            dispatch({ 
               type:"PROFILE_SUCCESS",
               payload:data,
            });
         }
      } catch (err) {
         dispatch({ 
            type:"PROFILE_ERROR",
            payload:err.response.data.message,
         });
      }
   }
   return (
   <div className="profile">
      <Header page="profile"/>
      <div className="profile_top">
         <div className="profile_container">
            <Cover cover={profile.cover}/>
            <ProfilePictureInfos profile={profile}/>
            <ProfileMenu/>
         </div>
      </div>
      <div className="profile_bottom">
         <div className="profile_container">
            <div className="bottom_container">
               <PpYouMayKnow/>
               <div className="profile_grid">
                  <div className="profile_left">

                  </div>
                  <div className="profile_right">
                     <CreatePost 
                        user={user} 
                        profile={profile} 
                        setVisible={setVisible}
                     />
                     <GridPosts/>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
)}