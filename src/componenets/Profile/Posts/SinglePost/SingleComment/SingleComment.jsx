import { CgHeart } from 'react-icons/cg';
import { RiDeleteBinLine } from 'react-icons/ri';

import style from './SingleComment.module.css';

const SingleComment = ({ id, text, date, likesCount, isLiked, formatDate, deleteCommentHandler, likeCommentHandler, authorisedUserProfile }) => {
  return (
    <div className={style.singleComment}>
      <img className={style.commentImg} src={authorisedUserProfile?.photos?.large || 'https://avatars.mds.yandex.net/i?id=384a55164f8927b70d0d86e5dd1ec4a6ba880567-6997554-images-thumbs&n=13'} alt="userImg" />
      <div className={style.commentMain}>
        <div className={style.commentInfo}>
          <p className={style.commentUserName}>{authorisedUserProfile.fullName}</p>
          <p className={style.commentDate}>{formatDate(date)}</p>
          <p className={style.commentText}>{text}</p>
        </div>
        <div className={style.commentActions}>
          <RiDeleteBinLine className={style.commentDeleteIcon} onClick={() => deleteCommentHandler(id)} />
          <div className={style.likeActions}>
            <div>
              <p className={style.likesCount}>{likesCount}</p>
            </div>
            <CgHeart className={`${style.commentHeartIcon} ${isLiked ? style.commentHeartIconActive : ''}`} onClick={() => likeCommentHandler(id, likesCount, isLiked)} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default SingleComment;