import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProfile } from '../../api/api';
import { getPosts } from './../../api/mockapi';

import Posts from './Posts/Posts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Preloader from '../Preloader/Preloader';
import Error from '../Error/Error';

import style from './Profile.module.css';

const Profile = ({ authorisedUserProfile, noUserPhoto }) => {

  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isPostsLoading, setIsPostsLoading] = useState(true)
  const [error, setError] = useState('');
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
  }, [params.id])

  useEffect(() => {
    if (profile.fullName) {
      getPosts(profile.fullName)
        .then(data => setPosts(data))
        .finally(() => setIsPostsLoading(false))
    }
  }, [profile])

  if (error) {
    return (
      <Error />
    )
  }

  return (
    <div className={style.profile}>
      <img className={style.profileImg} src='https://static.vecteezy.com/system/resources/previews/001/946/569/original/abstract-geometric-hexagons-yellow-background-with-diagonal-striped-lines-free-vector.jpg' alt="profileImg" />
      {isLoading ? <Preloader />
        : <div className={style.profileInner}>
          <ProfileInfo profile={profile} authorisedUserProfile={authorisedUserProfile} noUserPhoto={noUserPhoto} />
          <Posts authorisedUserProfile={authorisedUserProfile} noUserPhoto={noUserPhoto} profile={profile} posts={posts} setPosts={setPosts} isPostsLoading={isPostsLoading} />
        </div>
      }

    </div>
  )
}

export default Profile;