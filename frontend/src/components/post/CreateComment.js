import {useState,useEffect,useRef} from 'react'
import Picker from 'emoji-picker-react';
import { comment } from '../../functions/post';
import { uploadImages } from '../../functions/uploadImages';
import dataURItoBlob from '../../helpers/dataURItoBlob';
import { ClipLoader } from 'react-spinners';

const  CreateComment = ({user, postId, setComments, setCount}) => {
   const [picker, setPicker] = useState(false);
   const [text, setText] = useState("");
   const [error, setError] = useState("");
   const [commentImage, setCommentImage] = useState("");
   const [cursorPosition, setCursorPosition] = useState(false);
   const [loading, setLoading] = useState(false);
   const textRef = useRef(null);
   const imgInput = useRef(null)

   useEffect(() => {
      textRef.current.selectionEnd = cursorPosition;
   }, [cursorPosition]);

   const handleEmoji = ({emoji}) => {
      // FUNCTION WHERE THE POINTER ADD EMOJIS
      const ref = textRef.current;
      ref.focus();
      const start = text.substring(0,ref.selectionStart);
      const end   = text.substring(ref.selectionStart);
      const newText = start + emoji + end;
      setText(newText);
      setCursorPosition(start.length + emoji.length)
   };

   const handleImage = e => {
      let file = e.target.files[0];
      if (file.type !== 'image/jpeg' 
      && file.type !== 'image/jpg'
      && file.type !== 'image/png'
      && file.type !== 'image/webp'
      && file.type !== 'image/gif'
      ){
         setError(`${file.name} es un formato inaccesible.`)
         return;
      } else if(file.size > 1024 * 1024 * 10){
         setError(`${file.name} supera los 10MB por lo que no es posible subirlo.`)
         return;
      }
      const reader  = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
         setCommentImage(event.target.result);
      };
   };

   const handleComment = async (e) => {
      if ( e.key === "Enter"){
         if ( commentImage !== "") {
            setLoading(true);
            const img = dataURItoBlob(commentImage);
            const path = `${user.username}/post_images/${postId}`;
            let formData = new FormData();
            formData.append("path",path);
            formData.append("file",img);
            const imgComment = await uploadImages(formData,path,user.token);
            const comments = await comment(
               postId,
               text,
               imgComment[0].url,
               user.token
            );
            setComments(comments);
            setCount((prev) => ++prev);
            setText("");
            setCommentImage("");
            setLoading(false);
         } else {
            setLoading(true);
            const comments = await comment(postId,text,"",user.token);
            setComments(comments);
            setCount((prev) => ++prev);
            setText("");
            setCommentImage("");
            setLoading(false);
         }
      }
   };


   return (
      <div className="create_comment_wrap">
      <div className="create_comment">
         <img src={user?.picture} alt=""/>
         <div className='comment_input_wrap'>
            {picker && 
               <div className="comment_emoji_picker">
                  <Picker onEmojiClick={handleEmoji}/>
               </div>
            }
            <input 
               type="file" 
               hidden  
               ref={imgInput} 
               accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
               onChange={handleImage}
            />
            {error && (
            <div className='postError comment_error'>
               <div className='postError_error'>{error}</div>
               <button className='blue_btn' onClick={()=>{setError("")}}>Intentar!</button>
            </div>
            )}
            <input 
               type="text" 
               ref={textRef} 
               value={text}
               placeholder="Escribir comentario"
               onChange={(e)=> setText(e.target.value)}
               onKeyUp={handleComment}
            />
            <div className='comment_circle' style={{marginTop:"5px"}}>
               <ClipLoader size={20} color="#1876f2" loading={loading}/>
            </div>
            <div className='comment_circle_icon hover2' 
               onClick={()=>{setPicker(prev=>!prev)}}>
               <i className='emoji_icon'></i>
            </div>
            <div className='comment_circle_icon hover2' 
               onClick={()=>imgInput.current.click()}>
               <i className='camera_icon'></i>
            </div>
            <div className='comment_circle_icon hover2'>
               <i className='gif_icon'></i>
            </div>
            <div className='comment_circle_icon hover2'>
               <i className='sticker_icon'></i>
            </div>
         </div>
      </div>
      {
         commentImage && (
            <div className="comment_img_preview">
               <img src={commentImage} alt=""/>
               <div className="small_white_circle" onClick={()=>{setCommentImage("")}}>
                  <i className='exit_icon'></i>
               </div>
            </div>
         )
      }
      </div>
   )
}

export default CreateComment