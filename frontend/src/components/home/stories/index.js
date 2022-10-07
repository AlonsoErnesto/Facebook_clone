import './style.css';
import { ArrowRight, Plus } from '../../../svg';
import { stories } from '../../../data/home';
import Story from './Story';

const Storires = () => {
   return (
      <div className="stories">
         <div className="create_story_card">
            <img className='create_story_img' src="../../../images/default_pic.png" alt=""/>
            <div className='plus_story'>
               <Plus color="#fff"/>
            </div>
            <div className='story_create_text'>
               Create Story
            </div>
         </div>
         {
            stories.map((story,i)=>(
               <Story story={story} key={i}/>
            ))
         }
         <div className="white_circle">
            <ArrowRight color="#65676b"/>
         </div>
      </div>
   )
}

export default Storires;