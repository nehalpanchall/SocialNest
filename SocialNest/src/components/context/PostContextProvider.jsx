import { useCallback, useReducer, useState } from 'react';
import { ContextProvider } from './postContext';

let reducer = (currPost, action) => {
  switch (action.type) {
    case 'ADD_POST':
      let tagsArr = action.payload.tags.split(',');
      let newPost = {
        title: action.payload.title,
        description: action.payload.description,
        tags: tagsArr,
      };

      let addPost = [newPost, ...currPost];
      return addPost;

    case 'DELETE_POST':
      let deleteItem = action.payload.deleteItem;
      let notDeleteItems = currPost.filter((item) => item !== deleteItem);
      return notDeleteItems;

    case 'UPDATE_POST':
      const { title, description, tags, updateItem } = action.payload;
      let updateTags = tags.split(',');
      let updatePost = currPost.map((currItem) => {
        if (currItem === updateItem) {
          return {
            title: title,
            description: description,
            tags: updateTags,
          };
        } else {
          return currItem;
        }
      });
      return updatePost;

    default:
      return currPost;
  }
};

const PostContextProvider = ({ children }) => {
  let initialValue = [
    {
      id: 1,
      title: 'SocialNest',
      reactions: 4,
      description: 'A social media application to post thread',
      tags: ['Tranding', 'Wonderlust', 'Likes'],
    },
    {
      id: 2,
      title: 'Travel Diaries',
      reactions: 6,
      description: 'Travelling to New York',
      tags: ['Explore', 'Fun', 'Foods'],
    },
  ];

  const [updateItem, setUpdateItem] = useState(null);

  const [post, dispatchPost] = useReducer(reducer, initialValue);

  const [selectTab, setSelectTab] = useState('home');

  const createPost = useCallback(
    (title, desc, tags, tabValue) => {
      console.log(tags);
      if (updateItem) {
        // update existing
        const updatePostAction = {
          type: 'UPDATE_POST',
          payload: {
            title: title,
            description: desc,
            tags: tags,
            updateItem,
          },
        };

        dispatchPost(updatePostAction);
        setUpdateItem(null);
      } else {
        // insert new
        let addPostAction = {
          type: 'ADD_POST',
          payload: {
            title: title,
            description: desc,
            tags: tags,
          },
        };
        dispatchPost(addPostAction);
      }
      setSelectTab(tabValue);
    },
    [dispatchPost, updateItem, setSelectTab]
  );

  const deletePost = useCallback(
    (deleteItem) => {
      const deletePostAction = {
        type: 'DELETE_POST',
        payload: {
          deleteItem,
        },
      };
      dispatchPost(deletePostAction);
    },
    [dispatchPost]
  );

  const updatePost = useCallback(
    (updateItem, tabValue) => {
      console.log(updateItem);
      setUpdateItem(updateItem);
      setSelectTab(tabValue);
    },
    [updateItem, setSelectTab]
  );

  return (
    <>
      <ContextProvider
        value={{
          post: post,
          createPost: createPost,
          deletePost: deletePost,
          updatePost: updatePost,
          updateItem: updateItem,
          selectTab,
          setSelectTab,
        }}
      >
        {children}
      </ContextProvider>
    </>
  );
};

export default PostContextProvider;
