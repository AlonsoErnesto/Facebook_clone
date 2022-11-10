import { reactPost } from '../../functions/post';
import { useSelector } from 'react-redux';


const reactsArray = [
   {
      name:"like",
      image:"../../../reacts/like.gif",
   },
   {
      name:"love",
      image:"../../../reacts/love.gif",
   },
   {
      name:"haha",
      image:"../../../reacts/haha.gif",
   },
   {
      name:"wow",
      image:"../../../reacts/wow.gif",
   },
   {
      name:"sad",
      image:"../../../reacts/sad.gif",
   },
   {
      name:"angry",
      image:"../../../reacts/angry.gif",
   },
];

const ReactsPopup = (props) => {

   const {visible,setVisible,reactHandler} = props;

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
               <div className="react" key={i} onClick={()=>reactHandler(react.name)}>
                  <img src={react.image} alt=""/>
               </div>
            ))}
         </div>
         )}
      </>
   )
}

export default ReactsPopup;