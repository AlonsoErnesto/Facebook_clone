const SettingsPrivacy = ({setVisible}) => {
   return (
      <div className="absolute_wrap">
         <div className="absolute_wrap_header">
            <div className="circle hover1" onClick={()=>{
               setVisible(0);
            }}>
               <i className="arrow_back_icon"></i>
            </div>
            Configuracion y Privacidad
         </div>
         <div className="mmenu_item hover3">
            <div className="small_circle">
               <i className="settings_filled_icon"></i>
            </div>
            <span>Configuracion</span>
         </div>
         <div className="mmenu_item hover3">
            <div className="small_circle">
               <i className="privacy_checkup_icon"></i>
            </div>
            <span>Datos Privados</span>
         </div>
         <div className="mmenu_item hover3">
            <div className="small_circle">
               <i className="privacy_shortcuts_icon"></i>
            </div>
            <span>Privacidad</span>
         </div>
         <div className="mmenu_item hover3">
            <div className="small_circle">
               <i className="activity_log_icon"></i>
            </div>
            <span>Actividad</span>
         </div>
         <div className="mmenu_item hover3">
            <div className="small_circle">
               <i className="news_icon"></i>
            </div>
            <span>Nuevas Preferencias</span>
         </div>
         <div className="mmenu_item hover3">
            <div className="small_circle">
               <i className="language_icon"></i>
            </div>
            <span>Idioma</span>
         </div>
      </div>
   )
}

export default SettingsPrivacy;