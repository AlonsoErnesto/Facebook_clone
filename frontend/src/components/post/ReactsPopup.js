const reactsArray = [
   {
      name:"Me gusta",
      image:"../../../reacts/like.gif",
   },
   {
      name:"Me encanta",
      image:"../../../reacts/love.gif",
   },
   {
      name:"Me divierte",
      image:"../../../reacts/haha.gif",
   },
   {
      name:"Me sorprende",
      image:"../../../reacts/wow.gif",
   },
   {
      name:"Me entristece",
      image:"../../../reacts/sad.gif",
   },
   {
      name:"Me emperra",
      image:"../../../reacts/angry.gif",
   },
];

const ReactsPopup = ({visible,setVisible}) => {
   return (
      <>
      {visible && (
         <div className="reacts_popup"  
            onMouseOver={() => {
               setTimeout(() => {
                  setVisible(true)
               }, 300);}}
            onMouseLeave={()=>{
               setTimeout(() => {
                  setVisible(false)
               }, 500);}}> 

            {reactsArray.map((react,i)=> (
               <div className="react" key={i}>
                  <img src={react.image} alt=""/>
               </div>
            ))}
         </div>
         )}
      </>
   )
}

export default ReactsPopup;