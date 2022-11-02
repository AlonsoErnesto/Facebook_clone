const DisplayAccessibility = ({setVisible}) => {
   return (
      <div className="absolute_wrap">
         <div className="absolute_wrap_header">
            <div className="circle hover1" onClick={()=>{
               setVisible(0);
            }}>
               <i className="arrow_back_icon"></i>
            </div>
            Tema y Accesibilad
         </div>
         <div className="mmenu_main">
            <div className="small_circle" style={{width:"50px"}}>
               <i className="dark_filled_icon"></i>
            </div>
            <div className="mmenu_col">
               <span className="mmenu_span1">
                  Modo Oscuro
               </span>
               <span className="mmenu_span2">
                  Ajusta la apariencia de Facebook para mejorar la vista ante tus ojos.
               </span>
            </div>
         </div>
         <label htmlFor="darkOff" className="hover1">
            <span>Off</span>
            <input type="radio" name="dark" id="darkOff"/>
         </label>
         <label htmlFor="darkOn" className="hover1">
            <span>On</span>
            <input type="radio" name="dark" id="darkOn"/>
         </label>
         <div className="mmenu_main">
            <div className="small_circle" style={{width:"50px"}}>
               <i className="compact_icon"></i>
            </div>
            <div className="mmenu_col">
               <span className="mmenu_span1">
                  Modo Compacto
               </span>
               <span className="mmenu_span2">
                  Marca el tamaño de la fuente segun el tamaño de la pantalla.
               </span>
            </div>
         </div>
         <label htmlFor="compactOff" className="hover1">
            <span>Off</span>
            <input type="radio" name="compact" id="compactOff"/>
         </label>
         <label htmlFor="compactOn" className="hover1">
            <span>On</span>
            <input type="radio" name="compact" id="compactOn"/>
         </label>
         <div className="mmenu_item hover3">
            <div className="small_circle">
               <i className="keyboard_icon"></i>
            </div>
            <span>Keyboard</span>
            <div className="rArrow">
               <i className="right_icon"></i>
            </div>
         </div>
      </div>
   )
}

export default DisplayAccessibility;