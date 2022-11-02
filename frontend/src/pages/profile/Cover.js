import { useState,useRef, useCallback,useEffect } from "react";
import Cropper from "react-easy-crop";
import useClickOutside from "../../helpers/clickOutside";
import getCroppedImg from "../../helpers/getCroppedImg";
import { uploadImages } from '../../functions/uploadImages';
import { createPost } from "../../functions/post";
import { updateCover } from "../../functions/user";
import { useSelector } from "react-redux";
import PulseLoader from "react-spinners/PulseLoader";


const Cover = ({cover,visitor}) => {

   const [showCoverMenu, setShowCoverMenu] = useState(false);
   const [coverPicture, setCoverPicture] = useState("");
   const [loading, setLoading] = useState(false);
   const { user } = useSelector((state)=>({...state}));
   const menuRef = useRef(null);
   const refInput = useRef(null);
   const cRef = useRef(null);
   useClickOutside(menuRef,()=> setShowCoverMenu(false));

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
         setCoverPicture(event.target.result);
      };
   };

   const [crop, setCrop] = useState({x:0,y:0});
   const [zoom, setZoom] = useState(1);
   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
   const onCropComplete = useCallback((croppedArea,croppedAreaPixels)=>{
      setCroppedAreaPixels(croppedAreaPixels);
   },[])
   const getCroppedImage = useCallback(async (show) => {
      try {
         const img = await getCroppedImg(coverPicture,croppedAreaPixels);
         if (show) {
            setZoom(1);
            setCrop({x:0,y:0});
            setCoverPicture(img);
         } else {
            return img;
         }
      } catch (err) {
         console.log(err);
      }
   },[croppedAreaPixels]);

   const coverRef = useRef(null);
   const [width, setWidth] = useState();
   useEffect(() => {
      setWidth(coverRef.current.clientWidth);
   }, [window.innerWidth]);

   // update cover picture
   const updateCoverPicture = async () => {
      try {
         setLoading(true);
         let img = await getCroppedImage();
         let blob = await fetch(img).then((b)=> b.blob());
         const path = `${user.username}/cover_pictures`;
         let formData = new FormData();
         formData.append("file",blob);
         formData.append("path",path);
         const res = await uploadImages(formData,path, user.token);
         const updated_picture = await updateCover(
            res[0].url,
            user.token
         );
         if(updated_picture === "ok"){ 
            const new_post = await createPost(
               'coverPicture',
               null,
               null,
               res,
               user.id,
               user.token);
               console.log(new_post);
               if(new_post === "ok"){
                  setLoading(false);
                  setCoverPicture("");
                  cRef.current.src = res[0].url;
               } else {
                  setLoading(false);
                  setError(new_post);
               }
            }
            else {
               setLoading(false);
               setError(updated_picture)
            };
      } catch (err) {
         setLoading(false);
         setError(err.response.data.error);
      }
   };

   return (
      <div className="profile_cover" ref={coverRef}>
         { coverPicture && (
            <div className="save_changes_cover">
               <div className="save_changes_left">
                  <i className="public_icon"></i>
                  Tu photo es publico.
               </div>
               <div className="save_changes_right">
                  <button className="blue_btn opacity_btn" onClick={()=>setCoverPicture("")}>Cancelar</button>
                  <button className="blue_btn" onClick={()=>updateCoverPicture()}>
                     { loading ? <PulseLoader color="#fff" size={5}/> : "Guardar"}
                  </button>
               </div>
            </div>
         )}
         <input type='file' 
            ref={refInput} 
            hidden
            accept='image/jpeg,image/jpg,image/png,image/gif,/image/webp'
            onChange={handleImage}
         />
            {error && (
               <div className='postError comment_error'>
                  <div className='postError_error'>{error}</div>
                  <button className='blue_btn' onClick={()=>{setError("")}}>Intentar!</button>
               </div>
            )}
            {coverPicture && (
               <div className="cover_crooper">
                  <Cropper
                     image={coverPicture}
                     crop={crop}
                     zoom={zoom}
                     aspect={width / 350}
                     onCropChange={setCrop}
                     onCropComplete={onCropComplete}
                     onZoomChange={setZoom}
                     showGrid={true}
                     objectFit="horizontal-cover"
                  />
               </div>
            )}
         {cover && !coverPicture && (
            <img 
               src={cover} 
               className="cover"
               alt=""
               ref={cRef}
            />
         )}
         {  !visitor && (
            <div className="update_cover_wrapper">
               <div className="open_cover_update" onClick={()=>{setShowCoverMenu((prev)=>!prev)}}>
                  <i className="camera_filled_icon"></i>
                  Add cover photo
               </div>
               <div >
                  {showCoverMenu && 
                  <div className="open_cover_menu" ref={menuRef}>
                     <div className="open_cover_menu_item hover1">
                        <i className="photo_icon"></i>
                        Selecccionar foto
                     </div>
                     <div className="open_cover_menu_item hover1" onClick={()=>refInput.current.click()}>
                        <i className="upload_icon"></i>
                        Subir foto
                     </div>
                  </div>}
               </div>
            </div>
         )}
      </div>
   )
}

export default Cover;