import { useCallback, useReducer, useState } from 'react';
import { ContextProvider } from './postContext';

let reducer = (currPost, action) => {
  switch (action.type) {
    case 'ADD_POST':
      let tagsArr = action.payload.tags.split(',');
      let newPost = {
        id: action.payload.id,
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

    case 'FETCH_POSTS':
      currPost = action.payload.postsList;
      return currPost;

    case 'UPDATE_POST':
      const { title, description, tags, updateItem } = action.payload;
      let updateTags = tags.split(',');
      let updatePost = currPost.map((currItem) => {
        if (currItem === updateItem) {
          return {
            id: updateItem.id,
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
  let initialValue = [];

  const [id, setId] = useState(2);

  const [updateItem, setUpdateItem] = useState(null);

  const [post, dispatchPost] = useReducer(reducer, initialValue);

  const [selectTab, setSelectTab] = useState('home');

  const createPost = useCallback(
    (title, desc, tags, tabValue) => {
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
        setId((prevId) => {
          let newId = prevId + 1;
          const addPostAction = {
            type: 'ADD_POST',
            payload: {
              id: newId, // Generate dynamic Id for new object
              title: title,
              description: desc,
              tags: tags,
            },
          };
          dispatchPost(addPostAction);

          // Return the updated ID for next use
          return newId;
        });
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
      setUpdateItem(updateItem);
      setSelectTab(tabValue);
    },
    [updateItem, setSelectTab]
  );

  const fetchPost = (postsList) => {
    const fetchPostsAction = {
      type: 'FETCH_POSTS',
      payload: {
        postsList,
      },
    };
    dispatchPost(fetchPostsAction);
  };

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
          fetchPost,
        }}
      >
        {children}
      </ContextProvider>
    </>
  );
};

export default PostContextProvider;
