import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import PostsForm from './PostsForm/PostsForm';
import SinglePost from './SinglePost/SinglePost';


import style from './Posts.module.css';


const Posts = () => {

  const [posts, setPosts] = useState([]);

  const addPostHandler = (text) => {
    const newPost = {
      id: uuidv4(),
      text: text,
      date: new Date(),
      likesCount: 0,
      isLiked: false,
      isCommentButtonClicked: false,
      commentsCount: 0,
      isCommented: false
    }

    setPosts([newPost, ...posts]);
  }

  const likePostHandler = (id, likesCount, isLiked) => {
    setPosts(posts.map((post) => {
      if (post.id === id && isLiked) {
        return ({ ...post, isLiked: !post.isLiked, likesCount: likesCount - 1 })
      } else if (post.id === id && !isLiked) {
        return ({ ...post, isLiked: !post.isLiked, likesCount: likesCount + 1 })
      } else {
        return ({ ...post })
      }
    }))
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
    setPosts(posts.filter((post) => post.id !== id))
  }

  return (
    <div className={style.posts}>
      <h3 className={style.myPostsTitle}>Posts</h3>
      <PostsForm addPost={addPostHandler} />
      {posts.map(({ id, text, likesCount, commentsCount, isLiked, date, isCommentButtonClicked, isCommented }) => {
        return (
          <SinglePost text={text} date={date} likesCount={likesCount} isCommentButtonClicked={isCommentButtonClicked} commentsCount={commentsCount} isCommented={isCommented} key={id} id={id} isLiked={isLiked} likePostHandler={likePostHandler} commentButtonHandler={commentButtonHandler} deletePostHandler={deletePostHandler} />
        )
      })}
    </div>
  )
}

export default Posts;