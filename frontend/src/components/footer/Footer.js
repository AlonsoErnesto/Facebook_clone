import {Link}from 'react-router-dom';

const Footer = () => {
   return (
      <footer className='login_footer'>
               <div className='login_footer_wrap'>
                  <Link>Español</Link>
                  <Link to="/">English (US) </Link>    
                  <Link to="/">Italiano </Link>    
                  <Link to="/">Português (Brasil) </Link>    
                  <Link to="/">Français (France) </Link>    
                  <Link to="/">Deutsch </Link>    
                  <Link to="/">日本語 </Link>    
                  <Link to="/">中文(简体) </Link>    
                  <Link to="/">العربية </Link>    
                  <Link to="/">हिन्दी </Link>    
                  <Link to="/" className="footer_square">
                     <i className='plus_icon'></i>
                  </Link>
               </div>
               <div className='footer_splitter'></div>
               <div className='login_footer_wrap'>
               <Link to="/">Registrarte</Link>
               <Link to="/">Iniciar sesión</Link>
               <Link to="/">Messenger</Link>
               <Link to="/">Facebook</Link>
               <Link to="/">Lite</Link>
               <Link to="/">Watch</Link>
               <Link to="/">Lugares</Link>
               <Link to="/">Juegos</Link>
               <Link to="/">Marketplace</Link>
               <Link to="/">Facebook </Link>
               <Link to="/">Pay</Link>
               <Link to="/">Oculus</Link>
               <Link to="/">Portal</Link>
               <Link to="/">Instagram</Link>
               <Link to="/">Bulletin</Link>
               <Link to="/">Local</Link>
               <Link to="/">Recaudaciones de fondos</Link>
               <Link to="/">Servicios</Link>
               <Link to="/">Centro de información de votación</Link>
               <Link to="/">Grupos</Link>
               <Link to="/">Información</Link>
               <Link to="/">Crear anuncio</Link>
               <Link to="/">Crear página</Link>
               <Link to="/">Desarrolladores</Link>
               <Link to="/">Empleo</Link>
               <Link to="/">Privacidad</Link>
               <Link to="/">Cookies</Link>
               <Link to="/">
                  Opciones de anuncios
                  <i className='adChoices_icon'></i>
               </Link>
               <Link to="/">Condiciones</Link>
               <Link to="/">Ayuda</Link>
               <Link to="/">Subir contactos y no usuarios</Link>
               <Link to="/">Configuración</Link>
               <Link to="/">Registro de actividad</Link>
               </div>
               <div className='login_footer_wrap'>
                  <Link to="/" style={{fontSize:"12px",marginTop:"30px"}}>Meta © 2022</Link>
               </div>
            </footer>
   )
}

export default Footer;