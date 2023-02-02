import { useState, useEffect } from 'react';
import { getStatus, changeStatus } from '../../../../api/api';

import Button from '../../../Button/Button';
import PreloaderSmall from '../../../PreloaderSmall/PreloaderSmall';
import style from './Status.module.css';

const Status = ({ profile, authorisedUserProfile }) => {

  const [editMode, setEditMode] = useState(false);
  const [text, setText] = useState('');
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
    setText('')
  }

  const onStatusSubmitHandler = (e) => {
    e.preventDefault()
    setIsStatusLoading(true)
    changeStatus(text)
      .then((response) => {
        if (response.data.resultCode === 0) {
          setStatus(text)
        }
      })
      .finally(() => setIsStatusLoading(false))
  }

  return (
    <div className={style.status}>
      {isStatusLoading
        ? <PreloaderSmall />
        : editMode
          ? (<form onBlur={() => setTimeout(turnOffEditMode, 200)} className={style.form} onSubmit={(e) => onStatusSubmitHandler(e)}>
            <input className={style.input} autoFocus={true} type="text" value={text} onChange={(e) => setText(e.target.value)} />
            <Button type='submit' className={style.button} text='Send' />
          </form>)
          : (<span title={authorisedUserProfile?.userId === profile.userId ? 'Click twice to change status' : ''} className={style.statusText} onDoubleClick={turnOnEditMode} >{status}</span>)}
    </div>
  )
}

export default Status