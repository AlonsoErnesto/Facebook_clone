import { Link } from "react-router-dom";
import axios from 'axios';

const SendEmail = (props) => {

   const { 
      user,
      userInfo,
      error,
      setLoading,
      setError,
      setVisible,
      email
   } = props;

   const SendEmail = async () => {
      try {
         setLoading(true);
         await axios.post(`${process.env.REACT_APP_BACKEND_URL}/sendResetPasswordCode`,{email});
         setError("");
         setVisible(2);
         setLoading(false);
      } catch (err) {
         setLoading(false);
         setError(err.response.data.message);
      }
   }


   return (
      <div className="reset_form dynamic_height">
         <div className="reset_form_header">Cambiar contraseña.</div>
         <div className="reset_grid">
            <div className="reset_left">
               <div className="reset_form_text">
                  Como quieres recibir el codigo para el cambio de contraseña ?
               </div>
               <label htmlFor="email" className="hover1">
                  <input type="radio" name="" id="email" checked readOnly />
                  <div className="label_col">
                     <span>Enviar codigo por Email a</span>
                     <span>{userInfo.email}</span>
                  </div>
               </label>
            </div>
            <div className="reset_right">
               <img src={userInfo.picture} alt=""/>
               <span>{userInfo.email}</span>
               <span>Uusario de Facebook</span>
            </div>
         </div>
         { error && 
            <div className="error_text " style={{padding:"10px"}}>
               {error}
            </div>
            }
            <div className="reset_form_btns">
               <Link to="/login" className="gray_btn">
               No eres tu?
               </Link>
               <button onClick={()=>{SendEmail()}} className="blue_btn">
               Contiunar
               </button>
            </div>
      </div>
)};
 
export default SendEmail;
