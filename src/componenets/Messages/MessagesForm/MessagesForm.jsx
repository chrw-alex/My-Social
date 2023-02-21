import { Form, Field } from 'react-final-form';
import { composeValidators, maxLengthCreator, minLength1, checkSpacesValidator } from '../../../additional/validators';
import checkSpaces from '../../../additional/checkSpaces';
import Button from '../../Button/Button';

import style from './MessagesForm.module.css';

const maxLength1000 = maxLengthCreator(1000)

const MessagesForm = ({ addMessageHandler }) => {

  const onSubmit = ({ messageText }) => {
    if (1 < messageText.length < 1000 && checkSpaces(messageText)) {
      addMessageHandler(messageText);
    }
  }

  return (
    <div className={style.messagesForm}>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => (
          <form className={style.form} onSubmit={handleSubmit}>
            <Field name='messageText' validate={composeValidators(maxLength1000, minLength1, checkSpacesValidator)}>
              {({ input, meta }) => (
                <div className={style.formInner}>
                  <textarea {...input} className={style.textarea} placeholder="enter message's text" />
                  {meta.error && meta.active && <span className={style.error}>{meta.error}</span>}
                </div>
              )}
            </Field>
            <div className={style.buttonInner}>
              <Button
                className={style.button}
                text='Send message'
                onClick={() => setTimeout(form.restart, 500)}
              />
            </div>
          </form>
        )}
      />
    </div>

  )
}

export default MessagesForm;