import Status from './Status/Status';
import Contacts from './Contacts/Contacts';
import { ReactComponent as YesSvg } from '../../../assets/img/yes.svg';
import { ReactComponent as NoSvg } from '../../../assets/img/no.svg'

import style from './ProfileInfo.module.css';

const ProfileInfo = ({ profile, authorisedUserProfile }) => {
  return (
    <div className={style.profileInfo}>
      <img className={style.profileAvatar} src={profile?.photos?.large || 'https://avatars.mds.yandex.net/i?id=384a55164f8927b70d0d86e5dd1ec4a6ba880567-6997554-images-thumbs&n=13'} alt="profile" />
      <div className={style.profileMainInfo}>
        <div className={style.userInfo}>
          <h3 className={style.userName}>{profile?.fullName}</h3>
          <Status profile={profile} authorisedUserProfile={authorisedUserProfile} />
          <div className={style.profileDetails}>
            <p className={style.infoDetails}>
              <span className={style.infoTitle}>Looking for a job:
              </span>
              {profile?.lookingForAJob ? <YesSvg className={style.jobIcon} /> : <NoSvg className={style.jobIcon} />}
            </p>
            {profile?.lookingForAJob ? (<p className={style.infoDetails}>
              <span className={style.infoTitle}>Details:
              </span>{profile?.lookingForAJobDescription}
            </p>) : null}
          </div>
        </div>
        <Contacts profile={profile} />
      </div>
    </div>
  )
}

export default ProfileInfo;