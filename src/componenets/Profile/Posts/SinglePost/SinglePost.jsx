import { useParams } from 'react-router-dom';
import { changeComments, getPosts } from '../../../../api/mockapi';
import { v4 as uuidv4 } from 'uuid';
import { CgHeart } from 'react-icons/cg';
import { RiDeleteBinLine, RiChat3Line } from 'react-icons/ri';
import formatDate from '../../../../additional/formatDate';

import CommentsForm from './CommentsForm/CommentsForm';
import SingleComment from './SingleComment/SingleComment';

import style from './SinglePost.module.css';


const SinglePost = ({ profile, posts, postText, date, userName, likesCount, id, likePostHandler, commentButtonHandler, deletePostHandler, authorisedUserProfile, noUserPhoto, commentsCount, authorizedUserLikedPost, setPosts, comments }) => {

  const params = useParams();
  const showDeleteButton = (authorisedUserProfile.userId === +params.id || authorisedUserProfile.fullName === userName) ? true : false

  const addCommentHandler = (id, text) => {
    let currentPost = posts.find(post => post.id === id)
    let comments = currentPost.comments
    let commentsCount = currentPost.commentsCount

    const newComment = {
      id: uuidv4(),
      userName: authorisedUserProfile.fullName,
      text: text,
      date: new Date(),
      likesCount: 0,
      whoLiked: []
    }
    comments.push(newComment)
    commentsCount = commentsCount + 1

    changeComments(id, commentsCount, comments)
      .then(() => {
        getPosts(profile.fullName)
          .then((data) => setPosts(data))
      })
  }

  const deleteCommentHandler = (id) => {
    posts.map(post => {
      let currentComment = post.comments.find(comment => comment.id === id)
      if (currentComment) {
        let postId = post.id
        let commentsCount = post.commentsCount
        let comments = post.comments.filter(comment => comment.id !== id)
        commentsCount = commentsCount - 1
        changeComments(postId, commentsCount, comments)
          .then(() => {
            getPosts(profile.fullName)
              .then((data) => setPosts(data))
          })
        return post;
      }
      return post;
    })
  }

  const likeCommentHandler = (id) => {
    posts.map(post => {
      let currentComment = post.comments.find(comment => comment.id === id)
      if (currentComment) {
        let postId = post.id
        let comments = post.comments
        let commentsCount = post.commentsCount

        if (currentComment.whoLiked.includes(authorisedUserProfile.userId)) {

          currentComment.whoLiked = currentComment.whoLiked.filter((el) => el !== authorisedUserProfile.userId)
          currentComment.likesCount = currentComment.likesCount - 1
          changeComments(postId, commentsCount, comments)
            .then(() => {
              getPosts(profile.fullName)
                .then((data) => setPosts(data))
            })
        } else {

          currentComment.whoLiked.push(authorisedUserProfile.userId)
          currentComment.likesCount = currentComment.likesCount + 1
          changeComments(postId, commentsCount, comments)
            .then(() => {
              getPosts(profile.fullName)
                .then((data) => setPosts(data))
            })
        }
      }
      return undefined;
    })
  }

  return (
    <div className={style.singlePost} id={id} comments={comments}>
      <div className={style.singlePostInner}>
        <img className={style.singlePostImg} src={authorisedUserProfile?.photos?.large || noUserPhoto} alt="userImg" />
        <div className={style.singlePostInfo}>
          <p className={style.postUserName}>{userName}</p>
          <p className={style.postDate}>{formatDate(date)}</p>
        </div>
        {showDeleteButton ? <RiDeleteBinLine className={style.deleteIcon} onClick={() => deletePostHandler(id)} /> : null}
      </div>
      <div className={style.post}>
        <div className={style.postText}>
          <p>{postText}</p>
        </div>
      </div>
      <div className={style.actions}>
        <div className={style.likeAction}>
          <CgHeart className={`${style.heartIcon} ${authorizedUserLikedPost ? style.heartIconActive : ''}`} onClick={() => likePostHandler(id)} />
          <div>
            <p className={style.likesCount}>{likesCount}</p>
          </div>
        </div>
        <div className={style.commentAction}>
          <RiChat3Line className={style.commentIcon} onClick={(event) => commentButtonHandler(event.target)} />
          <div>
            <p className={style.commentsCount}>{commentsCount}</p>
          </div>
        </div>
      </div>
      <div>
        {comments.map(({ id, text, date, likesCount, userName, whoLiked }) => {
          let authorizedUserLikedComment = false
          if (whoLiked.includes(authorisedUserProfile.userId)) {
            authorizedUserLikedComment = true
          }
          return (
            <SingleComment key={id} id={id} text={text} date={date} likesCount={likesCount} userName={userName} deleteCommentHandler={deleteCommentHandler} likeCommentHandler={likeCommentHandler} authorisedUserProfile={authorisedUserProfile} noUserPhoto={noUserPhoto} authorizedUserLikedComment={authorizedUserLikedComment} />
          )
        })}
      </div>
      <CommentsForm id={id} addCommentHandler={addCommentHandler} authorisedUserProfile={authorisedUserProfile} noUserPhoto={noUserPhoto} />
    </div>

  )
}

export default SinglePost;