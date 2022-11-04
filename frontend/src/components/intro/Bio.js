import { useSelector } from "react-redux";


const Bio = (props) => {

   const {
      infos,
      handleChange,
      max,
      setShowBio,
      updateDetails,
      placeholder,
      name,
      detail,
      setShow,
      rel,
   } = props;

   const { user } = useSelector((state)=>({...state}));
   return (
      <div className="add_bio_wrap">
         {rel ? 
         (  <select className="select_rel" name={name} value={infos?.relationship} onChange={handleChange}>
               <option value={user.gender === 'female' ? 'Soltera' : 'Soltero' }>{user.gender === 'female' ? 'Soltera' : 'Soltero' }</option>
               <option value="En una relacion">En una relacion</option>
               <option value={user.gender === 'female' ? 'Casada' : 'Casado' }>{user.gender === 'female' ? 'Casada' : 'Casado' }</option>
               <option value={user.gender === 'female' ? 'Divorciada' : 'Divorciado' }>{user.gender === 'female' ? 'Divorciada' : 'Divorciado' }</option>
            </select>) 
            : (
               <>
               <textarea
                  placeholder={placeholder}
                  name={name}
                  value={infos?.[name]}
                  maxLength={detail ? 25 : 100}
                  className="textarea_blue details_input"
                  onChange={handleChange}
               >
               </textarea>
               </>
            )
         }
         { !detail && <div className="remaining">{max} Caracteres faltantes</div>}
         <div className="remaining"> {max} Caracteres restantes</div>
         <div className="flex">
            <div className="flex flex_left">
               <i className="public_icon"></i>Publico
            </div>
            <div className="flex flex_right">
               <button 
                  className="gray_btn" 
                  onClick={()=> !detail ? setShowBio(false) : setShow(false)}
               >
                  Cancelar
               </button>
               <button 
                  className="blue_btn" 
                  onClick={()=> { 
                     updateDetails();
                     setShow(false);
               }}
               >
                  Guardar
               </button>
            </div>
         </div>
      </div>
   )
}

export default Bio;