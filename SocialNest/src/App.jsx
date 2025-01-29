import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/SideBar';
import './index.css';
import CreatePost from './components/CreatePost';
import Card from './components/Card';
import { useReducer, useState } from 'react';
import PostContextProvider from './components/context/PostContextProvider';

function reduce(post, postAction) {
  switch (postAction.type) {
    case 'UPDATE_POST':
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

    case 'DELETE_POST':
      let notDeleteItems = post.filter(
        (item) => item !== postAction.payload.deleteItem
      );
      return notDeleteItems;

    default:
      return post;
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
    }
  };

  const deletePost = (deleteItem) => {
    const deletePostAction = {
      type: 'DELETE_POST',
      payload: {
        deleteItem,
      },
    };
    dispatch(deletePostAction);
  };

  const updatePost = (updateItemObj, tabValue) => {
    setUpdateItemObj(updateItemObj);
    setSelectTab(tabValue);
  };

  return (
    <PostContextProvider>
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
    </PostContextProvider>
  );
};

export default App;
