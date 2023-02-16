import { addPost, getPosts, deletePost, likePost } from '../../../api/mockapi';
import PostsForm from './PostsForm/PostsForm';
import SinglePost from './SinglePost/SinglePost';
import Preloader from '../../Preloader/Preloader';

import style from './Posts.module.css';

const Posts = ({ authorisedUserProfile, noUserPhoto, profile, posts, setPosts, isPostsLoading }) => {

  const addPostHandler = (text) => {

    const newPost = {
      authorId: authorisedUserProfile.userId,
      profileOwnerName: profile.fullName,
      profileOwnerId: profile.userId,
      userName: authorisedUserProfile.fullName,
      date: new Date(),
      postText: text,
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

  const likePostHandler = (id) => {
    let currentPost = posts.find(post => post.id === id)
    let likesCount = currentPost.likesCount
    let whoLiked = currentPost.whoLiked

    if (whoLiked.includes(authorisedUserProfile.userId)) {
      whoLiked = whoLiked.filter((el) => el !== authorisedUserProfile.userId)
      likesCount = likesCount - 1
      likePost(id, likesCount, whoLiked)
        .then(() => {
          getPosts(profile.fullName)
            .then(data => setPosts(data))
        })
      return;
    }
    if (!whoLiked.includes(authorisedUserProfile.userId)) {
      whoLiked.push(authorisedUserProfile.userId)
      likesCount = likesCount + 1
      likePost(id, likesCount, whoLiked)
        .then(() => {
          getPosts(profile.fullName)
            .then(data => setPosts(data))
        })
      return;
    }
  }

  const commentButtonHandler = (element) => {
    let currentPost = element.parentNode.parentNode.parentNode
    let commentForm = currentPost.lastElementChild
    commentForm.style.cssText = `height: auto; visibility: visible;`
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
      <PostsForm addPostHandler={addPostHandler} />
      {isPostsLoading ? <Preloader />
        : posts.map(({ id, authorId, postText, userName, date, likesCount, commentsCount, whoLiked, comments }) => {
          let authorizedUserLikedPost = false
          if (whoLiked.includes(authorisedUserProfile.userId)) {
            authorizedUserLikedPost = true
          }
          return (
            <SinglePost profile={profile} posts={posts} authorId={authorId} postText={postText} userName={userName} date={date} likesCount={likesCount} key={id} id={id} commentsCount={commentsCount} likePostHandler={likePostHandler} commentButtonHandler={commentButtonHandler} deletePostHandler={deletePostHandler} authorisedUserProfile={authorisedUserProfile} noUserPhoto={noUserPhoto} authorizedUserLikedPost={authorizedUserLikedPost} setPosts={setPosts} comments={comments} />
          )
        })}
    </div>
  )
}

export default Posts;