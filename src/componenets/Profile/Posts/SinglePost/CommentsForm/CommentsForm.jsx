import { Form, Field } from 'react-final-form';
import { RiSendPlane2Line } from 'react-icons/ri';
import { maxLengthCreator, minLength1, composeValidators } from '../../../../../additional/validators'

import style from './CommentsForm.module.css';

const maxLength300 = maxLengthCreator(300)

const CommentsForm = ({ isCommentButtonClicked, addCommentHandler, authorisedUserProfile }) => {

  const onSubmit = ({ commentText }) => {
    addCommentHandler(commentText);
  }

  return (
    <div className={isCommentButtonClicked ? style.commentsVisible : style.comments}>
      <img className={style.commentsFormImg} src={authorisedUserProfile?.photos?.large || 'https://avatars.mds.yandex.net/i?id=384a55164f8927b70d0d86e5dd1ec4a6ba880567-6997554-images-thumbs&n=13'} alt="userImg" />
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, invalid }) => (
          <form className={style.commentsForm} onSubmit={handleSubmit}>
            <Field name='commentText' validate={composeValidators(maxLength300, minLength1)}>
              {({ input, meta }) => (
                <div>
                  <textarea {...input} className={style.commentsTextarea} placeholder='your comment...' />
                  {meta.error && meta.active && <span className={style.error}>{meta.error}</span>}
                </div>
              )}
            </Field>
            <button className={style.sendCommentButton} disabled={invalid} onClick={() => setTimeout(form.restart, 500)}>
              <RiSendPlane2Line
                className={style.sendIcon}
              />
            </button>
          </form>
        )}
      />
    </div>

  )
}

export default CommentsForm;