import { createContext, useContext } from 'react';

const DEFAULT_VALUE = [
  {
    post: [],
    createPost: () => {},
    deletePost: () => {},
    updatePost: () => {},
    updateItem: [],
    selectTab: '',
    setSelectTab: () => {},
    loadPost: 'true',
    error: 'false',
  },
];

// create context object
let contextObject = createContext(DEFAULT_VALUE);

// create Provider
let ContextProvider = contextObject.Provider;

// custom hook
function usePostContext() {
  return useContext(contextObject);
}

export default contextObject;

export { ContextProvider, usePostContext };
