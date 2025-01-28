import Header from './components/Header';

import Footer from './components/Footer';
import Sidebar from './components/SideBar';
import './index.css';
import CreatePost from './components/CreatePost';
import Card from './components/Card';
import { useState } from 'react';

const App = () => {
  const [post, setPost] = useState([
    {
      title: 'SocialNest',
      description: 'A social media application to post thread',
    },
  ]);

  const createPost = (titleField, descField) => {
    let getTitle = titleField.current.value;
    let getDesc = descField.current.value;
    setPost((currArr) => {
      return [...currArr, { title: getTitle, description: getDesc }];
    });

    titleField.current.value = '';
    descField.current.value = '';
    titleField.current.focus();
  };

  return (
    <div className="app-container">
      <Sidebar />
      <div className="right-contents">
        <Header />
        <CreatePost createPost={createPost} />
        <Card post={post} />
        <Footer className="footer" />
      </div>
    </div>
  );
};

export default App;
