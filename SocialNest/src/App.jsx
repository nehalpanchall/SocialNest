import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/SideBar';
import './index.css';
import CreatePost from './components/CreatePost';
import Card from './components/Card';
import { useState } from 'react';
import PostContextProvider from './components/context/PostContextProvider';

const App = () => {
  const [selectTab, setSelectTab] = useState('home');

  return (
    <PostContextProvider>
      <div className="app-container">
        <Sidebar selectTab={selectTab} setSelectTab={setSelectTab} />
        <div className="right-contents">
          <Header />

          {selectTab === 'home' ? <Card /> : <CreatePost />}

          <Footer className="footer" />
        </div>
      </div>
    </PostContextProvider>
  );
};

export default App;
