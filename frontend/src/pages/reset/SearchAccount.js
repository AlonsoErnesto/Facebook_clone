import { Form, Formik } from "formik";
import LoginInput from "../../components/inputs/logininput";
import { Link } from "react-router-dom";
import * as Yup from "yup"
import axios from 'axios';

const SearchAccount = ({email,setEmail,error, setLoading,setError,setUserInfo,setVisible}) => {

   const handleSearch = async () => {
      try{
         setLoading(true);
         const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/findUser`,{email})
         setUserInfo(data);
         setVisible(1);
         setError("");
      }catch(err){
         setLoading(false);
         setError(err.response.data.message);
      }
   }

   const validateEmail = Yup.object({
      email:Yup.string()
         .required("El correo es requerido.")
         .email("Ingrese un correo valido.")
         .max(50,"El correo es necesario que tenga max. 50 caracteres.")
   })

   return (
         <div className="reset_form">
         <div className="reset_form_header">Find Your Account</div>
         <div className="reset_form_text">
            Ingrese su Correo para buscar la cuenta.
         </div>
         <Formik
            enableReinitialize
            initialValues={{
            email,
            }}
            validationSchema={validateEmail}
            onSubmit={()=>{handleSearch()}}
         >
            {(formik) => (
               <Form>
                  <LoginInput
                  type="text"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address or phone number"
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
export default SearchAccount;
