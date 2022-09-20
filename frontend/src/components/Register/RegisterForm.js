import React, {useState} from 'react';
import {Formik,Form} from 'formik';
import RegisterInput from '../inputs/registerinput'

const userInfo = {
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  bYear: '',
  bMonth: '',
  bDay: '',
  gender: '',
};

const RegisterForm = ( ) => {

  const [user,setUser] = useState(userInfo)
  const handleRegisterChange = (e) => {
    const {name, value} = e.target;
    setUser({...user, [name]: value});
  }
    
   return (
      <div className="blur">
         <div className="register">
            <div className="register_header">
               <i className="exit_icon"></i>
               <span>Crear cuenta</span>
               <span>Esto es muy facil.</span>
            </div>
            <Formik>
              {(formik)=>(
                 <Form className="register_form">
                  <div className="regi_line">
                    <RegisterInput 
                      type="text" 
                      placeholder="Nombre" 
                      name="first_name"
                      onChange={handleRegisterChange}
                  />
                  <RegisterInput
                    type="text"
                    placeholder="Apellido"
                    name="last_name"
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="reg_line">
                  <RegisterInput
                    type="text"
                    placeholder="Correo Electronico"
                    name="email"
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="reg_line">
                  <RegisterInput
                    type="password"
                    placeholder="NuevoPassword"
                    name="password"
                    onChange={handleRegisterChange}
                  />
                </div>
                <div className="reg_col">
                  <div className="reg_line_geader">
                    Fecha de nacimiento <i className="info_icon"></i>
                  </div>
                  <div className="reg_grid">
                    <select name="bDay">
                      <option>15</option>
                    </select>
                    <select className="bMonth">
                      <option>15</option>
                    </select>
                    <select className="bYear">
                      <option>15</option>
                    </select>
                  </div>
                </div>
                <div className="reg_col">
                  <div className="reg_line_header">
                    Genero <i className="info_icon"></i>
                  </div>
                  <div className="reg_grid">
                    <label htmlFor="male">
                      Hombre
                      <input 
                        type="radio" 
                        name="gender"
                        id="male" 
                        value="male" 
                        onChange={handleRegisterChange}
                      />
                    </label>
                    <label htmlFor="female">
                      Mujer
                      <input
                        type="radio"
                        name="gender"
                        id="female"
                        value="female"
                        onChange={handleRegisterChange}
                      />
                    </label>
                    <label htmlFor="custom">
                      Ambos
                      <input 
                        type="radio"
                        name="gender"
                        id="custom"
                        value="custom"
                        onChange={handleRegisterChange}
                      />
                    </label>
                  </div>
                </div>
                <div className="reg_infos">
                Es posible que las personas que usan nuestro servicio hayan subido tu información de contacto a Facebook. {" "}
                <span>Obtén más información. &nbsp;</span>  
                Al hacer clic en "Registrarte", aceptas nuestras Condiciones, la Política de privacidad y la Política de cookies. 
                <span>Es posible que te enviemos notificaciones por SMS</span> ,
                que puedes desactivar cuando quieras.
                </div>
                <div className="reg_btn_wrapper">
                  <button className="blue_btn open_signup">Registrarse</button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
   )
}

export default RegisterForm;
