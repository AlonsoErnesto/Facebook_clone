import {useState} from 'react';
import './style.css';
import EmojiPickerBackground from './EmojiPickerBackground';
import AddToYourPost from './AddToYourPost';
import ImagePreview from './ImagePreview';



const CreatePostPopup = ({user}) => {

   const [text, setText] = useState("");
   const [showPrev, setShowPrev] = useState(true);
   const [images, setImages] = useState([]);   

   return (
      <div className="blur">
         <div className="postBox">
            <div className="box_header">
               <div className="small_circle">
                  <i className="exit_icon"></i>
               </div>
               <span>Crear Publicacion</span>
            </div>
            <div className="box_profile">
               <img src={user.picture} alt="" className="box_profile_img"/>
               <div className="box_col">
      	         <div className="box_profile_name">
                     {user.first_name} {user.last_name}
                  </div>
                  <div className="box_privacy">
                     <img src="../../../icons/public.png" alt=""/>
                     <span>Publico</span>
                     <i className="arrowDown_icon"></i>
                  </div>
               </div>
            </div>
            {!showPrev ? (
               <>
                  <EmojiPickerBackground 
                     text={text} 
                     user={user}
                     setText={setText} 
                     showPrev={showPrev}
                  />
               </>
            ) : (
               <ImagePreview  
                  text={text} 
                  user={user}
                  setText={setText} 
                  setShowPrev={setShowPrev}
                  images={images} 
                  setImages={setImages}
               /> 
            )}
            <AddToYourPost setShowPrev={setShowPrev}/>
            <button className="post_submit">Publicar</button>
         </div>   
      </div>
   )
}

export default CreatePostPopup;