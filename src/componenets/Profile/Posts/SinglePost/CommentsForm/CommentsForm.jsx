import { useState } from 'react';

import { RiSendPlane2Line } from 'react-icons/ri';
import Textarea from './../../../../Textarea/Textarea';

import style from './CommentsForm.module.css';

const CommentsForm = ({ isCommentButtonClicked, addCommentHandler }) => {

  const [text, setText] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addCommentHandler(text);
    setText('');
  }

  return (
    <div className={isCommentButtonClicked ? style.commentsVisible : style.comments}>
      <img className={style.commentsFormImg} src="https://klike.net/uploads/posts/2022-07/1658727898_47.jpg" alt="userImg" />
      <form className={style.commentsForm} onSubmit={onSubmitHandler}>
        <Textarea
          className={style.commentsTextarea}
          placeholder='your comment...'
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button className={style.sendCommentButton}>
          <RiSendPlane2Line
            type='submit'
            className={style.sendIcon}
          />
        </button>
      </form>
    </div>

  )
}

export default CommentsForm;