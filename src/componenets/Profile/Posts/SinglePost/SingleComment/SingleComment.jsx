import { useState, useEffect } from 'react'
import { useParams, NavLink } from 'react-router-dom';
import { getUserImg } from '../../../../../api/api';
import formatDate from './../../../../../additional/formatDate';
import { CgHeart } from 'react-icons/cg';
import { RiDeleteBinLine } from 'react-icons/ri';

import style from './SingleComment.module.css';

const SingleComment = ({ id, authorId, text, date, likesCount, userName, deleteCommentHandler, likeCommentHandler, authorisedUserProfile, noUserPhoto, authorizedUserLikedComment }) => {

  const params = useParams();
  const [src, setSrc] = useState('')

  useEffect(() => {
    getUserImg(authorId)
      .then((result) => setSrc(result))
  }, [authorId])


  const showDeleteButton = (authorisedUserProfile.userId === +params.id || authorisedUserProfile.fullName === userName) ? true : false

  return (
    <div className={style.singleComment}>
      <NavLink className={style.link} to={`/profile/${authorId}`}>
        <img className={style.commentImg} src={src || noUserPhoto} alt="userImg" />
      </NavLink>
      <div className={style.commentMain}>
        <div className={style.commentInfo}>
          <NavLink className={style.link} to={`/profile/${authorId}`}>
            <p className={style.commentUserName}>{userName}</p>
          </NavLink>
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