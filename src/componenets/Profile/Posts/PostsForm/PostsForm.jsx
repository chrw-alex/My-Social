import { Form, Field } from 'react-final-form';
import { maxLengthCreator, composeValidators, checkSpacesValidator } from '../../../../additional/validators';
import checkSpaces from '../../../../additional/checkSpaces';
import Button from '../../../Button/Button';

import style from './PostsForm.module.css';

const maxLength500 = maxLengthCreator(500)

const PostsForm = ({ addPostHandler }) => {

  const onSubmit = ({ postText }) => {
    if (1 < postText?.length < 500 && checkSpaces(postText)) {
      addPostHandler(postText);
    }
  }

  return (
    <div className={style.postsForm}>
      <h3 className={style.myPostsTitle}>Posts</h3>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form }) => (
          <form className={style.form} onSubmit={handleSubmit}>
            <Field name='postText' validate={composeValidators(maxLength500, checkSpacesValidator)}>
              {({ input, meta }) => (
                <div className={style.formInner}>
                  <textarea {...input} className={style.textarea} placeholder='your news...' />
                  {meta.error && meta.active && <span className={style.error}>{meta.error}</span>}
                </div>
              )}
            </Field>
            {<Button
              className={style.button}
              text='Send'
              onClick={() => setTimeout(form.reset, 500)}
            />}
          </form>
        )}
      />
    </div>

  )
}

export default PostsForm;