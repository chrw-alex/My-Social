import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CgHeart } from 'react-icons/cg';
import { RiDeleteBinLine, RiChat3Line } from 'react-icons/ri';

import formatDate from '../../../../additional/formatDate';

import CommentsForm from './CommentsForm/CommentsForm';
import SingleComment from './SingleComment/SingleComment';


import style from './SinglePost.module.css';

const SinglePost = ({ text, date, likesCount, commentsCount, isCommentButtonClicked, id, isLiked, likePostHandler, commentButtonHandler, deletePostHandler }) => {

  const [comments, setComments] = useState([]);

  const addCommentHandler = (text) => {
    const newComment = {
      id: uuidv4(),
      text: text,
      date: new Date(),
      likesCount: 0,
      isLiked: false,
    }

    setComments([...comments, newComment]);
  }

  const deleteCommentHandler = (id) => {
    setComments(comments.filter((comment) => comment.id !== id))
  }

  const likeCommentHandler = (id, likesCount, isLiked) => {
    setComments(comments.map((comment) => {
      if (comment.id === id && isLiked) {
        return ({ ...comment, isLiked: !comment.isLiked, likesCount: likesCount - 1 })
      } else if (comment.id === id && !isLiked) {
        return ({ ...comment, isLiked: !comment.isLiked, likesCount: likesCount + 1 })
      } else {
        return ({ ...comment })
      }
    }))
  }

  return (
    <div className={style.singlePost}>
      <div className={style.singlePostInner}>
        <img className={style.singlePostImg} src="https://klike.net/uploads/posts/2022-07/1658727898_47.jpg" alt="userImg" />
        <div className={style.singlePostInfo}>
          <p className={style.postUserName}>Alexandra Sergeevna</p>
          <p className={style.postDate}>{formatDate(date)}</p>
        </div>
        <RiDeleteBinLine className={style.deleteIcon} onClick={() => deletePostHandler(id)} />
      </div>
      <div className={style.post}>
        <div className={style.postText}>
          <p>{text}</p>
        </div>
      </div>
      <div className={style.actions}>
        <div className={style.likeAction}>
          <CgHeart className={`${style.heartIcon} ${isLiked ? style.heartIconActive : ''}`} onClick={() => likePostHandler(id, likesCount, isLiked)} />
          <div>
            <p className={style.likesCount}>{likesCount}</p>
          </div>
        </div>
        <div className={style.commentAction}>
          <RiChat3Line className={style.commentIcon} onClick={() => commentButtonHandler(id)} />
          <div>
            <p className={style.commentsCount}>{commentsCount}</p>
          </div>
        </div>
      </div>
      {comments.map(({ id, text, date, likesCount, isLiked }) => {
        return (
          <SingleComment key={id} id={id} text={text} date={date} likesCount={likesCount} isLiked={isLiked} formatDate={formatDate} deleteCommentHandler={deleteCommentHandler} likeCommentHandler={likeCommentHandler} />
        )
      })}
      <CommentsForm isCommentButtonClicked={isCommentButtonClicked} addCommentHandler={addCommentHandler} />
    </div>

  )
}

export default SinglePost;