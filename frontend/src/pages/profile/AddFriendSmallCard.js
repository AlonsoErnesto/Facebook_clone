
const AddFriendSmallCard = ({item}) => {
   return (
      <div className="addfriendCard">
         <div className="addfriend_imgsmall">
            <img src={item.profile_picture} alt=""/>
            <div className="addfriend_infos">
               <div className="addfriend_name">
                  {item.profile_name.length > 11 
                  ? `${item.profile_name.substring(0,11)}...` 
                  : item.profile_name}
               </div>
               <div className="light_blue_btn">
                  <img className="filter_blue" src="../../../icons/addFriend.png" alt=""/>
                  Agregar
               </div>
            </div>
         </div>
      </div>
   )
}

export default AddFriendSmallCard