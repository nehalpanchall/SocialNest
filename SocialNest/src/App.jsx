import Header from './components/Header';

import Footer from './components/Footer';
import Sidebar from './components/SideBar';
import './index.css';
import CreatePost from './components/CreatePost';
import Card from './components/Card';
import { useState } from 'react';

const App = () => {
  const [updateItemObj, setUpdateItemObj] = useState(null);

  const [selectTab, setSelectTab] = useState('home');

  const [post, setPost] = useState([
    {
      title: 'SocialNest',
      description: 'A social media application to post thread',
    },
  ]);

  const createPost = (title, desc) => {
    if (updateItemObj) {
      //update
      let prevItems = [...post]; // [{1},{2},{3}]
      let object = prevItems.map(function (itemObj) {
        if (itemObj === updateItemObj) {
          return { title: getTitle, description: getDesc };
        } else {
          return itemObj;
        }
      });

      setPost(object);
      setSelectTab('create');
      setUpdateItemObj(null);
    } else {
      //create
      let newItem = { title: title, description: desc };
      let newArr = [newItem, ...post];
      setPost(newArr);
      setSelectTab('home');
    }
  };

  const deletePost = (deleteItem) => {
    let notDeletePosts = post.filter((item) => item !== deleteItem);
    setPost(notDeletePosts);
  };

  const updatePost = (updateItemObj) => {
    setUpdateItemObj(updateItemObj);
  };

  return (
    <div className="app-container">
      <Sidebar selectTab={selectTab} setSelectTab={setSelectTab} />
      <div className="right-contents">
        <Header />

        {selectTab === 'home' ? (
          <Card post={post} deletePost={deletePost} updatePost={updatePost} />
        ) : (
          <CreatePost createPost={createPost} updateItemObj={updateItemObj} />
        )}

        <Footer className="footer" />
      </div>
    </div>
  );
};

export default App;
