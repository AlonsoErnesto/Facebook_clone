import Moment from "react-moment"

const Comment = ({comment}) => {


   return (
      <div className="comment">
         <img src={comment.commentBy.picture} alt="" className="comment_img"/>
         <div className="comment_col">
            <div className="comment_wrap">
               <div className="comment_name">
                  { comment.commentBy.first_name } { comment.commentBy.last_name }
               </div>
                  <div className="comment_text">
                     { comment.comment }
                  </div>
               </div>
               {
                  comment.image && (
                     <img src={comment.image} alt="" className="comment_image" />
                  )
               }
               <div className="comment_actions">
                  <span>Me gusta</span>
                  <span>Responder</span>
                  <span>
                     <Moment fromNow interval={30}>
                        { comment.commentAt }
                     </Moment>
                  </span>
               </div>
         </div>
      </div>
   )
}

export default Comment