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
  } else if (postAction.type === 'UPDATE_POST') {
    console.log(postAction.payload.updateItemObj);
    let prevPost = [...post];
    let updatePost = prevPost.map((item) => {
      if (item === postAction.payload.updateItemObj) {
        return {
          title: postAction.payload.title,
          description: postAction.payload.description,
        };
      } else {
        return item;
      }
    });
    return updatePost;
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
      const updatePostAction = {
        type: 'UPDATE_POST',
        payload: {
          title: title,
          description: desc,
          updateItemObj,
        },
      };
      dispatch(updatePostAction);
      setUpdateItemObj(null);
    } else {
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
