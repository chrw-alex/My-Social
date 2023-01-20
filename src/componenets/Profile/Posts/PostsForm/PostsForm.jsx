import { useState } from 'react';
import Button from '../../../Button/Button';
import Textarea from '../../../Textarea/Textarea';

import style from './PostsForm.module.css';

const PostsForm = ({ addPost }) => {

  const [text, setText] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addPost(text);
    setText('');
  }

  return (
    <form className={style.form} onSubmit={onSubmitHandler}>
      <Textarea
        className={style.textarea}
        placeholder='your news...'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        type='submit'
        className={style.button}
        text='Send'
      />
    </form>
  )
}

export default PostsForm;