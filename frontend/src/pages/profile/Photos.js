import { useReducer,useEffect } from "react";
import { photoReducer } from "../../functions/reducers";
import axios from "axios";

const Photos = ({userName,token}) => {

   const [{ loading, error, photos}, dispatch] = useReducer(photoReducer,{
      loading:false,
      photos: {},
      error:"",
   });
   useEffect(() => {getPhotos()}, [userName]);
   const path = `${userName}/*`;
   const max = 30;
   const sort = "desc";

   const getPhotos = async () => {
      try {
         dispatch({
            type:"PHOTOS_REQUEST",
         });
         const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/listImages`,
         {path,sort,max},
         {
            headers:{
            Authorization:`Bearer ${token}`
            }
         });
         dispatch({ 
            type:"PHOTOS_SUCCESS",
            payload:data,
         });
      } catch (err) {
         dispatch({ 
            type:"PHOTOS_ERROR",
            payload:err.response.data.message,
         });
      }
   };

   return (
      <div className="profile_card">
         <div className="profile_card_header">
            Fotos
            <div className="profile_header_link">
               Ver todas las fotos.
            </div>
         </div>
         <div className="profile_card_count">
            { photos.total_count === 0 
               ? ""
               : photos.total_count === 1
               ? "1 Foto"
               : `${photos.total_count} Fotos`
            }
         </div>
         <div className="profile_card_grid">
            {
               photos.resources && photos.resources.slice(0,9).map((img)=>(
                  <div className="profile_photo_card" key={img.public_id}>
                     <img src={img.secure_url} alt=""/>
                  </div>
               ))
            }
         </div>
      </div>
   )
}

export default Photos;