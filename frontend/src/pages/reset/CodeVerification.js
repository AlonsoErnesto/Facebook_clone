import { Form, Formik } from "formik";
import LoginInput from "../../components/inputs/logininput";
import { Link } from "react-router-dom";
import * as Yup from "yup"
import axios from 'axios'

const CodeVerification = (props) => {

   const {code,setCode,error,loading,setLoading,setVisible,setError,userInfo:{email}} = props;

   const verifyCode = async () => {
      try {
         setLoading(true);
         await axios.post(`${process.env.REACT_APP_BACKEND_URL}/validateResetCode`,{email, code});
         setError("");
         setLoading(false);
         setVisible(3);
      } catch (err) {
         setLoading(false);
         setError(err.response.data.message);
      }   
   }

   const validateCode =  Yup.object({
      code:Yup.string()
         .required("El codigo es requerido.")
         .min('5',"Min. 5 caracteres.")
         .max('5',"Max. 5 catacteres.")
   })
   return (
         <div className="reset_form">
         <div className="reset_form_header">Codigo de Verificacion.</div>
         <div className="reset_form_text">
            Por favor ingrese el codigo que se envio a su Correo.
         </div>
         <Formik
            enableReinitialize
            initialValues={{
            code,
            }}
            validationSchema={validateCode}
            onSubmit={()=>{
               verifyCode()
            }}
         >
            {(formik) => (
               <Form>
                  <LoginInput
                  type="text"
                  name="code"
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Codigo"
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
export default CodeVerification;
