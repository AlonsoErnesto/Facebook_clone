import { useReducer, useEffect,useState} from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom"
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
import Post from "../../components/post";
import Photos from "./Photos";
import Friends from "./Friends";
import Intro from '../../components/intro';

const Profile =({setVisible})=> {

   const { username } = useParams();
   const navigate = useNavigate();
   const { user } = useSelector((state)=>({...state}));
   const [photos, setPhotos] = useState({});
   let userName = username === undefined ? user.username : username;
   const [{ loading, error, profile}, dispatch] = useReducer(profileReducer,{
      loading:false,
      profile: {},
      error:"",
   });
   const [othername, setOtherName] = useState("");

   useEffect(() => {getProfile()}, [userName]);
   useEffect(() => {setOtherName(profile?.details?.otherName)},[profile]);

   var visitor = userName === user.username ? false : true;

   
   const path = `${userName}/*`;
   const max = 30;
   const sort = "desc";

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
            try {
               const images = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/listImages`,
               {path,sort,max},
               {
                  headers:{
                  Authorization:`Bearer ${user.token}`
                  }
               });
               setPhotos(images.data);
            } catch (err) {
               console.log(err);
            }

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
               <Cover cover={profile.cover} visitor={visitor} photos={photos.resources}/>
               <ProfilePictureInfos 
                  profile={profile} 
                  visitor={visitor}  
                  photos={photos.resources} 
                  othername={othername}
               />
               <ProfileMenu/>
         </div>
      </div>
      <div className="profile_bottom">
         <div className="profile_container">
            <div className="bottom_container">
               <PpYouMayKnow/>
               <div className="profile_grid">
                  <div className="profile_left">
                     <Intro detailss={profile.details} visitor={visitor} setOtherName={setOtherName}/>
                     <Photos userName={userName} token={user.token} photos={photos}/>
                     <Friends friends={profile.friends}/>
                     <div className="relative_fb_copyright">
                        <Link to="/">Privacy </Link><span>.</span>
                        <Link to="/">Terms </Link><span> .</span>
                        <Link to="/">Advertising </Link><span> .</span>
                        <Link to="/">Ad Choices <i className="ad_choices_icon"></i>{" "}</Link><span> .</span>
                        <Link to="/">Cookies </Link><span> .</span>
                        <Link to="/">More </Link><span> .</span><br/>
                        Meta © 2022
                     </div>
                  </div>
                  <div className="profile_right">
                     {  !visitor &&
                        <CreatePost 
                           user={user} 
                           profile={profile} 
                           setVisible={setVisible}
                        />
                     }
                     <GridPosts/>
                     <div className="posts">
                        {  profile.posts &&
                           profile.posts.length ?
                           profile.posts.map((post)=>(
                              <Post post={post} user={user} key={post._id} profile/>
                           )):(
                           <div className="no_posts">
                              No se publicaron Posts
                           </div>
                           )
                        }
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
   </div>
)}

export default Profile;