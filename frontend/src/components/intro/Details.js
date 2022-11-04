import Bio from "./Bio";
import { useState } from "react";

const Detail = (props) => {

   const {
      img,
      value,
      placeholder, 
      name,
      handleChange,
      updateDetails,
      infos,
      text,
      rel
   } = props;

   const [show, setShow] = useState(false);

   return (
      <div>
         <div className="add_details_flex" onClick={() => setShow(true)}>
            {
               value ? 
                  <div className="info_profile">
                     <img src={`../../../icons/${img}.png`} alt=""/>
                     {value}
                     <i className="edit_icon"></i>
                  </div>
               : (
                  <>
                     <i className="rounded_plus_icon"></i>
                     <span className="underline">Agregar {text}</span>
                  </>
               )
            }
         </div>
         { show && 
            <Bio 
               placeholder={placeholder} 
               name={name} 
               handleChange={handleChange} 
               updateDetails={updateDetails}
               infos={infos}
               detail 
               setShow={setShow}
               rel={rel}
            /> }
      </div>
   );
};

export default Detail;