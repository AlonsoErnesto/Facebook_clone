import './style.css';
import {useField,ErrorMessage} from "formik";
import {useMediaQuery} from "react-responsive";


const RegisterInput = ({bottom,...props}) => {

   //FORMIK AYUDA A COMPLETAR LOS ATRIBUTOS MAS LOS VALORES DE PROPS
   const [field,meta]=useField(props);
   const desktopView = useMediaQuery({
      query:"(min-width:850px)",
   });

   return (
      <div className='input_wrap'>
         {/* ERROR TOP */}
         { meta.touched && meta.error && !bottom && (
            <div className={ desktopView ? 'input_error input_error_desktop' : 'input_error'} style={{transform:"translateY(3px)"}}>
               {meta.touched && meta.error && <ErrorMessage name={field.name}/>}
               {meta.touched && meta.error && <div className={desktopView  ? 'error_arrow_left': "error_arrow_top"}></div>}
            </div> 
         )}
         {/* INPUT EMAIL START */}
         <input 
            className={meta.touched && meta.error ? 'input_error_border' : ""}
            type={field.type}
            name={field.name}
            placeholder={field.placeholder}
            {...field}
            {...props}
         />
         {/* INPUT EMAIL END */}
         {/* ERROR BOTTOM */}
         { meta.touched && meta.error && bottom && (
            <div className={ desktopView ? 'input_error input_error_desktop' : 'input_error'} style={{transform:"translateY(3px)"}}>
               {meta.touched && meta.error && <ErrorMessage name={field.name}/>}
               {meta.touched && meta.error && <div className={desktopView  ? 'error_arrow_left': "error_arrow_bottom"}></div>}
            </div> 
         )}
         {/* ICON */}
         { meta.touched && meta.error && (
            <i className='error_icon' style={{top:`${!bottom && !desktopView ? "63%" : "15px"}`}}></i>
         ) }
      </div>
   )
}

export default RegisterInput;

