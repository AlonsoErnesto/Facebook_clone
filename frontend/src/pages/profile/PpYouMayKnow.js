import { Dots } from '../../svg';
import { stories } from '../../data/home';
import AddFriendSmallCard from './AddFriendSmallCard';

const PpYouMayKnow = () => {
   return (
      <div className='pplumayknow'>
         <div className='pplumayknow_header'>
            Personas que conoces
            <div className='post_header_right ppl_circle hover1'>
               <Dots/>
            </div>
         </div>
         <div className='pplumayknow_list'>
            { stories.map((item,i)=>(
               <AddFriendSmallCard item={item} key={i}/>
            ))}
         </div>
      </div>
   )
}

export default PpYouMayKnow