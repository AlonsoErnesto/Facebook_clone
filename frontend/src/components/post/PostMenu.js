import { useState,useRef } from "react";
import MenuItem from "./MenuItem";
import useOnClickOutside from '../../helpers/clickOutside'


const PostMenu = ({postUserId,userId,imagesLength,setShowMenu}) => {

   const [test, setTest] = useState(postUserId === userId ? true : false);
   const menu = useRef(null);
   useOnClickOutside(menu,()=>setShowMenu(false))

  return (
   <ul className="post_menu" ref={menu}>
      { test && <MenuItem icon="pin_icon" title="Anclar Publicacion"/>}
      <MenuItem 
         icon="save_icon" 
         title="Guardar Publicacion"
         subtitle="Agrega este post en tus Post's guardados."   
      />
      <div className="line"></div>
      { test && (<MenuItem icon="edit_icon" title="Editar publicacion"/>)}
      { !test && (<MenuItem icon="turnOnNotification_icon" title="Activar notificaciones"/>)}
      { imagesLength && (<MenuItem icon="download_icon" title="Descargar publicacion"/>)}
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