import { useState,useCallback,useRef } from "react"
import Cropper from 'react-easy-crop';

const UpdateProfilePicture = ({setImage,image}) => {

   const [description, setDescription] = useState("");
   const [crop, setCrop] = useState({x:0,y:0});
   const [zoom, setZoom] = useState(1);
   const slider = useRef(null);


   const onCropComplete = useCallback((croppedArea,croppedAreaPixels)=>{
      console.log(croppedArea,croppedAreaPixels)
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
            <div className="gray_btn">
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
            <div className="blue_link">Cancelar</div>
            <button className="blue_btn">Guardar</button>
         </div>
      </div>
   )
}

export default UpdateProfilePicture