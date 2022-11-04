import { useRef } from "react";
import Detail from "./Details";
import useOnClickOutside from '../../helpers/clickOutside';

const EditDetails = (props) => {

   const {details,handleChange,updateDetails,infos,setVisible} = props;
   const modal = useRef(null);
   useOnClickOutside(modal, () => setVisible(false));

   return (
      <div className="blur">
         <div className="postBox infosBox" ref={modal}>
            <div className="box_header">
               <div className="small_circle" onClick={()=>setVisible(false)}>
                  <i className="exit_icon"></i>
               </div>
               <span>Editar informacion</span>
            </div>
            <div className="details_wrapper scrollbar">
               <div className="details_col">
                  <span>Personaliza su introduccion</span>
                  <span>Detalle su tipo de publicacion </span>
               </div>
               <div className="details_header">Otro nombre</div>
               <Detail 
                  value={details?.otherName} 
                  img="studies" 
                  placeholder="Agregar otro nombre"
                  name="otherName"
                  text="Otro nombre"
                  handleChange={handleChange}
                  updateDetails={updateDetails}
                  infos={infos}
               />
               <div className="details_header">Empleo</div>
               <Detail 
                  value={details?.job} 
                  img="job" 
                  placeholder="Agregar ocupacion de trabajo"
                  name="job"
                  text="ocupacion de trabajo"
                  handleChange={handleChange}
                  updateDetails={updateDetails}
                  infos={infos}
               />
               <Detail 
                  value={details?.workplace} 
                  img="job" 
                  placeholder="Agregar centro de trabajo"
                  name="workplace"
                  text="Centro de trabajo"
                  handleChange={handleChange}
                  updateDetails={updateDetails}
                  infos={infos}
               />
               <div className="details_header">Formacion academica</div>
               <Detail 
                  value={details?.highSchool} 
                  img="studies" 
                  placeholder="Agregar escuela secundaria"
                  name="highSchool"
                  text="centro de estudios secundarios"
                  handleChange={handleChange}
                  updateDetails={updateDetails}
                  infos={infos}
               />
               <Detail 
                  value={details?.college} 
                  img="studies" 
                  placeholder="Agregar universidad"
                  name="college"
                  text="una universidad"
                  handleChange={handleChange}
                  updateDetails={updateDetails}
                  infos={infos}
               />
               <div className="details_header">Ciudad actual</div>
               <Detail 
                  value={details?.currentCity} 
                  img="home" 
                  placeholder="Agregar ubicacion"
                  name="currentCity"
                  text="Ubicacion"
                  handleChange={handleChange}
                  updateDetails={updateDetails}
                  infos={infos}
               />
               <div className="details_header">Ciudad de origen</div>
               <Detail 
                  value={details?.hometown} 
                  img="home" 
                  placeholder="Nombre de ciudad de nacimiento"
                  name="hometown"
                  text="Ciudad de Nacimiento"
                  handleChange={handleChange}
                  updateDetails={updateDetails}
                  infos={infos}
               />
               <div className="details_header">Relacion sentimental</div>
               <Detail 
                  value={details?.relationship} 
                  img="relationship" 
                  placeholder="Agregar relacion sentimental"
                  name="relationship"
                  text="relacion sentimental"
                  handleChange={handleChange}
                  updateDetails={updateDetails}
                  infos={infos}
                  rel
               />
               <div className="details_header">Instagram</div>
               <Detail 
                  value={details?.instagram} 
                  img="instagram" 
                  placeholder="Agregar Instagram"
                  name="instagram"
                  text="Instagram"
                  handleChange={handleChange}
                  updateDetails={updateDetails}
                  infos={infos}
               />
            </div>
         </div>
      </div>
   )
}

export default EditDetails;