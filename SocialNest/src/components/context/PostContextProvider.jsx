import { useReducer, useState } from 'react';
import contextObject from './postContext';

let reducer = (currPost, action) => {
  switch (action.type) {
    case 'ADD_POST':
      let newPost = {
        title: action.payload.title,
        description: action.payload.description,
      };

      let addPost = [newPost, ...currPost];
      return addPost;

    case 'DELETE_POST':
      let deleteItem = action.payload.deleteItem;
      let notDeleteItems = currPost.filter((item) => item !== deleteItem);
      return notDeleteItems;

    default:
      return currPost;
  }
};

const PostContextProvider = ({ children }) => {
  let initialValue = [
    {
      title: 'SocialNest',
      description: 'A social media application to post thread',
    },
  ];

  const [updateItem, setUpdateItem] = useState(null);

  const [post, dispatchPost] = useReducer(reducer, initialValue);

  const createPost = (title, desc, tabValue) => {
    console.log(title);
    console.log(desc);
    let addPostAction = {
      type: 'ADD_POST',
      payload: {
        title: title,
        description: desc,
      },
    };
    dispatchPost(addPostAction);
  };

  const deletePost = (deleteItem) => {
    const deletePostAction = {
      type: 'DELETE_POST',
      payload: {
        deleteItem,
      },
    };
    dispatchPost(deletePostAction);
  };

  const updatePost = (updateItem, tabValue) => {
    setUpdateItem(updateItem);
  };

  return (
    <>
      <contextObject.Provider
        value={{
          post: post,
          createPost: createPost,
          deletePost: deletePost,
          updatePost: updatePost,
          updateItem: updateItem,
        }}
      >
        {children}
      </contextObject.Provider>
    </>
  );
};

export default PostContextProvider;
