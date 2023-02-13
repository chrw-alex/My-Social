import { useState } from 'react'
import { changeProfileImg } from '../../../api/api'

import Button from '../../Button/Button'
import PreloaderSmall from '../../PreloaderSmall/PreloaderSmall'
import Success from '../Success/Success'
import UploadError from '../UploadError/UploadError'
import style from './ImageForm.module.css'

const ImageForm = ({ authorisedUserProfile }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    let image = document.querySelector('#photo')
    setIsLoading(true)
    formData.append('image', image.files[0])
    changeProfileImg(formData)
      .then(response => {
        if (response.data.resultCode === 0) {
          setIsSuccess(true)
        } else {
          setError(...response.data.messages)
        }
      })
      .finally(() => {
        setIsLoading(false)
        setTimeout(() => setIsSuccess(false), 3000)
        setTimeout(() => setError(''), 5000)
      })
  }

  return (
    <form className={style.form} onSubmit={handleSubmit}>
      <p className={style.subtitle}>Upload new photo</p>
      <input className={style.input} type='file' id='photo' />
      <div className={style.btnInner}>
        {isLoading ? <PreloaderSmall /> : <Button className={style.button} type='submit' text='Upload' disabled={!authorisedUserProfile.fullName} />}
      </div>
      {isSuccess ? <Success /> : null}
      {error ? <UploadError error={error} /> : null}
    </form>
  )
}

export default ImageForm