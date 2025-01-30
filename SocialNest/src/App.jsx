import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/SideBar';
import './index.css';

import PostContextProvider from './components/context/PostContextProvider';
import { useContext } from 'react';
import contextObject from './components/context/postContext';
import Card from './components/Card';
import CreatePost from './components/CreatePost';

const App = () => {
  return (
    <PostContextProvider>
      <div className="app-container">
        <Sidebar />
        <div className="right-contents">
          <Header />
          <MainContent />
          <Footer className="footer" />
        </div>
      </div>
    </PostContextProvider>
  );
};

const MainContent = () => {
  const { selectTab } = useContext(contextObject);

  return <>{selectTab === 'home' ? <Card /> : <CreatePost />}</>;
};

export default App;
