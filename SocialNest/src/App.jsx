import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/SideBar';
import './index.css';

import PostContextProvider from './components/context/PostContextProvider';
import { useContext } from 'react';
import contextObject from './components/context/postContext';
import Card from './components/Card';
import CreatePost from './components/CreatePost';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Outlet } from 'react-router-dom';

const App = () => {
  return (
    <PostContextProvider>
      <div className="app-container">
        <Sidebar />
        <div className="right-contents">
          <Header />
          {/* <Outlet /> */}

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
