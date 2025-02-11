import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

function getAPI(signal) {
  return api.get('/products', { signal });
}

function deleteAPI(id) {
  return api.delete(`/products/${id}`);
}

function addAPI(data) {
  return api.post('posts/add', data);
}

export { getAPI, deleteAPI, addAPI };
