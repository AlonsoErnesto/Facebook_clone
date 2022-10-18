import { useState,useEffect,useRef } from "react";
import Picker from 'emoji-picker-react'

const EmojiPickerBackground = ({text,setText,user,type2,background,setBackground}) => {

   
   const [picker, setPicker] = useState(false);
   const [cursorPosition, setCursorPosition] = useState(false);
   const [showBgs, setShowBgs] = useState(false);
   const textRef = useRef(null);
   const bgRef  = useRef(null);

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
   }

   const postBackgrounds = [
      "./images/postbackgrounds/1.jpg",
      "./images/postbackgrounds/2.jpg",
      "./images/postbackgrounds/3.jpg",
      "./images/postbackgrounds/4.jpg",
      "./images/postbackgrounds/5.jpg",
      "./images/postbackgrounds/6.jpg",
      "./images/postbackgrounds/7.jpg",
      "./images/postbackgrounds/8.jpg",
      "./images/postbackgrounds/9.jpg",
   ];


   const backgroundHandler = (i) => {  
      bgRef.current.style.backgroundImage = `url(${postBackgrounds[i]})`;
      setBackground(postBackgrounds[i]);
      bgRef.current.classList.add("bgHandler");
   }

   const removeBackground = () => {
      bgRef.current.style.backgroundImage = "";
      setBackground("");
      bgRef.current.classList.remove("bgHandler");
   }


   return (
      <div className={type2 ? "images_input" : ""}>
         <div className={!type2 ? "flex_center" : ""} ref={bgRef}>
         <textarea
            ref={textRef}
            maxLength="250"
            value={text}
            placeholder={`En que piensas ${user.first_name}`}
            className={`post_input ${type2 ? "input2" : ""}`}
            onChange={(e)=>setText(e.target.value)}
            style={{
                  paddingTop:`${background 
                  ? Math.abs(textRef.current.value.length * 0.1 - 32) 
                  : "0"}%`
               }}
            ></textarea>
         </div>
         <div className={!type2 ? "post_emojis_wrap" : ""}>
            { picker && (
               <div className={`comment_emoji_picker ${type2 ? "movepicker2" : "rimove"} `}>
                  <Picker onEmojiClick={handleEmoji}/>
               </div>
            )}
            { !type2 && <img src="../../../icons/colorful.png" alt="" onClick={()=>setShowBgs((prev)=>!prev)}/>}
            { !type2 && showBgs && (
               <div className="post_backgrounds" >
               <div className="no_bg " onClick={() => {removeBackground()}}></div>
               { postBackgrounds.map((bg,i)=>(
                  <img src={bg} key={i} alt="" onClick={()=> {backgroundHandler(i)}} />
               )) }
            </div>
            )}
            <i className={`emoji_icon_large ${type2 ? "moveleft" : ""}`} onClick={()=>{setPicker((prev)=>!prev)}}></i>
         </div>
      </div>
   );
}

export default EmojiPickerBackground;
