import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProfile, getMe } from '../../api/api';

import Posts from './Posts/Posts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Preloader from '../Preloader/Preloader';
import Error from '../Error/Error';

import style from './Profile.module.css';

const Profile = ({ setIsAuthorized }) => {

  const [profile, setProfile] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [authorizedUser, setAuthorizedUser] = useState({})
  const [authorisedUserProfile, setAuthorizedUserProfile] = useState({})
  const params = useParams();

  useEffect(() => {
    getProfile(params.id)
      .then(data => {
        setProfile(data)
      })
      .catch((error) => setError(error.message))
      .finally(() => {
        setIsLoading(false)
      })
  }, [params])

  useEffect(() => {
    getMe()
      .then(response => {
        if (response.data.resultCode === 0) {
          setIsAuthorized(true)
          setAuthorizedUser(response.data.data)
        }
      })
      .catch((error) => setError(error.message))
  }, [setIsAuthorized])

  useEffect(() => {
    if (authorizedUser.id) {
      getProfile(authorizedUser.id)
        .then(data => {
          setAuthorizedUserProfile(data)
        })
        .catch((error) => setError(error.message))
    }
  }, [authorizedUser])


  if (error) {
    return (
      <Error />
    )
  }

  return (
    <div className={style.profile}>
      <img className={style.profileImg} src='https://static.vecteezy.com/system/resources/previews/001/946/569/original/abstract-geometric-hexagons-yellow-background-with-diagonal-striped-lines-free-vector.jpg' alt="profileImg" />
      <div className={style.profileInner}>
        {isLoading ? <Preloader /> : <ProfileInfo profile={profile} authorisedUserProfile={authorisedUserProfile} />}
        <Posts authorisedUserProfile={authorisedUserProfile} />
      </div>
    </div>
  )
}

export default Profile;