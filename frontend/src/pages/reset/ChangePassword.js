import { Form, Formik } from "formik";
import LoginInput from "../../components/inputs/logininput";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from 'yup';
import axios from 'axios';


const ChangePassword = (props) => {

   const { setPassword, password, setConf_password, conf_password, error,setError,setLoading,setVisible,userInfo:{email}} = props;
   const navigate = useNavigate();


   const validatePassword = Yup.object({
      password: Yup.string()
      .required(
        "Ingresa caracteres y simbolos para reforzar tu contraseña. (! y &)."
      )
      .min(6, "Contraseña menor a 6 caracteres.")
      .max(36, "Contraseña mayor a 36 caracteres"),
      conf_password:Yup.string()
      .required("Confirma tu contraseña")
      .oneOf([Yup.ref("password")],"Contraseña Incorrecta.")
   })

   const changePassword = async () => {
      try {
         setLoading(true);
         await axios.post(`${process.env.REACT_APP_BACKEND_URL}/changePassword`,{email,password});
         setError("");
         navigate('/');
      } catch (err) {
         setError(error.response.data.message);
      }
   }

   return (
         <div className="reset_form" style={{height:"310px"}}>
         <div className="reset_form_header">Cambiar Contraseña.</div>
         <div className="reset_form_text">
            Ingrese su nueva contraseña para su cuenta.
         </div>
         <Formik
            enableReinitialize
            initialValues={{
            password,
            conf_password
            }}
            validationSchema={validatePassword}
            onSubmit={()=>{
               changePassword();
            }}
         >
            {(formik) => (
               <Form>
                  <LoginInput
                     type="password"
                     name="password"
                     onChange={(e) => setPassword(e.target.value)}
                     placeholder="Nueva Contraseña"
                  />
                  <LoginInput
                     type="password"
                     name="conf_password"
                     onChange={(e) => setConf_password(e.target.value)}
                     placeholder="Confimar Nueva Contraseña"
                     bottom
                  />
               {error && <div className="error_text">{error}</div>}
               <div className="reset_form_btns">
                  <Link to="/login" className="gray_btn">
                  Cancelar
                  </Link>
                  <button type="submit" className="blue_btn">
                  Buscar
                  </button>
               </div>
            </Form>
         )}
      </Formik>
   </div>
)}
export default ChangePassword;
