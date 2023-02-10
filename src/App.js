import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { getMe, getProfile } from './api/api';

import Messages from './componenets/Messages/Messages';
import Header from './componenets/Header/Header';
import Nav from './componenets/Nav/Nav';
import Profile from './componenets/Profile/Profile';
import News from './componenets/News/News';
import Music from './componenets/Music/Music';
import Users from './componenets/Users/Users';
import Settings from './componenets/Settings/Settings';
import LoginPage from './componenets/LoginPage/LoginPage';
import Error from './componenets/Error/Error';

import './App.css';
import Preloader from './componenets/Preloader/Preloader';


function App() {

  const [authorizedUser, setAuthorizedUser] = useState({})
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [authorisedUserProfile, setAuthorizedUserProfile] = useState({})
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const noUserPhoto = 'https://avatars.mds.yandex.net/i?id=384a55164f8927b70d0d86e5dd1ec4a6ba880567-6997554-images-thumbs&n=13';

  useEffect(() => {
    getMe()
      .then(response => {
        if (response.data.resultCode === 0) {
          setIsAuthorized(true)
          setAuthorizedUser(response.data.data)
        }
      })
      .catch((error) => setError(error.message))
      .finally(() => setIsLoading(false))
  }, [isAuthorized])

  useEffect(() => {
    if (authorizedUser.id) {
      getProfile(authorizedUser.id)
        .then(data => {
          setAuthorizedUserProfile(data)
        })
        .catch((error) => setError(error.message))
    }
  }, [authorizedUser, isAuthorized])

  if (error) {
    return (
      <Error />
    )
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Header authorizedUser={authorizedUser} setAuthorizedUser={setAuthorizedUser} isAuthorized={isAuthorized} setIsAuthorized={setIsAuthorized} />
        <div className='main'>
          <Nav authorizedUser={authorizedUser} isAuthorized={isAuthorized} />
          <Routes>
            <Route path='/' element={isLoading ? <Preloader />
              : <Navigate to={isAuthorized ? `/profile/${authorizedUser.id}` : '/login'} replace />} />
            <Route path={'/profile/:id'} element={<Profile isAuthorized={isAuthorized} authorisedUserProfile={authorisedUserProfile} noUserPhoto={noUserPhoto} />} />
            <Route path='/login' element={<LoginPage setIsAuthorized={setIsAuthorized} setAuthorizedUser={setAuthorizedUser} />} />
            <Route path='/messages/*' element={<Messages isAuthorized={isAuthorized} authorisedUserProfile={authorisedUserProfile} noUserPhoto={noUserPhoto} />} />
            <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/users' element={<Users isAuthorized={isAuthorized} />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
