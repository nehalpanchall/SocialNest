import { createContext } from 'react';

const DEFAULT_VALUE = [
  {
    post: [],
    createPost: () => {},
    deletePost: () => {},
    updatePost: () => {},
    updateItem: [],
    selectTab: '',
    setSelectTab: () => {},
  },
];

let contextObject = createContext(DEFAULT_VALUE);

let ContextProvider = contextObject.Provider;

export default contextObject;

export { ContextProvider };
