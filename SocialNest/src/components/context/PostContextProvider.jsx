import { useCallback, useEffect, useReducer, useState } from 'react';
import { ContextProvider } from './postContext';
import { useNavigate } from 'react-router-dom';

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

  const [loadPost, setLoadPost] = useState(true);

  const POST_API = 'https://dummyjson.com/products';

  useEffect(() => {
    let controller = new AbortController();
    let signal = controller.signal;

    fetch(POST_API, { signal })
      .then((res) => res.json())
      .then((data) => {
        fetchPost(data.products);
        setLoadPost(false);
      });

    // Clean up function
  }, []);

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
        }}
      >
        {children}
      </ContextProvider>
    </>
  );
};

export default PostContextProvider;
