import { createContext } from 'react';

const DEFAULT_VALUE = [
  { post: [], createPost: () => {}, deletePost: () => {} },
];

let contextObject = createContext(DEFAULT_VALUE);

export default contextObject;
