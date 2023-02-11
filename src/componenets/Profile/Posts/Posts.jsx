import { useParams } from 'react-router-dom';
import { addPost, getPosts, deletePost, likePost } from '../../../api/mockapi';
import PostsForm from './PostsForm/PostsForm';
import SinglePost from './SinglePost/SinglePost';
import Preloader from '../../Preloader/Preloader';

import style from './Posts.module.css';

const Posts = ({ authorisedUserProfile, noUserPhoto, profile, posts, setPosts, isPostsLoading }) => {

  const params = useParams();

  const addPostHandler = (text) => {
    const newPost = {
      profileId: params.id,
      profileOwner: profile.fullName,
      userName: authorisedUserProfile.fullName,
      userPhoto: authorisedUserProfile.photos.large || noUserPhoto,
      date: new Date(),
      postText: text,
      isLiked: false,
      likesCount: 0,
      whoLiked: [],
      commentsCount: 0,
      comments: [],
    }

    addPost(newPost)
      .then(() => {
        getPosts(profile.fullName)
          .then((data) => setPosts(data))
      })
  }

  const likePostHandler = (like, id) => {
    like.disabled = true
    let currentPost = posts.find(post => post.id === id)
    let isLiked = currentPost.isLiked
    let likesCount = currentPost.likesCount
    let whoLiked = currentPost.whoLiked

    if (whoLiked.includes(authorisedUserProfile.userId)) {
      whoLiked = whoLiked.filter((el) => el !== authorisedUserProfile.userId)
      likesCount = likesCount - 1
      if (likesCount === 0) {
        isLiked = false
      }
      likePost(id, isLiked, likesCount, whoLiked)
        .then(() => {
          getPosts(profile.fullName)
            .then(data => setPosts(data))
        })
      return;
    }
    if (!whoLiked.includes(authorisedUserProfile.userId)) {
      whoLiked.unshift(authorisedUserProfile.userId)
      likesCount = likesCount + 1
      isLiked = true
      likePost(id, isLiked, likesCount, whoLiked)
        .then(() => {
          getPosts(profile.fullName)
            .then(data => setPosts(data))
        })
        .finally(() => like.disabled = false)
      return;
    }
  }

  const commentButtonHandler = (id) => {
    setPosts(posts.map((post) => {
      return (post.id === id
        ? ({ ...post, isCommentButtonClicked: true })
        : ({ ...post })
      )
    }))
  }

  const deletePostHandler = (id) => {
    deletePost(id)
      .then(() => {
        getPosts(profile.fullName)
          .then((data) => {
            setPosts(data)
          })
      })
  }

  return (
    <div className={style.posts}>
      <h3 className={style.myPostsTitle}>Posts</h3>
      <PostsForm addPost={addPostHandler} />
      {isPostsLoading ? <Preloader /> : posts.map(({ id, postText, userName, userPhoto, date, isLiked, likesCount, commentsCount }) => {
        return (
          <SinglePost postText={postText} userName={userName} userPhoto={userPhoto} date={date} likesCount={likesCount} key={id} id={id} isLiked={isLiked} commentsCount={commentsCount} likePostHandler={likePostHandler} commentButtonHandler={commentButtonHandler} deletePostHandler={deletePostHandler} authorisedUserProfile={authorisedUserProfile} noUserPhoto={noUserPhoto} />
        )
      })}
    </div>
  )
}

export default Posts;