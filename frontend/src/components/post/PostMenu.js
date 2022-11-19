import { useState,useRef } from "react";
import MenuItem from "./MenuItem";
import useOnClickOutside from '../../helpers/clickOutside'
import { savePost } from "../../functions/post";
import { saveAs } from 'file-saver';

const PostMenu = (props) => {

   const {postUserId,userId,imagesLength,setShowMenu, token, postId,setCheckSaved,checkSaved,images} = props;
   const [test, setTest] = useState(postUserId === userId ? true : false);
   const menu = useRef(null);
   useOnClickOutside(menu,()=>setShowMenu(false))

   const saveHandler = async () => {
      savePost(postId,token);
      if(checkSaved){
         setCheckSaved(false);
      } else {
         setCheckSaved(true);
      }
   }

   const downloadImages = async () => {
      images.map((img) => {
         saveAs(img.url,"image.jpg")
      });
   };

  return (
   <ul className="post_menu" ref={menu}>
      { test && <MenuItem icon="pin_icon" title="Anclar Publicacion"/>}
      <div onClick={()=>saveHandler()}>
         {
            checkSaved ? (
               <MenuItem 
               icon="save_icon" 
               title="Eliminar publicacion guardado"
               subtitle="ELiminar esta publicacion guardada."   
            />
            ) : (
               <MenuItem 
               icon="save_icon" 
               title="Guardar Publicacion"
               subtitle="Agrega esta publicacion en tus Post's guardados."   
            />
            )
         }
      </div>
      <div className="line"></div>
      { test && (<MenuItem icon="edit_icon" title="Editar publicacion"/>)}
      { !test && (<MenuItem icon="turnOnNotification_icon" title="Activar notificaciones"/>)}
      { imagesLength && (
         <div onClick={()=>downloadImages()}>
            <MenuItem icon="download_icon" title="Descargar publicacion"/>
         </div>
      )}
      { imagesLength && (<MenuItem icon="fullscreen_icon" title="Pantalla completa"/>)}
      { test && <MenuItem img="../../../icons/lock.png" title="Editar privacidad"/>}
      { test && (<MenuItem icon="turnOffNotifications_icon" title="Apagar notificaciones"/>)}
      { test && (<MenuItem icon="delete_icon" title="Apagar traducciones"/>)}
      { test && (<MenuItem icon="date_icon" title="Editar fecha"/>)}
      { test && (<MenuItem icon="refresh_icon" title="Actualizar publicacion adjuntado"/>)}
      { test && (<MenuItem icon="archive_icon" title="Archivar publicacion"/>)}
      { test && (<MenuItem icon="trash_icon" title="Mover al tacho" subtitle="Luego de 30 dias se eliminara."/>)}
      { !test && <div className="line"></div>}
      { !test && (<MenuItem img="../../../icons/report.png" title="Reportar Publicacion" subtitle="Me incomoda este Post."/>)}
   </ul>
  )
}

export default PostMenu;