import React, {useState} from 'react';
import { Formik, Form} from "formik";
import { Link } from 'react-router-dom';
import * as Yup from "yup";

import LoginInput from "../../components/inputs/logininput";

const loginInfos = {
   email:"",
   password:"",
}


const LoginForm = () => {

   const [ login, setLogin ] = useState(loginInfos);
   const { email, password } = login;
   const handleLoginChange = (e) => {  
      const {name, value} = e.target;
      setLogin({...login,[name]:value})
   };
   const loginValidation = Yup.object({
      email:Yup.string()
         .required("Ingrese su correo electronico.")
         .email("Su correo electronico no es correcto.")
         .max(100,"Maximo, 100 caracteres"),
      password:Yup.string()
         .required("Ingrese su password"),
   });


   return (
      <div className="login_wrap">
      <div className="login_1">
         <img src="../../icons/facebook.svg" alt=""/>
         <span>Adviser es una red conectada entre profesionales y estudiantes universitarios.</span>
      </div>
      <div className="login_2">
         <div className="login_2_wrap">
            <Formik
               enableReinitialize
               initialValues={{
                  email,
                  password,
               }}
               validationSchema={loginValidation}
            >
               {(formik) => (
                  <Form>
                     <LoginInput 
                        type="text" 
                        name="email" 
                        placeholder="Correo Electronico"
                        onChange={handleLoginChange}
                     />
                     <LoginInput 
                        type="password" 
                        name="password" 
                        placeholder="Password"
                        onChange={handleLoginChange}
                        bottom
                     />
                     <button type="submit" className="blue_btn" >Iniciar Sesion</button>
                  </Form>
               )}
            </Formik>
            <Link to="/forgot" className="forgot_password">Olvide mi password.</Link>
            <div className="sign_splitter"></div>
            <button className="blue_btn open_signup">Crear cuenta</button>
         </div>
         <Link to="/" className="sign_extra">
            <b>Pagina creada </b>
            con fines educativos.
         </Link>
      </div>
   </div>
   )
}


export default LoginForm;