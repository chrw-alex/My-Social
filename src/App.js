import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Messages from './componenets/Messages/Messages';
import Header from './componenets/Header/Header';
import Nav from './componenets/Nav/Nav';
import Profile from './componenets/Profile/Profile';
import News from './componenets/News/News';
import Music from './componenets/Music/Music';
import Users from './componenets/Users/Users';
import Settings from './componenets/Settings/Settings';

import './App.css';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <div className='main'>
          <Nav />
          <Routes>
            <Route path='/' element={<Profile />} />
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
