import { useRef,useState } from 'react';
import './style.css';
import UpdateProfilePicture from './UpdateProfilePicture';
import useClickOutside from '../../helpers/clickOutside';
import { useSelector } from 'react-redux';
import { photoReducer } from '../../functions/reducers';


const Index = ({username,setShow,pRef,photos}) => {


   const popup = useRef(null);
   const { user } = useSelector((state)=>({...state}));
   useClickOutside(popup,()=>setShow(true));
   const refInput = useRef(null);
   const [image, setImage] = useState("");
   const [error, setError] = useState("");

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
         setImage(event.target.result);
      };
   };



   return (
      <div className="blur">
         <input 
            type="file" 
            ref={refInput} 
            hidden 
            onChange={handleImage}
            accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
         />
         <div className="postBox pictureBox" ref={popup}>
            <div className="box_header">
               <div className="small_circle" onClick={()=>setShow(false)}>
                  <i className="exit_icon"></i>
               </div>
               <span>Subir foto de perfil</span>
            </div>
            <div className='update_picture_wrap' >
               <div className='update_picture_buttons'>
                  <button className='light_blue_btn' onClick={()=>refInput.current.click()}>
                     <i className='plus_icon filter_blue'></i>
                     Cambiar foto de perfil
                  </button>
                  <button className='gray_btn'>
                     <i className='frame_icon'></i>
                     Agregar cuadro.
                  </button>
               </div>
            </div>
            {error && (
               <div className='postError comment_error'>
                  <div className='postError_error'>{error}</div>
                  <button className='blue_btn' onClick={()=>{setError("")}}>Intentar!</button>
               </div>
            )}
            <div className='old_pictures_wrap scrollbar'>
               <h4>Tus fotos de pefil</h4>
               <div className='old_pictures'>
                  { photos.filter((img)=> img.folder === `${user.username}/profile_pictures`).map((photo)=>(
                     <img src={photo.secure_url} key={photo.public_id} alt="" onClick={()=>setImage(photo.secure_url)}/>
                  ))}
               </div>
               <h4>Mas fotos</h4>
               <div className='old_pictures'>
                  { photos.filter((img)=> img.folder === `${user.username}/profile_pictures`).map((photo)=>(
                     <img src={photo.secure_url} key={photo.public_id} alt="" onClick={()=>setImage(photo.secure_url)}/>
                  ))}
               </div>
            </div>
         </div>
         {
            image && 
               <UpdateProfilePicture 
                  setImage={setImage} 
                  image={image}
                  setShow={setShow}
                  setError={setError}
                  pRef={pRef}
               />
         }
      </div>
   )
}

export default Index;