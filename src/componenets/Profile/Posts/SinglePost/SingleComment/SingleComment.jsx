import { useParams } from 'react-router-dom';
import formatDate from './../../../../../additional/formatDate';
import { CgHeart } from 'react-icons/cg';
import { RiDeleteBinLine } from 'react-icons/ri';

import style from './SingleComment.module.css';

const SingleComment = ({ id, text, date, likesCount, userName, deleteCommentHandler, likeCommentHandler, authorisedUserProfile, noUserPhoto, authorizedUserLikedComment }) => {

  const params = useParams();
  const showDeleteButton = (authorisedUserProfile.userId === +params.id || authorisedUserProfile.fullName === userName) ? true : false

  return (
    <div className={style.singleComment}>
      <img className={style.commentImg} src={authorisedUserProfile?.photos?.large || noUserPhoto} alt="userImg" />
      <div className={style.commentMain}>
        <div className={style.commentInfo}>
          <p className={style.commentUserName}>{userName}</p>
          <p className={style.commentDate}>{formatDate(date)}</p>
          <p className={style.commentText}>{text}</p>
        </div>
        <div className={style.commentActions}>
          {showDeleteButton ? <RiDeleteBinLine className={style.commentDeleteIcon} onClick={() => deleteCommentHandler(id)} /> : null}

          <div className={style.likeActions}>
            <div>
              <p className={style.likesCount}>{likesCount}</p>
            </div>
            <CgHeart className={`${style.commentHeartIcon} ${authorizedUserLikedComment ? style.commentHeartIconActive : ''}`} onClick={() => likeCommentHandler(id)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleComment;