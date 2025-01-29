import { createContext } from 'react';

const DEFAULT_VALUE = [
  {
    post: [],
    createPost: () => {},
    deletePost: () => {},
    updatePost: () => {},
    updateItem: [],
  },
];

let contextObject = createContext(DEFAULT_VALUE);

export default contextObject;
