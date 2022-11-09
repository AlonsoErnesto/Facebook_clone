import  {Link } from 'react-router-dom';

const Friends = ({friends}) => {

   return (
      <div className="profile_card">
         <div className="profile_card_header">
            Amigos
            <div className="profile_header_link">
               Ver amigos.
            </div>
         </div>
         { friends && (
            <div className="profile_card_count">
               { friends?.length === 0 
                  ? ""
                  : friends?.length === 1
                  ? "1 Amigo"
                  : `${friends?.length} Amigos`
               }
            </div>
         )}
         <div className="profile_card_grid">
            {
               friends && friends.slice(0,9).map((friend,i)=>(
                  <Link to={`/profile/${friend.username}`} className="profile_photo_card" key={i}>
                     <img src={friend.picture} alt=""/>
                     <span>
                        {friend.first_name} {friend.last_name}
                     </span>
                  </Link>
               ))
            }
         </div>
      </div>
   )
}

export default Friends;