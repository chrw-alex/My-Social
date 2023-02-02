import { useState } from 'react';

import { RiSendPlane2Line } from 'react-icons/ri';
import Textarea from './../../../../Textarea/Textarea';

import style from './CommentsForm.module.css';

const CommentsForm = ({ isCommentButtonClicked, addCommentHandler, authorisedUserProfile }) => {

  const [text, setText] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addCommentHandler(text);
    setText('');
  }

  return (
    <div className={isCommentButtonClicked ? style.commentsVisible : style.comments}>
      <img className={style.commentsFormImg} src={authorisedUserProfile?.photos?.large || 'https://avatars.mds.yandex.net/i?id=384a55164f8927b70d0d86e5dd1ec4a6ba880567-6997554-images-thumbs&n=13'} alt="userImg" />
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