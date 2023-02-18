import { Form, Field } from 'react-final-form';
import { composeValidators, maxLengthCreator, minLength1 } from '../../../additional/validators';
import Button from '../../Button/Button';

import style from './MessagesForm.module.css';

const maxLength1000 = maxLengthCreator(1000)

const MessagesForm = ({ addMessageHandler }) => {

  const onSubmit = ({ messageText }) => {
    addMessageHandler(messageText);
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, invalid }) => (
        <form className={style.form} onSubmit={handleSubmit}>
          <Field name='messageText' validate={composeValidators(maxLength1000, minLength1)}>
            {({ input, meta }) => (
              <div className={style.formInner}>
                <textarea {...input} className={style.textarea} placeholder="enter message's text" />
                {meta.error && meta.active && <span className={style.error}>{meta.error}</span>}
              </div>
            )}
          </Field>
          <Button
            className={style.button}
            text='Send message'
            disabled={invalid}
            onClick={() => setTimeout(form.restart, 500)}
          />
        </form>
      )}
    />
  )
}

export default MessagesForm;