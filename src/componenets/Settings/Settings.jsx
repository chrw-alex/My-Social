import ImageForm from './ImageForm/ImageForm';
import InfoForm from './InfoForm/InfoForm';
import style from './Settings.module.css';

const Settings = ({ authorisedUserProfile }) => {
  return (
    <div className={style.settings}>
      <ImageForm authorisedUserProfile={authorisedUserProfile} />
      <InfoForm authorisedUserProfile={authorisedUserProfile} />
    </div>
  )
}

export default Settings;