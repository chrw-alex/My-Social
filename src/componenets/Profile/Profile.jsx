import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProfile, getFollowed, postFollow, deleteFollow } from '../../api/api';
import { getPosts } from './../../api/mockapi';

import Following from './Following/Following';
import Posts from './Posts/Posts';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import Preloader from '../Preloader/Preloader';
import Error from '../Error/Error';

import style from './Profile.module.css';

const Profile = ({ isAuthorized, authorisedUserProfile, noUserPhoto }) => {

  const [profile, setProfile] = useState({});
  const [followed, setFollowed] = useState(false)
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
    if (profile.userId) {
      getFollowed(profile.userId)
        .then(data => setFollowed(data.data))
    }
  }, [profile.userId, followed])

  useEffect(() => {
    if (profile.fullName) {
      setIsPostsLoading(true)
      getPosts(profile.fullName)
        .then(data => setPosts(data))
        .finally(() => setIsPostsLoading(false))
    }
  }, [profile])


  const followUser = (button, id) => {
    button.disabled = true

    postFollow(id)
      .then(response => {
        if (response.data.resultCode === 0) {
          setFollowed(true)
          button.disabled = false
        }
      })
      .catch((error) => setError(error.message))
  }

  const unfollowUser = (button, id) => {
    button.disabled = true
    deleteFollow(id)
      .then(response => {
        if (response.data.resultCode === 0) {
          setFollowed(false)
          button.disabled = false
        }
      })
      .catch((error) => setError(error.message))
  }

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
          <ProfileInfo isAuthorized={isAuthorized} profile={profile} authorisedUserProfile={authorisedUserProfile} noUserPhoto={noUserPhoto} followUser={followUser} unfollowUser={unfollowUser} followed={followed} />
          {authorisedUserProfile.userId === profile.userId ? <Following noUserPhoto={noUserPhoto} /> : null}
          <Posts authorisedUserProfile={authorisedUserProfile} noUserPhoto={noUserPhoto} profile={profile} posts={posts} setPosts={setPosts} isPostsLoading={isPostsLoading} />
        </div>
      }

    </div>
  )
}

export default Profile;