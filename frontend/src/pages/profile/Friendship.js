import { useState, useRef,useEffect } from "react";
import useClickOutside from "../../helpers/clickOutside";
import {useSelector} from 'react-redux';
import { addFriend, follow, unfollow, cancelRequest, acceptRequest } from "../../functions/user";

const Friendship = ({friendshipp, profileid}) => {

   const { user } = useSelector((state)=>({...state}));

   const [friendship, setFriendship] = useState(friendshipp);
   useEffect(() => {
      setFriendship(friendshipp);
   }, [friendshipp]);
   const [friendsMenu, setFriendsMenu] = useState(false);
   const [respondMenu, setRespondMenu] = useState(false);
   const menu = useRef(null);
   const menu1 = useRef(null);
   useClickOutside(menu, () => setFriendsMenu(false));
   useClickOutside(menu1, () => setRespondMenu(false));


   //  FUNCTIONS FOLLOW AND ADD FRIEND
   const addFriendHandler = async () => {
      setFriendship({...friendship,requestSent:true,following:true})
      await addFriend(profileid, user.token);
   }
   const cancelRequestHandler = async () => {
      setFriendship({...friendship,requestSent:false,following:false})
      await cancelRequest(profileid, user.token);
   }
   const followHandler = async () => {
      setFriendship({...friendship,following:true})
      await follow(profileid, user.token);
   }
   const unfollowHandler = async () => {
      setFriendship({...friendship,following:false})
      await unfollow(profileid, user.token);
   }
   const acceptRequestHandler = async () => {
      setFriendship({
         ...friendship,
         friends:true,
         following:true,
         requestSent:false,
         requestReceived:false,
      });
      await acceptRequest(profileid, user.token);
   }

   return (
      <div className="friendship">
         {
            friendship?.friends ? (
               <div className="friends_menu_wrap">
                  <button className="gray_btn" onClick={()=>setFriendsMenu(true)}>
                     <img src="../../../icons/friends.png" alt=""/>
                     <span>Amigos</span>
                  </button>
                  { friendsMenu && ( 
                     <div className="open_cover_menu" ref={menu}>
                        <div className="open_cover_menu_item hover1">
                           <img src="../../../icons/favoritesOutline.png" alt=""/>
                           Favoritos
                        </div>
                        <div className="open_cover_menu_item hover1">
                           <img src="../../../icons/editFriends.png" alt=""/>
                           Editar lista de amigos
                        </div>
                        {
                           friendship?.following ? (
                              <div className="open_cover_menu_item hover1" onClick={() => unfollowHandler()}>
                                 <img src="../../../icons/unfollowOutlined.png" alt=""/>
                                 Dejar de Seguir
                              </div>
                           )
                        : (
                           <div className="open_cover_menu_item hover1" onClick={() => followHandler()}>
                              <img src="../../../icons/unfollowOutlined.png" alt=""/>
                              Seguir
                           </div>
                           )
                        }
                        <div className="open_cover_menu_item hover1">
                              <i className="unfriend_outlined_icon"></i>
                              Eliminar amigo
                           </div>
                     </div>
                  )}
               </div>
            ) : !friendship?.requestSent && !friendship?.requestReceived && (
               <button className="blue_btn"  onClick={()=>addFriendHandler()}>
                  <img src="../../../icons/addFriend.png" alt="" className="invert"/>
                  <span>Agregar amigo</span>
               </button>
            )
         }
         {
            friendship?.requestSent ? (
               <button className="blue_btn" onClick={()=>cancelRequestHandler()}>
                  <img src="../../../icons/cancelRequest.png" alt="" className="invert"/>
                  <span>Cancelar solicitud</span>
               </button>
            ) : ( 
               friendship?.requestReceived && (
                     <div className="friends_menu_wrap">
                     <button className="gray_btn" onClick={()=>setRespondMenu(false)}>
                        <img src="../../../icons/friends.png" alt=""/>
                        <span>Responder</span>
                     </button>
                     { respondMenu && ( 
                        <div className="open_cover_menu" ref={menu1}>
                           <div className="open_cover_menu_item hover1" onClick={()=>acceptRequestHandler()}>Confirmar</div>
                           <div className="open_cover_menu_item hover1">Eliminar</div>
                        </div>
                     )}
                  </div>
               )
            )
         }
         {
            friendship?.following ? (
               <button className="gray_btn" onClick={() => unfollowHandler()}>
                  <img src="../../../icons/follow.png" alt=""/>
                  <span>Siguiendo</span>
               </button>
            ) : (
               <button className="blue_btn" onClick={() => followHandler()}>
                  <img src="../../../icons/follow.png" alt="" className="invert"/>
                  <span>Seguir</span>
               </button>
            )
         }
         <button className={friendship?.friends ? "blue_btn" : "gray_btn"}>
            <img src="../../../icons/message.png" alt="" className={friendsMenu.friends && "invert"}/>
            <span>Mensaje</span>
         </button>
      </div>
   )
}

export default Friendship