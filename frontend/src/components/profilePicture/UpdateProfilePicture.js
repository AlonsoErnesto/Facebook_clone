import { useState,useCallback,useRef } from "react"
import Cropper from 'react-easy-crop';
import { useDispatch, useSelector } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader';
import Cookies from 'js-cookie';
import getCroppedImg from '../../helpers/getCroppedImg';
import { updateprofilePicture } from '../../functions/user';
import { uploadImages } from '../../functions/uploadImages';

import { createPost } from "../../functions/post";
const UpdateProfilePicture = ({setImage,image,setError,setShow,pRef}) => {

   const dispatch = useDispatch();
   const [description, setDescription] = useState("");
   const [crop, setCrop] = useState({x:0,y:0});
   const [zoom, setZoom] = useState(1);
   const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
   const { user } = useSelector((state)=>({...state}));
   const [loading, setLoading] = useState(false);
   const slider = useRef(null);


   const onCropComplete = useCallback((croppedArea,croppedAreaPixels)=>{
      setCroppedAreaPixels(croppedAreaPixels);
   },[])

   const zoomIn = () => {
      // if(zoom < 3){ setZoom((prev)=> prev + 0.2); }
      slider.current.stepUp();
      setZoom(slider.current.value);
   }
   const zoomOut = () => {
      // if(zoom > 1){ setZoom((prev)=> prev - 0.2); }
      slider.current.stepDown();
      setZoom(slider.current.value);
   }

   const getCroppedImage = useCallback(async (show) => {
      try {
         const img = await getCroppedImg(image,croppedAreaPixels);
         if (show) {
            setZoom(1);
            setCrop({x:0,y:0});
            setImage(img);
         } else {
            return img;
         }
      } catch (err) {
         console.log(err);
      }
   },[croppedAreaPixels]);


   const updateProfilePicture = async () => {
      try {
         setLoading(true);
         let img = await getCroppedImage();
         let blob = await fetch(img).then((b)=> b.blob());
         const path = `${user.username}/profile_pictures`;
         let formData = new FormData();
         formData.append("file",blob);
         formData.append("path",path);
         const res = await uploadImages(formData,path, user.token);
         const updated_picture = await updateprofilePicture(
            res[0].url,
            user.token
         );
         if(updated_picture === "ok"){ 
            const new_post = await createPost(
               'profilePicture',
               null,
               description,
               res,
               user.id,
               user.token);

               if(new_post === "ok"){
                  setLoading(false);
                  setImage("");
                  pRef.current.style.backgroundImage = `url(${res[0].url})`;
                  Cookies.set("user",{
                     ...user,
                     picture:res[0].url,
                  });
                  dispatch({
                     type:"UPDATEPICTURE",
                     paylolad: res[0].url,
                  });
                  setShow(false);
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
      <div className="postBox update_img">
         <div className="box_header">
            <div className="small_circle" onClick={()=>setImage("")}>
               <i className="exit_icon"></i>
            </div>
            <span>Subir foto de perfil</span>
         </div>
         <div className="update_image_desc">
            <textarea 
               placeholder="Descripcion" 
               className="textarea_blue details_input"
               value={description}
               onChange={(e)=>setDescription(e.target.value)}
            ></textarea>
         </div>

         <div className="update_center">
            <div className="crooper">
               <Cropper
                  image={image}
                  crop={crop}
                  zoom={zoom}
                  aspect={1 / 1}
                  cropShape="round"
                  onCropChange={setCrop}
                  onCropComplete={onCropComplete}
                  onZoomChange={setZoom}
                  showGrid={false}
               />
            </div>
            <div className="slider">
               <div className="slider_circle hover1" onClick={()=>zoomOut()}>
                  <i className="minus_icon"></i>
               </div>
               <input 
                  type="range"
                  min={1}
                  max={3}
                  step={0.2}
                  value={zoom}
                  ref={slider}
                  onChange={(e)=>setZoom(e.target.value)}
               />
               <div className="slider_circle hover1" onClick={()=>zoomIn()}>
                  <i className="plus_icon"></i>
               </div>
            </div>
         </div>
         <div className="flex_up">
            <div className="gray_btn" onClick={()=> getCroppedImage("show")}>
               <i className="crop_icon"></i>Recortar foto
            </div>
            <div className="gray_btn">
               <i className="temp_icon"></i>Marcar temporalmente
            </div>
         </div>
         <div className="flex_p_t">
            <i className="public_icon"></i>
            Tu foto de perfil es publico
         </div>
         <div className="update_submit_wrap">
            <div className="blue_link" onClick={()=>setImage("")}>Cancelar</div>
            <button className="blue_btn" disabled={loading}  onClick={()=> updateProfilePicture()}>
               { loading ? <PulseLoader color="#fff" size={5}/> : "Guardar"}
            </button>
         </div>
      </div>
   )
}

export default UpdateProfilePicture