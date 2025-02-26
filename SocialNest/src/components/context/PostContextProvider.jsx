import { useCallback, useEffect, useReducer, useState } from 'react';
import { ContextProvider } from './postContext';
import { useNavigate } from 'react-router-dom';

import { deleteAPI, putAPI, getAPI } from '../axios/axiosService';

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
      let deleteId = action.payload.deleteId;

      let notDelete = currPost.filter((item) => item.id !== deleteId);
      return notDelete;

    case 'FETCH_POSTS':
      currPost = action.payload.postsList;
      return currPost;

    case 'UPDATE_POST':
      const { title, body, tags } = action.payload.APIPost;
      const { updateItem, updateId } = action.payload;

      let updateTags = tags.split(',');

      let updatePost = currPost.map((currItem) => {
        if (currItem === updateItem) {
          return {
            id: updateId,
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
        (async () => {
          try {
            setError(false);
            let res = await putAPI(updateItem.id, updateItem);

            console.log(res.data);

            const updatePostAction = {
              type: 'UPDATE_POST',
              payload: {
                updateId: res.data.id,
                APIPost,
                updateItem,
              },
            };

            dispatchPost(updatePostAction);
            setUpdateItem(null);
          } catch (error) {
            setError(true);
          }
        })();
      } else {
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
    async (deleteItem) => {
      const { id } = deleteItem;

      try {
        let res = await deleteAPI(id);
        const deletePostAction = {
          type: 'DELETE_POST',
          payload: {
            deleteId: res.data.id,
          },
        };
        dispatchPost(deletePostAction);
      } catch (error) {
        setError(true);
      }
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

  // const POST_API = 'https://dummyjson.com/products';

  const [loadPost, error, setError] = customReactQuery(fetchPost);

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
          setError,
        }}
      >
        {children}
      </ContextProvider>
    </>
  );
};

export default PostContextProvider;

const customReactQuery = (...args) => {
  const [fetchPost] = args;
  const [loadPost, setLoadPost] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let controller = new AbortController();
    let signal = controller.signal;

    (async () => {
      try {
        setLoadPost(true);
        setError(false);
        let res = await getAPI(signal);
        setLoadPost(false);
        fetchPost && fetchPost(res.data.products);
      } catch (error) {
        setLoadPost(false);
        setError(true);
      }
    })();

    return () => {
      controller.abort();
    };
  }, []);

  return [loadPost, error, setError];
};
