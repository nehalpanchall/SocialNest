import axios from 'axios';

const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

// read
export function getAPI(signal) {
  return api.get('/products', { signal });
}

// delete
export function deleteAPI(id) {
  return api.delete(`/products/${id}`);
}

// create
export function addAPI(data) {
  return api.post('posts/add', data);
}

// update
export function putAPI(id, data) {
  return api.put(`/posts/${id}`, data);
}

// export { getAPI, deleteAPI, addAPI, putAPI };
