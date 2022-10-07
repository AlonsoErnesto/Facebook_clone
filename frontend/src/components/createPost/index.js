import React from 'react';
import { LiveVideo,Photo,Feeling } from '../../svg';
import './style.css';

const CreatePost = ({user}) => {
   return (
      <div className="createPost">
         <div className="createPost_header">
            <img src={user?.picture} alt=""/>
            <div className="open_post hover2">
               En que piensas {user.first_name}?
            </div>
         </div>
         <div className="create_splitter">

         </div>
         <div className="createPost_body">
            <div className='createPost_icon hover1'>
               <LiveVideo color="#f3425f"/>
               Video en vivo
            </div>
            <div className='createPost_icon hover1'>
               <Photo color="#4bbf67"/>
               Foto o Video
            </div>
            <div className='createPost_icon hover1'>
               <Feeling color="#f7b928"/>
               Sentimiento/actividad
            </div>
         </div>
      </div>
   );
}

export default CreatePost;
