import { useState, useEffect } from 'react';
import { getStatus, changeStatus } from '../../../../api/api';
import { composeValidators, maxLengthCreator, minLength1 } from '../../../../additional/validators';
import { Form, Field } from 'react-final-form';

import Button from '../../../Button/Button';
import PreloaderSmall from '../../../PreloaderSmall/PreloaderSmall';
import style from './Status.module.css';

const maxLength300 = maxLengthCreator(300)

const Status = ({ profile, authorisedUserProfile }) => {

  const [editMode, setEditMode] = useState(false);
  const [status, setStatus] = useState('');
  const [isStatusLoading, setIsStatusLoading] = useState(true);

  useEffect(() => {
    getStatus(profile.userId)
      .then(response => {
        if (response.data) {
          setStatus(response.data)
        } else {
          setStatus('no status yet')
        }
      })
      .finally(() => setIsStatusLoading(false))
  }, [status, profile.userId])

  const turnOnEditMode = () => {
    if (authorisedUserProfile?.userId === profile.userId) {
      setEditMode(true)
    }
  }

  const turnOffEditMode = () => {
    setEditMode(false)
  }

  const onSubmit = ({ statusText }) => {
    setIsStatusLoading(true)
    changeStatus(statusText)
      .then((response) => {
        if (response.data.resultCode === 0) {
          setStatus(statusText)
        }
      })
      .finally(() => setIsStatusLoading(false))
  }

  return (
    <div className={style.status}>
      {isStatusLoading
        ? <PreloaderSmall />
        : editMode
          ? (<Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, invalid }) => (
              <form className={style.form} onSubmit={handleSubmit} onBlur={() => {
                setTimeout(turnOffEditMode, 200)
                setTimeout(form.restart, 200)
              }} >
                <Field name='statusText' validate={composeValidators(maxLength300, minLength1)} initialValue={status} >
                  {({ input, meta }) => (
                    <div className={style.formInner}>
                      <input {...input} autoFocus={true} className={style.input} placeholder='your news...' />
                      {meta.error && meta.active && <span className={style.error}>{meta.error}</span>}
                    </div>
                  )}
                </Field>
                <Button className={style.button} text='Send' disabled={invalid} onClick={() => setTimeout(form.restart, 500)} />
              </form>
            )}
          />)
          : (<span title={authorisedUserProfile?.userId === profile.userId ? 'Click twice to change status' : ''} className={style.statusText} onDoubleClick={turnOnEditMode} >{status}</span>)}
    </div>
  )
}

export default Status