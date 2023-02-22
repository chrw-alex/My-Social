import { Form, Field } from 'react-final-form';
import { RiSendPlane2Line } from 'react-icons/ri';
import { maxLengthCreator, composeValidators, checkSpacesValidator } from '../../../../../additional/validators'
import checkSpaces from '../../../../../additional/checkSpaces';

import style from './CommentsForm.module.css';

const maxLength300 = maxLengthCreator(300)

const CommentsForm = ({ id, addCommentHandler, authorisedUserProfile, noUserPhoto }) => {

  const currentPostId = id

  const onSubmit = ({ commentText }) => {
    if (1 < commentText?.length < 500 && checkSpaces(commentText)) {
      addCommentHandler(currentPostId, commentText);
    }
  }

  return (
    <div className={style.comments} >
      <img className={style.commentsFormImg} src={authorisedUserProfile?.photos?.large || noUserPhoto} alt="userImg" />
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => (
          <form className={style.commentsForm} onSubmit={handleSubmit} >
            <Field name='commentText' validate={composeValidators(maxLength300, checkSpacesValidator)}>
              {({ input, meta }) => (
                <div>
                  <textarea {...input} className={style.commentsTextarea} placeholder='your comment...' />
                  {meta.error && meta.active && <span className={style.error}>{meta.error}</span>}
                </div>
              )}
            </Field>
            <button className={style.sendCommentButton} onClick={() => setTimeout(form.restart, 500)}>
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