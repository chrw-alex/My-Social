import { useState } from "react";

import Textarea from './../../../Textarea/Textarea';
import Button from './../../../Button/Button';

import style from './MessagesForm.module.css';

const MessagesForm = ({ addMessage }) => {

  const [text, setText] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    addMessage(text);
    setText('');
  }

  return (
    <form className={style.form} onSubmit={onSubmitHandler}>
      <Textarea
        className={style.textarea}
        placeholder="enter message's text..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button
        type='submit'
        className={style.button}
        text='Send message'
      />
    </form>
  )
}

export default MessagesForm;