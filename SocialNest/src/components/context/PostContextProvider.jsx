import { useCallback, useEffect, useReducer, useState } from 'react';
import { ContextProvider } from './postContext';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

let reducer = (currPost, action) => {
  switch (action.type) {
    case 'ADD_POST':
      let tagsArr = action.payload.APIPost.tags.split(', ');
      let newPost = {
        id: action.payload.APIPost.userId,
        title: action.payload.APIPost.title,
        description: action.payload.APIPost.body,
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
      const { title, body, tags } = action.payload.APIPost;
      const { updateItem } = action.payload;
      let updateTags = tags.split(',');
      let updatePost = currPost.map((currItem) => {
        if (currItem === updateItem) {
          return {
            id: updateItem.id,
            title: title,
            description: body,
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

  const navigate = useNavigate();

  const [post, dispatchPost] = useReducer(reducer, initialValue);

  const [selectTab, setSelectTab] = useState('home');

  const createPost = useCallback(
    (APIPost, tabValue) => {
      if (updateItem) {
        // update existing
        const updatePostAction = {
          type: 'UPDATE_POST',
          payload: {
            APIPost,
            updateItem,
          },
        };

        dispatchPost(updatePostAction);
        setUpdateItem(null);
      } else {
        console.log(tabValue);
        // insert new
        setId((prevId) => {
          let newId = prevId + 1;
          const addPostAction = {
            type: 'ADD_POST',
            payload: {
              APIPost,
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
      navigate(`/${tabValue}`); // navigate('/create')
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

  const POST_API = 'https://dummyjson.com/products';

  const [loadPost, error] = customReactQuery(POST_API, fetchPost);

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
          loadPost,
          error,
        }}
      >
        {children}
      </ContextProvider>
    </>
  );
};

export default PostContextProvider;

const customReactQuery = (API, fetchPost) => {
  const [loadPost, setLoadPost] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let controller = new AbortController();
    let signal = controller.signal;

    (async () => {
      try {
        setLoadPost(true);
        setError(false);
        let res = await axios.get(API, { signal });
        setLoadPost(false);
        fetchPost && fetchPost(res.data.products);
      } catch (error) {
        setLoadPost(false);
        console.log(error.message);
        setError(true);
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return [loadPost, error];
};
