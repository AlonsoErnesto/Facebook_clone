import { useState,useEffect,useRef } from "react";
import Picker from 'emoji-picker-react'

const EmojiPickerBackground = ({text,setText,user,type2}) => {

   
   const [picker, setPicker] = useState(false);
   const [cursorPosition, setCursorPosition] = useState(false);
   const textRef = useRef(null);

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



   return (
      <div className={type2 ? "images_input" : ""}>
         <div className={!type2 ? "flex_center" : ""}>
         <textarea
            ref={textRef}
            maxLength="100"
            value={text}
            placeholder={`En que piensas ${user.first_name}`}
            className={`post_input ${type2 ? "input2" : ""}`}
            onChange={(e)=>setText(e.target.value)}
            ></textarea>
         </div>
         <div className={!type2 ? "post_emojis_wrap" : ""}>
            { picker && (
               <div className={`comment_emoji_picker ${type2 ? "movepicker2" : "rimove"} `}>
                  <Picker onEmojiClick={handleEmoji}/>
               </div>
            )}
            { !type2 && <img src="../../../icons/colorful.png" alt=""/>}
            <i className={`emoji_icon_large ${type2 ? "moveleft" : ""}`} onClick={()=>{setPicker((prev)=>!prev)}}></i>
         </div>
      </div>
   );
}

export default EmojiPickerBackground;
