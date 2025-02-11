import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

function getAPI(signal) {
  return api.get('/products', { signal });
}

export { getAPI };
