import React from 'react'
import { Link } from 'react-router-dom'
import { Dots } from '../../svg'

const ProfileMenu = () => {
   return (
      <div className="profile_menu_wrap">
         <div className="profile_menu">
            <Link to="/" className='profile_menu_active'>Publicaciones</Link>
            <Link to="/" className='hover1'>Info</Link>
            <Link to="/" className='hover1'>Amigos</Link>
            <Link to="/" className='hover1'>Fotos</Link>
            <Link to="/" className='hover1'>Videos</Link>
            <Link to="/" className='hover1 visit'>Visitas</Link>
            <Link to="/" className='hover1'>Mas</Link>
            <div className='p10_dots'>
               <Dots/>
            </div>
         </div>
      </div>
   )
}

export default ProfileMenu