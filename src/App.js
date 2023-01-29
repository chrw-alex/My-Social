import { useState, useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { getMe } from './api/api';

import Messages from './componenets/Messages/Messages';
import Header from './componenets/Header/Header';
import Nav from './componenets/Nav/Nav';
import Profile from './componenets/Profile/Profile';
import News from './componenets/News/News';
import Music from './componenets/Music/Music';
import Users from './componenets/Users/Users';
import Settings from './componenets/Settings/Settings';
import LoginPage from './componenets/LoginPage/LoginPage';

import './App.css';


function App() {

  const [authorizedUser, setAuthorizedUser] = useState({})
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    getMe()
      .then(response => {
        if (response.data.resultCode === 0) {
          setIsAuthorized(true)
        }
        setAuthorizedUser(response.data.data)
      })
  }, [])

  return (
    <BrowserRouter>
      <div className="App">
        <Header authorizedUser={authorizedUser} isAuthorized={isAuthorized} />
        <div className='main'>
          <Nav authorizedUser={authorizedUser} isAuthorized={isAuthorized} />
          <Routes>
            <Route path={'/profile/:id'} element={<Profile />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/messages/*' element={<Messages />} />
            <Route path='/news' element={<News />} />
            <Route path='/music' element={<Music />} />
            <Route path='/users' element={<Users />} />
            <Route path='/settings' element={<Settings />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
