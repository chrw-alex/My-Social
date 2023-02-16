import Status from './Status/Status'
import Contacts from './Contacts/Contacts'
import { ReactComponent as YesSvg } from '../../../assets/img/yes.svg'
import { ReactComponent as NoSvg } from '../../../assets/img/no.svg'
import Button from '../../Button/Button'

import style from './ProfileInfo.module.css';

const ProfileInfo = ({ isAuthorized, profile, authorisedUserProfile, noUserPhoto, followUser, unfollowUser, followed }) => {

  const buttonVisible = authorisedUserProfile.userId !== profile.userId

  return (
    <div className={style.profileInfo}>
      <div className={style.profileInfoLeft}>
        <img className={style.profileAvatar} src={profile?.photos?.large || noUserPhoto} alt="profile" />
        {buttonVisible ?
          (<>
            {followed
              ? <Button className={style.followBtn} text="Unfollow" onClick={(event) => unfollowUser(event.target, profile.userId)} />
              : <Button className={style.followBtn} text="Follow" disabled={isAuthorized ? false : true} onClick={(event) => followUser(event.target, profile.userId, profile.fullName)} />}
            <Button className={style.followBtn} text="Message" disabled={isAuthorized ? false : true} />
          </>)
          : null
        }
      </div>
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
            {profile?.aboutMe ? (<p className={style.infoDetails}>
              <span className={style.infoTitle}>About Me:
              </span>{profile?.aboutMe}
            </p>) : null}
          </div>
        </div>
        <Contacts profile={profile} />
      </div>
    </div>
  )
}

export default ProfileInfo;