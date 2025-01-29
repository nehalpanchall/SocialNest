// Rollback here

import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/SideBar';
import './index.css';
import CreatePost from './components/CreatePost';
import Card from './components/Card';
import { useReducer, useState } from 'react';

function reduce(post, postAction) {
  if (postAction.type === 'ADD_NEW_POST') {
    let addPost = {
      title: postAction.payload.title,
      description: postAction.payload.description,
    };
    let newPost = [addPost, ...post];
    return newPost;
  }
}

const App = () => {
  const [updateItemObj, setUpdateItemObj] = useState(null);

  const [selectTab, setSelectTab] = useState('home');

  let initialValue = [
    {
      title: 'SocialNest',
      description: 'A social media application to post thread',
    },
  ];

  const [post, dispatch] = useReducer(reduce, initialValue);

  const createPost = (title, desc, tabValue) => {
    if (updateItemObj) {
      //update
      let prevItems = [...post]; // [{1},{2},{3}]
      let object = prevItems.map(function (itemObj) {
        if (itemObj === updateItemObj) {
          return { title: title, description: desc };
        } else {
          return itemObj;
        }
      });

      setPost(object);
      setUpdateItemObj(null);
    } else {
      //create

      const addPostAction = {
        type: 'ADD_NEW_POST',
        payload: {
          title: title,
          description: desc,
        },
      };
      dispatch(addPostAction);
    }
    setSelectTab(tabValue);
  };

  const deletePost = (deleteItem) => {
    let notDeletePosts = post.filter((item) => item !== deleteItem);
    setPost(notDeletePosts);
  };

  const updatePost = (updateItemObj, tabValue) => {
    setUpdateItemObj(updateItemObj);
    setSelectTab(tabValue);
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
