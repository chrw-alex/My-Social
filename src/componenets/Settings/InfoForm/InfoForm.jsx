import { useState } from 'react'
import { Form, Field } from 'react-final-form'
import { changeProfileInfo } from '../../../api/api'
import Button from '../../Button/Button'
import PreloaderSmall from '../../PreloaderSmall/PreloaderSmall'
import Success from '../Success/Success'
import UploadError from '../UploadError/UploadError'
import style from './InfoForm.module.css'

const InfoForm = ({ authorisedUserProfile }) => {

  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = ({ lookingForAJob = '', lookingForAJobDescription = '', fullName = '', aboutMe = '', github = '', vk = '', facebook = '', instagram = '', twitter = '', website = '', youtube = '' }) => {
    let contacts = { github, vk, facebook, instagram, twitter, website, youtube }
    let newInfo = { lookingForAJob, lookingForAJobDescription, fullName, aboutMe, contacts }
    setIsLoading(true)
    changeProfileInfo(newInfo)
      .then((response => {
        if (response.data.resultCode === 0) {
          setIsSuccess(true)
        } else {
          setError(...response.data.messages)
        }
      }))
      .finally(() => {
        setIsLoading(false)
        setTimeout(() => setIsSuccess(false), 3000)
        setTimeout(() => setError(''), 5000)
      })
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit }) => (
        <form className={style.form} onSubmit={handleSubmit}>
          <p className={style.subtitle}>Enter your profile information:</p>

          <Field name='lookingForAJob' type='checkbox' initialValue={authorisedUserProfile?.lookingForAJob}>
            {({ input }) => (
              <div className={style.formInnerCheckbox}>
                <label className={style.label} htmlFor='checkbox'>looking For A Job:</label>
                <input {...input} id='checkbox' className={style.checkbox} type='checkbox' />
              </div>
            )}
          </Field>

          <Field name='lookingForAJobDescription' initialValue={authorisedUserProfile?.lookingForAJobDescription} >
            {({ input }) => (
              <div className={style.formInner}>
                <p>Job Description</p>
                <input {...input} className={style.input} type='text' placeholder='enter description' />
              </div>
            )}
          </Field>

          <Field name='fullName' initialValue={authorisedUserProfile?.fullName} >
            {({ input }) => (
              <div className={style.formInner}>
                <p>Full Name</p>
                <input {...input} className={style.input} type='text' placeholder='enter your full name' />
              </div>
            )}
          </Field>

          <Field name='aboutMe' initialValue={authorisedUserProfile?.aboutMe} >
            {({ input }) => (
              <div className={style.formInner + ' ' + style.formInnerTextarea}>
                <p>About me</p>
                <textarea {...input} className={style.textarea} type='text' placeholder='enter your info' />
              </div>
            )}
          </Field>

          <div>
            <p className={style.subtitle}>Contacts:</p>
            <Field name='github' initialValue={authorisedUserProfile?.contacts?.github} >
              {({ input }) => (
                <div className={style.formInner}>
                  <p>GitHub: </p>
                  <input {...input} className={style.input} type='text' placeholder='enter your github' />
                </div>
              )}
            </Field>
            <Field name='vk' initialValue={authorisedUserProfile?.contacts?.vk}  >
              {({ input }) => (
                <div className={style.formInner}>
                  <p>VK: </p>
                  <input {...input} className={style.input} type='text' placeholder='enter your vk' />
                </div>
              )}
            </Field>
            <Field name='facebook' initialValue={authorisedUserProfile?.contacts?.facebook}  >
              {({ input }) => (
                <div className={style.formInner}>
                  <p>Facebook: </p>
                  <input {...input} className={style.input} type='text' placeholder='enter your facebook' />
                </div>
              )}
            </Field>
            <Field name='instagram' initialValue={authorisedUserProfile?.contacts?.instagram}  >
              {({ input }) => (
                <div className={style.formInner}>
                  <p>Instagram: </p>
                  <input {...input} className={style.input} type='text' placeholder='enter your instagram' />
                </div>
              )}
            </Field>
            <Field name='twitter' initialValue={authorisedUserProfile?.contacts?.twitter}  >
              {({ input }) => (
                <div className={style.formInner}>
                  <p>Twitter: </p>
                  <input {...input} className={style.input} type='text' placeholder='enter your twitter' />
                </div>
              )}
            </Field>
            <Field name='website' initialValue={authorisedUserProfile?.contacts?.website}  >
              {({ input }) => (
                <div className={style.formInner}>
                  <p>Website: </p>
                  <input {...input} className={style.input} type='text' placeholder='enter your website' />
                </div>
              )}
            </Field>
            <Field name='youtube' initialValue={authorisedUserProfile?.contacts?.youtube}  >
              {({ input }) => (
                <div className={style.formInner}>
                  <p>YouTube: </p>
                  <input {...input} className={style.input} type='text' placeholder='enter your yoytube' />
                </div>
              )}
            </Field>
          </div>
          <div className={style.btnInner}>
            {isLoading ? <PreloaderSmall /> : <Button className={style.button} text='Send' disabled={!authorisedUserProfile.fullName} />}
          </div>
          {isSuccess ? <Success /> : null}
          {error ? <UploadError error={error} /> : null}
        </form>
      )}
    />
  )
}

export default InfoForm