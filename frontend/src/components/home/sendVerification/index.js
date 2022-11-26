import React,{useState} from 'react';
import axios from 'axios'
import './style.css';

const SendVerification = ({user}) => {

   const [error, setError] = useState("");
   const [success, setSuccess] = useState("");
   
   const sendVerificationLink = async () => {
      try {
         const { data } = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/sendVerification`,
         {},
         {
            headers:{
               Authorization: `Bearer ${user.token}`,
            },
         })
         setSuccess(data.message);
      } catch (err) {
         setError(err.response.data.message);
      }
   }

   return (
      <div className="send_verification">
         <span>
            Verifica tu cuenta en tu correo, antes que se elimine!
         </span>
         <a onClick={()=>{
            sendVerificationLink();
         }}>Reenviar verificacion al correo</a>
         { success && <div className="success_text">{success}</div> }
         { error && <div className="error_text">{error}</div> }
      </div>
   );
}

export default SendVerification;
