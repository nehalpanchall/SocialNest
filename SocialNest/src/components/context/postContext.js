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

export default contextObject;
